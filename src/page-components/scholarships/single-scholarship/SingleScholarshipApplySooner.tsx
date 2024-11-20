"use client";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Ray from "public/images/scholarships/ray.svg";
import React from "react";

type Props = {};

const SingleScholarshipApplySooner = (props: Props) => {
  const router = useRouter();
  return (
    <Box
      borderRadius="8px"
      padding="32px 24px"
      bgcolor="#FFFFFF"
      border="1px solid #E9E9E9"
    >
      <Typography
        fontWeight={400}
        lineHeight={{ lg: "25.2px", md: "25.2px", sm: "22.4px", xs: "22.4px" }}
        color="#201C1A"
        fontSize={{ lg: "18px", md: "18px", sm: "16px", xs: "16px" }}
        fontFamily="HankenGroteskRegular"
      >
        The sooner you apply, the more <br /> scholarship you unlock.{" "}
        <Typography
          fontWeight={800}
          fontFamily="HankenGroteskExtraBold"
          fontSize={{ lg: "18px", md: "18px", sm: "16px", xs: "16px" }}
          lineHeight={{
            lg: "23.4px",
            md: "23.4px",
            sm: "20.8px",
            xs: "20.8px",
          }}
          letterSpacing="-2%"
          color="#AA4401"
        >
          Don't miss out!
        </Typography>
      </Typography>
      <Box display="flex" gap="-10px">
        <Box
          mt="24px"
          border="1px solid #83868B"
          width="fit-content"
          borderRadius="8px"
          padding="11px 17px"
          bgcolor="#FFFFFF"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="12px"
          onClick={() => router.push("/applynow")}
          sx={{
            cursor: "pointer",
          }}
        >
          <Typography
            fontWeight={600}
            fontFamily="HankenGroteskSemiBold"
            color="#FF6B26"
            fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
            lineHeight={{
              lg: "19.2px",
              md: "19.2px",
              sm: "16.8px",
              xs: "16.8px",
            }}
          >
            Apply now
          </Typography>
        </Box>
        <Box mt="10px">
          <Ray />
        </Box>
      </Box>
    </Box>
  );
};

export default SingleScholarshipApplySooner;
