"use client";
import React from "react";
import { StyledContainerWrapper } from "@/components/common";
import { Box, Typography } from "@mui/material";
import {
  FORM_VALIDATION_PARTNER,
  initialValuesPartnerForm,
  validationArray,
} from "@/page-components/joinus/utils/formik-validation";
import {
  BusinessInformation,
  ContactInformation,
  RecruitmentInformation,
} from "@/page-components/joinus/components";
import PartnerCollaborationMultiStepForm from "@/page-components/joinus/forms/PartnerCollaborationMultiStepForm";

const PartnerCollaborationForm = () => {
  const steps = [
    "Contact Information",
    "Business Information",
    "Recruitment Information",
  ];
  return (
    <Box bgcolor="rgba(236, 237, 255, 1)" pb={16} sx={{ position: "relative" }}>
      <Box
        width="100%"
        height="600px"
        top={-50}
        position="absolute"
        zIndex={10}
        sx={{ backgroundImage: "url(/images/partners/partner-vector.webp)" }}
      />
      <StyledContainerWrapper sx={{ zIndex: 11, position: "relative" }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            display="flex"
            justifyContent="center"
            pb="48px"
            pt="48px"
            alignItems="center"
            flexDirection="column"
            gap="24px"
            bgcolor="rgba(236, 237, 255, 1)"
            width="800px"
          >
            <Typography
              fontFamily="HankenGroteskExtraBold"
              fontWeight={800}
              fontSize={{ lg: "48px", md: "32px", sm: "28px", xs: "28px" }}
              lineHeight={{
                lg: "62.4px",
                md: "41.6px",
                sm: "36.4px",
                xs: "36.4px",
              }}
              letterSpacing={{ lg: "-2%", md: "-2%", sm: "-3%", xs: "-3%" }}
              color="rgba(32, 28, 26, 1)"
              textAlign="center"
              component="h1"
            >
              Become a partner, or <br />
              <Typography
                fontFamily="HankenGroteskExtraBold"
                fontWeight={800}
                fontSize={{ lg: "48px", md: "32px", sm: "28px", xs: "28px" }}
                lineHeight={{
                  lg: "62.4px",
                  md: "41.6px",
                  sm: "36.4px",
                  xs: "36.4px",
                }}
                letterSpacing={{ lg: "-2%", md: "-2%", sm: "-3%", xs: "-3%" }}
                color="rgba(170, 68, 1, 1)"
                textAlign="center"
                borderBottom="6px dotted rgba(170, 68, 1, 1)"
              >
                partner with WiseAdmit
              </Typography>
            </Typography>

            <Typography
              fontFamily="HankenGroteskRegular"
              fontWeight={400}
              fontSize={{ lg: "14px", md: "14px", sm: "14px", xs: "14px" }}
              lineHeight="19.6px"
              color="rgba(32, 28, 26, 0.9)"
              textAlign="center"
              component="span"
            >
              Complete the form below and our team will be in contact with you
              soon
            </Typography>
          </Box>
        </Box>
        <Box
          // mt="47px"
          maxWidth="1000px"
          width="100%"
          mx="auto"
          bgcolor="common.white"
          borderRadius="12px"
        >
          <PartnerCollaborationMultiStepForm
            initialValues={initialValuesPartnerForm}
            validationSchema={FORM_VALIDATION_PARTNER}
            pages={[
              <ContactInformation />,
              <BusinessInformation />,
              <RecruitmentInformation />,
            ]}
            steps={steps}
            pageValidationFields={validationArray}
          />
        </Box>
      </StyledContainerWrapper>
    </Box>
  );
};

export default PartnerCollaborationForm;
