"use client";
import React, { useContext } from "react";
import styled from "@emotion/styled";
import { Box, Checkbox, CheckboxProps, Typography } from "@mui/material";
import WiseScoreDetailsContext from "@/context/wisescore-context";

interface ICheckboxInputProps extends CheckboxProps {
  isChecked?: boolean;
  checkBoxLabel: string;
}
interface StyledCheckBoxProps {
  primaryColor: string;
}

// Use the styled function with the interface
const StyledCheckBox = styled(Checkbox)<StyledCheckBoxProps>(
  ({ theme, primaryColor }) => ({
    color: "#000000",
    padding: "0px",
    // also give border
    "&.Mui-checked": {
      color: primaryColor,
    },
  })
);

const StyledTypography = styled(Typography)`
  color: #000000;
  font-size: 18px;
  font-family: HankenGroteskRegular;
  font-weight: 400;
  line-height: 23.4px;
`;

function CheckboxInput({
  isChecked,
  checkBoxLabel,
  onClick,
  ...rest
}: ICheckboxInputProps) {
  const { primaryColor, secondaryColor } = useContext(WiseScoreDetailsContext);
  return (
    <Box
      minWidth="200px"
      display="flex"
      alignItems="center"
      borderRadius="8px"
      border="1px solid #ADADAD"
      boxShadow={isChecked ? "0px 8px 20px 0px rgba(0, 0, 0, 0.06)" : "0px"}
      padding="20px 40px"
      width={{ lg: "fit-content", md: "fit-content", sm: "100%", xs: "100%" }}
      justifyContent="flex-start"
      gap="10px"
      component={"button"}
      sx={{
        cursor: "pointer",
        backgroundColor: "#ffffff",
      }}
      onClick={(e) => {
        onClick && onClick(e);
      }}
    >
      <StyledCheckBox
        checked={isChecked}
        {...rest}
        primaryColor={primaryColor}
      />
      <StyledTypography>{checkBoxLabel}</StyledTypography>
    </Box>
  );
}

export default CheckboxInput;
