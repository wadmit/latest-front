"use client";
import { GreenTickSvg } from "public/svg";
import { mixpanelSubmit } from "@/api/web/mixpanel.action";
import { patchSortList } from "@/api/web/shortlist.action";
import { submitWiseScore } from "@/api/web/wisescore.action";
import { theme } from "@/common/muicustomtheme/theme";
import { ButtonWrapper } from "@/components/common";
import Loader from "@/components/common/circular-loader/Loader";
import { PhoneField } from "@/components/common/formfields/phone-field";
import { IconWrapper } from "@/components/common/icon-wrapper/IconWrapper";
import ThinScoreGauge from "@/components/common/score-gauge/ThinScoreGauge";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import { selectDashboardDataGlobal } from "@/global-states/reducers/userReducer";
import { setSubmitFormData } from "@/global-states/reducers/wisescore";
import { analytics } from "@/services/analytics.service";
import {
  EAnalyticsEvents,
  EAnalyticsFieldName,
  EAnalyticsStatus,
} from "@/types/mix-panel-analytic";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Dialog,
  Grid,
  InputLabel,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { GetCelebIcon, GetCelebIconMobile } from "../svgs";
import { FORM_VALIDATION_WISESCORE_SUBMIT } from "../utils/formik";
import { ScoreWrapper, StyledCheckBox } from "../utils/provider";
type Props = {
  endPoint?: string;
  version?: string;
  variant?: "dashboard" | "normal" | "nuaa";
};

