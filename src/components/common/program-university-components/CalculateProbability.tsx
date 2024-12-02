"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";

function CalculateProbability() {
  const router = useRouter();

  return (
    <Box
      position="relative"
      sx={{ backgroundColor: "#DEF5EC", overflow: "hidden" }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        gap="14px"
        alignItems={{
          lg: "center",
          md: "center",
          sm: "flex-start",
          xs: "flex-start",
        }}
        flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
        borderRadius="12px"
        padding="48px 24px 48px 32px"
      >
        <Stack gap="8px">
          <Typography
            lineHeight="150%"
            color="#201C1A"
            fontFamily="HankenGroteskExtraBold"
            fontSize="clamp(20px,28px,28px)"
          >
            Calculate your probability
          </Typography>
          <Typography
            fontSize="16px"
            fontFamily="HankenGroteskRegular"
            fontStyle="normal"
            lineHeight="160%"
          >
            All we need is a little more info
          </Typography>
        </Stack>
        <Box
          zIndex={10}
          sx={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/wisescore")}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
          padding="12px 19px"
          border="1px solid #00000099"
        >
          <Typography
            fontWeight={600}
            color="#FF6B26"
            fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
            fontFamily="HankenGroteskSemiBold"
            lineHeight={{
              lg: "19.2px",
              md: "19.2px",
              sm: "19.6px",
              xs: "19.6px",
            }}
          >
            {" "}
            Check your WiseScore®
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          top: 10,
          left: "42%",
          bottom: 0,
          right: 0,
          margin: "auto",
        }}
        position="absolute"
        zIndex={1}
      >
        <Image
          width={1000}
          height={179}
          style={{
            width: 152,
          }}
          src="/images/universities/phone-icon.webp"
          alt="phone icon"
        />
      </Box>
    </Box>
  );
}

export default CalculateProbability;
