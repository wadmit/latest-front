"use client";
import type { IScreenProps } from "@/types/wisescore";
import { useFormikContext } from "formik";
import React, { useContext } from "react";
import { INITIAL_WISE_STATE } from "../../utils/formik";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import ApiService from "@/services/api.service";
import { setOverAllGradeType } from "@/global-states/reducers/wisescore";
import { useAppDispatch } from "@/global-states/hooks/hooks";
import { useQuery } from "@tanstack/react-query";
import { CacheConfigKey } from "@/constants";
import { Box, Stack } from "@mui/material";
import Loader from "@/components/common/circular-loader/Loader";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";
import SelectButtons from "../../components/SelectButtons";
import GoBackButton from "../GoBackButton";
import SliderValue from "../../components/SliderValue";

type Props = {};

function OverAllGradeSelect({ handleNext, value, handleGoBack }: IScreenProps) {
	const { values, setFieldValue, touched, setTouched } =
		useFormikContext<typeof INITIAL_WISE_STATE>();
	const { primaryColor, secondaryColor } = useContext(WiseScoreDetailsContext);
	const dispatch = useAppDispatch();
	const { data: overAllGrade, isLoading } = useQuery({
		queryKey: [CacheConfigKey.OVERALL_GRADE_QUERY_KEY, values.grade_id],
		queryFn: () =>
			ApiService.get({
				url: `/web/grade_scales/${values.grade_id}`,
				tokenNeeded: true,
			}).then((res) => {
				setFieldValue("max", Number(res.data.data.max));
				setFieldValue("min", Number(res.data.data.min));
				dispatch(setOverAllGradeType(res.data.data));
				return res.data.data;
			}),
		enabled: values.grade_id !== "",
	});
	if (isLoading) {
		return (
			<Stack mt={30} alignItems="center">
				<Loader />
			</Stack>
		);
	}

	const handleOnClick = (fieldValue: string) => {
		setFieldValue(value, fieldValue);
		analytics.trackEvent(EAnalyticsEvents.WISESCORE_OVERALL_GRADE_SELECTION, {
			grade: fieldValue,
		});
		handleNext();
	};

	return (
		<Box
			gap={{ lg: "25px", md: "25px", sm: "32px", xs: "32px" }}
			alignItems="center"
			justifyContent="center"
			mt={{ lg: "64px", md: "64px", sm: "46px", xs: "32px" }}
			display="flex"
			flexWrap="wrap"
			padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
			flexDirection={{ xs: "column", sm: "column", lg: "column", md: "column" }}
		>
			{overAllGrade && overAllGrade.type === "select" ? (
				<>
					<Box
						gap={{ lg: "25px", md: "25px", sm: "32px", xs: "32px" }}
						alignItems="center"
						justifyContent="center"
						display="flex"
						flexWrap="wrap"
						padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
						flexDirection={{ xs: "column", sm: "column", lg: "row", md: "row" }}
					>
						{Object.keys(overAllGrade.grade).map((item: any) => (
							<SelectButtons
								onClick={() => handleOnClick(item)}
								minWidth="176px"
								text={item}
								isActive={values.grade === item}
								justifyContent="center"
								paddingTop="32px"
							/>
						))}
					</Box>
					<GoBackButton handleGoBack={handleGoBack} />
				</>
			) : (
				<>
					<SliderValue
						// key={values.grade}
						onValueChange={(fieldValue) => {
							setFieldValue(
								"grade",
								fieldValue === ""
									? ""
									: Math.round(parseFloat(fieldValue) * 100) / 100,
							);
							setTouched({ grade: true });
						}}
						max={values.max}
						min={values.min}
						value={values.grade}
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
						gap={4}
						padding="0 16px"
						mt={{ lg: "32px", md: "32px", sm: "32px", xs: "32px" }}
					>
						<GoBackButton handleGoBack={handleGoBack} />
						<Box
							disabled={
								Number(values.grade) < values.min ||
								Number(values.grade) > values.max ||
								!touched[value as keyof typeof INITIAL_WISE_STATE] ||
								values.grade === ""
							}
							// onClick={onClick}
							onClick={() => handleNext()}
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
				</>
			)}
		</Box>
	);
}

export default OverAllGradeSelect;
