"use client";
import { IRootContainerProps } from "@/types/other";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainerWrapper = styled(Box, {
  name: "Root-Layout-Wrapper",
})`
  margin: 0 auto;
  max-width: 1440px;
  padding: 84px 124px;
`;

export function ScholarshipHeaderContainer(props: IRootContainerProps) {
  const { children, component = "section", ...rest } = props;

  return (
    <Box zIndex={100} {...rest} component={component}>
      <StyledContainerWrapper>{children}</StyledContainerWrapper>
    </Box>
  );
}
