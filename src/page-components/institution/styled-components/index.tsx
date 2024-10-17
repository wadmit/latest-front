"use client";
import { IRootContainerProps } from "@/types/other";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainerWrapper = styled(Box, {
  name: "Root-Layout-Wrapper",
})`
  margin: 0 auto;
  max-width: 1440px;
  padding: 0px 10px 0px 100px;

  ${(props) => props.theme.breakpoints.down("xl")} {
    padding: 0px 130px;
  }
  ${(props) => props.theme.breakpoints.down("lg")} {
    padding: 0px 32px;
  }
  ${(props) => props.theme.breakpoints.down("sm")} {
    padding: 0px 10px 0px 12px;
  }
`;

export function InstitutionHeaderContainer(props: IRootContainerProps) {
  const { children, component = "section", ...rest } = props;

  return (
    <Box zIndex={100} {...rest} component={component}>
      <StyledContainerWrapper>{children}</StyledContainerWrapper>
    </Box>
  );
}
