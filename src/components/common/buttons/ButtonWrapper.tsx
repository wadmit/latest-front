import React, { FC } from "react";
import { Button, ButtonProps, Typography } from "@mui/material";
import type { IIWapperButtonTypes } from "@/components/common/buttons/utils/types";

export function ButtonWrapper(props: IIWapperButtonTypes) {
  const { children, variant, ...rest } = props;
  return (
    <Button
      size="medium"
      sx={{
        width: "100%",
        "& 	.MuiButton-iconSizeLarge": {
          fontSize: 40,
        },
      }}
      disableElevation
      variant={variant || "contained"}
      {...rest}
    >
      {children}
    </Button>
  );
}
