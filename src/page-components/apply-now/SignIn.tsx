"use client";

import React, { useState } from "react";
import { BoxWrapper } from "@/page-components/apply-now/utils/provider";
import { Box, useMediaQuery } from "@mui/material";
import { Flower, RainBow, Star } from "@/page-components/apply-now/svg";
import { theme } from "@/common/muicustomtheme/theme";
import NavbarSignInUp from "@/page-components/apply-now/components/NavbarSignInUp";
import SignInForm from "@/page-components/apply-now/components/SignInForm";

function SignIn({
  handleLoginPages,
}: {
  handleLoginPages: (state: boolean) => void;
}) {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <NavbarSignInUp />
      <BoxWrapper
        height={{
          lg: "100vh",
          md: "100vh",
          sm: "calc(100vh - 5rem)",
          xs: "calc(100vh - 5rem)",
        }}
        minHeight={{
          lg: "100vh",
          md: "100vh",
          sm: "calc(100vh - 5rem)",
          xs: "calc(100vh - 5rem)",
        }}
        alignItems={{
          lg: "center",
          md: "center",
          sm: "flex-start",
          xs: "flex-start",
        }}
        flexDirection={{
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column",
        }}
        padding={{
          lg: " 0px 0px 0px 126px",
          md: "0px 0px 0px 126px",
          sm: "0px 15px",
          xs: "0px 15px",
        }}
      >
        <SignInForm handleLoginPages={handleLoginPages} />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
          flex={0.6}
          position="relative"
          // bgcolor="rgba(0, 0, 0, 0.5)"
        >
          <Box
            position="relative"
            height={{
              lg: "86%",
              md: "85%",
              sm: "86%",
              xs: "86%",
            }}
            width={{
              lg: "70%",
              md: "80%",
              sm: "100%",
              xs: "100%",
            }}
          >
            <img
              alt="WiseAdmit Login"
              loading="lazy"
              src="/images/auth/signintwo.png"
              width="100%"
              height="100%"
            />

            <Box
              zIndex={100001}
              bottom={{ lg: "40%", md: "30%", sm: "10%", xs: "10%" }}
              left={{ lg: "40%", md: "20%", sm: "15%", xs: "25%" }}
              position="absolute"
            >
              <img
                src={
                  isMobile
                    ? "/images/auth/applynow_popup_mbg.png"
                    : "/images/auth/SignInBrief.svg"
                }
                alt=""
              />
            </Box>
          </Box>

          <Box
            position="absolute"
            top={{ lg: "10%", md: "10%", sm: "85%", xs: "85%" }}
            left="30px"
          >
            <Star />
          </Box>
          <Box
            display={{
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
            }}
            position="absolute"
            top="5%"
            right="30px"
          >
            <Flower />
          </Box>
          <Box
            position="absolute"
            top="8%"
            right={{ lg: "0px", md: "20px", sm: 0, xs: "-10px" }}
          >
            <RainBow />
          </Box>
          <Box
            display={{
              lg: "block",
              md: "block",
              sm: "none",
              xs: "none",
            }}
            position="absolute"
            bottom="1.5%"
            right="10%"
          >
            <Flower />
          </Box>
        </Box>
        {/* <SignInImage /> */}
      </BoxWrapper>
    </>
  );
}

export default SignIn;
