"use client";
import type { IScreenProps } from "@/types/wisescore";
import { useFormikContext } from "formik";
import React, { useContext } from "react";
import { INITIAL_WISE_STATE } from "../../utils/formik";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";
import { Box, Stack, Typography } from "@mui/material";
import SelectButtons from "../../components/SelectButtons";
import { motion } from "framer-motion";
import GoBackButton from "../GoBackButton";

function EducationStatus({ value, handleNext, handleGoBack }: IScreenProps) {
	const { setFieldValue, values, resetForm } =
		useFormikContext<typeof INITIAL_WISE_STATE>();
	const educationStatus = [
		{ key: "Completed Current Level", thisValue: "true" },
		{ key: "I am still studying", thisValue: "false" },
	];
	const gapData = [
		{ key: "0" },
		{ key: "1-2" },
		{ key: "3-4" },
		{ key: "5+ year" },
	];

	const handleOnClick = (fieldValue: string) => {
		setFieldValue("education_status", fieldValue);
		if (fieldValue === "false") {
			setFieldValue("gapYear", "0");
			analytics.trackEvent(EAnalyticsEvents.WISESCORE_EDUCATION_STATUS, {
				educationStatus: fieldValue,
				gapYear: "0",
			});
			handleNext();
		}
	};
	const handleGapOnClick = (fieldValue: string) => {
		setFieldValue("gapYear", fieldValue);
		analytics.trackEvent(EAnalyticsEvents.WISESCORE_EDUCATION_STATUS, {
			educationStatus: values.education_status,
			gapYear: fieldValue,
		});
		handleNext();
	};

	return (
		<>
			<Box
				padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
				display="flex"
				flexDirection="column"
				justifyContent={{
					lg: "center",
					md: "center",
					sm: "flex-start",
					xs: "flex-start",
				}}
				alignItems={{
					lg: "center",
					md: "center",
					sm: "flex-start",
					xs: "flex-start",
				}}
			>
				<Typography
					mt={{ lg: "24px", md: "24px", sm: "24px", xs: "24px" }}
					lineHeight="26px"
					letterSpacing="-2%"
					fontFamily="HankenGroteskExtraBold"
					fontSize={{
						lg: "20px",
						xs: "18px",
					}}
					component="h1"
				>
					What is your education status?{" "}
				</Typography>
				<Stack width="100%" justifyContent="center" alignItems="center">
					<Box
						width="100%"
						gap={{ lg: "25px", md: "25px", sm: "32px", xs: "32px" }}
						alignItems="center"
						justifyContent="center"
						mt={{ lg: "24px", md: "24px", sm: "46px", xs: "32px" }}
						display="flex"
						padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 0px 0px 0px" }}
						flexDirection={{ xs: "column", sm: "column", lg: "row", md: "row" }}
					>
						{educationStatus.map(({ key, thisValue }) => (
							<SelectButtons
								isActive={values.education_status === thisValue}
								onClick={() => handleOnClick(thisValue)}
								text={key}
							/>
						))}
					</Box>
				</Stack>
			</Box>
			{values.education_status && values.education_status !== "false" && (
				<motion.div
					key="intake"
					initial={{ opacity: 0, scale: 0.5, x: "100%" }}
					animate={{ opacity: 1, scale: 1, x: 0 }}
					transition={{ ease: "easeOut", duration: 0.5 }}
				>
					<Box
						padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
						display="flex"
						flexDirection="column"
						justifyContent={{
							lg: "center",
							md: "center",
							sm: "flex-start",
							xs: "flex-start",
						}}
						alignItems={{
							lg: "center",
							md: "center",
							sm: "flex-start",
							xs: "flex-start",
						}}
					>
						<Typography
							mt={{ lg: "48px", md: "48px", sm: "24px", xs: "24px" }}
							lineHeight="26px"
							letterSpacing="-2%"
							fontFamily="HankenGroteskExtraBold"
							fontSize={{
								lg: "20px",
								xs: "18px",
							}}
							component="h1"
						>
							How many years of gap in education do you have?
						</Typography>
						<Stack width="100%" justifyContent="center" alignItems="center">
							<Box
								width="100%"
								gap={{ lg: "25px", md: "25px", sm: "32px", xs: "32px" }}
								alignItems="center"
								justifyContent="center"
								mt={{ lg: "24px", md: "24px", sm: "46px", xs: "32px" }}
								display="flex"
								padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 0px 0px 0px" }}
								flexDirection={{
									xs: "column",
									sm: "column",
									lg: "row",
									md: "row",
								}}
							>
								{gapData.map(({ key }) => (
									<SelectButtons
										isActive={values.gapYear === key}
										onClick={() => handleGapOnClick(key)}
										variant="small"
										text={key}
									/>
								))}
							</Box>
						</Stack>
					</Box>
				</motion.div>
			)}{" "}
			<Box
				padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
				display="flex"
				flexDirection="row"
				gap={2}
				justifyContent={{
					lg: "center",
					md: "center",
					sm: "flex-start",
					xs: "flex-start",
				}}
				alignItems={{
					lg: "center",
					md: "center",
					sm: "flex-start",
					xs: "flex-start",
				}}
			>
				<GoBackButton handleGoBack={handleGoBack} />
			</Box>
		</>
	);
}

export default EducationStatus;
