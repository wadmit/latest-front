import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import {
  FORM_VALIDATION_CONTACTUS,
  initialValuesContactUs,
} from "@/page-components/contactus/utils/formik-validation";
import { Box, InputLabel, Stack, Typography } from "@mui/material";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";
import { PhoneField } from "@/components/common/formfields/phone-field";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { ButtonWrapper } from "@/components/common";
import Loader from "@/components/common/circular-loader/Loader";
import { AutoCompleteNationalityContact } from "@/components/common/formfields/autocomplete/index";
import { useMutation } from "@tanstack/react-query";
import { contactUs } from "@/api/web/contactus.action";

const ContactUsForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const {
    isPending,
    isError,
    mutate,
    isSuccess,
    error: axiosError,
  } = useMutation({
    mutationFn: contactUs,
    onSuccess: () => {
      // setSubmitted(true);
      enqueueSnackbar(
        "Thank You For your Message! We will Contact you back Shortly",
        {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        }
      );
      router.push("/");
    },
  });

  function errorMessageBox() {
    return (
      <Box border={1} borderRadius={1} borderColor="error.light" py={2} px={2}>
        <Stack direction="row" alignItems="center">
          <ReportProblemIcon color="error" />
          <Typography variant="body2" component="p" color="error.main" ml={1}>
            {(axiosError as any)?.response?.data?.errors[0]?.message || ""}
          </Typography>
        </Stack>
      </Box>
    );
  }

  return (
    <Formik
      initialValues={{ ...initialValuesContactUs }}
      validationSchema={FORM_VALIDATION_CONTACTUS}
      onSubmit={(values) => {
        try {
          mutate(values);
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {(formik) => (
        <Stack
          sx={{
            overflowY: "auto",
            width: "900px",
            boxShadow: "0px 1px 26px 0px rgba(0, 0, 0, 0.09)",
            zIndex: 99999999,
            "@media (max-width: 768px)": {
              width: "100%",
              right: "0px",
              top: "0px",
              height: "100vh",
              overflowY: "auto",
              padding: "6px",
            },
            "@media (max-width: 1250px)": {
              width: "100%",
              right: "0px",
              top: "0px",
              height: "100vh",
              overflowY: "auto",
              padding: "6px",
            },
          }}
        >
          <Stack
            borderRadius="12px"
            direction="column"
            onSubmit={formik.handleSubmit}
            width="100%"
            padding="20px"
            overflow="hidden"
            component="form"
            bgcolor="#FCFAF8"
            sx={{
              "@media (min-heigth: 760px)": {
                overflowY: "auto",
              },
              "@media (max-width: 768px)": {
                overflowY: "auto",
              },
            }}
          >
            <Box
              padding={{ lg: "24px", md: "24px", sm: "20px", xs: "15px" }}
              sx={{
                borderRadius: "8px 8px 0px 0px",
                width: "70%",
              }}
            >
              <Stack
                height="100%"
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box display="flex" flexDirection="column" gap="12px">
                  <Typography
                    fontFamily="HankenGroteskExtraBold"
                    fontSize={{
                      lg: "48px",
                      md: "48px",
                      sm: "30px",
                      xs: "20px",
                    }}
                    lineHeight={{
                      lg: "57.6px",
                      md: "57.6px",
                      sm: "57.6px",
                      xs: "25px",
                    }}
                    color="#201C1A"
                  >
                    We love to hear from you, Get in touch{" "}
                    <Image
                      src="/images/contactus/wave-hand.webp"
                      height={30}
                      width={30}
                      alt="wavehand"
                    />{" "}
                  </Typography>
                  <Typography
                    fontFamily="HankenGroteskRegular"
                    fontSize="16px"
                    lineHeight={{
                      lg: "25.6px",
                      md: "25.6px",
                      sm: "25.6px",
                      xs: "20px",
                    }}
                    color="#201C1A"
                  >
                    Send us a message using the form below and we’ll get back to
                    you as soon as possible. You can e-mail us using the form
                    below. We love to hear from readers!
                  </Typography>
                </Box>
              </Stack>
            </Box>
            <Stack
              padding={{ lg: "24px", md: "24px", sm: "20px", xs: "15px" }}
              gap={2}
            >
              <Stack
                component="div"
                direction="row"
                justifyContent="space-between"
                gap={2}
                sx={{
                  "@media (max-width: 768px)": {
                    flexDirection: "column",
                    gap: "0px",
                    "& .MuiFormControl-root": {
                      marginBottom: "10px",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                  }}
                >
                  <InputLabel
                    sx={{
                      marginBottom: "6px",
                    }}
                    htmlFor="name"
                  >
                    <Typography variant="subtitle2" color="black">
                      Your full name<span style={{ color: "red" }}>*</span>
                    </Typography>
                  </InputLabel>
                  <TextFieldWrapper
                    placeholder="Enter Your full name"
                    variant="outlined"
                    id="name"
                    name="name"
                    fullWidth
                    sx={{
                      my: 0.3,
                    }}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Box>

                <Box
                  sx={{
                    flex: 1,
                  }}
                >
                  <PhoneField
                    formik={formik}
                    name="phone"
                    label="Enter your phone number/ Whatsapp number"
                  />
                </Box>
              </Stack>

              <Stack
                component="div"
                direction="row"
                justifyContent="space-between"
                gap={2}
                sx={{
                  "@media (max-width: 768px)": {
                    flexDirection: "column",
                    gap: "0px",
                    "& .MuiFormControl-root": {
                      marginBottom: "10px",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                  }}
                >
                  <InputLabel
                    sx={{
                      marginBottom: "6px",
                    }}
                    htmlFor="name"
                  >
                    <Typography variant="subtitle2" color="black">
                      Country name<span style={{ color: "red" }}>*</span>
                    </Typography>
                  </InputLabel>

                  <AutoCompleteNationalityContact<typeof initialValuesContactUs>
                    type="normal"
                    // resetOtherField={resetCountryChangeValue}
                    fieldName="country"
                  />
                </Box>

                <Box
                  sx={{
                    flex: 1,
                  }}
                >
                  {" "}
                  <InputLabel
                    htmlFor="email"
                    sx={{
                      marginTop: {
                        lg: "0px",
                        md: "0px",
                        sm: "25px",
                        xs: "26px",
                      },
                      marginBottom: "6px",
                    }}
                  >
                    <Typography variant="subtitle2" color="black">
                      Enter your email <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </InputLabel>
                  <TextFieldWrapper
                    placeholder="Enter Your email address"
                    variant="outlined"
                    id="email"
                    name="email"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Box>
              </Stack>

              <Box>
                <InputLabel
                  sx={{
                    marginBottom: "6px",
                  }}
                >
                  <Typography variant="subtitle2" color="black">
                    Enter your message<span style={{ color: "red" }}>*</span>
                  </Typography>
                </InputLabel>
                <TextFieldWrapper
                  id="message"
                  name="message"
                  placeholder="Enter your message"
                  multiline
                  sx={{
                    my: 1,
                    // height: '96px',
                    "& .MuiTextField-root": {
                      height: "96px",
                      // padding: '8px !important',
                    },
                    "& .MuiOutlinedInput-root": {
                      height: "96px",
                      padding: "8px !important",
                    },
                    "& .MuiInputBase-inputMultiline": {
                      height: "100% !important",
                      overflowY: "auto !important",
                      padding: "3px 3px 3px 2px !important",
                    },
                  }}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.message && Boolean(formik.errors.message)
                  }
                  helperText={formik.touched.message && formik.errors.message}
                  {...formik}
                />
              </Box>

              <Box>{isError && errorMessageBox()}</Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <ButtonWrapper
                  type="submit"
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: "#FF6B26",
                    borderRadius: "8px",
                    boxShadow: "none",
                    maxWidth: "187px",
                  }}
                  disabled={isPending || isSuccess}
                  endIcon={
                    isSuccess ? (
                      <CheckCircleIcon fontSize="large" />
                    ) : isPending ? (
                      <Loader buttonState />
                    ) : (
                      <KeyboardArrowRightIcon />
                    )
                  }
                >
                  {isPending ? "Submitting..." : "Submit now"}
                </ButtonWrapper>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Formik>
  );
};

export default ContactUsForm;
