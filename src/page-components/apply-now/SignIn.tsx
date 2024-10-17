"use client";

import { theme } from "@/common/muicustomtheme/theme";
import NavbarSignInUp from "@/page-components/apply-now/components/NavbarSignInUp";
import SignInForm from "@/page-components/apply-now/components/SignInForm";
import { BoxWrapper } from "@/page-components/apply-now/utils/provider";
import { Box, useMediaQuery } from "@mui/material";
import Image from "next/image";

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
          display={{
            md: "flex",
            xs: "none",
          }}
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
              md: "85%",
            }}
            width={{
              md: "80%",
            }}
          >
            <Image
              alt="WiseAdmit Login"
              loading="lazy"
              fill
              objectFit="contain"
              src="/images/auth/applynow-hero.webp"
              // width="100%"
              // height="100%"
            />
          </Box>
        </Box>
        {/* <SignInImage /> */}
      </BoxWrapper>
    </>
  );
}

export default SignIn;
