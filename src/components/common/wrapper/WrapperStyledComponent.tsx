"use client";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainerWrapper = styled(Box, {
  name: "Root-Layout-Wrapper",
})`
  margin: 0 auto;
  max-width: 1440px;
  padding: 0px 100px;

  ${(props) => props.theme.breakpoints.down("xl")} {
    padding: 0px 130px;
  }
  ${(props) => props.theme.breakpoints.down("lg")} {
    padding: 0px 32px;
  }
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0px 12px;
  }
`;
