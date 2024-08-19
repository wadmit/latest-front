"use client";
import React, { useEffect, useState } from "react";
import { Box, MenuItem, Tooltip, Typography } from "@mui/material";
import { ButtonWrapper, RootContainer } from "@/components/common";
import CurrentRevCard from "@/page-components/revenue-calculator/components/CurrentRevCard";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";

function CalculateYourRevSection() {
	const [selectedValue, setSelectedValue] = useState("1");
	const [stdPlaced, setStudentPlaced] = useState<number | string>("");
	const [newRev, setNewRev] = useState<number>(0);
	const [percent, setPercent] = useState<number>(0);
	const [btnState, setBtnState] = useState<boolean>(true);
	const [currentRev, setCurrentRev] = useState(0);

	const handleCalculate = () => {
		const newRevFormula = 700 * Number(stdPlaced);
		const currentRevFormula = 500 * Number(stdPlaced);
		setNewRev(newRevFormula);
		setCurrentRev(currentRevFormula);
		setPercent(((newRevFormula - currentRevFormula) / currentRevFormula) * 100);
	};

	useEffect(() => {
		if (stdPlaced === "" && selectedValue === "1") {
			setBtnState(true);
		} else if (stdPlaced !== "" && selectedValue !== "1") {
			setBtnState(false);
		}
	}, [selectedValue, stdPlaced]);

	return (
		<RootContainer
			// bgcolor="secondary.main"
			sx={{ height: "auto", position: "relative", color: "white" }}
			py={{ xl: 7, xs: 3 }}
			id="calculator-your-revenue"
		>
			<Box
				display="flex"
				flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
				justifyContent="space-between"
				alignItems="center"
				width="100%"
				gap="10px"
			>
				<Box
					width={{ lg: "395px", md: "395px", sm: "350px", xs: "300px" }}
					height="320px"
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<Typography
						variant="h4"
						component="h2"
						// textAlign="center"
						color="black"
						zIndex={200}
					>
						Calculate your revenue with WiseAdmit
					</Typography>

					<Typography
						variant="subtitle1"
						component="h3"
						mt={2.5}
						// display={{ sm: 'block', xs: 'none' }}
						color="black"
						zIndex={200}
					>
						Enter the required information below and estimate your earnings with
						WiseAdmit
					</Typography>
					<CurrentRevCard
						newRev={newRev}
						baseValue={currentRev}
						percent={percent}
					/>
				</Box>

				<Box
					width={{ lg: "563px", md: "563px", sm: "300px", xs: "330px" }}
					height="500px"
					border="1px solid rgba(32, 28, 26, 0.4)"
					padding="48px"
					borderRadius="12px"
					display="flex"
					flexDirection="column"
					gap="40px"
				>
					<Box>
						<Typography
							fontFamily="HankenGroteskExtraBold"
							fontSize="24px"
							color="rgba(0, 0, 0, 1)"
							lineHeight="31.2px"
							letterSpacing="-2%"
						>
							Fill your details below
						</Typography>
					</Box>

					<Box display="flex" flexDirection="column" gap="24px">
						<Box display="flex" flexDirection="column" gap="20px">
							<Typography
								fontFamily="HankenGroteskSemiBold"
								fontSize="18px"
								lineHeight="23.4px"
								color="rgba(50, 50, 50, 1)"
							>
								Students placed per year
							</Typography>

							<TextFieldWrapper
								placeholder="Enter students placed per year"
								id="std_per_year"
								value={stdPlaced}
								type="number"
								onChange={(e: any) => setStudentPlaced(Number(e.target.value))}
							/>
						</Box>

						<Box display="flex" flexDirection="column" gap="20px">
							<Typography
								fontFamily="HankenGroteskSemiBold"
								fontSize="18px"
								lineHeight="23.4px"
								color="rgba(50, 50, 50, 1)"
							>
								Designation Region
							</Typography>
							<TextFieldWrapper
								select
								placeholder="Select your designation region"
								id="des_reg"
								name="des_reg"
								value={selectedValue}
								fullWidth
								onChange={(e: any) => setSelectedValue(e.target.value)}
							>
								<MenuItem value="1">Select your designation region</MenuItem>
								<MenuItem value="2"> China </MenuItem>
							</TextFieldWrapper>
						</Box>
					</Box>

					<Tooltip
						title={
							btnState
								? "Please fill the above fields properly"
								: "Click to calculate your revenue"
						}
					>
						<Box maxWidth={{ md: "13.9375rem", xs: "100%" }} pt={1}>
							<ButtonWrapper
								disabled={btnState}
								onClick={handleCalculate}
								variant="contained"
								style={{
									background: "rgba(255, 107, 38, 1)",
									color: "rgba(255, 255, 255, 1)",
								}}
							>
								Calculate now!
							</ButtonWrapper>
						</Box>
					</Tooltip>
				</Box>
			</Box>
		</RootContainer>
	);
}

export default CalculateYourRevSection;
