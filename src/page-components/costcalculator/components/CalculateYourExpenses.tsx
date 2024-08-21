"use client";

import { RootContainer } from "@/components/common";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";
import { Box, Button, Grid, MenuItem, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InputBox from "@/page-components/costcalculator/components/InputBox";
import costArrow from "$/images/costcalculator/cost-arrow.webp";
import Image from "next/image";
import DownloadFile from "@/page-components/costcalculator/components/DownloadFile";
import useCurrencyInfo from "@/hooks/useCurrencyInfo";
import { CostCalculatorInputFields } from "../utils/provider";
import { getCostScale } from "@/api/web/costcaluclator.action";
import { useQuery } from "@tanstack/react-query";

function CalculateYourExpenses() {
	const currencyInfo = useCurrencyInfo();
	const options = Object.keys(currencyInfo);

	const { data: costScale } = useQuery({
		queryKey: ["costScale"],
		queryFn: getCostScale,
	});
	const scalesOptions = Array.from(
		new Set(costScale?.map((cityInfo: any) => cityInfo.city)),
	);
	const stayOptions = Array.from(
		new Set(costScale?.map((cityInfo: any) => cityInfo.stay)),
	);

	const [to, setTo] = useState<string>("cny");
	const [showModal, setShowModal] = useState(false);
	const [annualTutionFee, setAnnualTutionFee] = useState("");
	const [selectedCity, setSelectedCity] = useState(scalesOptions[0]);
	const [selectedStay, setSelectedStay] = useState(stayOptions[0]);

	// Get the ip location for client
	const getLocation = async () => {
		const location = await axios.get("https://ipapi.co/json");
		setTo(location.data.currency.toLowerCase());
	};
	useEffect(() => {
		getLocation();
	}, []);

	// Get Costs According to city and accommodation type
	const getSelectedCostDetail = () => {
		const selectedCostDetails = costScale?.find(
			(costScaleInfo: any) =>
				costScaleInfo.city === selectedCity &&
				costScaleInfo.stay === selectedStay,
		);
		return selectedCostDetails;
	};
	const selectedCostDetails = getSelectedCostDetail();

	const calculateScore = () => {
		const cost_per_year = selectedCostDetails?.cost_per_year ?? 0;
		const monthly_expenses = selectedCostDetails?.monthly_expenses ?? 0;
		const accommodation_fee_per_month =
			selectedCostDetails?.accommodation_fee_per_month ?? 0;
		const other_costs = selectedCostDetails?.other_costs ?? 0;

		const totalAmount =
			+annualTutionFee +
			cost_per_year +
			monthly_expenses +
			accommodation_fee_per_month +
			other_costs;

		return (totalAmount * currencyInfo[to])?.toLocaleString("en-US", {
			style: "currency",
			currency: to, // You can change this to your desired currency code
		});
	};

	const getConvertedCosts = (val: number) =>
		(val * currencyInfo[to])?.toLocaleString("en-US", {
			style: "currency",
			currency: to, // You can change this to your desired currency code
		});

	const allowedCurrencies = [
		"usd",
		"npr",
		"inr",
		"jpy",
		"cad",
		"eur",
		"gbp",
		"aud",
		"bdt",
		"cny",
		"cdf",
		"kes",
		"pkr",
		"lkr",
		"zar",
		"tzs",
		"pgk",
		"ngn",
		"idr",
	];

	const filteredOptions = options.filter((currency) =>
		allowedCurrencies.includes(currency),
	);

	return (
		<>
			<RootContainer bgcolor="white">
				<Grid boxShadow={2} p={2} alignItems="center" container>
					<Grid item xs={12} sm={6} md={6}>
						<Grid spacing={3} container padding="10px 20px" direction="column">
							<Grid item>
								{/* <InputLabel htmlFor={field[0].name}> */}
								<Typography
									variant="h7"
									fontSize="16px"
									component="p"
									paddingBottom={2}
									color="black"
								>
									What is the annual tuition fee for the program? In RMB / CNY*
								</Typography>
								{/* </InputLabel> */}
								<TextFieldWrapper
									type="number"
									onChange={(e) => {
										setAnnualTutionFee(e.target.value);
										// convert(to, +e.target.value)
									}}
								/>
							</Grid>

							<Grid item>
								<Typography
									variant="h7"
									fontSize="16px"
									component="p"
									paddingBottom={2}
									color="black"
								>
									{CostCalculatorInputFields[1].inputLabel}
								</Typography>
								<TextFieldWrapper select fullWidth>
									{costScale?.length ? (
										scalesOptions.map((item: any) => (
											<MenuItem
												key={item}
												value={item}
												onClick={() => setSelectedCity(item)}
											>
												{item}
											</MenuItem>
										))
									) : (
										<MenuItem>Loading...</MenuItem>
									)}
								</TextFieldWrapper>
							</Grid>

							<Grid item>
								<Typography
									variant="h7"
									fontSize="16px"
									component="p"
									paddingBottom={2}
									color="black"
								>
									What is your accommodation preference?
								</Typography>
								<TextFieldWrapper select fullWidth>
									{costScale?.length ? (
										stayOptions.map((item: any) => (
											<MenuItem
												key={item}
												value={item}
												onClick={() => setSelectedStay(item)}
											>
												{item}
											</MenuItem>
										))
									) : (
										<MenuItem>Loading...</MenuItem>
									)}
								</TextFieldWrapper>
							</Grid>
						</Grid>
					</Grid>

					<Grid item xs={12} sm={6} md={6}>
						<Grid spacing={3} padding="10px 20px" container direction="column">
							<Grid item xs={12} sm={6} md={6}>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Typography variant="body1" fontSize="14px">
										Convert To
									</Typography>
									<InputBox
										currencyOptions={filteredOptions}
										onCurrencyChange={(currency) => {
											setTo(currency);
										}}
										selectCurrency={to}
									/>
								</Stack>
							</Grid>

							<Grid item xs={12} sm={6} md={6}>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Typography variant="body1" fontSize="14px">
										Annual Tuition Fee
									</Typography>
									<Typography variant="h7">
										{annualTutionFee
											? `${getConvertedCosts(+annualTutionFee)}`
											: null}
									</Typography>
								</Stack>
							</Grid>

							<Grid item xs={12} sm={6} md={6}>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Typography variant="body1" fontSize="14px">
										Total living costs per year (apx)
									</Typography>
									<Typography variant="h7">
										{selectedCostDetails?.cost_per_year
											? `${getConvertedCosts(selectedCostDetails.cost_per_year)}`
											: null}
									</Typography>
								</Stack>
							</Grid>

							<Grid item xs={12} sm={6} md={6}>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Typography variant="body1" fontSize="14px">
										Total monthly expenses (apx)
									</Typography>
									<Typography variant="h7">
										{selectedCostDetails?.monthly_expenses
											? `${getConvertedCosts(selectedCostDetails.monthly_expenses)}`
											: null}
									</Typography>
								</Stack>
							</Grid>

							<Grid item xs={12} sm={6} md={6}>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Typography variant="body1" fontSize="14px">
										Accommodation fee per month (apx)
									</Typography>
									<Typography variant="h7">
										{selectedCostDetails?.accommodation_fee_per_month
											? `${getConvertedCosts(selectedCostDetails.accommodation_fee_per_month)}`
											: null}
									</Typography>
								</Stack>
							</Grid>

							<Grid item xs={12} sm={6} md={6}>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Typography variant="body1" fontSize="14px">
										Other costs (apx)
									</Typography>
									<Typography variant="h7">
										{selectedCostDetails?.other_costs
											? ` ${getConvertedCosts(selectedCostDetails.other_costs)}`
											: null}
									</Typography>
								</Stack>
							</Grid>

							<Grid item xs={12} sm={6} md={6}>
								<Stack
									direction="row"
									alignItems="center"
									justifyContent="space-between"
								>
									<Typography variant="body1" fontSize="14px">
										Estimated costs :
									</Typography>
									<Typography component="strong" color="primary" variant="h7">
										{/* {`${to.toUpperCase()} ${convertedAmount?.toFixed(2) || calculateScore() || 0}`} */}
										{`${calculateScore() || 0}`}
										{/* 1000 */}
									</Typography>
								</Stack>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</RootContainer>
			<RootContainer mt={3} ml={2}>
				<Box sx={{ display: "flex", justifyContent: "flex-start" }}>
					<Typography>
						Note: If you need a thorough breakdown of the estimated cost, you
						need to save the pdf file here.
					</Typography>
					<Image src={costArrow} alt="img-Homepage" objectFit="cover" />
					<Button
						sx={{
							backgroundColor: "primary.main",
							border: "none",
							color: "white",
						}}
						onClick={() => setShowModal(true)}
					>
						Download me {"->"}
					</Button>
					{showModal && (
						<DownloadFile showModal={showModal} setShowModal={setShowModal} />
					)}
				</Box>
			</RootContainer>
		</>
	);
}
export default CalculateYourExpenses;
