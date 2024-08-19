"use client";
import { useFormikContext } from "formik";
import React, { useContext, useState } from "react";
import { INITIAL_WISE_STATE } from "../../utils/formik";
import type { IScreenProps } from "@/types/wisescore";
import {
	EAnalyticsEvents,
	EAnalyticsFieldName,
} from "@/types/mix-panel-analytic";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import { Autocomplete, Box, CircularProgress, TextField } from "@mui/material";
import { theme } from "@/common/muicustomtheme/theme";
import GoBackButton from "../GoBackButton";
import { analytics } from "@/services/analytics.service";
import { getCountry } from "@/api/web/wisescore.action";

type Props = {};

function NationalitySelect({ handleNext, value, handleGoBack }: IScreenProps) {
	const { setFieldValue, values, errors, touched } =
		useFormikContext<typeof INITIAL_WISE_STATE>();
	const [data, setData] = useState([{}]);
	const [initialValue, setInitialValue] = useState<any>({
		name: values[EAnalyticsFieldName.NATIONALITY] ?? "",
	});
	const { primaryColor, secondaryColor } = useContext(WiseScoreDetailsContext);

	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);

	const handleAPI = async () => {
		const temp = await getCountry();
		setData(temp);
		setLoading(false);
	};

	const handleChange = async (event: any, newValue: any, reason: string) => {
		if (reason === "selectOption") {
			setFieldValue(EAnalyticsFieldName.NATIONALITY, newValue.name);
			setFieldValue(value, newValue.id);
			setInitialValue(newValue);
		}
		if (reason === "clear") {
			setFieldValue(value, "");
		}
	};

	// useEffect(() => {
	//     if (values.nationality) {
	//         const findNationalityName = data.find(
	//             (country: any) => country.id === values.nationality
	//         );
	//         if (findNationalityName) {
	//             setInitialValue(findNationalityName);
	//         } else {
	//             setInitialValue({ name: '' });
	//         }
	//     }
	// }, [data]);

	// useEffect(() => {
	//     handleAPI();
	// }, []);

	return (
		<Box
			gap={{ lg: "25px", md: "25px", sm: "32px", xs: "32px" }}
			alignItems="center"
			justifyContent="center"
			mt={{ lg: "64px", md: "64px", sm: "46px", xs: "32px" }}
			display="flex"
			flexWrap="wrap"
			sx={{
				"& .MuiAutocomplete-popper": {
					zIndex: 11111100,
					// backgroundColor: 'red',
					transform: "0 !important",
					// display: 'none !important',
				},
			}}
			padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
			flexDirection={{ xs: "column", sm: "column", lg: "row", md: "row" }}
		>
			<Autocomplete
				id="country"
				autoComplete={false}
				open={open}
				onOpen={() => {
					setOpen(true);
					setLoading(true);
					handleAPI();
				}}
				onClose={() => {
					setOpen(false);
				}}
				autoHighlight
				value={initialValue}
				onChange={handleChange}
				loading={loading}
				disablePortal
				options={data}
				getOptionLabel={(option: any) => option.name}
				sx={{
					width: "50%",

					fontSize: "20px",
					[`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
						width: "70%", // Adjust the width for small screens
					},
					[`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
						width: "100%", // Adjust the width for small screens
					},
					[`@media (max-width: ${theme.breakpoints.values.xs}px)`]: {
						width: "100%", // Adjust the width for small screens
					},
					"&:hover": {
						borderColor: `${primaryColor} !important`,
						borderWidth: "2px !important",
					},
					"&.Mui-focused": {
						borderColor: `${primaryColor} !important`,
						borderWidth: "2px !important",
					},
					"&.Mui-focused fieldset": {
						borderColor: `${primaryColor} !important`,
						borderWidth: "2px !important",
					},

					"& .MuiOutlinedInput-root .MuiAutocomplete-input ": {
						py: ".3125rem",
						borderRadius: "8px",
						[`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
							borderRadius: "8px",
						},
						[`@media (max-width: ${theme.breakpoints.values.xs}px)`]: {
							borderRadius: "8px",
						},
						// change active and focused color
					},
				}}
				renderInput={(params) => (
					<TextField
						sx={{
							p: 0,
							m: 0,
							fontSize: "20px",
							"& .MuiOutlinedInput-notchedOutline": {
								borderRadius: "8px !important",
								"&:focus,&:active": {
									borderColor: `${primaryColor} !important`,
									borderWidth: "2px !important",
								},
								[`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
									borderRadius: "8px !important",
								},
								[`@media (max-width: ${theme.breakpoints.values.xs}px)`]: {
									borderRadius: "8px !important",
								},
							},
							"& input": {
								height: "53px",
								[`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
									height: "56px",
								},
								[`@media (max-width: ${theme.breakpoints.values.xs}px)`]: {
									height: "36px",
								},
							},
						}}
						{...params}
						placeholder="Choose one"
						InputProps={{
							...params.InputProps,
							style: {
								fontSize: "20px",
								color: "#8C8C8C",
								fontWeight: 400,
								borderRadius: "8px",
							},
							autoComplete: "off",
							endAdornment: (
								<>
									{loading ? (
										<CircularProgress color="primary" size={20} />
									) : null}
									{params.InputProps.endAdornment}
								</>
							),
						}}
					/>
				)}
			/>

			<Box
				display={{
					lg: "flex",
					md: "flex",
					sm: "flex",
					xs: "none",
				}}
				justifyContent="center"
				width="100%"
				padding="0 16px"
				gap={4}
				mt={{ lg: "64px", md: "64px", sm: "46px", xs: "32px" }}
			>
				<GoBackButton handleGoBack={handleGoBack} />
				<Box
					disabled={values.nationality === ""}
					// onClick={onClick}
					onClick={() => {
						analytics.trackEvent(EAnalyticsEvents.WISESCORE_COUNTRY_SELECTION, {
							country: values[EAnalyticsFieldName.NATIONALITY],
						});
						handleNext();
					}}
					borderRadius="8px"
					bgcolor={primaryColor}
					padding="16px 42px"
					border="none"
					sx={{
						cursor: "pointer",
						"&:disabled": {
							bgcolor: secondaryColor,
							color: "#fff",
						},
					}}
					color="#fff"
					fontFamily="HankenGroteskSemiBold"
					minWidth="161px"
					width={{
						lg: "fit-content",
						md: "fit-content",
						sm: "100%",
						xs: "100%",
					}}
					mt={{ lg: "60px", md: "60px", sm: "30px", xs: "30px" }}
					component="button"
				>
					Next
				</Box>
			</Box>
		</Box>
	);
}

export default NationalitySelect;
