"use client";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import type { IPartnerFormState } from "@/page-components/joinus/types";
import { getCountries } from "@/api/web/country.action";
import {
	Autocomplete,
	Box,
	Grid,
	IconButton,
	MenuItem,
	Typography,
} from "@mui/material";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";
import { AddMoreIcons, DeleteIcons } from "$/svg";

const CountryVolumeFields = () => {
	const { setFieldValue, touched, errors, values } =
		useFormikContext<IPartnerFormState>();
	const [country, setCountry] = useState<any>([{}]);

	useEffect(() => {
		try {
			const fetcher = async () => {
				const response: any = await getCountries();
				setCountry(response?.data?.data);
			};
			fetcher();
		} catch (err) {
			console.log("country-api-error");
		}
	}, []);

	const [countryvolumeList, setCountryVolumeList] = useState<any[]>([
		{
			country: "",
			volume: "",
		},
	]);

	const selectedCountries = countryvolumeList.map((item) => item.country);

	const addList = (e: any) => {
		setFieldValue("countryvolume", [
			...values.countryvolume,
			{
				country: "",
				volume: "",
			},
		]);

		setCountryVolumeList([
			...countryvolumeList,
			{
				country: "",
				volume: "",
			},
		]);
	};
	const handleRemoveList = (index: number) => {
		const list = [...countryvolumeList];
		list.splice(index, 1);
		setCountryVolumeList(list);
		setFieldValue("countryvolume", list);
	};
	const handleChange = (e: any, index: number) => {
		const { name, value } = e.target;
		const list = [...countryvolumeList];
		list[index][name] = value;
		setCountryVolumeList(list);
		setFieldValue("countryvolume", list);
	};
	const countryHandleChange = (index: number, newValue: any) => {
		const list = [...countryvolumeList];
		list[index].country = newValue?.id;
		setCountryVolumeList(list);
		setFieldValue("countryvolume", list);
	};

	return (
		<>
			{countryvolumeList.map((singleitem, index) => (
				<Grid
					key={index}
					container
					columnSpacing={7}
					rowSpacing={4}
					mt={0}
					position="relative"
				>
					<Grid item md={6} xs={12}>
						<Typography
							fontFamily="HankenGroteskRegular"
							fontWeight={400}
							fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
							lineHeight={{
								lg: "22.4px",
								md: "22.4px",
								sm: "19.6px",
								xs: "19.6px",
							}}
							color="rgba(32, 28, 26, 0.9)"
							mb="10px"
							display="block"
						>
							Which countries will you recruit students from?
						</Typography>
						<Autocomplete
							onChange={(e: any, newValue: any) => {
								countryHandleChange(index, newValue);
							}}
							disablePortal
							options={country.filter(
								(option: any) => !selectedCountries.includes(option.id),
							)}
							getOptionLabel={(option: any) => option.name}
							sx={{
								width: "100%",
								p: 0,
								maxHeight: "46px",
								"& .MuiOutlinedInput-root .MuiAutocomplete-input ": {
									py: "5px",
								},
							}}
							renderInput={(params) => (
								<TextFieldWrapper
									error={Boolean(
										(touched as any)?.countryvolume &&
											(errors as any)?.countryvolume &&
											(errors as any)?.countryvolume[index]?.country,
									)}
									helperText={
										(touched as any)?.countryvolume &&
										(errors as any)?.countryvolume &&
										(errors as any)?.countryvolume[index]?.country
									}
									{...params}
									name="country"
									label="Select a country"
									sx={{ p: 0, m: 0 }}
								/>
							)}
						/>
					</Grid>
					<Grid item md={6} xs={12}>
						<Typography
							fontFamily="HankenGroteskRegular"
							fontWeight={400}
							fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
							lineHeight={{
								lg: "22.4px",
								md: "22.4px",
								sm: "19.6px",
								xs: "19.6px",
							}}
							color="rgba(32, 28, 26, 0.9)"
							mb="10px"
							display="block"
						>
							How many will you recruit?
						</Typography>
						<TextFieldWrapper
							name="volume"
							label="Select your volume"
							placeholder="Select recruitment volume"
							select
							error={Boolean(
								(touched as any)?.countryvolume &&
									(errors as any)?.countryvolume &&
									(errors as any)?.countryvolume[index]?.volume,
							)}
							helperText={
								(touched as any)?.countryvolume &&
								(errors as any)?.countryvolume &&
								(errors as any)?.countryvolume[index]?.volume
							}
							value={countryvolumeList[index].volume}
							onChange={(e: any) => handleChange(e, index)}
							fullWidth
						>
							<MenuItem value="1-5">1-5</MenuItem>
							<MenuItem value="6-20">6-20</MenuItem>
							<MenuItem value="21-50">21-50</MenuItem>
							<MenuItem value="50-100">50-100</MenuItem>
							<MenuItem value="100+">100+</MenuItem>
						</TextFieldWrapper>
					</Grid>
					{countryvolumeList.length > 1 && (
						<IconButton
							onClick={() => handleRemoveList(index)}
							color="error"
							sx={{ position: "absolute", top: 46, right: -10 }}
						>
							<DeleteIcons />
						</IconButton>
					)}
					{countryvolumeList.length - 1 === index &&
						countryvolumeList.length < 4 && (
							<Grid item xs={12}>
								<Box
									maxWidth="200px"
									onClick={(e) => addList(e)}
									sx={{ cursor: "pointer" }}
									mt="-16px"
									ml="-10px"
								>
									<Box
										display="flex"
										justifyContent="center"
										alignItems="center"
									>
										<AddMoreIcons />
										<Typography
											fontFamily="HankenGroteskRegular"
											fontWeight={400}
											fontSize="16px"
											lineHeight="22.4px"
											color="rgba(32, 28, 26, 0.55)"
											style={{ textDecoration: "underline" }}
										>
											Add another country
										</Typography>
									</Box>
								</Box>
							</Grid>
						)}
				</Grid>
			))}
		</>
	);
};

export default CountryVolumeFields;
