"use client";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { RootContainer } from "@/components/common";
import { supportedByData } from "@/page-components/students/utils/provider";
import SupportedByCard from "@/page-components/students/components/SupportedByCard";

function SupportedBy() {
  return (
    <RootContainer
      py={{ lg: "0.25rem", md: "1.25rem", sm: "1rem", xs: "0.1rem" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          fontFamily="HankenGroteskExtraBold"
          fontSize={{ lg: "20px", md: "20px", sm: "20px", xs: "18px" }}
          lineHeight="26px"
          component="h3"
          letterSpacing="-2%"
          color="rgba(0, 0, 0, 0.6)"
          mb="1.875rem"
        >
          We are supported by
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          gap={{ lg: 8, xs: 3 }}
          flexWrap="wrap"
        >
          {supportedByData.map((item) => (
            <SupportedByCard item={item} key={`_${item.title}`} />
          ))}
        </Stack>
      </Box>
    </RootContainer>
  );
}

export default SupportedBy;
