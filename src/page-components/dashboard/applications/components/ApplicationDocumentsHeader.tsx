"use client";
import { Stack, Typography } from "@mui/material";
import React from "react";

const ApplicationDocumentsHeader = () => {
  return (
    <Stack>
      <Typography
        sx={{
          fontSize: "18px",
          fontStyle: "normal",
          fontFamily: "HankenGroteskRegular",
          lineHeight: "150%",
        }}
        variant="h5"
      >
        Prepare Application
      </Typography>
      <Typography variant="subtitle1">
        Submit all your documents before you pay your application fee.
      </Typography>
    </Stack>
  );
};

export default ApplicationDocumentsHeader;
