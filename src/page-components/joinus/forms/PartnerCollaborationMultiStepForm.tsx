"use client";
import { ButtonWrapper } from "@/components/common";
import { Box, Button, Typography } from "@mui/material";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import type { IPartnerFormState } from "@/page-components/joinus/types";
import { SubmittedComponent } from "@/page-components/joinus/components";
import { useMutation } from "@tanstack/react-query";
import { submitPartner } from "@/api/web/partner.action";

interface MultiStepFormProps {
	pages: React.ReactNode[];
	steps: string[];
	initialValues: any;
	validationSchema: any;
	pageValidationFields: string[][];
}

const PartnerCollaborationMultiStepForm = ({
	pages,
	steps,
	initialValues,
	validationSchema,
	pageValidationFields,
}: MultiStepFormProps) => {
	const [activeStep, setActiveStep] = useState(0);
	const [submitted, setSubmitted] = useState(false);
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const pageIds = [
		"contact-information",
		"business-information",
		"recruitment-information",
		"request-submitted",
	];
	const [hasSubmitError, setHasSubmitError] = useState<any>(null);

	const totalSteps = steps.length;

	const {
		mutate,
		isLoading,
		error: submitError,
		isError,
	}: any = useMutation({
		mutationFn: submitPartner,
		onSuccess: () => {
			setSubmitted(true);
		},
		onError: () => {
			setHasSubmitError(submitError);
			setOpen(true);
		},
	});

	const formValidator = (
		formik: any,
		pageFields: string[],
		errorsValue?: any[],
	) => {
		const touchedFieldList: any = {};
		const errors = Object.keys(errorsValue || formik.errors);
		const pageErrors = errors.filter((error) => pageFields.includes(error));
		pageErrors.forEach((field) => {
			touchedFieldList[field] = true;
		});
		formik.setTouched(touchedFieldList);
		return pageErrors.length === 0;
	};

	const handleNext = (formik: any, pageFields: string[], index: number) => {
		const validateAndProceed = async (errors: any = null) => {
			const isRequiredFieldsFilled = formValidator(formik, pageFields, errors);
			if (isRequiredFieldsFilled) {
				setActiveStep((prevActiveStep) => prevActiveStep + 1);
				router.push(`#${pageIds[activeStep + 1]}`, { shallow: true } as any);
				formik.setErrors({});
			} else {
				setOpen(true);
			}
		};
		formik.validateForm().then(validateAndProceed);
	};

	const handleBack = () => {
		setHasSubmitError(null);
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSubmit = async (formik: any, pageFields: string[]) => {
		try {
			const validateAndProceed = async (errors: any = null) => {
				const isRequiredFieldsFilled = formValidator(
					formik,
					pageFields,
					errors,
				);
				const thisValue = formik.values as IPartnerFormState;
				const OtherServiceIndex = thisValue.service.findIndex(
					(e) => e === "Others",
				);
				const OtherMarketingIndex = thisValue.marketing_method.findIndex(
					(e) => e === "Others",
				);
				if (isRequiredFieldsFilled) {
					if (thisValue.how_do_you_hear === "others") {
						thisValue.how_do_you_hear = thisValue.other_source_of_hearing;
					}
					if (OtherServiceIndex !== -1) {
						thisValue.service[OtherServiceIndex] = thisValue.other_service;
					}
					if (OtherMarketingIndex !== -1) {
						thisValue.marketing_method[OtherMarketingIndex] =
							thisValue.other_marketing;
					}
					await mutate(thisValue);
				} else {
					setOpen(true);
				}
			};
			formik.validateForm().then(validateAndProceed);
		} catch (err) {
			console.log("Partner With Us Form ERROR");
		}
	};
	if (submitted) {
		return <SubmittedComponent />;
	}

	return (
		<Box height="100%" width="100%">
			<Formik
				initialValues={{ ...initialValues }}
				validationSchema={validationSchema}
				validateOnChange={false}
				validateOnBlur={false}
				validateOnMount={false}
				onSubmit={(values, onSubmitProps) => {
					console.log("Submit");
				}}
			>
				{(formik) => (
					<>
						{pages.map((page, index) => (
							<Box
								key={steps[index]}
								display={index === activeStep ? "block" : "none"}
							>
								<Box
									minHeight="23.6875rem"
									padding={{
										lg: "14px 40px",
										md: "14px 40px",
										sm: "8px 32px",
										xs: "2px 20px",
									}}
								>
									{page}
								</Box>
								<Box
									display="flex"
									justifyContent="space-between"
									alignItems="center"
									height={{ lg: "96px", md: "80px", sm: "80px", xs: "120px" }}
									width="100%"
									boxShadow="0px 0px 52.13px 0px rgba(7, 33, 102, 0.07)"
									flexDirection={{
										lg: "row",
										md: "row",
										sm: "row",
										xs: "column",
									}}
									padding={{
										lg: "14px 48px",
										md: "14px 48px",
										sm: "14px 32px",
										xs: "12px 12px",
									}}
								>
									<Box>
										<Typography variant="subtitle1">
											Step {activeStep + 1} of {totalSteps}
										</Typography>
									</Box>

									<Box display="flex" gap="24px">
										<Button
											sx={{
												borderRadius: "4px",
												bgcolor: "transparent",
												width: "fit-content",
												minHeight: "48px",
												minWidth: "144px",
												color: "rgba(255, 107, 38, 1)",
												border: "1px solid rgba(131, 134, 139, 1)",
												textTransform: "none",
												"&:disabled": {
													border: "1px solid rgba(32, 28, 26, 0.4)",
													color: "rgba(255, 107, 38, 1)",
													"&::after": {
														content: '""',
														position: "absolute",
														top: 0,
														left: 0,
														right: 0,
														bottom: 0,
														zIndex: 1,
														backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent overlay
														// backdropFilter: 'blur(5px)',
														borderRadius: "4px",
													},
												},
											}}
											aria-label="partner-previous"
											onClick={handleBack}
											disabled={index === 0}
										>
											Previous step
										</Button>

										{index !== 2 ? (
											<Button
												sx={{
													borderRadius: "4px",
													bgcolor: "rgba(255, 107, 38, 1)",
													width: "fit-content",
													minHeight: "48px",
													minWidth: "144px",
													color: "rgba(255, 255, 255, 1)",
													textTransform: "none",
												}}
												aria-label="partner-next"
												onClick={() =>
													handleNext(formik, pageValidationFields[index], index)
												}
											>
												Next step
											</Button>
										) : (
											<ButtonWrapper
												sx={{
													borderRadius: "4px",
													bgcolor: "rgba(255, 107, 38, 1)",
													width: "fit-content",
													minHeight: "48px",
													minWidth: "144px",
													color: "rgba(255, 255, 255, 1)",
													textTransform: "none",
												}}
												onClick={() => {
													handleSubmit(formik, pageValidationFields[index]);
												}}
												aria-label="partner-submit"
												disabled={isLoading}
											>
												{isLoading ? "Submitting..." : "Submit"}
											</ButtonWrapper>
										)}
									</Box>
								</Box>
							</Box>
						))}
					</>
				)}
			</Formik>
		</Box>
	);
};

export default PartnerCollaborationMultiStepForm;
