import React, { forwardRef, useContext } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import UniversityDetailContext from "@/context/university-detail-context";
import useCostConverter from "@/hooks/costConverter";
import type { IUniversityAdmissionCardPros } from "@/page-components/universities/utils/types";

const UniversityAdmissionCard = forwardRef(
  ({ getConvertedCosts }: IUniversityAdmissionCardPros, ref) => {
    const university = useContext(UniversityDetailContext);
    const getCostConvertor = useCostConverter();
    return (
      <Box
        id="admissions"
        ref={ref}
        borderRadius="12px"
        padding="35px 32px"
        border="1px solid #E9E9E9"
        bgcolor="white"
      >
        <Typography fontSize="24px" fontFamily="HankenGroteskExtraBold">
          Admissions at {university?.name}
        </Typography>
        <Box mb="24px" mt="24px" display="flex" flexDirection="column">
          <Typography fontSize="16px" color="black" lineHeight="160%">
            Application Fee
          </Typography>
          <Typography
            color="#1A4D2E"
            fontSize="18px"
            fontFamily="HankenGroteskExtraBold"
            lineHeight="150%"
          >
            {
              getConvertedCosts(
                university?.detail?.fees?.["Application Fee"],
                university.base_currency
              ).formattedValue
            }
          </Typography>
        </Box>

        <Divider />
        {(university.programs as any)?.detail?.documents &&
          (university.programs as any)?.detail?.documents.length > 0 && (
            <Box mt="24px">
              <Typography
                fontSize="24px"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="150%"
                color="#201C1A"
              >
                Documents Required to Apply.
              </Typography>
            </Box>
          )}
      </Box>
    );
  }
);

export default UniversityAdmissionCard;
