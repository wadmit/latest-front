"use client";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import { selectDashboardDataGlobal } from "@/global-states/reducers/userReducer";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  DATE_FIELDS,
  firstPageFields,
  secondPageFields,
  thirdPageFields,
} from "@/page-components/dashboard/profile/edit-profile/utils/provider";
import { dashboardTabSetter, submitStudentData } from "@/api/web/user.action";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/services/api.service";
import { Box, Stack, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { ButtonWrapper } from "@/components/common";
import { FORM_VALIDATION_STUDENT } from "../utils/yup-validation";
import FormStepperComponent from "@/components/common/multi-step-form-elements/FormStepperComponent";
import SnackBar from "@/components/common/snackbar-close/SnackBar";

interface MultiStepFormProps {
  firstPage: React.ReactNode;
  secondPage: React.ReactNode;
  thirdPage: React.ReactNode;
  loadingPage?: React.ReactNode;
  formHeader: React.ReactNode;
  steps: string[];
  initialValues: any;
  validationSchema: any;
  submitEndpoint: string;
}

const postMethod = async (pageFormData: any) => {
  const formattedData = { ...pageFormData };

  Object.keys(formattedData).forEach((key: string) => {
    if (DATE_FIELDS.includes(key)) {
      formattedData[key] = new Date(formattedData[key]).getTime();
    }
  });

  try {
    const result = await submitStudentData(formattedData);
    return result;
  } catch (error) {
    console.error("Error submitting student data:", error);
    throw error;
  }
};

const StudentMultiStepForm = ({
  firstPage,
  secondPage,
  thirdPage,
  loadingPage,
  formHeader,
  steps,
  initialValues,
  validationSchema,
  submitEndpoint,
}: MultiStepFormProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const dashboardData = useAppSelector(selectDashboardDataGlobal);

  const country = useAppSelector((state) => state.currency.currentCountry);
  const city = useAppSelector((state) => state.currency.city);
  const [activeStep, setActiveStep] = useState(0);

  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<{
    severity: "success" | "error" | "warning";
    message: string;
  }>({
    severity: "error",
    message: "Please Fill The Form Properly",
  });

  let leadId = "";
  let email = "";

  useEffect(() => {
    leadId = localStorage.getItem("leadId") ?? "";
    email = localStorage.getItem("email") ?? "";
  }, []);

  const { mutate, isPending, data } = useMutation({
    mutationFn: postMethod,
    onSuccess: (res) => {
      if (activeStep === 2) {
        if (pathname.startsWith("/dashboard/profile/edit-profile")) {
          router.push("/dashboard");
          setSubmitted(true);
          // analytics.websiteButtonInteractions({
          //   buttonName: 'Edit Profile',
          //   source: 'Updated entire student profile information',
          //   urlPath: window.location.href,
          //   event_type: EAnalyticsEvents.EDIT_PROFILE_COMPLETE,
          //   status: EStatus.SUCCESS,
          // });
        } else {
          // -------email trigger api-----------------
          request({
            url: "/web/cron/incomplete-application",
            method: "POST",
            data: { email: dashboardData?.data?.email },
          });
          //  email trigger api End-----------------

          dashboardTabSetter.submit("thirdtab", dispatch);
        }
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    },
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formValidator = (formik: any, pageFields: string[]) => {
    const touchedFieldList: any = {};

    const errors = Object.keys(formik.errors);
    const pageErrors = errors.filter((error) => pageFields.includes(error));
    pageErrors.forEach((field) => {
      touchedFieldList[field] = true;
    });

    formik.setTouched(touchedFieldList);
    return pageErrors.length === 0;
  };

  const handleNext = (formik: any, pageFields: string[]) => {
    let isRequiredFieldsFilled = true;

    if (
      formik.values.grading_scheme !== "Letter Scale F - A+" &&
      !pageFields.includes("first_name") &&
      (formik.values.grade_average > Number(formik.values.max) ||
        formik.values.grade_average < Number(formik.values.min))
    ) {
      isRequiredFieldsFilled = false;
      formik.setFieldError(
        "grade_average",
        `Grade Average should be between ${formik.values.min} and ${formik.values.max}`
      );
    }

    if (isRequiredFieldsFilled === true) {
      isRequiredFieldsFilled = formValidator(formik, pageFields);
    }
    if (isRequiredFieldsFilled) {
      const filteredPostData = Object.fromEntries(
        Object.entries(formik.values).filter(([key, value]) =>
          pageFields.includes(key)
        )
      );
      mutate(filteredPostData);
      analytics.websiteButtonInteractions({
        buttonName: "Edit Profile",
        source: `Updated ${steps[activeStep]} profile`,
        urlPath: window.location.href,
        event_type: EAnalyticsEvents.EDIT_PROFILE_STEP,
        status: EAnalyticsStatus.SUCCESS,
        redirectPath: window.location.href,
      });
    } else {
      setSnackBar({
        severity: "error",
        message: "Please Fill The Form Properly",
      });
      handleOpen();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  return (
    <Box position="relative">
      {submitted && (
        <Box height="100%">
          <Typography variant="h3" textAlign="center" py={10}>
            Profile Updated Successfully!
          </Typography>
        </Box>
      )}
      <Box
        sx={{ width: "100%", mx: "auto" }}
        px={{ xl: "8.75rem", lg: "3.75rem", md: "7.5rem", xs: "1rem" }}
        pt={6.25}
        pb={7.5}
        boxShadow={1}
        position="relative"
      >
        {!submitted && activeStep !== steps.length && (
          <>
            {formHeader}
            <FormStepperComponent
              completed={completed}
              activeStep={activeStep}
              steps={steps}
              handleStep={handleStep}
              width="80%"
            />
          </>
        )}

        {!submitted && (
          <Formik
            initialValues={{ ...initialValues }}
            validationSchema={FORM_VALIDATION_STUDENT}
            validateOnMount={false}
            validateOnBlur={false}
            // validateOnChange={false}
            // enableReinitialize
            onSubmit={() => {}}
          >
            {(formik) => (
              <Form>
                <>
                  <Box display={activeStep === 0 ? "block" : "none"}>
                    {firstPage}
                  </Box>
                  <Box display={activeStep === 1 ? "block" : "none"}>
                    {secondPage}
                  </Box>
                  <Box display={activeStep === 2 ? "block" : "none"}>
                    {thirdPage}
                  </Box>
                  <Stack direction="row" columnGap={2.6}>
                    <Box
                      maxWidth="12.8125rem"
                      width="100%"
                      display={activeStep !== 0 ? "block" : "none"}
                    >
                      <ButtonWrapper onClick={handleBack} variant="text">
                        Previous
                      </ButtonWrapper>
                    </Box>
                    <Box
                      maxWidth="12.8125rem"
                      width="100%"
                      display={activeStep === 0 ? "block" : "none"}
                    >
                      <ButtonWrapper
                        onClick={() => {
                          handleNext(formik, firstPageFields);
                        }}
                        variant="contained"
                        disabled={isPending}
                      >
                        {isPending ? "Loading..." : "Save & Next"}
                      </ButtonWrapper>
                    </Box>
                    <Box
                      maxWidth="12.8125rem"
                      width="100%"
                      display={activeStep === 1 ? "block" : "none"}
                    >
                      <ButtonWrapper
                        onClick={() => {
                          handleNext(formik, secondPageFields);
                        }}
                        variant="contained"
                        disabled={isPending}
                      >
                        {isPending ? "Loading..." : "Save & Next"}
                      </ButtonWrapper>
                    </Box>
                    <Box
                      maxWidth="12.8125rem"
                      width="100%"
                      display={activeStep === 2 ? "block" : "none"}
                    >
                      <ButtonWrapper
                        variant="contained"
                        onClick={() => {
                          handleNext(formik, thirdPageFields);
                        }}
                        disabled={isPending}
                      >
                        {isPending ? "Loading..." : "Submit"}
                      </ButtonWrapper>
                    </Box>
                  </Stack>
                </>
              </Form>
            )}
          </Formik>
        )}
      </Box>
      {open && (
        <SnackBar
          handleClose={handleClose}
          open={open}
          severity={snackBar.severity}
          message={snackBar.message}
        />
      )}
    </Box>
  );
};

export default StudentMultiStepForm;
