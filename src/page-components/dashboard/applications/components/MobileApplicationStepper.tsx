"use client";
import { Box, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";

type Props = {
  activeStep: number;
};

const MobileApplicationStepper = ({ activeStep }: Props) => {
  const [displayText, setDisplayText] = useState("");
  useMemo(() => {
    switch (activeStep) {
      case 0:
        setDisplayText("Application Fee");
        break;
      case 1:
        setDisplayText("Upload Documents");
        break;
      case 2:
        setDisplayText("Submission");
        break;
      case 3:
        setDisplayText("Decisions");
        break;
      case 4:
        setDisplayText("Pre-enrollment");
        break;
      case 5:
        setDisplayText("Enrolled");
        break;
    }
  }, [activeStep]);
  return (
    <Box mt={{ xs: 4 }} display={{ lg: "none", md: "none", xs: "flex" }}>
      <Typography variant="h4">
        {activeStep + 1} / 6 {displayText}
      </Typography>
    </Box>
  );
};

export default MobileApplicationStepper;
