"use client";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import { setSubmitFormData } from "@/global-states/reducers/wisescore";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { IWisescoreForm } from "@/types/wisescore";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
	Box,
	Divider
} from "@mui/material";
import { Formik, FormikProps } from "formik";
import { motion } from "framer-motion";
import {
	useContext,
	useDeferredValue,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import WisescoreHeader from "./components/WisescoreHeader";
import WiseScoreSubmit from "./components/WisescoreSubmit";
import SubjectWiseGrade from "./screens/bachelors/SubjectWiseGrade";
import { getMainFields, getRemainingFields, masterFields } from "./utils/data";
import { INITIAL_WISE_STATE, WISESCORE_FORM_VALIDATION } from "./utils/formik";
import { getTotalSteps } from "./utils/getTotalSteps";
import { BorderLinearProgress } from "./utils/provider";

const WiseScoreComponent = () => {
	const disciplineName = useAppSelector(
		(state) => state.wisescore.disciplineName,
	);
	const programType = useAppSelector((state) => state.wisescore.programType);
	const overAllGrade = useAppSelector((state) => state.wisescore.overallGrade);
	const ref = useRef<HTMLButtonElement>(null);
	const [xAxisProperty, setXAxisProperty] = useState<"100%" | "-100%">("100%");
	const currency = useAppSelector((state) => state.currency);
	// for jumping from one screens to another
	const { endPoint, version } = useContext(WiseScoreDetailsContext);
	const MainFields = getMainFields(version, overAllGrade);
	const remainingFields = getRemainingFields(programType);
	const [initialMapping, setInitialMapping] = useState<IWisescoreForm[]>([
		...MainFields,
		...remainingFields,
	]);
	const ScreensMapping = useDeferredValue(initialMapping);
	const [steps, setSteps] = useState(0);
	const eligibilitySubjects = useAppSelector(
		(state) => state.wisescore.eligibilitySubjects,
	);
	const { primaryColor, secondaryColor, closeModal } = useContext(
		WiseScoreDetailsContext,
	);
	// For showing num of steps in header
	const [linearStep, setLinearStep] = useState(0);
	const [isSubmitted, setIsSubmitting] = useState(false);
	const dispatch = useAppDispatch();
	const [reverseSteps, setReverseSteps] = useState({
		index: 1,
		skip: 1,
	});

	// when eligibility subject changes it will remap to get all the subject related to it
	const getBachelorFieldsAccordingToSubject = () => {
		if (eligibilitySubjects.length === 0) return;
		if (programType === "masters") {
			setInitialMapping([...MainFields, ...masterFields, ...remainingFields]);
			return;
		}
		const buildUpFields = eligibilitySubjects.map((subject: any) => ({
			screenHeader: `What is your overall grade in ${
				subject === "maths" && disciplineName === "Business & Management"
					? "Accounts/Maths"
					: subject
			}?`,
			InitialubHeader: "You’re almost at the end of this step.",
			Screen: SubjectWiseGrade,
			eventName: EAnalyticsEvents.WISESCORE_SUBJECTWISE_GRADE_SELECTION,
			value: subject,
			hasNext: overAllGrade && overAllGrade.type !== "select",
			showIn: "bachelors",
			isEnd: false,
			skipStep: 1,
		}));
		setInitialMapping([...MainFields, ...buildUpFields, ...remainingFields]);
	};

	useEffect(() => {
		getBachelorFieldsAccordingToSubject();
	}, [eligibilitySubjects, overAllGrade]);
	const clearErrors = async (
		formik: FormikProps<typeof INITIAL_WISE_STATE>,
	) => {
		await formik.setErrors({});
	};
	const handleNext = async (formik: FormikProps<typeof INITIAL_WISE_STATE>) => {
		setXAxisProperty("100%");
		const nextStepIndex = steps + 1;
		if (ScreensMapping[steps].isEnd) {
			await clearErrors(formik);
			ref.current?.click();
			setIsSubmitting(true);
			analytics.websiteButtonInteractions({
				buttonName: "Submit",
				source: "User clicked on Submit button of wisescore",
				event_type: ScreensMapping[steps].eventName ?? EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
				status: EAnalyticsStatus.SUCCESS,
				redirectPath: "",
				location:{
					countryName: currency?.currentCountry ?? "",
					city: currency?.city ?? "",
				},
				urlPath: window.location.href,
			});

			return;
		}
		// this was necessary for v1 so it wont hamper any code right now so don't worry don't touch
		if (nextStepIndex < ScreensMapping.length - 1 && steps > 0) {
			const nextScreen = ScreensMapping[nextStepIndex];
			const isShowInBothOrTest =
				nextScreen.showIn === "both" || nextScreen.showIn === programType;
			if (!isShowInBothOrTest) {
				setSteps((prev) => prev + nextScreen.skipStep);
				setLinearStep((prev) => prev + 1);

				setReverseSteps({
					index: nextScreen.skipStep + steps,
					skip: nextScreen.skipStep + 1,
				});
				return;
			}
		}

		if (steps < ScreensMapping.length - 1) {
			if (steps === 0) {
				setSteps((prev) => prev + 1);
				setLinearStep((prev) => prev + 1);
				analytics.websiteButtonInteractions({
					buttonName: ScreensMapping[steps].value,
					source: `User clicked on Next button of wisescore on ${ScreensMapping[steps].value}`,
					event_type: ScreensMapping[steps].eventName ?? EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
					status: EAnalyticsStatus.SUCCESS,
					redirectPath: "",
					location:{
						countryName: currency?.currentCountry ?? "",
						city: currency?.city ?? "",
					},
					urlPath: window.location.href,
				});
				return;
			}
			analytics.websiteButtonInteractions({
				buttonName: ScreensMapping[steps].value,
				source: `User clicked on Next button of wisescore on ${ScreensMapping[steps].value}`,
				event_type: ScreensMapping[steps].eventName ?? EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
				status: EAnalyticsStatus.SUCCESS,
				redirectPath: "",
				location:{
					countryName: currency?.currentCountry ?? "",
					city: currency?.city ?? "",
				},
				urlPath: window.location.href
			});
			setSteps((prev) => prev + ScreensMapping[steps].skipStep);
		}
		setLinearStep((prev) => prev + 1);
	};

	const handleReverseSteps = () => {
		if (reverseSteps.index === steps) {
			setSteps(steps - reverseSteps.skip + 1);
			setReverseSteps({
				index: 0,
				skip: 1,
			});
		} else {
			setSteps(steps - 1);
		}
	};

	const handleGoBack = () => {
		setXAxisProperty("-100%");
		if (steps === 0) {
			closeModal();
			return;
		}
		if (reverseSteps.skip > 1) {
			handleReverseSteps();
			setLinearStep((prev) => prev - 1);
		} else if (steps > 0) {
			setSteps((prev) => prev - 1);
			setLinearStep((prev) => prev - 1);
		}
		window.scrollTo(0, 0);
	};
	const getTotalStepOptimize = useMemo(
		() => getTotalSteps(ScreensMapping, programType),
		[ScreensMapping],
	);

	const GetScreen = useMemo(() => ScreensMapping[steps].Screen, [steps]);

	const checkIfDisable = (
		formik: FormikProps<typeof INITIAL_WISE_STATE>,
		value: string,
	) => {
		if (value === "sub_disciplines") {
			analytics.trackEvent(
				ScreensMapping[steps].eventName ??
					EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
				{
					[ScreensMapping[steps].value]: formik.values.sub_disciplines,
					soruce: "Mobile",
				},
			);
			return formik.values.sub_disciplines.length === 0;
		}
		if (value === "grade") {
			const isTrue =
				Number(formik.values.grade) < formik.values.min ||
				Number(formik.values.grade) > formik.values.max ||
				!formik.touched[value as keyof typeof INITIAL_WISE_STATE] ||
				formik.values[value as keyof typeof INITIAL_WISE_STATE] === "";
			if (!isTrue) {
				analytics.trackEvent(
					ScreensMapping[steps].eventName ??
						EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
					{
						[ScreensMapping[steps].value]: formik.values.sub_disciplines,
						source: "Mobile",
					},
				);
			}
			return isTrue;
		}
		if (
			value === "language_overall_score" &&
			formik.values.language_proficiency === false
		) {
			analytics.trackEvent(
				ScreensMapping[steps].eventName ??
					EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
				{
					language_proficiency: formik.values.language_proficiency,
					source: "Mobile",
					language_overall_score: formik.values.language_overall_score,
					language_test: formik.values.language_test,
				},
			);
			return false;
		}
		if (
			value === "language_overall_score" &&
			formik.errors.language_overall_score
		) {
			return true;
		}

		if (formik.values[value as keyof typeof INITIAL_WISE_STATE] === "") {
			return true;
		}
		analytics.trackEvent(
			ScreensMapping[steps].eventName ??
				EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
			{
				[ScreensMapping[steps].value]:
					formik.values[value as keyof typeof INITIAL_WISE_STATE],
				source: "Mobile",
			},
		);
		return false;
		// if(values)
	};

	return !isSubmitted ? (
		<Box
			sx={{
				// backgroundImage: "url('/wisescore/swatch.svg')",
				overflowx: "hidden",
			}}
			position="relative"
			zIndex={2000000}
			height="100%"
		>
			<BorderLinearProgress
				primaryColor={primaryColor}
				secondaryColor={secondaryColor}
				variant="determinate"
				value={linearStep * (100 / getTotalStepOptimize)}
			/>
			<>
				<Formik
					initialValues={INITIAL_WISE_STATE}
					validationSchema={WISESCORE_FORM_VALIDATION}
					// validationSchema={FORM_VALIDATION}

					onSubmit={(values) => {
						// console.log(values)
					}}
					validateOnChange
					// validateOnBlur
				>
					{(formik) => (
						<>
							{/* // <form onSubmit={formik.handleSubmit}> */}

							<motion.div
								style={{
									paddingBottom: "80px",
								}}
								key={linearStep}
								initial={{ opacity: 0, scale: 0.5, x: xAxisProperty }}
								animate={{ opacity: 1, scale: 1, x: 0 }}
								transition={{ ease: "easeOut", duration: 0.5 }}
							>
								<Box>
									{!ScreensMapping[steps].multiple ? (
										<WisescoreHeader
											step={linearStep + 1}
											maxStep={getTotalStepOptimize}
											screenHeader={ScreensMapping[steps].screenHeader}
										/>
									) : (
										<WisescoreHeader
											step={linearStep + 1}
											maxStep={getTotalStepOptimize}
											noheader
											screenHeader={ScreensMapping[steps].screenHeader}
										/>
									)}

									<GetScreen
										handleNext={() => handleNext(formik)}
										value={ScreensMapping[steps].value}
										handleGoBack={handleGoBack}
									/>
								</Box>
							</motion.div>

							<Box
								bgcolor="white"
								zIndex={99999999999}
								borderTop="1px solid rgba(209, 209, 209, 1) "
								width="100%"
								display={{ xs: "flex", md: "none", lg: "none", sm: "none" }}
								justifyContent="center"
								alignItems="center"
								height="72px"
								position="fixed"
								bottom={0}
							>
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
										cursor: "pointer",
									}}
									flex={1}
								>
									<ArrowBack /> Go Back
								</Box>
								<Divider
									sx={{
										height: "24px",
									}}
									orientation="vertical"
								/>
								{ScreensMapping[steps].hasNext && (
									<Box
										color="rgba(255, 107, 38, 1)"
										fontSize="14px"
										fontWeight={500}
										lineHeight="14px"
										display="flex"
										justifyContent="center"
										alignItems="center"
										gap="8px"
										onClick={() => {
											if (
												!checkIfDisable(formik, ScreensMapping[steps].value)
											) {
												handleNext(formik);
											}
										}}
										sx={{
											cursor: "pointer",
										}}
										flex={1}
									>
										{" "}
										Next
										<ArrowForward />
									</Box>
								)}
							</Box>
							<button
								ref={ref}
								hidden
								onClick={() => {
									dispatch(setSubmitFormData(formik.values));
									formik.handleSubmit();
								}}
								type="submit"
							>
								Submit
							</button>
							{/* </form> */}
						</>
					)}
				</Formik>
			</>
		
		</Box>
	) : (
		<motion.div
			key={linearStep}
			initial={{ opacity: 0, scale: 0.5, x: xAxisProperty }}
			animate={{ opacity: 1, scale: 1, x: 0 }}
			transition={{ ease: "easeOut", duration: 0.5 }}
		>
			<WiseScoreSubmit version={version} endPoint={endPoint} />
		</motion.div>
	);
};

export default WiseScoreComponent;
