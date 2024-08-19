"use client";
import React, { Suspense } from "react";
import { Box, Typography } from "@mui/material";

import dynamic from "next/dynamic";
import { RootContainer } from "@/components/common";

const WorkCard = dynamic(
  () => import("@/page-components/students/components/WorkCard"),
  {
    suspense: true,
  },
);

// how do we work section
function HowWeWork() {
  return (
    <RootContainer
      my={{ lg: "6.125rem", md: "6.125rem", sm: "4rem", xs: "3rem" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        gap={{ lg: "48px", md: "48px", sm: "40px", xs: "36px" }}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography
            component="h3"
            fontFamily="HankenGroteskExtraBold"
            fontSize={{ lg: "24px", md: "24px", sm: "24px", xs: "24px" }}
            lineHeight={{
              lg: "31.2px",
              md: "31.2px",
              sm: "31.2px",
              xs: "31.2px",
            }}
            letterSpacing={{ lg: "-2%", md: "-2%", sm: "-2%", xs: "-2%" }}
            color="rgba(32, 28, 26, 1)"
          >
            How does WiseAdmit work?
          </Typography>
        </Box>
        <Box>
          <Suspense fallback={<div>Loading...</div>}>
            <WorkCard />
          </Suspense>
        </Box>
      </Box>
    </RootContainer>
  );
}

export default HowWeWork;
