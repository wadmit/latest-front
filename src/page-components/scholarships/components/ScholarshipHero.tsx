"use client";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ScholarshipBigHero from "public/images/scholarships/BigHero.svg";
import ScholarshipMobileHero from "public/images/scholarships/MobileHero.svg";
import ScholarshipHat from "public/images/scholarships/hat.svg";
import ScholarshipHatMobile from "public/images/scholarships/hat-small.svg";
import React from "react";
import { ScholarshipHeaderContainer } from "../styled-components";

const ScholarshipHero = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    // <ScholarshipHeaderContainer>
    <Box
      display="flex"
      bgcolor="rgba(249, 249, 252, 1)"
      justifyContent="center"
      alignItems="center"
      flexDirection={{
        lg: "row",
        md: "row",
        sm: "column-reverse",
        xs: "column-reverse",
      }}
      padding={{
        lg: "84px 128px",
        md: "84px 128px",
        sm: "26px 10px 26px 10px",
        xs: "26px 15px",
      }}
      gap={{ lg: "0px", md: "0px", sm: "25px", xs: "25px" }}
    >
      <Box position="relative">
        <Typography
          fontFamily="HankenGroteskExtraBold"
          fontWeight={800}
          component="h1"
          fontSize={{
            lg: "48px",
            md: "48px",
            sm: "32px",
            xs: "32px",
          }}
          lineHeight={{
            lg: "62.4px",
            md: "62.4px",
            sm: "41.6px",
            xs: "41.6px",
          }}
          letterSpacing="-2%"
          color="rgba(32, 28, 26, 1)"
          ml={{ lg: "0px", md: "0px", sm: "10px", xs: "10px" }}
        >
          Find your perfect{" "}
          <Typography
            fontFamily="HankenGroteskExtraBold"
            fontWeight={800}
            component="span"
            fontSize={{
              lg: "48px",
              md: "48px",
              sm: "32px",
              xs: "32px",
            }}
            lineHeight={{
              lg: "62.4px",
              md: "62.4px",
              sm: "41.6px",
              xs: "41.6px",
            }}
            letterSpacing="-2%"
            color="rgba(170, 68, 1, 1)"
            borderBottom="4px dotted rgba(170, 68, 1, 1)"
          >
            scholarship
          </Typography>
          match
        </Typography>
        <Box
          position="absolute"
          top={{ lg: "-50px", md: "-50px", sm: "-40px", xs: "-30px" }}
          left={{ lg: "350px", md: "350px", sm: "500px", xs: "250px" }}
        >
          {isMobile ? <ScholarshipHatMobile /> : <ScholarshipHat />}
        </Box>
      </Box>

      <Box>{isMobile ? <ScholarshipMobileHero /> : <ScholarshipBigHero />}</Box>
    </Box>
    // </ScholarshipHeaderContainer>
  );
};

export default ScholarshipHero;
