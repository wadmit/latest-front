"use client";
import { Box, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";

type Props = {
  status: string;
  displayText: string;
};

function CustomBox({
  statusText,
  textColor,
  backgroundColor,
}: {
  statusText: string;
  textColor: string;
  backgroundColor: string;
}) {
  return (
    <Box
      sx={{
        minWidth: "",
        maxWidth: "fit-content",
        borderRadius: "25px",
        padding: "4px 12px",
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: textColor,
      }}
    >
      <Typography>{statusText}</Typography>
    </Box>
  );
}

const ApplicationStatus = ({ status, displayText }: Props) => {
  const getButtonComponent = useMemo(() => {
    switch (status) {
      case "inview":
        return (
          <CustomBox
            backgroundColor="var(--blue-100, #E3F8FF)"
            statusText={displayText}
            textColor="var(--blue-main, #2D8CFF)"
          />
        );
      case "rejected":
        return (
          <CustomBox
            backgroundColor="var(--red-100, #FFE3E3)"
            textColor="var(--red-main, #CF3636)"
            statusText={displayText}
          />
        );

      case "pending":
        return (
          <CustomBox
            backgroundColor="var(--red-100, #FFE3E3)"
            textColor="var(--red-main, #CF3636)"
            statusText={displayText}
          />
        );
      case "success":
        return (
          <CustomBox
            statusText={displayText}
            backgroundColor="var(--green-100, #D5E8D7)"
            textColor="var(--green-main, #2D8C37)"
          />
        );
    }
  }, [status, displayText]);
  return (
    <Stack
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {getButtonComponent}
    </Stack>
  );
};

export default ApplicationStatus;
