"use client";
import { useAppSelector } from "@/global-states/hooks/hooks";
import type { IScreenProps } from "@/types/wisescore";
import React, { useContext } from "react";
import { INITIAL_WISE_STATE } from "../../utils/formik";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import { useFormikContext } from "formik";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";
import { Box } from "@mui/material";
import SelectButtons from "../../components/SelectButtons";
import GoBackButton from "../GoBackButton";
import SliderValue from "../../components/SliderValue";

type Props = {};

function SubjectWiseGrade({ handleNext, value, handleGoBack }: IScreenProps) {
	const overAllGrade = useAppSelector((state) => state.wisescore.overallGrade);
	const { values, setFieldValue, touched, setTouched } =
		useFormikContext<typeof INITIAL_WISE_STATE>();
	const { primaryColor, secondaryColor } = useContext(WiseScoreDetailsContext);
	const handleOnClick = (fieldValue: string) => {
		setFieldValue(value, fieldValue);
		analytics.trackEvent(
			EAnalyticsEvents.WISESCORE_SUBJECTWISE_GRADE_SELECTION,
			{
				subject: value,
				grade: fieldValue,
			},
		);
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
								isActive={
									values[value as keyof typeof INITIAL_WISE_STATE] === item
								}
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
						onValueChange={(fieldValue) => {
							setTouched({ ...touched, [value]: true });

							setFieldValue(
								value,
								fieldValue === ""
									? ""
									: Math.round(parseFloat(fieldValue) * 100) / 100,
							);
						}}
						max={values.max}
						min={values.min}
						value={values[value as keyof typeof INITIAL_WISE_STATE] as string}
					/>
					<Box
						display={{ lg: "flex", md: "flex", sm: "flex", xs: "none" }}
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
								values[value as keyof typeof INITIAL_WISE_STATE] === ""
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

					{/* <Box
                        bgcolor="white"
                        zIndex={99999999999}
                        borderTop="1px solid rgba(209, 209, 209, 1) "
                        width="100%"
                        display={{ xs: 'flex', md: 'none', lg: 'none', sm: 'none' }}
                        justifyContent="center"
                        alignItems="center"
                        height="72px"
                        position="fixed" bottom={0}>
                        <Box
                            display="flex"
                            fontSize="14px"
                            fontWeight={500}
                            lineHeight="14px"
                            justifyContent="center"
                            alignItems="center"
                            gap="8px"
                            onClick={handleGoBack}
                            sx={{
                                cursor: 'pointer'
                            }}
                            flex={1}><ArrowBack /> Go Back</Box>
                        <Divider
                            sx={{
                                height: '24px'
                            }}
                            orientation='vertical' />
                        <Box
                            color="rgba(255, 107, 38, 1)"
                            fontSize="14px"
                            fontWeight={500}
                            lineHeight="14px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            gap="8px"
                            onClick={handleNext}
                            sx={{
                                cursor: 'pointer'
                            }}
                            flex={1}> Next
                            <ArrowForward />
                        </Box>

                    </Box> */}
				</>
			)}
		</Box>
	);
}

export default SubjectWiseGrade;
