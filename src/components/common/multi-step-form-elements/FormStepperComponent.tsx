import { theme } from "@/common/muicustomtheme/theme";
import { FormStepperProps } from "@/types/other";
import { Box, StepButton, Stepper, Typography } from "@mui/material";
import React from "react";
import { StyledSteps } from "@/components/common/form-components/StyledSteps";

const FormStepperComponent = ({
  activeStep,
  steps,
  completed,
  handleStep,
  width,
}: FormStepperProps) => {
  return (
    <Box sx={{ width, mx: "auto" }}>
      <Stepper
        nonLinear
        activeStep={activeStep}
        orientation="horizontal"
        sx={{
          "& .MuiStepConnector-line": {
            borderTopStyle: "dashed",
            borderColor: theme.palette.primary.light,
          },
        }}
      >
        {steps.map((label, index) => (
          <StyledSteps key={label} completed={completed[index]} disabled>
            <StepButton
              color="inherit"
              onClick={handleStep(index)}
              disableRipple
            >
              <Typography variant="subtitle1">{label}</Typography>
            </StepButton>
          </StyledSteps>
        ))}
      </Stepper>
    </Box>
  );
};

export default FormStepperComponent;
