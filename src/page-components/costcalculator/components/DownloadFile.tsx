"use client";
import React from "react";
import {
	Box,
	Button,
	Dialog,
	InputLabel,
	Stack,
	Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";
import {
	FORM_VALIDATION_COST_CALCULATOR,
	initialValuesCostCalculator,
} from "@/page-components/costcalculator/utils/formik-validation";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";
import { ButtonWrapper } from "@/components/common";
import { postCostSubmission } from "@/api/web/costcaluclator.action";
import type { IDownloadFileProps } from "@/page-components/costcalculator/utils/types";
import { PhoneField } from "@/components/common/formfields/phone-field";

const DownloadFile: React.FC<IDownloadFileProps> = ({
	showModal,
	setShowModal,
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const handleClose = () => {
		setShowModal(false);
	};
	const {
		isPending,
		isError,
		mutate,
		isSuccess,
		error: axiosError,
	} = useMutation({
		mutationFn: postCostSubmission,
		onSuccess: () => {
			enqueueSnackbar("Thank You. Please check your mail", {
				variant: "success",
				anchorOrigin: {
					vertical: "top",
					horizontal: "right",
				},
			});
			handleClose();
		},
	});

	return (
		<Dialog open={showModal}>
			<Box
				sx={{
					margin: "24px 44px 36px 32px",
				}}
			>
				<Stack
					height="100%"
					direction="row"
					justifyContent="flex-end"
					alignItems="center"
				>
					<button
						type="button"
						style={{
							background: "transparent",
							color: "white",
							border: "none",
							cursor: "pointer",
						}}
						onClick={handleClose}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<g id="x">
								<path
									id="Vector"
									d="M18 6L6 18"
									stroke="black"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									id="Vector_2"
									d="M6 6L18 18"
									stroke="black"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</g>
						</svg>
					</button>
				</Stack>
				<Box>
					<Typography variant="h5_sb">Annual Cost Calculator</Typography>
					<br />
					<Typography variant="body1">
						Please fill this form to get a detailed breakdown of the annual cost
						to study in china.
					</Typography>
				</Box>
				{/* </Box> */}
				<Box sx={{ border: "1px solid rgba(223, 227, 229, 0.6)" }}>
					<Formik
						initialValues={{ ...initialValuesCostCalculator }}
						validationSchema={FORM_VALIDATION_COST_CALCULATOR}
						onSubmit={(values) => {
							try {
								mutate(values)
							} catch (err) {
								console.log(err);
							}
						}}
					>
						{(formik) => (
							<Stack
								direction="column"
								spacing={3}
								onSubmit={formik.handleSubmit}
								component="form"
								bgcolor="white"
							>
								<div
									style={{
										marginLeft: "32px",
										width: "450px",
										marginTop: "15px",
									}}
								>
									<InputLabel htmlFor="name">
										<Typography variant="subtitle2" color="black">
											Full name<span style={{ color: "red" }}>*</span>
										</Typography>
									</InputLabel>
									<TextFieldWrapper
										id="name"
										name="name"
										style={{ marginTop: "15px" }}
										variant="outlined"
										value={formik.values.name}
										onChange={formik.handleChange}
										error={formik.touched.name && Boolean(formik.errors.name)}
										helperText={formik.touched.name && formik.errors.name}
									/>
								</div>

								<div style={{ marginLeft: "32px", width: "450px" }}>
									<InputLabel htmlFor="email">
										<Typography variant="subtitle2" color="black">
											Email<span style={{ color: "red" }}>*</span>
										</Typography>
									</InputLabel>
									<TextFieldWrapper
										id="email"
										name="email"
										style={{ marginTop: "15px" }}
										value={formik.values.email}
										onChange={formik.handleChange}
										error={formik.touched.email && Boolean(formik.errors.email)}
										helperText={formik.touched.email && formik.errors.email}
									/>
								</div>

								<div style={{ marginLeft: "32px", width: "450px" }}>
									<PhoneField
                                        formik={formik}
                                        name="number"
                                        label="Contact number*"

                                    />
								</div>
								<Stack
									height="100%"
									direction="row"
									justifyContent="flex-start"
									alignItems="center"
									gap={2}
								>
									<Button
										style={{
											border:
												"1px solid var(--text-day-disable, rgba(32, 28, 26, 0.40))",
											borderRadius: "8px",
											width: "140px",
											marginTop: "35px",
										}}
										onClick={handleClose}
									>
										Cancel
									</Button>

									<ButtonWrapper
										type="submit"
										disabled={isPending || isSuccess}
										style={{
											borderRadius: "8px",
											width: "140px",
											marginTop: "35px",
										}}
									>
										{isPending ? "Downloading..." : "Download"}
									</ButtonWrapper>
								</Stack>
							</Stack>
						)}
					</Formik>
				</Box>
			</Box>
		</Dialog>
	);
};

export default DownloadFile;
