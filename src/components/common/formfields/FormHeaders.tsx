import { ItitleType } from "@/types/other";
import { Box, styled, Typography } from "@mui/material";
import React from "react";

const CustomTypography = styled(Typography)(({ theme }) => ({
  color: "rgba(32, 28, 26, 0.95)",
  fontWeight: "800",
  fontSize: "24px",
  fontFamily: "HankenGroteskExtraBold",
  lineHeight: "140%" /* 33.6px */,
  letterSpacing: "-2%",
  [theme.breakpoints.down("lg")]: {
    fontSize: "24px",
    lineHeight: "140%",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "24px",
    lineHeight: "140%",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
    lineHeight: "23.4px",
  },
  [theme.breakpoints.down("xs")]: {
    fontSize: "18px",
    lineHeight: "23.4px",
  },
}));

const FormHeaders = ({ title }: ItitleType) => {
  return (
    <Box>
      <CustomTypography>{title}</CustomTypography>
    </Box>
  );
};

export default FormHeaders;
