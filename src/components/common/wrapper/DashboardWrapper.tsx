"use client";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DashboardWrapper = styled(Box, {
  name: "Dashboard-Root-Layout-Wrapper",
})`
  color: ${({ theme }) => theme.palette.grey[500]};
  margin: 0 auto;
  max-width: 1578px;
  padding: 0px 30px;
  ${(props) => props.theme.breakpoints.down("xl")} {
    padding: 0px 20px;
  }
  width: 100%;
`;

export const DashboardContentContainer = styled(Box, {
  name: "Dashboard-Content-Container",
})(({ theme }) => ({
  borderRadius: "10px",

  backgroundColor: "white",
  [theme.breakpoints.up("xs")]: {
    padding: "15px 10px 49px 10px",
  },
  [theme.breakpoints.up("lg")]: {
    padding: "15px 20px 49px 50px",
  },
  [theme.breakpoints.up("xl")]: {
    padding: "15px 34px 64px 64px",
  },

  position: "relative",
}));
