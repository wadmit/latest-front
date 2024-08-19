import {
  Box,
  Stack,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
} from "@mui/material";
import React from "react";
import {
  QontoConnector,
  QontoStepIconRoot,
} from "@/page-components/dashboard/applications/styled-components";
import { applicationStepperSteps } from "@/page-components/dashboard/applications/utils/provider";

type Props = {
  activeStep: number;
};

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Box
          sx={{
            height: "20px",
            width: "20px",
            borderRadius: "50%",
            backgroundColor: "#479F76",
          }}
        />
      ) : (
        // <Check className="QontoStepIcon-completedIcon" />
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

const ApplicationStepper = ({ activeStep }: Props) => {
  return (
    <Box
      display={{ lg: "flex", md: "flex", xs: "none" }}
      sx={{ width: "100%" }}
    >
      <Stack sx={{ width: "100%" }} spacing={4}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<QontoConnector />}
        >
          {applicationStepperSteps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontFamily: "HankenGroteskRegular",
                    fontSize: "14px",
                    fontStyle: "normal",
                    lineHeight: "140%",
                  },
                }}
                StepIconComponent={QontoStepIcon}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </Box>
  );
};

export default ApplicationStepper;
