"use client";
import { useAppSelector } from "@/global-states/hooks/hooks";
import type { IScreenProps } from "@/types/wisescore";
import { useFormikContext } from "formik";
import React from "react";
import { INITIAL_WISE_STATE } from "../../utils/formik";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";
import { Box, Stack } from "@mui/material";
import SelectButtons from "../../components/SelectButtons";
import GoBackButton from "../GoBackButton";

const bachelorsAgeGroupOptions = [
	// { key: '13-16', value: '13-16' },
	{ key: "17-20", value: "17-20" },
	{ key: "21-24", value: "21-24" },
	{ key: "25-28", value: "25-28" },
	{ key: "29-32", value: "29-32" },
	// { key: '32-39', value: '32-39' },
	// { key: '40-48', value: '40-48' },
];
const mastersAgeGroupOptions = [
	{ key: "21-24", value: "21-24" },
	{ key: "25-28", value: "25-28" },
	{ key: "29-32", value: "29-32" },
	{ key: "32-35", value: "32-35" },
];

function AgeGroupSelect({ handleNext, value, handleGoBack }: IScreenProps) {
	const programType = useAppSelector((state) => state.wisescore.programType);
	const { setFieldValue, values } =
		useFormikContext<typeof INITIAL_WISE_STATE>();
	const handleOnClick = (fieldValue: string) => {
		setFieldValue("age", fieldValue);
		analytics.trackEvent(EAnalyticsEvents.WISESCORE_AGE_SELECTION, {
			age: fieldValue,
		});
		handleNext();
	};
	return (
		<Stack justifyContent="center" alignItems="center">
			<Box
				gap={{ lg: "25px", md: "25px", sm: "32px", xs: "32px" }}
				alignItems="center"
				justifyContent="center"
				mt={{ lg: "64px", md: "64px", sm: "46px", xs: "32px" }}
				display="flex"
				flexWrap="wrap"
				padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
				flexDirection={{ xs: "column", sm: "column", lg: "row", md: "row" }}
			>
				{programType === "bachelors"
					? bachelorsAgeGroupOptions.map((item) => (
							<SelectButtons
								onClick={() => handleOnClick(item.value)}
								minWidth="176px"
								isActive={values.age === item.value}
								text={item.key}
								justifyContent="center"
								paddingTop="32px"
							/>
						))
					: mastersAgeGroupOptions.map((item) => (
							<SelectButtons
								onClick={() => handleOnClick(item.value)}
								minWidth="176px"
								isActive={values.age === item.value}
								text={item.key}
								justifyContent="center"
								paddingTop="32px"
							/>
						))}
			</Box>
			<GoBackButton handleGoBack={handleGoBack} />
		</Stack>
	);
}

export default AgeGroupSelect;
