import React from "react";
import { Box } from "@mui/material";
import { IRootContainerProps } from "@/types/other";
import { StyledContainerWrapper } from "@/components/common";

export function RootContainer(props: IRootContainerProps) {
  const { children, component = "section", ...rest } = props;

  return (
    <Box zIndex={100} {...rest} component={component}>
      <StyledContainerWrapper>{children}</StyledContainerWrapper>
    </Box>
  );
}
