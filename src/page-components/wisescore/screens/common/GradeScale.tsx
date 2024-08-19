"use client";
import { useFormikContext } from "formik";
import React from "react";
import { INITIAL_WISE_STATE } from "../../utils/formik";
import type { IScreenProps } from "@/types/wisescore";
import { useQuery } from "@tanstack/react-query";
import { ApiConfig, CacheConfigKey } from "@/constants";
import ApiService from "@/services/api.service";
import { Box, Stack } from "@mui/material";
import Loader from "@/components/common/circular-loader/Loader";
import SelectButtons from "../../components/SelectButtons";
import GoBackButton from "../GoBackButton";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";

type Props = {};

function GradeScale({ handleNext, value, handleGoBack }: IScreenProps) {
	const { values, setFieldValue } =
		useFormikContext<typeof INITIAL_WISE_STATE>();
	const { data: dataGradeScale, isLoading } = useQuery({
		queryKey: [
			CacheConfigKey.GRADE_SCALES_QUERY_KEY,
			values.highest_level_of_education,
		],
		queryFn: () =>
			ApiService.get({
				url: `${ApiConfig.grade_scales}/education_level/${values.highest_level_of_education}`,
				tokenNeeded: false,
			}).then((res) => res.data.data),
		enabled: values.highest_level_of_education !== "",
	});
	if (isLoading) {
		return (
			<Stack mt={30} alignItems="center">
				<Loader />
			</Stack>
		);
	}

	const handleOnClick = (fieldValue: string, name: string) => {
		if (values.grade_id !== fieldValue) {
			setFieldValue(value, fieldValue);
			setFieldValue("grade", "");
			setFieldValue("physics", "");
			setFieldValue("maths", "");
			setFieldValue("english", "");
		}
		analytics.trackEvent(EAnalyticsEvents.WISESCORE_GRADING_SCHEME_SELECTION, {
			grade_id: fieldValue,
			grade_name: name,
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
				{dataGradeScale &&
					dataGradeScale.length > 0 &&
					dataGradeScale.map((item: any) => (
						<SelectButtons
							onClick={() => handleOnClick(item.id, item.name)}
							minWidth="176px"
							text={item.name}
							isActive={values.grade_id === item.id}
							justifyContent="center"
							paddingTop="32px"
						/>
					))}
			</Box>
			<GoBackButton handleGoBack={handleGoBack} />
		</Stack>
	);
}

export default GradeScale;