function WiseScoreSubmit({
  variant,
  version = "WiseScore",
  endPoint = "/wisescore/wisescore-thankyou",
}: Props) {
  const { primaryColor, secondaryColor } = useContext(WiseScoreDetailsContext);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const wiseScoreFormData = useAppSelector(
    (state) => state.wisescore.submitFormData
  );
  const dashboardData = useAppSelector(selectDashboardDataGlobal);

  const country = useAppSelector((state) => state.currency.currentCountry);
  const city = useAppSelector((state) => state.currency.city);
  const [consentChecked, setConsentChecked] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (dashboardData)
      formik.setValues({
        email: dashboardData?.data?.email ?? "",
        fullName: `${dashboardData?.data?.first_name} ${dashboardData?.data?.last_name}`,
        phone: dashboardData?.data?.phone?.toLocaleString() ?? "",
      });
  }, [dashboardData]);

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      phone: "+86",
    },
    validationSchema: FORM_VALIDATION_WISESCORE_SUBMIT,
    onSubmit: (values) => {
      let query = searchParams.get("uuid");
      const newEligibilityFormData = {} as any;

      if (endPoint === "/nuaa/nuaa-score/result") {
        query = "nuaa";
      }

      const addedFields = Object.values(EAnalyticsFieldName);
      Object.keys(wiseScoreFormData).forEach((eachField: any) => {
        if (!addedFields.includes(eachField)) {
          newEligibilityFormData[eachField] = wiseScoreFormData[eachField];
        }
      });
      localStorage.setItem("email", values.email);
      localStorage.setItem("phone", values.phone);

      dispatch(
        setSubmitFormData({
          ...newEligibilityFormData,
          score: newEligibilityFormData.score || 0,
          email: values.email,
          name: values.fullName,
          phone: values.phone,
          consent: consentChecked,
          sourceIdentity: query ?? null,
        })
      );

      mutate(
        {
          ...newEligibilityFormData,
          score: newEligibilityFormData.score || 0,
          email: values.email,
          phone: values.phone,
          name: values.fullName,
          consent: consentChecked,
          university: query,
          sourceIdentity: query ?? null,
        },
        {}
      );
    },
  });

  const { data, isPending, mutate, error, isSuccess, isError, status } =
    useMutation({
      mutationKey: ["wisescore-submit", wiseScoreFormData],
      mutationFn: (data) => submitWiseScore(data),
      onMutate: () => {
        setLoading(true);
      },
      onSuccess: (res) => {
        console.log(res)
        if (res?.data?.email && res?.leadId) {
          mixpanelSubmit({
            email: res?.data?.email,
            event_title: EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
            event_type: EAnalyticsEvents.WISESCORE_RESULT,
            status: EAnalyticsStatus.SUCCESS,
            reference: "Lead",
            user_id: res?.leadId,
            url_path: window.location.href,
            location: {
              countryName: country,
              city,
            },
            description: `User has checked their wisescore. The score is ${res.data.score}`,
            redirectPath: "",
          });
          localStorage.setItem("leadId", res?.leadId);
          localStorage.setItem("wisescore", res?.data?.score);
        }
        localStorage.setItem("email", res?.data?.email);
        localStorage.setItem("phone", res?.data?.phone);
        analytics.wisescoreSubmit(res.data.id, {
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          score: res.data.score,
          reference: "Lead",
        });
        analytics.trackEvent(EAnalyticsEvents.WISESCORE_RESULT, {
          name: res.data.name,
          email: res.data.email,
          phone: res.data.phone,
          score: res.data.score,
          reference: "Lead",
        });
        if (pathname.startsWith("/dashboard")) {
          patchSortList([]).then(() => {
            router.push("/dashboard/universitiesandprograms");
          });
        } else {
          router.push(endPoint);
        }
        setLoading(false);
      },
      onError: (err) => {
        console.log(err);
        const leadId = localStorage.getItem("leadId");
        const email = localStorage.getItem("email");
        if (leadId && email) {
          mixpanelSubmit({
            email,
            event_title: EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
            event_type: EAnalyticsEvents.WISESCORE_RESULT,
            status: EAnalyticsStatus.ERROR,
            reference: "Lead",
            user_id: leadId,
            url_path: window.location.href,
            location: {
              countryName: country,
              city,
            },
            description: err,
            redirectPath: "",
          });
        }
        analytics.trackEvent(EAnalyticsEvents.ERROR, {
          source: "Wisescore Submit",
          message: err,
        });
        setOpen(true);
        setLoading(false);
      },
    });

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // new Date().toUTCString
  return (
    <>
      <Box
        display={{ lg: "flex", md: "flex", sm: "none", xs: "none" }}
        mt="60px"
      >
        <ScoreWrapper>
          <Box display="flex" bgcolor="common.white">
            <Grid alignItems="center" container>
              <Grid xs={12} lg={8} item>
                <Box ml={{ lg: 4, md: 0, sm: 0, xs: 0 }} py={7}>
                  <ThinScoreGauge value={75} />
                </Box>
                <Typography
                  // variant="h4"
                  fontFamily="HankenGroteskExtraBold"
                  fontSize="28px"
                  component="h4"
                  sx={{
                    color: "#333333",
                  }}
                  textAlign={{ xs: "center", lg: "left" }}
                  my={3}
                >
                  Your WiseScore® is {75}%
                </Typography>
                <Stack
                  // bgcolor="green"
                  direction={{ md: "row", xs: "column" }}
                  alignItems={{ md: "center", xs: "center" }}
                  justifyContent={{ lg: "flex-start", xs: "center" }}
                  spacing={4}
                  mb={6.2}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconWrapper>
                      <GreenTickSvg />
                    </IconWrapper>

                    <Typography
                      fontFamily="HankenGroteskSemiBold"
                      fontSize="16px"
                      component="h5"
                      sx={{
                        color: "#5B5B5B",
                      }}
                      mx={1}
                    >
                      You are eligible for Admission
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconWrapper>
                      <GreenTickSvg />
                    </IconWrapper>
                    <Typography
                      fontFamily="HankenGroteskSemiBold"
                      fontSize="16px"
                      component="h5"
                      sx={{
                        color: "#5B5B5B",
                      }}
                      mx={1}
                    >
                      You are eligible for Partial Scholarship
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid xs={12} lg={4} item>
                <Stack
                  direction={{ xs: "row", lg: "column" }}
                  alignItems={{ xs: "center", lg: "flex-start" }}
                  gap={2}
                  bgcolor="#DEF5EC"
                  padding="36px 30px"
                  borderRadius="8px"
                >
                  <Typography
                    fontFamily="HankenGroteskExtraBold"
                    fontSize="20px"
                    component="span"
                    sx={{
                      color: "#333333",
                    }}
                    // textAlign="center"
                    my={3}
                  >
                    We&apos;ve curated a list of universities for you based on
                    your eligibility score.
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </ScoreWrapper>
      </Box>
      <Dialog
        sx={{
          mt: "60px",
          zIndex: 9999999,
          "& .MuiPaper-root ": {
            margin: "0px",
            width: "98%",
          },
          "& .MuiDialog-paperWidthSm": {
            maxWidth: "670px",
            borderRadius: "24px",
            borderTop: "10px solid rgba(255, 198, 171, 1)",
          },
          // opacity: 0.4,
        }}
        slotProps={{
          backdrop: {
            sx: {
              mt: "80px",
              backgroundColor: "rgba(0, 0, 0, 0.44)",
              backdropFilter: "blur(20.5px)",
            },
          },
        }}
        open={!isMobile}
        fullWidth
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          minWidth={{ lg: "500px", md: "500px", sm: "98%", xs: "98%" }}
          width="100%"
          padding={{
            lg: "38px 86px",
            md: "38px 86px",
            sm: "38px 26px",
            xs: "38px 26px",
          }}
          sx={{
            "&::-webkit-scrollbar": {
              width: "12px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "your-color-here",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "your-color-here",
            },
          }}
          display="flex"
          flexDirection="column"
        >
          <Typography
            textAlign="center"
            fontSize="36px"
            fontStyle="normal"
            fontFamily="HankenGroteskExtraBold"
            lineHeight="126%" /* 45.36px */
            letterSpacing="-0.72px"
            component="h1"
          >
            Wohooo...I’ve got your <br /> score on my hand! <GetCelebIcon />
          </Typography>

          <Typography
            mt="24px"
            color="var(--Greyscale-500, #333)"
            textAlign="center"
            fontSize="18px"
            fontFamily="HankenGroteskSemiBold"
            component="h3"
          >
            Wanna see?
          </Typography>

          <Typography
            mt="18px"
            textAlign="center"
            color="var(--Greyscale-500, #333)"
            fontSize="16px"
          >
            But before that we need few more information
            <br /> to send you your WiseScore® on the email.
          </Typography>

          <Box
            borderRadius="12px"
            border="1px solid #EFEFEF"
            padding="32px 42px"
            mt="32px"
            display="flex"
            flexDirection="column"
            gap="20px"
          >
            <Box display="flex" flexDirection="column" gap="10px">
              <InputLabel
                sx={{
                  fontSize: "14px",
                  color: "var(--Greyscale-500, #333)",
                  fontWeight: 300,
                }}
              >
                Full Name
              </InputLabel>
              <TextField
                placeholder="Enter Your Full Name"
                variant="outlined"
                id="fullname"
                name="fullName"
                fullWidth
                disabled={
                  !!dashboardData?.data?.first_name || isSuccess || isPending
                }
                value={formik.values.fullName}
                onChange={(event) => {
                  formik.handleChange(event);
                }}
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
                sx={{
                  width: "100%",
                  "&:hover fieldset": {
                    borderColor: `${primaryColor} !important`,
                    borderWidth: "2px !important",
                  },
                  "&:active fieldset": {
                    borderColor: `${primaryColor} !important`,
                    borderWidth: "2px !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px !important",
                    "&:focus,&:active": {
                      borderColor: `${primaryColor} !important`,
                      borderWidth: "2px !important",
                    },
                    "&:hover fieldset": {
                      borderColor: `${primaryColor} !important`,
                      borderWidth: "2px !important",
                    },
                  },
                  "& input": {
                    height: "28px",
                  },
                  "&:hover": {
                    borderColor: `${primaryColor} !important`,
                    borderWidth: "2px !important",
                  },
                  "&.Mui-focused": {
                    borderColor: `${primaryColor} !important`,
                    borderWidth: "2px !important",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: `${primaryColor} !important`,
                    borderWidth: "2px !important",
                  },
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column" gap="10px">
              <InputLabel
                sx={{
                  fontSize: "14px",
                  color: "var(--Greyscale-500, #333)",
                  fontWeight: 300,
                }}
              >
                Email Address
              </InputLabel>
              <TextField
                className={variant}
                placeholder="Enter Your Email Address"
                variant="outlined"
                id="email"
                name="email"
                fullWidth
                disabled={
                  !!dashboardData?.data?.email || isSuccess || isPending
                }
                value={formik.values.email}
                onChange={(event) => {
                  formik.handleChange(event);
                }}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  width: "100%",
                  "&:hover fieldset": {
                    borderColor: `${primaryColor} !important`,
                    borderWidth: "2px !important",
                  },
                  "&:active fieldset": {
                    borderColor: `${primaryColor} !important`,
                    borderWidth: "2px !important",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px !important",
                    "&:focus,&:active": {
                      borderColor: `${primaryColor} !important`,
                      borderWidth: "2px !important",
                    },
                    "&:hover fieldset": {
                      borderColor: `${primaryColor} !important`,
                      borderWidth: "2px !important",
                    },
                  },

                  "&:hover": {
                    borderColor: `${primaryColor} !important`,
                    borderWidth: "2px !important",
                  },
                  "&.Mui-focused": {
                    borderColor: `${primaryColor} !important`,
                    borderWidth: "2px !important",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: `${primaryColor} !important`,
                    borderWidth: "2px !important",
                  },
                  "& input": {
                    height: "28px",
                  },
                }}
              />
            </Box>
            <Box display="flex" flexDirection="column" gap="10px">
              <InputLabel
                sx={{
                  fontSize: "14px",
                  color: "var(--Greyscale-500, #333)",
                  fontWeight: 300,
                }}
              >
                Phone Number
              </InputLabel>
              <PhoneField
                label=""
                variant={variant}
                formik={formik}
                name="phone"
                disabled={
                  !!dashboardData?.data?.phone || isSuccess || isPending
                }
              />
            </Box>

            <Box display="flex" alignItems="center" gap="8px">
              <StyledCheckBox
                onChange={(e) => {
                  setConsentChecked(e.target.checked);
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
          </Box>
          <Stack direction="row" justifyContent="center">
            <ButtonWrapper
              variant="contained"
              type="submit"
              disabled={isPending || isSuccess}
              endIcon={
                isSuccess ? (
                  <CheckCircleIcon />
                ) : (
                  isLoading && <Loader buttonState />
                )
              }
              sx={{
                maxWidth: "9.375rem",
                width: "100%",
                mt: "1.25rem",
                borderRadius: "8px",
                bgcolor: primaryColor,
                "&:hover": {
                  bgcolor: secondaryColor,
                },
                textTransform: "none",
              }}
            >
              {isLoading ? "Submitting..." : "Show me now!"}
            </ButtonWrapper>
          </Stack>
        </Box>
      </Dialog>

      {/* for mobile new design */}
      <ScoreWrapper
        width="100%"
        height="100vh"
        display={{ lg: "none", md: "none", sm: "flex", xs: "flex" }}
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          alignItems="flex-start"
          display="flex"
          justifyContent="flex-start"
          flexDirection="column"
          margin="none"
          width="100%"
        >
          <Typography
            lineHeight="126%" /* 30.24px */
            letterSpacing="-0.48px"
            mt="36px"
            fontFamily="HankenGroteskExtraBold"
            fontSize="24px !important"
          >
            {" "}
            Wohooo...I’ve got your <br /> score on my hand!{" "}
            <GetCelebIconMobile />
          </Typography>
          <Typography
            mt="20px"
            color="var(--Greyscale-500, #333)"
            textAlign="center"
            fontSize="16px !important"
            fontFamily="HankenGroteskSemiBold"
            component="h3"
            fontStyle="normal"
          >
            Wanna see?
          </Typography>
          <Typography
            fontWeight={400}
            mt="18px"
            textAlign="left"
            color="rgba(51, 51, 51, 1)"
            fontSize="14px"
            fontStyle="normal"
            fontFamily="HankenGroteskRegular"
            lineHeight="16.8px"
          >
            But before that we need few more information <br /> to send you your
            WiseScore® on the email.
          </Typography>
          <Box
            display="flex"
            width="100%"
            flexDirection="column"
            gap="32px"
            mt="32px"
          >
            <Box width="100%" display="flex" flexDirection="column" gap="10px">
              <InputLabel
                sx={{
                  fontSize: "14px",
                  color: "var(--Greyscale-500, #333)",
                  fontWeight: 300,
                }}
              >
                Full Name
              </InputLabel>
              <TextField
                placeholder="Enter Your Full Name"
                variant="outlined"
                id="fullname"
                name="fullName"
                fullWidth
                disabled={
                  !!dashboardData?.data?.first_name || isSuccess || isPending
                }
                value={formik.values.fullName}
                onChange={(event) => {
                  formik.handleChange(event);
                }}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px !important",
                    "&:focus,&:active": {
                      borderColor: `${primaryColor} !important`,
                      borderWidth: "2px !important",
                    },
                  },
                  "& input": {
                    height: "20px",
                  },
                }}
              />
            </Box>
            <Box width="100%" display="flex" flexDirection="column" gap="10px">
              <InputLabel
                sx={{
                  fontSize: "14px",
                  color: "var(--Greyscale-500, #333)",
                  fontWeight: 300,
                }}
              >
                Email Address
              </InputLabel>
              <TextField
                className={variant}
                placeholder="Enter Your Email Address"
                variant="outlined"
                id="email"
                name="email"
                fullWidth
                disabled={
                  !!dashboardData?.data?.email || isSuccess || isPending
                }
                value={formik.values.email}
                onChange={(event) => {
                  formik.handleChange(event);
                }}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "8px !important",
                    "&:focus,&:active": {
                      borderColor: `${primaryColor} !important`,
                      borderWidth: "2px !important",
                    },
                  },
                  "& input": {
                    height: "20px",
                    width: "100%",
                  },
                }}
              />
            </Box>
            <Box width="100%" display="flex" flexDirection="column" gap="10px">
              <InputLabel
                sx={{
                  fontSize: "14px",
                  color: "var(--Greyscale-500, #333)",
                  fontWeight: 300,
                }}
              >
                Phone Number
              </InputLabel>
              <PhoneField
                label=""
                variant={variant}
                formik={formik}
                name="phone"
                disabled={
                  !!dashboardData?.data?.phone || isSuccess || isPending
                }
              />
            </Box>
            <Box display="flex" alignItems="center" gap="8px">
              <StyledCheckBox
                onChange={(e) => {
                  setConsentChecked(e.target.checked);
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
          </Box>
          <Stack mt="12px" width="100%" direction="row" justifyContent="center">
            <ButtonWrapper
              variant="contained"
              type="submit"
              disabled={isPending || isSuccess}
              sx={{
                maxWidth: "9.375rem",
                width: "100%",
                mt: "1.25rem",
                borderRadius: "14px",
                padding: "10px 0px",
                bgcolor: primaryColor,
                "&:hover": {
                  bgcolor: secondaryColor,
                },
                textTransform: "none",
              }}
            >
              {isSuccess
                ? "Submitted"
                : isPending
                ? "Submitting..."
                : "Show me now!"}
            </ButtonWrapper>
          </Stack>
        </Box>
      </ScoreWrapper>
    </>
  );
}

export default WiseScoreSubmit;
