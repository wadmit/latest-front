"use client";
import React, { useContext, useEffect, useState } from "react";
import { FORM_VALIDATION_SIGN_UP } from "@/page-components/apply-now/utils/formik";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/global-states/hooks/hooks";
import {
  Box,
  Divider,
  FormHelperText,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import { WiseAdmitColorFulSvg } from "public/svg";
import {
  CustomTextField,
  errorMessageBox,
  StyledCheckBox,
} from "@/page-components/apply-now/utils/provider";
import { PhoneField } from "@/components/common/formfields/phone-field";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ButtonWrapper } from "@/components/common";
import { useMutation } from "@tanstack/react-query";
import { PasswordRequirement } from "@/page-components/apply-now/utils/functions";
import { signUp } from "@/api/web/authentication.action";
import moment from "moment";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";
import { setDidUserSignedUp } from "@/global-states/reducers/userReducer";
import type { AxiosError, AxiosResponse } from "axios";
import { useSnackbar } from "notistack";

export default function SignUpForm({
  handleLoginPages,
}: {
  handleLoginPages: (state: boolean) => void;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { primaryColor } = useContext(WiseScoreDetailsContext);
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordClicked, setPasswordClicked] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const {
    isPending: isLoading,
    data,
    isError,
    mutate,
    isSuccess,
    error: axiosError,
  } = useMutation<AxiosResponse<any, any>, AxiosError<any, any>, any>({
    mutationFn: async (data: any) => await signUp(data),
    onSuccess: (res) => {
      enqueueSnackbar("Sign Up Successful", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      dispatch(setDidUserSignedUp(true));
      handleLoginPages(true);
      // mixpanel
      if (res?.data?.leadId) {
        const startTime = Date.now();
        const startDate = moment(startTime).format("DD MMMM YYYY HH:mm:ss");
        const startInfo = localStorage.getItem("startInfo");
        const leadId = localStorage.getItem("leadId");
        if (!startInfo || leadId !== res?.data?.leadId) {
          localStorage.setItem(
            "startInfo",
            JSON.stringify({
              startDate,
              startTime,
            })
          );
        }
      }
      analytics.trackEvent(EAnalyticsEvents.SIGN_UP, {
        message: "Signed Up Successfully",
      });
      analytics.login(res?.data.data.id, {
        $email: res?.data.data.email ?? "",
        $first_name: res?.data.data.first_name ?? "",
        $last_name: res?.data.data.last_name ?? "",
        phone: res?.data.data.phone ?? "",
      });
      localStorage.setItem("email", res?.data.data.email);
      localStorage.setItem("phone", res?.data.data.phone);
      if (res?.data.leadId) localStorage.setItem("leadId", res.data.leadId);
    },
    onError: async (error) => {
      analytics.trackEvent(EAnalyticsEvents.ERROR, {
        source: "SignUp Form",
        message: error,
      });
      const localError = (error as AxiosError).response?.data as any;
      let parsedErr = "";
      const { setErrors, setFieldError, setTouched } = formik;
      if (localError && localError.errors) {
        parsedErr = localError.errors.map((e: any) => e.message).join("|");
      }
      if (parsedErr.includes("email")) {
        setFieldError("email", "Email already exists");
      }

      if (parsedErr.includes("phone")) {
        setFieldError("phone", "Phone Number already exists");
      }
    },
  });

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    consent: consentChecked,
  });

  const formik = useFormik({
    initialValues: {
      email: formData.email,
      password: "",
      first_name: "",
      phone: formData.phone,
      last_name: "",
      confirmPassword: "",
      consent: consentChecked,
    },
    validationSchema: FORM_VALIDATION_SIGN_UP,
    onSubmit: async (
      values,
      { setErrors, setStatus, setSubmitting, setFieldError, setTouched }
    ) => {
      if (values.password === values.confirmPassword) {
        try {
          mutate(values);
        } catch (err) {
          console.log("Error in sign up form!");
        }
      }
    },
  });

  useEffect(() => {
    const emailLocal = localStorage.getItem("email");
    const phoneLocal = localStorage.getItem("phone");
    if (emailLocal && phoneLocal) {
      setFormData({
        ...formData,
        email: emailLocal,
        phone: phoneLocal,
      });
      formik.initialValues.email = emailLocal;
      formik.initialValues.phone = phoneLocal;
    }
  }, []);

  const [isPasswordValid, setIsPasswordValid] = useState({
    number: false,
    uppercase: false,
    specialChar: false,
  });

  useEffect(() => {
    const { password } = formik.values;
    setIsPasswordValid({
      number: /\d/.test(password),
      uppercase: /[A-Z]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    });
  }, [formik.values.password]);

  useEffect(() => {
    const isComplete = !!(
      formik.values.first_name &&
      formik.values.last_name &&
      formik.values.email &&
      formik.values.phone &&
      formik.values.password &&
      formik.values.confirmPassword
    );

    setIsFormComplete(isComplete);
  }, [formik.values, setIsFormComplete]);
  return (
    <Stack
      rowGap={2}
      flex={0.6}
      width={{
        lg: "90%",
        md: "90%",
        sm: "100%",
        xs: "100%",
      }}
      onSubmit={formik.handleSubmit}
      component="form"
      className="sign-up-form"
    >
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
      <Typography
        lineHeight="42px"
        mt="25px"
        fontFamily="HankenGroteskExtraBold"
        fontSize="clamp(24px,28px,28px) !important"
      >
        Create an account to WiseAdmit
      </Typography>

      <Typography
        lineHeight="42px"
        fontSize="clamp(14px,16px,16px) !important"
        fontFamily="HankenGroteskRegular"
        mt="-10px"
      >
        Already have an account?{" "}
        <Typography
          fontFamily="HankenGroteskSemiBold"
          sx={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
          fontSize="clamp(14px,16px,16px) !important"
          color="rgba(255, 107, 38, 1)"
          onClick={() => handleLoginPages(true)}
        >
          Log in
        </Typography>
      </Typography>

      <Stack
        marginTop="27px"
        direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
        spacing={1}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Box width={{ lg: "50%", md: "100%", sm: "100%", xs: "100%" }}>
          <CustomTextField
            label="First name"
            variant="filled"
            autoComplete="first_name"
            id="first_name"
            placeholder="First Name"
            name="first_name"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={
              formik.touched.first_name && Boolean(formik.errors.first_name)
            }
          />
          {formik.touched.first_name && formik.errors.first_name && (
            <FormHelperText margin="dense" error>
              {formik.touched.first_name && formik.errors.first_name}
            </FormHelperText>
          )}
        </Box>
        <Box width={{ lg: "50%", md: "100%", sm: "100%", xs: "100%" }}>
          <CustomTextField
            label="Last name"
            variant="filled"
            autoComplete="last_name"
            id="last_name"
            placeholder="Last Name"
            name="last_name"
            value={formik.values.last_name}
            onChange={formik.handleChange}
            error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          />
          {formik.touched.last_name && formik.errors.last_name && (
            <FormHelperText margin="dense" error>
              {formik.touched.last_name && formik.errors.last_name}
            </FormHelperText>
          )}
        </Box>
      </Stack>

      <CustomTextField
        label="Email address"
        variant="filled"
        placeholder="Email"
        autoComplete="email"
        name="email"
        id="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
      />
      {formik.touched.email && formik.errors.email && (
        <FormHelperText margin="dense" error>
          {formik.touched.email && formik.errors.email}
        </FormHelperText>
      )}
      <PhoneField formik={formik} name="phone" label="" />

      <CustomTextField
        label="Password"
        autoComplete="new-password"
        variant="filled"
        placeholder="Create a password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        type={showPassword ? "text" : "password"}
        onFocus={() => {
          setPasswordClicked(true);
          setIsPasswordFocused(true); // Password field is focused
        }}
        onKeyDown={(e) => {
          if (e.key === " ") {
            e.preventDefault();
          }
        }}
        onBlur={() => setIsPasswordFocused(false)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? (
                  <Visibility style={{ fontSize: "20px" }} />
                ) : (
                  <VisibilityOff style={{ fontSize: "20px" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={formik.touched.password && Boolean(formik.errors.password)}
      />

      {passwordClicked &&
        isPasswordFocused &&
        (!isSmallScreen ? (
          <Stack
            padding="10px 10px"
            spacing={1}
            top={{
              xl: "55%",
              lg: "390px",
              md: "420px",
              sm: "10px",
              xs: "10px",
            }}
            right={{
              xl: "26%",
              lg: "320px",
              md: "150px",
              sm: "20px",
              xs: "10px",
            }}
            sx={{
              position: "absolute",
              width: "335px",
              maxHeight: "calc(100vh - 40px)",
              overflowY: "auto",
              borderRadius: "8px",
              boxShadow: "0px 1px 26px 0px rgba(0, 0, 0, 0.09)",
              zIndex: 99999999,
              backgroundColor: "#FFFFFF",
              overflow: "visible",
              // Triangle styles
              "&::before": {
                content: "''",
                position: "absolute",
                top: "70px",
                left: "-20px",
                borderTop: "15px solid transparent",
                borderRight: "25px solid rgba(255, 255, 255, 1)",
                borderBottom: "15px solid transparent",
              },
            }}
          >
            <Typography
              fontFamily="HankenGroteskExtraBold"
              fontSize="16px"
              lineHeight="20.85px"
            >
              Your password must contain:
            </Typography>
            <Divider />
            <Stack direction="column" spacing={1}>
              <PasswordRequirement valid={isPasswordValid.number}>
                Contain at least 1 number
              </PasswordRequirement>
              <PasswordRequirement valid={isPasswordValid.uppercase}>
                Contain at least 1 uppercase letter
              </PasswordRequirement>
              <PasswordRequirement valid={isPasswordValid.specialChar}>
                Contain at least 1 special character ($,@,#..)
              </PasswordRequirement>
              <PasswordRequirement valid={formik.values.password.length >= 8}>
                At least 8 characters
              </PasswordRequirement>
            </Stack>
          </Stack>
        ) : (
          <>
            <Typography
              fontFamily="HankenGroteskExtraBold"
              fontSize="16px"
              lineHeight="20.85px"
            >
              Your password must contain:
            </Typography>
            <Stack direction="column" spacing={1}>
              <PasswordRequirement valid={isPasswordValid.number}>
                Contain at least 1 number
              </PasswordRequirement>
              <PasswordRequirement valid={isPasswordValid.uppercase}>
                Contain at least 1 uppercase letter
              </PasswordRequirement>
              <PasswordRequirement valid={isPasswordValid.specialChar}>
                Contain at least 1 special character ($,@,#..)
              </PasswordRequirement>
              <PasswordRequirement valid={formik.values.password.length >= 8}>
                At least 8 characters
              </PasswordRequirement>
            </Stack>
          </>
        ))}
      {formik.touched.password && formik.errors.password && (
        <FormHelperText margin="dense" error>
          {formik.touched.password && formik.errors.password}
        </FormHelperText>
      )}

      <CustomTextField
        label="Re-enter password"
        variant="filled"
        autoComplete="new-password"
        placeholder="Re-enter password"
        name="confirmPassword"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={
          formik.touched.confirmPassword &&
          Boolean(formik.errors.confirmPassword)
        }
        type={showConfirmPassword ? "text" : "password"}
        //password was accepted as character so this rejected it
        onKeyDown={(e) => {
          if (e.key === " ") {
            e.preventDefault();
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? (
                  <Visibility style={{ fontSize: "20px" }} />
                ) : (
                  <VisibilityOff style={{ fontSize: "20px" }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword && (
        <FormHelperText margin="dense" error>
          {formik.touched.confirmPassword && formik.errors.confirmPassword}
        </FormHelperText>
      )}

      <Box display="flex" alignItems="center" gap="8px">
        <StyledCheckBox
          onChange={(e) => {
            setConsentChecked(e.target.checked);
            formik.setFieldValue("consent", e.target.checked);
          }}
          checked={consentChecked}
          primaryColor={primaryColor}
        />
        <Typography
          sx={{
            fontSize: "14px",
            color: "var(--Greyscale-500, #333)",
            fontWeight: 300,
          }}
        >
          Get exclusive updates and offers via WhatsApp
        </Typography>
      </Box>
      {isError &&
        errorMessageBox(axiosError?.response?.data?.errors[0]?.message || "")}

      <Stack width="!00%" mt={1}>
        <ButtonWrapper
          type="submit"
          sx={{
            color: "#FFFFFF",
            bgColor: isFormComplete ? "rgba(211, 215, 217, 1)" : "#666666CC",
            boxShadow: "none",
            borderRadius: "8px",
            "&:disabled": {
              bgcolor: "rgba(32, 28, 26, 0.4)",
              color: "#FFFFFF",
            },
          }}
          disabled={isLoading || isSuccess || !isFormComplete}
        >
          <Typography color="#FFFFFF">
            {isSuccess
              ? "Success"
              : isLoading
              ? "Signing Up..."
              : "Create an account"}
          </Typography>
        </ButtonWrapper>
      </Stack>
    </Stack>
  );
}
