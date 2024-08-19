import { Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(
  Paper,
  {},
)(({ theme }) => ({
  width: "100%",
  backgroundColor: "rgba(255, 241, 232, 1)",
  borderRadius: "12px",
  [theme.breakpoints.up("lg")]: {
    padding: "22px",
    minHeight: "332px",
  },
  [theme.breakpoints.down("lg")]: {
    padding: "20px",
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: "440px",
    minHeight: "127px",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "auto",
    width: "100%",
  },
}));
export const StyledCardImageBox = styled(
  Box,
  {},
)(({ theme }) => ({
  borderRadius: "50%",
  position: "relative",
  display: "grid",
  placeItems: "center",

  [theme.breakpoints.up("xl")]: {
    height: "90px",
    width: "90px",
  },
  [theme.breakpoints.down("xl")]: {
    height: "80px",
    width: "80px",
  },
  [theme.breakpoints.down("md")]: {
    height: "64px",
    width: "64px",
  },
}));
