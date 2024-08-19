"use client";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { selectDashboardDataGlobal } from "@/global-states/reducers/userReducer";
import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";
import {
  FORM_VALIDATION_STUDENT,
  initialValuesStudentForm,
} from "@/page-components/dashboard/profile/edit-profile/utils/yup-validation";
import moment from "moment";
import StudentMultiStepForm from "@/page-components/dashboard/profile/edit-profile/forms/StudentMultiStepForm";
import {
  AcademicInformation,
  GeneralInformation,
  TestScores,
} from "@/page-components/dashboard/profile/edit-profile/components";

function Header() {
  return (
    <Box mt={3} mb={9}>
      <Typography variant="h4" textAlign="center">
        Student Profile
      </Typography>
      <Typography variant="h5" textAlign="center" mt={2.5}>
        Please enter the information accurately and correctly. The information
        stored here will be submitted to the university you select.
      </Typography>
    </Box>
  );
}

const StudentProfileForm = () => {
  const steps = ["General Information", "Academic Information", "Test Scores"];
  const dashboardData: any = useAppSelector(selectDashboardDataGlobal);

  // -----------------------------prefilling the form with the data from the dashboardcontext------------------------

  const PrefilledInitialState = useMemo(() => {
    if (!dashboardData) return initialValuesStudentForm;
    const temp: any = initialValuesStudentForm;
    const responseKeyArray = Object.keys(dashboardData.data);
    Object.keys(temp).forEach((key) => {
      if (responseKeyArray.includes(key)) {
        temp[key] = dashboardData.data[key];
      }
    });
    const responseKeyArray2 = Object.keys(dashboardData.data.detail);
    Object.keys(temp).forEach((key) => {
      if (
        key === "listening" ||
        key === "reading" ||
        key === "writing" ||
        key === "speaking"
      ) {
        temp[key] = dashboardData.data.detail.test_format[key] ?? "";
      }
      if (responseKeyArray2.includes(key)) {
        if (
          key === "date_of_birth" ||
          key === "attended_institution_to" ||
          key === "attended_institution_from" ||
          key === "graduation_date" ||
          key === "passport_expiry_date"
        ) {
          const date = new Date(dashboardData.data.detail[key]);
          temp[key] = moment(new Date(date)).format("YYYY-MM-DD");
        } else {
          temp[key] = dashboardData.data.detail[key] ?? "";
        }
      }
    });
    return temp;
  }, [dashboardData]);
  return (
    <Box bgcolor="#E5E5E5" pt={0} sx={{ position: "relative" }}>
      <Box bgcolor="common.white" borderRadius={1}>
        <Box mt={4} maxWidth="90rem" width="100%" mx="auto">
          <StudentMultiStepForm
            firstPage={<GeneralInformation />}
            secondPage={<AcademicInformation />}
            thirdPage={<TestScores />}
            steps={steps}
            formHeader={<Header />}
            initialValues={PrefilledInitialState}
            submitEndpoint="grade_scales/eligibility_score"
            validationSchema={FORM_VALIDATION_STUDENT}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default StudentProfileForm;
