"use client";
import { Box, Typography, useMediaQuery } from "@mui/material";
import BigHero from "public/images/scholarships/BigTwo.webp";
import SmallHero from "public/images/scholarships/SmallTwo.webp";
import ScholarshipHat from "public/images/scholarships/hat.svg";
import ScholarshipHatMobile from "public/images/scholarships/hat-small.svg";
import React from "react";
import { ScholarshipHeaderContainer } from "../styled-components";
import { RootContainer } from "@/components/common";
import Image from "next/image";

const ScholarshipHero = () => {
  const isMobile = useMediaQuery("(max-width:830px)");
  return (
    // <ScholarshipHeaderContainer>
    <Box
      // display="flex"
      bgcolor="rgba(249, 249, 252, 1)"
      // justifyContent="center"
      // alignItems="center"
      // flexDirection={{
      //   lg: "row",
      //   md: "row",
      //   sm: "column-reverse",
      //   xs: "column-reverse",
      // }}
      // padding={{
      //   lg: "74px 108px",
      //   md: "74px 128px",
      //   sm: "26px 15px",
      //   xs: "26px 15px",
      // }}
      // gap={{ lg: "0px", md: "0px", sm: "25px", xs: "25px" }}
    >
      <RootContainer>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection={{
            lg: "row",
            md: "row",
            sm: "column-reverse",
            xs: "column-reverse",
          }}
          gap={{ lg: "0px", md: "0px", sm: "25px", xs: "25px" }}
        >
          <Box position="relative">
            <Box width={{ lg: "388px", md: "350px", sm: "100%", xs: "100%" }}>
              <Typography
                fontFamily="HankenGroteskExtraBold"
                fontWeight={800}
                component="h1"
                fontSize={{
                  lg: "44px",
                  md: "44px",
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
                    lg: "44px",
                    md: "44px",
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
                </Typography>{" "}
                match
              </Typography>
            </Box>
            <Box
              position="absolute"
              top={{ lg: "-50px", md: "-50px", sm: "-40px", xs: "-30px" }}
              left={{ lg: "350px", md: "350px", sm: "500px", xs: "250px" }}
            >
              {isMobile ? <ScholarshipHatMobile /> : <ScholarshipHat />}
            </Box>
          </Box>

          <Box>
            {/* {isMobile ? <ScholarshipMobileHero /> : <ScholarshipBigHero />} */}
            {isMobile ? (
              <Image
                width={1000000}
                height={1}
                style={{
                  width: "100%",
                  // height: { lg: "472px", md: "450px", sm: "100%", xs: "100%" },
                  // height: "290px",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="Small Hero"
                //   src={`${imageUrl}/${scholarship.scholarship.scholarshipCoverImage}`}
                src={SmallHero}
              />
            ) : (
              <Image
                width={1000000}
                height={1}
                style={{
                  width: "100%",
                  // height: { lg: "472px", md: "450px", sm: "100%", xs: "100%" },
                  // height: "290px",
                  height: "100%",
                  objectFit: "cover",
                }}
                alt="Big Hero"
                src={BigHero}
                // src={SingleImg}
              />
            )}
          </Box>
        </Box>
      </RootContainer>
    </Box>
  );
};

export default ScholarshipHero;
