"use client";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Ray from "public/images/scholarships/ray.svg";
import React from "react";

type Props = {};

const ScholarshipCuriosity = (props: Props) => {
  const router = useRouter();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="rgba(255, 255, 255, 1)"
      padding={{
        lg: "64px 330px",
        md: "40px 100px",
        sm: "40px 16px",
        xs: "40px 16px",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="rgba(0, 48, 116, 1)"
        borderRadius="8px"
        gap="33px"
        justifyContent="center"
        alignItems="center"
        padding={{
          lg: "45px 193px",
          md: "45px 193px",
          sm: "40px 35px",
          xs: "40px 35px",
        }}
      >
        <Typography
          fontWeight={800}
          fontFamily="HankenGroteskExtraBold"
          fontSize={{ lg: "18px", md: "18px", sm: "20px", xs: "20px" }}
          lineHeight={{ lg: "23.4px", md: "23.4px", sm: "26px", xs: "26px" }}
          letterSpacing="-2%"
          color="rgba(255, 255, 255, 1)"
          textAlign="center"
        >
          Curious about which scholarships you qualify for?
        </Typography>

        <Box
          bgcolor="rgba(252, 250, 248, 1)"
          padding="12px 22px"
          borderRadius="8px"
          position="relative"
          onClick={() => router.push("/wisescore")}
          sx={{
            cursor: "pointer",
          }}
        >
          <Typography
            fontFamily="HankenGroteskSemiBold"
            fontWeight={600}
            fontSize="14px"
            lineHeight="16.8px"
            color="rgba(255, 107, 38, 1)"
          >
            Check your WiseScore®
          </Typography>

          <Box
            position="absolute"
            top={{ lg: "-10px", md: "-10px", sm: "-10px", xs: "-10px" }}
            left={{ lg: "200px", md: "190px", sm: "190px", xs: "175px" }}
          >
            <Ray />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ScholarshipCuriosity;
