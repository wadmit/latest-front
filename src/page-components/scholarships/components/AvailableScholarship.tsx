"use client";
import { RootContainer } from "@/components/common";
import { Box, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const AvailableScholarship = (props: Props) => {
  const searchParams = useSearchParams();
  const wiseScore = searchParams.get("wisescore") ?? 0;
  console.log("🚀 ~ AvailableScholarship ~ wiseScore:", wiseScore);

  const mainWisescore = localStorage.getItem("wisescore");
  console.log("🚀 ~ AvailableScholarship ~ mainWisescore:", mainWisescore);

  const hasWiseScore = !!wiseScore;
  console.log("🚀 ~ AvailableScholarship ~ hasWiseScore:", hasWiseScore);

  const hasMainWiseScore = !!mainWisescore;
  console.log("🚀 ~ AvailableScholarship ~ mainWisescore:", mainWisescore);

  return (
    <Box
      bgcolor={
        hasMainWiseScore ? "rgba(229, 242, 255, 1)" : "rgba(240, 234, 230, 1)"
      }
    >
      <RootContainer
        mt={{ lg: "6rem", md: "6rem", sm: "5rem", xs: "4rem" }}
        mb="6.25rem"
      >
        <Box
          display="flex"
          gap="8px"
          flexDirection="column"
          mb={{ lg: "48px", md: "48px", sm: "42px", xs: "28px" }}
        >
          <Typography
            fontWeight={800}
            fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "24px" }}
            fontFamily="HankenGroteskExtraBold"
            lineHeight={{
              lg: "36.4px",
              md: "36.4px",
              sm: "31.2px",
              xs: "31.2px",
            }}
            letterSpacing="-2%"
            color="rgba(32, 28, 26, 1)"
            // textAlign="center"
          >
            {hasMainWiseScore ? "Your matched scholarships" : "Scholarships"}
          </Typography>

          <Typography
            fontWeight={400}
            fontFamily="HankenGroteskRegular"
            fontSize={{ lg: "18px", md: "18px", sm: "14px", xs: "14px" }}
            lineHeight={{
              lg: "25.2px",
              md: "25.2px",
              sm: "19.6px",
              xs: "19.6px",
            }}
            color="rgba(32, 28, 26, 0.9)"
          >
            {hasMainWiseScore
              ? "Based on your WiseScore®, we’ve matched you with scholarships perfect for your academic profile."
              : "Find fully and partially funded scholarships for international students. Study in top universities and experience a new culture."}
          </Typography>
        </Box>
      </RootContainer>
    </Box>
  );
};

export default AvailableScholarship;
