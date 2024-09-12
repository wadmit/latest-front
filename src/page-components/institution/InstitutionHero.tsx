"use client";
import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { RootContainer } from "@/components/common";
import Image from "next/image";
import InstitutionHeroSvg from "$/images/institution/InstitutionHero.svg";
import InstitutionHeroMobileSvg from "$/images/institution/InstitutionHeroMobile.svg";
import { InstitutionHeaderContainer } from "./styled-components";

function InstitutionHero() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box bgcolor="rgba(240, 234, 230, 1)">
      <InstitutionHeaderContainer>
        <Box
          display="flex"
          flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
          justifyContent="space-between"
        >
          <Box
            pt={{ lg: "140px", md: "140px", sm: "32px", xs: "32px" }}
            display={{ lg: "block", md: "block", sm: "none", xs: "none" }}
          >
            <Typography
              component={"h1"}
              fontFamily="HankenGroteskExtraBold"
              lineHeight={{
                lg: "57.4px",
                md: "57.4px",
                sm: "38.4px",
                xs: "38.4px",
              }}
              color="rgba(32, 28, 26, 1)"
              fontSize={{
                lg: "48px",
                md: "48px",
                sm: "32px",
                xs: "32px",
              }}
              letterSpacing={{ lg: "-3%", md: "-3%", sm: "-2%", xs: "-2%" }}
            >
              Scale up your{" "}
              <Typography
                fontWeight={800}
                fontFamily="HankenGroteskExtraBold"
                lineHeight={{
                  lg: "57.4px",
                  md: "57.4px",
                  sm: "38.4px",
                  xs: "38.4px",
                }}
                color="rgba(170, 68, 1, 1)"
                borderBottom="4px dotted rgba(170, 68, 1, 1)"
                fontSize={{
                  lg: "48px",
                  md: "48px",
                  sm: "32px",
                  xs: "32px",
                }}
                letterSpacing={{ lg: "-3%", md: "-3%", sm: "-2%", xs: "-2%" }}
              >
                recruitment
              </Typography>
            </Typography>

            <Typography
              component={"p"}
              fontSize="16px"
              fontFamily="HankenGroteskRegular"
              color="rgba(55, 51, 49, 1)"
              mt="24px"
              // opacity={0.9}
              lineHeight="22.4px"
              letterSpacing={{ lg: "-3%", md: "-3%", sm: "-2%", xs: "-2%" }}
              width={{ lg: "560px", md: "398px", sm: "100%", xs: "100%" }}
            >
              Increase your institution’s global presence and get access to over
              thousands of international students with our all-in-one
              proprietary platform.
            </Typography>

            <Button
              onClick={() => router.push("/joinus")}
              sx={{
                bgcolor: "rgba(255, 107, 38, 1)",
                width: "fit-content",
                minWidth: "187px",
                borderRadius: "8px",
                padding: "16.5px 46px",
                mt: { lg: "43px", md: "43px", sm: "18px", xs: "18px" },
                color: "white",
                textTransform: "none",
              }}
            >
              Partner with us
            </Button>
          </Box>

          {/* For mobile screen */}
          <Box
            pt={{ lg: "140px", md: "140px", sm: "32px", xs: "32px" }}
            display={{ lg: "none", md: "none", sm: "block", xs: "block" }}
          >
            <Typography
              component={"h1"}
              fontFamily="HankenGroteskExtraBold"
              lineHeight={{
                lg: "57.4px",
                md: "57.4px",
                sm: "38.4px",
                xs: "38.4px",
              }}
              color="rgba(32, 28, 26, 1)"
              fontSize={{
                lg: "48px",
                md: "48px",
                sm: "32px",
                xs: "32px",
              }}
              letterSpacing={{ lg: "-3%", md: "-3%", sm: "-2%", xs: "-2%" }}
            >
              Scale up your <br />{" "}
              <Typography
                fontWeight={800}
                fontFamily="HankenGroteskExtraBold"
                lineHeight={{
                  lg: "57.4px",
                  md: "57.4px",
                  sm: "38.4px",
                  xs: "38.4px",
                }}
                color="rgba(170, 68, 1, 1)"
                borderBottom="4px dotted rgba(170, 68, 1, 1)"
                fontSize={{
                  lg: "48px",
                  md: "48px",
                  sm: "32px",
                  xs: "32px",
                }}
                letterSpacing={{ lg: "-3%", md: "-3%", sm: "-2%", xs: "-2%" }}
              >
                recruitment
              </Typography>
            </Typography>

            <Typography
              component={"p"}
              fontWeight={400}
              fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
              fontFamily="HankenGroteskRegular"
              color="rgba(55, 51, 49, 1)"
              mt="24px"
              // opacity={0.9}
              lineHeight="22.4px"
              letterSpacing={{ lg: "-3%", md: "-3%", sm: "-2%", xs: "-2%" }}
              width={{ lg: "560px", md: "398px", sm: "100%", xs: "100%" }}
            >
              Increase your institution’s global presence and get access to over
              thousands of international students with our all-in-one
              proprietary platform.
            </Typography>

            <Button
              onClick={() => router.push("/joinus")}
              sx={{
                bgcolor: "rgba(255, 107, 38, 1)",
                width: "fit-content",
                minWidth: "187px",
                borderRadius: "8px",
                padding: "16.5px 46px",
                mt: { lg: "43px", md: "43px", sm: "18px", xs: "18px" },
                color: "white",
                textTransform: "none",
              }}
            >
              Partner with us
            </Button>
          </Box>

          {/* <Box> */}
          {isMobile ? <InstitutionHeroMobileSvg /> : <InstitutionHeroSvg />}
          {/* </Box> */}
        </Box>
      </InstitutionHeaderContainer>
    </Box>
  );
}

export default InstitutionHero;
