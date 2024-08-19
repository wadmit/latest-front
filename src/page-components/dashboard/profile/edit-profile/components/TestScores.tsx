import FormHeaders from "@/components/common/formfields/FormHeaders";
import { Box } from "@mui/material";
import React from "react";
import { LanguageProficiencyStudent } from "@/page-components/dashboard/profile/edit-profile/components";

const TestScores = () => {
  return (
    <Box my={7.5}>
      <FormHeaders title="Test Scores" />
      <LanguageProficiencyStudent />
    </Box>
  );
};

export default TestScores;
