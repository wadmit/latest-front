import { Step, styled } from "@mui/material";

export const StyledSteps = styled(
  Step,
  {}
)(({ theme }) => ({
  "&  .MuiStepIcon-root": {
    color: "#FFF8F4",
  },
  "& 	.MuiStepIcon-text": {
    color: theme.palette.primary.main,
    fill: theme.palette.primary.main,
  },
  "&  .Mui-active": {
    color: theme.palette.primary.main,
    "& 	.MuiStepIcon-text": {
      fill: "white",
    },
  },
  "&  .MuiStepLabel-label": {
    // color: theme.palette.grey[200],
    fontFamily: "HankenGroteskSemiBold",
    fontSize: "16px",
    [theme.breakpoints.down("lg")]: {
      display: "none",
    },
  },
}));
