"use client";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import type { IScreenProps } from "@/types/wisescore";
import { useFormikContext } from "formik";
import React, { useContext, useState } from "react";
import { INITIAL_WISE_STATE } from "../../utils/formik";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";
import { Alert, Box, Stack } from "@mui/material";
import SelectButtons from "../../components/SelectButtons";
import GoBackButton from "../GoBackButton";
import SelectButtonInput from "../../components/SelectButtonInput";

type Props = {};

export enum ELanguageTest {
	IELTS = "ielts",
	PTE = "pte",
	DUOLINGO = "duolingo",
	"HSK 1-2" = "hsk 1-2",
	"HSK 3-4" = "hsk 3-6",
	TOEFL = "toefl",
}

function LanguageScore({ handleNext, handleGoBack }: IScreenProps) {
	const { primaryColor, secondaryColor } = useContext(WiseScoreDetailsContext);
	const [scopeError, setScopeError] = useState({
		isError: false,
		message: "",
	});

	const {
		setFieldValue,
		values,
		errors,
		touched,
		setFieldError,
		setFieldTouched,
	} = useFormikContext<typeof INITIAL_WISE_STATE>();
	const testNames = ["IELTS", "PTE", "Duolingo", "HSK 1-2", "HSK 3-6", "TOEFL"];
	const enumKeyValuePairs = Object.keys(ELanguageTest).map((key) => ({
		key: key as keyof typeof ELanguageTest,
		value: ELanguageTest[key as keyof typeof ELanguageTest],
	}));
	// const handleOnClick =
	const handleClickOnTest = (testName: string) => {
		setFieldValue("test", testName);
		setFieldValue("language_test", testName);
		setFieldValue("language_overall_score", "");
		setFieldValue("score", "");
		setFieldError("language_overall_score", "");
		setFieldValue("language_proficiency", true);
	};
	const handleClickOnNone = () => {
		setFieldValue("test", "");
		setFieldValue("score", "");
		setFieldValue("language_proficiency", false);
		setScopeError({
			isError: false,
			message: "",
		});
	};

	const checkDisabled = () => {
		if (values.language_proficiency === false) {
			return false;
		}
		if (values.language_proficiency === true) {
			if (values.language_test && values.language_overall_score) {
				return false;
			}
			return true;
		}
		return true;
	};

	const nextFunc = () => {
		if (
			(errors.language_test || errors.language_overall_score) &&
			values.language_proficiency === true
		) {
			setScopeError({
				isError: true,
				message: (errors.language_test || errors.language_overall_score) ?? "",
			});
			return;
		}
		analytics.trackEvent(EAnalyticsEvents.WISESCORE_LANGUAGE_SELECT, {
			test: values.language_test,
			score: values.language_overall_score,
			language_proficiency: values.language_proficiency,
		});
		handleNext();
	};

	return (
		<Stack alignItems="center">
			{scopeError.isError && (
				<Box
					mt={{ lg: "20px", md: "20px", sm: "0px", xs: "0px" }}
					display="flex"
					mb="10px"
					justifyContent="center"
				>
					<Alert
						sx={{
							border: "1px solid red",
							backgroundColor: "#e63512",
							color: "#fff",
						}}
						severity="error"
					>
						{scopeError.message}
					</Alert>
				</Box>
			)}
			<Box
				width={{ lg: "70%", md: "70%", xs: "100%" }}
				gap={{ lg: "25px", md: "25px", sm: "32px", xs: "32px" }}
				alignItems={{
					lg: "center",
					md: "center",
					sm: "flex-start",
					xs: "flex-start",
				}}
				justifyContent={{
					lg: "center",
					md: "center",
					sm: "flex-start",
					xs: "flex-start",
				}}
				height="auto"
				mt={{ lg: "64px", md: "64px", sm: "46px", xs: "0px" }}
				display="flex"
				position="relative"
				flexWrap="wrap"
				padding={{ lg: 0, md: 0, sm: "0 26px", xs: "0 16px 50px 16px" }}
				flexDirection={{ xs: "row", sm: "row", lg: "row", md: "row" }}
			>
				{enumKeyValuePairs.map((pair) => (
					<SelectButtonInput
						onClick={() => handleClickOnTest(pair.value)}
						isActive={values.test === pair.value}
						text={pair.key}
					/>
				))}
				{/* {testNames.map((testName) => (
                    <SelectButtonInput
                        onClick={() => handleClickOnTest(testName)}
                        isActive={values.test === testName}
                        text={testName}
                    />
                ))} */}
				<SelectButtons
					text="None"
					// minWidth={{ lg: '176px', md: '200px', sm: '50%', xs: '50%' }}
					minWidth={{ lg: "176px", md: "200px", sm: "42%", xs: "42%" }}
					width={{ lg: "176px", md: "200px", sm: "42%", xs: "42%" }}
					isActive={values.language_proficiency === false}
					justifyContent="center"
					alignItems="center"
					variant="small"
					padding={{ sm: "22px 26px", xs: "22px 26px" }}
					onClick={() => handleClickOnNone()}
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
					mt={{ lg: "2px", md: "2px", sm: "32px", xs: "32px" }}
				>
					<GoBackButton handleGoBack={handleGoBack} />

					<Box
						disabled={checkDisabled()}
						// onClick={onClick}
						onClick={nextFunc}
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
		</Stack>
	);
}

export default LanguageScore;
