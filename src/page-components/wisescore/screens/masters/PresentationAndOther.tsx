"use client";
import React from "react";
import {
	awards,
	chinaStudy,
	chineseLangauge,
	educationStatus,
	journalPublicationOptions,
	passport,
	presentationsOptions,
	workExperienceOptions,
} from "@/page-components/wisescore/utils/data";
import type { IScreenProps } from "@/types/wisescore";
import { useFormikContext } from "formik";
import { INITIAL_WISE_STATE } from "@/page-components/wisescore/utils/formik";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";
import { Box, Stack } from "@mui/material";
import SelectButtons from "@/page-components/wisescore/components/SelectButtons";
import GoBackButton from "@/page-components/wisescore/screens/GoBackButton";

function PresentationAndOther({
	handleNext,
	value,
	handleGoBack,
}: IScreenProps) {
	const ObjectWithArray = {
		work_experience: workExperienceOptions,
		conference_presentation: presentationsOptions,
		journal_publication: journalPublicationOptions,
		awards,
		education_status: educationStatus,
		china_study: chinaStudy,
		passport,
		chinese_language_skill: chineseLangauge,
	};
	const isKeyExist = value in ObjectWithArray;
	const { setFieldValue, values, setErrors } =
		useFormikContext<typeof INITIAL_WISE_STATE>();
	const handleOnClick = (fieldValue: string) => {
		setFieldValue(value, fieldValue);
		setErrors({});
		analytics.trackEvent(EAnalyticsEvents.WISESCORE_OTHER_INFORMATION, {
			[value]: fieldValue,
			page: value,
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
				{isKeyExist &&
					ObjectWithArray[value as keyof typeof ObjectWithArray].map(
						(item: any) => (
							<SelectButtons
								onClick={() => handleOnClick(item.value)}
								minWidth="176px"
								isActive={
									values[value as keyof typeof INITIAL_WISE_STATE] ===
									item.value
								}
								text={item.key}
								justifyContent="center"
								paddingTop="32px"
							/>
						),
					)}
			</Box>
			<GoBackButton handleGoBack={handleGoBack} />
		</Stack>
	);
}

export default PresentationAndOther;
