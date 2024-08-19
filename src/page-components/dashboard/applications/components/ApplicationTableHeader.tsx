import { Box, Typography } from "@mui/material";
import React from "react";
import { QuestIcon } from "@/page-components/dashboard/applications/svg";

type Props = {
  value: string;
};

const ApplicationTableHeader = ({ value }: Props) => {
  return (
    <Box
      sx={{
        padding: "24px 16px",
        display: "flex",
        alignItems: "center",
        height: "73px",
      }}
      gap={1}
      mt={2}
    >
      {QuestIcon()}
      <Typography
        sx={{
          color: "var(--greyscale-400, #5B5B5B)",
          fontFamily: "HankenGroteskSemibold",
          fontSize: "16px",
          fontStyle: "normal",
          fontHeight: "400",
          lineHeight: "140%",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default ApplicationTableHeader;
