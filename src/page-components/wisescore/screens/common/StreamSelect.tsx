"use client";
import type { IScreenProps } from "@/types/wisescore";
import { useFormikContext } from "formik";
import React, { useContext } from "react";
import { INITIAL_WISE_STATE } from "../../utils/formik";
import { useAppDispatch } from "@/global-states/hooks/hooks";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import { Box, Stack } from "@mui/material";
import SelectButtons from "../../components/SelectButtons";
import GoBackButton from "../GoBackButton";
import {
	GetEngineeringIcon,
	GetManagementIcon,
	GetMedicineIcon,
} from "../../svgs";
import Loader from "@/components/common/circular-loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { CacheConfigKey } from "@/constants";
import { getDisciplinesDocuments } from "@/api/web/wisescore.action";
import {
	EAnalyticsEvents,
	EAnalyticsFieldName,
} from "@/types/mix-panel-analytic";
import { setDisciplineName } from "@/global-states/reducers/wisescore";
import { analytics } from "@/services/analytics.service";

function StreamSelect({ handleNext, value, handleGoBack }: IScreenProps) {
	const { setFieldValue, values } =
		useFormikContext<typeof INITIAL_WISE_STATE>();
	const dispatch = useAppDispatch();
	const { variant } = useContext(WiseScoreDetailsContext);
	const { data: disciplines, isLoading } = useQuery({
		queryKey: [CacheConfigKey.DISCIPLINES_QUERY_KEY, values.program_type],
		queryFn: async() => await getDisciplinesDocuments(values.program_type, variant),
		enabled: values.program_type !== "",
	});

	if (isLoading) {
		return (
			<Stack mt={30} alignItems="center">
				<Loader />
			</Stack>
		);
	}

	const getIconFromName = (name: string) => {
		if (name === "Business & Management") {
			return GetManagementIcon;
		}
		if (name === "Engineering & IT") {
			return GetEngineeringIcon;
		}
		if (name === "Medicine & Pharmacy") {
			return GetMedicineIcon;
		}
	};

	const handleOnClick = (discipline: any) => {
		if (values.discipline !== discipline.id) {
			setFieldValue("discipline", discipline.id);
			setFieldValue("sub_disciplines", []);
			setFieldValue(EAnalyticsFieldName.DISCIPLINE, discipline.name);
			dispatch(setDisciplineName(discipline.name));
			analytics.trackEvent(EAnalyticsEvents.WISESCORE_STREAM_SELECTION, {
				discipline: discipline.name,
			});
		}

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
				{disciplines &&
					disciplines.length > 0 &&
					disciplines.map((discipline: any) => (
						<SelectButtons
							key={discipline.id}
							text={discipline.name}
							Icon={getIconFromName(discipline.name)}
							isActive={values.discipline === discipline.id}
							onClick={() => handleOnClick(discipline)}
							// onClick={() => setFieldValue('discipline', discipline.name)}
						/>
					))}
			</Box>
			<GoBackButton handleGoBack={handleGoBack} />
		</Stack>
	);
}

export default StreamSelect;
