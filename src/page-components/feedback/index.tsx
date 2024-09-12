"use client";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import {
  FORM_VALIDATION_FEEDBACK,
  initialValuesFeedbackForm,
} from "./utils/formik-validation";
import { Rating } from "react-simple-star-rating";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";
import { ButtonWrapper } from "@/components/common";
import { useMutation } from "@tanstack/react-query";
import { feedBack } from "@/api/web/feedback.action";

type Props = {
  setShowThankyouForm?: (val: boolean) => void;
  setShowFeedbackForm?: (val: boolean) => void;
};

const FeedbackForm = ({ setShowThankyouForm, setShowFeedbackForm }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(true);
  const [photoState, setPhotoState] = useState({});
  const [ratings, setRatings] = useState<number>(0);

  const {
    isPending,
    isError,
    mutate,
    isSuccess,
    error: axiosError,
  } = useMutation({
    mutationFn: (submitValues) => feedBack(submitValues, photoState),

    onSuccess: () => {
      enqueueSnackbar("Thank your this Feedback", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      setOpen(false);
      if (setShowThankyouForm && setShowFeedbackForm) {
        setShowFeedbackForm(false);
        setShowThankyouForm(true);
      }
    },
  });

  const handleMainCloseForm = () => {
    if (setShowFeedbackForm) {
      setShowFeedbackForm(false);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
    handleMainCloseForm();
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      fullWidth
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "flex-end",
        zIndex: 999999,
        left: "unset",
        right: {
          lg: "60px",
          md: "60px",
          sm: "30px",
          xs: "0px",
        },
        bottom: "13%",
        width: {
          xs: "100%",
          sm: "auto",
          md: "auto",
          lg: "auto",
        },
        "& .MuiDialog-container": {
          height: "fit-content",
          width: {
            lg: "fit-content",
            md: "fit-content",
            sm: "fit-content",
            xs: "100%",
          },
        },
        "& .MuiDialog-paper": {
          borderRadius: "20px",
          margin: 0,
          width: {
            lg: "360px",
            md: "360px",
            sm: "360px",
            xs: "90%",
          },
        },
      }}
    >
      <DialogTitle sx={{ padding: "0px" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="rgba(5, 65, 150, 1)"
          color="white"
          height="45px"
          padding="10px 24px"
        >
          <Typography
            fontFamily="HankenGroteskBold"
            fontWeight={600}
            fontSize="18px"
            lineHeight="25.2px"
            color="rgba(255, 255, 255, 1)"
          >
            Feedbacks
          </Typography>
          <button
            type="button"
            style={{
              background: "transparent",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleMainCloseForm}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12"
                stroke="white"
                stroke-width="1.27414"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 4L12 12"
                stroke="white"
                stroke-width="1.27414"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: "0px" }}>
        <Formik
          initialValues={initialValuesFeedbackForm}
          validationSchema={FORM_VALIDATION_FEEDBACK}
          onSubmit={(values) => {
            try {
              mutate(values as any);
            } catch (err) {
              console.log(err);
            }
          }}
        >
          {(formik) => (
            <Stack
              width="100%"
              padding={{ lg: "24px", md: "14px", sm: "12px", xs: "14px" }}
              sx={{ overflowY: "auto" }}
            >
              <Stack
                direction="column"
                onSubmit={formik.handleSubmit}
                width="100%"
                component="form"
                bgcolor="white"
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                >
                  <InputLabel htmlFor="ratings">
                    <Typography
                      fontFamily="HankenGroteskRegular"
                      fontWeight={400}
                      fontSize={{
                        lg: "14px",
                        md: "14px",
                        sm: "14px",
                        xs: "14px",
                      }}
                      lineHeight="19.6px"
                      color="rgba(32, 28, 26, 1)"
                    >
                      How satisfied are you with WiseAdmit?
                    </Typography>
                  </InputLabel>
                  <Box mt={2} display="flex" gap={3}>
                    <Rating
                      onClick={(value: number) => {
                        setRatings(value);
                        formik.setFieldValue("ratings", value);
                      }}
                    />
                  </Box>
                </Box>
                <Stack
                  component="div"
                  direction="column"
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
                      <Typography
                        fontFamily="HankenGroteskRegular"
                        fontWeight={400}
                        fontSize={{
                          lg: "14px",
                          md: "14px",
                          sm: "14px",
                          xs: "14px",
                        }}
                        lineHeight="19.6px"
                        color="rgba(32, 28, 26, 1)"
                      >
                        Full name<span style={{ color: "red" }}>*</span>
                      </Typography>
                    </InputLabel>
                    <TextFieldWrapper
                      placeholder="Enter your full name"
                      variant="outlined"
                      id="name"
                      name="name"
                      fullWidth
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
                    {" "}
                    <InputLabel
                      sx={{
                        marginBottom: "6px",
                        // marginTop: "8px"
                      }}
                    >
                      <Typography
                        fontFamily="HankenGroteskRegular"
                        fontWeight={400}
                        fontSize={{
                          lg: "14px",
                          md: "14px",
                          sm: "14px",
                          xs: "14px",
                        }}
                        lineHeight="19.6px"
                        color="rgba(32, 28, 26, 1)"
                      >
                        Email address<span style={{ color: "red" }}>*</span>
                      </Typography>
                    </InputLabel>
                    <TextFieldWrapper
                      placeholder="Enter your email address"
                      variant="outlined"
                      id="email"
                      name="email"
                      fullWidth
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Box>
                </Stack>
                <Box>
                  <InputLabel
                    sx={{
                      marginBottom: "6px",
                      marginTop: "10px",
                    }}
                  >
                    <Typography
                      fontFamily="HankenGroteskRegular"
                      fontWeight={400}
                      fontSize={{
                        lg: "14px",
                        md: "14px",
                        sm: "14px",
                        xs: "14px",
                      }}
                      lineHeight="19.6px"
                      color="rgba(32, 28, 26, 1)"
                    >
                      Any feedback for us?
                      <span style={{ color: "red" }}>*</span>
                    </Typography>
                  </InputLabel>
                  <TextFieldWrapper
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    multiline
                    sx={{
                      "& .MuiTextField-root": {
                        height: "96px",
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
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    {...formik}
                  />
                </Box>
                <Box mt="32px">
                  <ButtonWrapper
                    type="submit"
                    disabled={isPending || isSuccess}
                    fullWidth
                    sx={{ borderRadius: "8px", textTransform: "none" }}
                  >
                    {isPending ? "Submitting..." : "Submit response"}
                  </ButtonWrapper>
                </Box>
              </Stack>
            </Stack>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
