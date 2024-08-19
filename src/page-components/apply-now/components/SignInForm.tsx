"use client";
import { WiseAdmitColorFulSvg } from "$/svg";
import { useAppSelector } from "@/global-states/hooks/hooks";
import {
	Box,
	IconButton,
	InputAdornment,
	Stack,
	Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CustomTextField, errorMessageBox } from "../utils/provider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Link from "next/link";
import { ButtonWrapper } from "@/components/common";
import { FORM_VALIDATION_SIGN_IN } from "@/page-components/apply-now/utils/formik";

import { auth } from "@/auth/auth";
import { signInUser } from "@/api/web/signin.action";
import { useSnackbar } from "notistack";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import moment from "moment";
import { mixpanelSubmit } from "@/api/web/mixpanel.action";
import { useSession } from "next-auth/react";

export default function SignInForm({
	handleLoginPages,
}: {
	handleLoginPages: (state: boolean) => void;
}) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState("");
	const country = useAppSelector((state) => state.currency.currentCountry);
	const city = useAppSelector((state) => state.currency.city);
    const session = useSession()
	const { enqueueSnackbar } = useSnackbar();
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: FORM_VALIDATION_SIGN_IN,
		onSubmit: async (values) => {
			try {
				setLoading(true);
				const { email, password } = values;
				const res = await signInUser({ email, password });
				if (res?.error) {
					setError(res.error);
         			 setLoading(false);
					return;
				}
				enqueueSnackbar("Sign in successful", {
					variant: "success",
					anchorOrigin: {
						vertical: "top",
						horizontal: "right",
					},
				});
				router.replace("/dashboard");
				if (session) {
					setLoading(false);
					const startTime = Date.now();
					const startDate = moment(startTime).format("DD MMMM YYYY HH:mm:ss");
					const leadId = localStorage.getItem("leadId");
					if (session?.data?.user?.leadId)
						localStorage.setItem("leadId", session?.data?.user?.leadId);

					const startInfo = localStorage.getItem("startInfo");
					if (!startInfo || leadId !== session?.data?.user?.leadId) {
						localStorage.setItem(
							"startInfo",
							JSON.stringify({
								startDate,
								startTime,
							}),
						);
					}
					if (session?.data?.user?.email) {
						mixpanelSubmit({
							email: session?.data?.user?.email,
							event_title: EAnalyticsEvents.SIGN_IN,
							event_type: EAnalyticsEvents.SIGN_IN,
							status: EAnalyticsStatus.SUCCESS,
							reference: session?.data?.user?.leadId ? "Lead" : "Student",
							user_id: session?.data?.user?.leadId
								? session?.data?.user?.leadId
								: session?.data?.user?.userId,
							url_path: window.location.href,
							location: {
								countryName: country,
								city,
							},
							description: "Sign In",
						});
					}
					analytics.login(session?.data?.user?.userId ?? "", {
						$email: session?.data?.user?.email ?? "",
						$name: session?.data?.user?.name ?? "",
						phone: session?.data?.user?.phone ?? "",
					});
					analytics.trackEvent(EAnalyticsEvents.SIGN_IN);
				}
				return;
			} catch (err: any) {
				setError(err?.message ?? "Invalid Credentials");
				setLoading(false);
			}
		},
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			const email = localStorage.getItem("email");
			if (email) {
				formik.setFieldValue("email", email);
			}
		}
	}, []);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	return (
		<Stack
			// rowGap={2}
			flex={0.5}
			width={{
				lg: "90%",
				md: "90%",
				sm: "100%",
				xs: "100%",
			}}
			onSubmit={formik.handleSubmit}
			component="form"
			className="sign-in-form"
			// justifyContent="flex-end"
			// sx={{
			//   ju
			// }}
		>
			{/* <IconWrapper> */}
			<Box
				display={{
					lg: "block",
					md: "block",
					sm: "none",
					xs: "none",
				}}
				sx={{
					cursor: "pointer",
				}}
				onClick={() => router.push("/")}
			>
				<WiseAdmitColorFulSvg />
			</Box>
			{/* </IconWrapper> */}

			<Typography
				lineHeight="42px"
				mt={{ lg: "48px", md: "48px", sm: "24px", xs: "24px" }}
				fontFamily="HankenGroteskExtraBold"
				fontSize="clamp(24px,28px,28px) !important"
			>
				Log into WiseAdmit
			</Typography>

			<Typography
				lineHeight="42px"
				// mt="18px"
				fontSize="clamp(14px,16px,16px) !important"
				fontFamily="HankenGroteskRegular"
			>
				Don't have an account? {/* <IconWrapper> */}
				<Typography
					onClick={() => {
						handleLoginPages(false);
					}}
					fontFamily="HankenGroteskSemiBold"
					sx={{
						textDecoration: "underline",
						cursor: "pointer",
					}}
					fontSize="clamp(14px,16px,16px) !important"
					color="rgba(255, 107, 38, 1)"
				>
					Create account
				</Typography>
				{/* </IconWrapper> */}
			</Typography>

			<Box
				width={{
					lg: "90%",
					md: "90%",
					sm: "100%",
					xs: "100%",
				}}
				display="flex"
				flexDirection="column"
				gap="24px"
				mt="48px"
			>
				<CustomTextField
					label="Email address"
					variant="filled"
					placeholder="Email Address"
					name="email"
					autoComplete="username"
					id="email"
					// focused={formik.values.email !== ''}
					// defaultValue={formik.values.email}
					value={formik.values.email}
					onChange={formik.handleChange}
					error={formik.touched.email && Boolean(formik.errors.email)}
					helperText={formik.touched.email && formik.errors.email}
				/>
				<CustomTextField
					name="password"
					label="Password"
					type={showPassword ? "text" : "password"}
					variant="filled"
					autoComplete="current-password"
					value={formik.values.password}
					onChange={formik.handleChange}
					error={formik.touched.password && Boolean(formik.errors.password)}
					helperText={formik.touched.password && formik.errors.password}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? (
										<VisibilityOff style={{ fontSize: "20px" }} />
									) : (
										<Visibility style={{ fontSize: "20px" }} />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				{!!error && errorMessageBox(error)}
				<Box display="flex" justifyContent="flex-end" width="100%">
					<Typography
						mt="-10px"
						fontSize="16px"
						fontFamily="HankenGroteskRegular"
						sx={{
							textDecoration: "underline",
						}}
					>
						<Link href="/applynow/forgot-password">Forgot Password?</Link>
					</Typography>
				</Box>
				<ButtonWrapper
					type="submit"
					sx={{
						color: "#FFFFFF",
						height: {
							lg: "56px !important",
							md: "56px !important",
							sm: "42px !important",
							xs: "42px !important",
						},
						padding: "10px 20px",

						"&:disabled": {
							bgcolor: "rgba(32, 28, 26, 0.4)",
							color: "#FFFFFF",
						},
						borderRadius: "8px",
						boxShadow: "none",
						marginTop: "22px",
						bgcolor: "rgba(255,107,38,1)",
					}}
					disabled={
						loading ||
						formik.values.email === "" ||
						formik.values.password === ""
					}
				>
					{loading ? "Signing in..." : "Log in"}
				</ButtonWrapper>
			</Box>
		</Stack>
	);
}
