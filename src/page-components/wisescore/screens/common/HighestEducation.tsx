"use client";
import { useFormikContext } from "formik";
import React from "react";
import { INITIAL_WISE_STATE } from "../../utils/formik";
import type { IScreenProps } from "@/types/wisescore";
import { useQuery } from "@tanstack/react-query";
import GoBackButton from "../GoBackButton";
import SelectButtons from "../../components/SelectButtons";
import { Box, Stack } from "@mui/material";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";
import Loader from "@/components/common/circular-loader/Loader";
import { ApiConfig, CacheConfigKey } from "@/constants";
import ApiService from "@/services/api.service";

type Props = {};

function HighestEducation({ value, handleNext, handleGoBack }: IScreenProps) {
	const { values, setFieldValue } =
		useFormikContext<typeof INITIAL_WISE_STATE>();
	const { data: educationLevels, isLoading } = useQuery({
		queryKey: [CacheConfigKey.EDUCATION_LEVELS_QUERY_KEY, values.nationality],
		queryFn: () =>
			ApiService.get({
				url: `${ApiConfig.education_levels}/country/${values.nationality}`,
				tokenNeeded: false,
			}).then((res) => res.data.data),
		enabled: values.nationality !== "",
	});

	if (isLoading) {
		return (
			<Stack mt={30} alignItems="center">
				<Loader />
			</Stack>
		);
	}

	const handleOnClick = (fieldValue: string) => {
		setFieldValue("highest_level_of_education", fieldValue);
		analytics.trackEvent(
			EAnalyticsEvents.WISESCORE_HIGHEST_EDUCATION_SELECTION,
			{
				highest_level_of_education: fieldValue,
			},
		);
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
				{educationLevels &&
					educationLevels.length > 0 &&
					educationLevels.map((item: any) => (
						<SelectButtons
							onClick={() => handleOnClick(item.id)}
							minWidth="176px"
							text={item.name}
							isActive={values.highest_level_of_education === item.id}
							justifyContent="center"
							paddingTop="32px"
						/>
					))}
			</Box>
			<GoBackButton handleGoBack={handleGoBack} />
		</Stack>
	);
}

export default HighestEducation;
