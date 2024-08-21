"use client";

import { Box } from "@mui/material";
import React from "react";
import NavbarSignInUp from "@/page-components/apply-now/components/NavbarSignInUp";
import {
  BoxWrapper,
  ResponsiveBox,
} from "@/page-components/apply-now/utils/provider";
import Image from "next/image";
import SignUpForm from "@/page-components/apply-now/components/SignUpForm";

function SignUp({
  handleLoginPages,
}: {
  handleLoginPages: (state: boolean) => void;
}) {
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
        <SignUpForm handleLoginPages={handleLoginPages} />
        <Box
          display={{
            md: "flex",
            xs: "none",
          }}
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
          flex={0.8}
          position="relative"
        >
          <Box
            position="relative"
            minHeight={{
              md: "420px",
            }}
            height={{
              md: "100%",
            }}
            minWidth={{
              md: "420px",
            }}
            width={{
              md: "100%",
            }}
          >
            <Image
              alt="WiseAdmit Login"
              loading="lazy"
              fill
              objectFit="contain"
			src="/images/auth/signup-hero.webp"
            />
          </Box>
        </Box>
      </BoxWrapper>
    </>
  );
}

export default SignUp;
