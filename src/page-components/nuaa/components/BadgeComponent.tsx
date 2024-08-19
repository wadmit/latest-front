"use client";
import React from "react";
import { TBadgeProps } from "@/page-components/nuaa/types";
import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import { theme } from "@/common/muicustomtheme/theme";
import { Badge } from "@/page-components/nuaa/svg";

const BadgeComponent = ({ title, number }: TBadgeProps) => {
  const isTab = useMediaQuery(theme.breakpoints.up("sm"));
  const isMobile = useMediaQuery(theme.breakpoints.up("xs"));
  return (
    <Stack
      direction={{ xs: "column-reverse", lg: "row" }}
      textAlign={"center"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Typography
        mr="24px"
        fontSize={"16px"}
        fontFamily="HankenGroteskSemiBold"
        color={"#4B6065"}
      >
        {title}
      </Typography>
      <Box position={"relative"}>
        <Box display={{ lg: "flex" }}>
          <Badge isMobile={isMobile && isTab} size={"big"} />
        </Box>
        <Box
          position={{ xs: "absolute", lg: "absolute" }}
          top={{ xs: "6px", sm: "28px", md: "30px", lg: "18px" }}
          right={{ xs: "11px", sm: "34px", md: "34px", lg: "27px" }}
        >
          <Typography
            fontSize={{ xs: "16px", lg: "32px" }}
            fontFamily="HankenGroteskExtraBold"
            color={"#FFD788"}
          >
            {number}
          </Typography>
        </Box>
      </Box>
    </Stack>
  );
};

export default BadgeComponent;
