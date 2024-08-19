import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {
  value: string;
};

const ApplicationStatusHeader = ({ value }: Props) => {
  return (
    <Box
      sx={{
        marginTop: "32px",
      }}
    >
      <Typography
        sx={{
          color: "var(--greyscale-500, #333)",
          fontFamily: "HankenGroteskRegular",
          fontSize: "18px",
          fontStyle: "normal",
          lineHeight: "140 %",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default ApplicationStatusHeader;
