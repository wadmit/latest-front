import { Box, styled } from "@mui/material";

export const StartApplyStyledContainerWrapper = styled(Box, {
  name: "Root-Layout-Wrapper",
})`
  margin: 0 0 0 0px;
  max-width: 1540px;
  padding: 0px 0px 0px 130px;

  ${(props) => props.theme.breakpoints.down("xl")} {
    padding: 0px 0px 0px 130px;
  }
  ${(props) => props.theme.breakpoints.down("lg")} {
    padding: 0px 0px 0px 60px;
  }
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0px 0px 0px 15px;
  }
`;

export const ThumbnailBoxWrapper = styled(Box)`
  @media (max-width: 300px) {
    width: calc(100vw - 40px) !important;
  }
`;

export const CountryBoxWrapper = styled(Box)`
  background-color: rgba(249, 248, 248, 1);
`;
