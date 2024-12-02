import React, { forwardRef, useContext, useEffect, useState } from "react";
import { Divider, Grid, Typography, Box } from "@mui/material";
import UniversityDetailContext from "@/context/university-detail-context";
import useCostConverterMain from "@/hooks/costConverterMain";

const UniversityCost = forwardRef((unknown, ref) => {
  const university = useContext(UniversityDetailContext);
  const getConvertedCosts = useCostConverterMain();

  return (
    <Box
      ref={ref}
      border="1px solid #E9E9E9"
      borderRadius="8px"
      id="costs"
      bgcolor="white"
      p={3}
      display="flex"
      flexDirection="column"
      gap="25px"
    >
      <Box display="flex" flexDirection="column" gap="22px">
        <Box>
          <Typography
            fontSize="24px"
            fontStyle="normal"
            fontFamily="HankenGroteskExtraBold"
            lineHeight="150%"
            letterSpacing="-0.48px"
            color="#201C1A"
          >
            Cost of studying at {university?.name}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" gap="10px">
          <Typography
            fontSize="20px"
            fontStyle="normal"
            fontFamily="HankenGroteskExtraBold"
            lineHeight="150%"
            letterSpacing="-0.4px"
            color="var(--text-day-placeholder, rgba(32, 28, 26, 0.55))"
          >
            Overall Cost (apx)
          </Typography>
          <Typography
            fontSize="28px"
            fontStyle="normal"
            fontFamily="HankenGroteskExtraBold"
            lineHeight="150%"
            letterSpacing="-0.56px"
            color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
          >
            {
              // university.detail.fees['Average Tution Fee/Year'] +

              university.detail.fees["On-Campus Acommodation/Year"] +
              university.detail.fees["Cost of Living"]
                ? // && values.length > 0 ? convertedCosts[0]
                  `${
                    getConvertedCosts(
                      // university.detail.fees['Average Tution Fee/Year'] +
                      university.detail.fees["On-Campus Acommodation/Year"] +
                        university.detail.fees["Cost of Living"],
                      university.base_currency
                    ).formattedValue
                  }`
                : null
            }{" "}
            /yr
            {/* {values.length > 0 ? convertedCosts[0] : ""}{' '} */}
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid item xs={6} sm={6} md={3} lg={4}>
            <Box display="flex" flexDirection="column" gap="16px">
              <Typography
                fontSize="16px"
                fontStyle="normal"
                fontFamily="HankenGroteskSemiBold"
                lineHeight="160%"
                color="var(--text-day-placeholder, rgba(32, 28, 26, 0.55))"
              >
                On-Campus acommodation
              </Typography>
              <Typography
                fontSize="18px"
                fontStyle="normal"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="150%"
                letterSpacing="-0.36px"
                color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
              >
                {/* {values.length > 0 ? convertedCosts[2] : ""} */}
                {`${
                  getConvertedCosts(
                    university.detail.fees["On-Campus Acommodation/Year"],
                    university.base_currency
                  ).formattedValue
                }`}{" "}
                /yr
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6} sm={6} md={3} lg={2.7}>
            <Box display="flex" flexDirection="column" gap="16px">
              <Typography
                fontSize="16px"
                fontStyle="normal"
                fontFamily="HankenGroteskSemiBold"
                lineHeight="160%"
                color="var(--text-day-placeholder, rgba(32, 28, 26, 0.55))"
              >
                Cost of Living
              </Typography>
              <Typography
                fontSize="18px"
                fontStyle="normal"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="150%"
                letterSpacing="-0.36px"
                color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
              >
                {/* {values.length > 0 ? convertedCosts[3] : ""} */}
                {`${
                  getConvertedCosts(
                    university.detail.fees["Cost of Living"],
                    university.base_currency
                  ).formattedValue
                }`}{" "}
                /yr
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
});

export default UniversityCost;
