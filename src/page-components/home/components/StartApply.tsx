import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import {
  LeftFaced,
  RightFaced,
  SmallLeftFaced,
  SmallRightFaced,
  SmallStar,
  Star,
} from "@/page-components/home/svg";

function StartApply() {
  const theme = useTheme();
  const router = useRouter();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box bgcolor="rgba(246, 241, 238, 1)">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding={{ lg: "96px", md: "96px", sm: "64px 0px", xs: "64px 0px" }}
        position="relative"
      >
        <Typography
          fontFamily="HankenGroteskExtraBold"
          fontSize={{ lg: "48px", md: "48px", sm: "28px", xs: "28px" }}
          lineHeight={{
            lg: "62.4px",
            md: "62.4px",
            sm: "36.4px",
            xs: "36.4px",
          }}
          letterSpacing={{ lg: "-2%", md: "-2%", sm: "-3%", xs: "-3%" }}
          color="rgba(32, 28, 26, 1)"
          textAlign="center"
          component="h1"
        >
          Take your next step.
          <br />
          Start applying
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt="38px"
          color="white"
          fontSize="16px"
          fontFamily="HankenGroteskSemiBold"
          width="187px"
          borderRadius="8px"
          padding="12px 32px"
          bgcolor="primary.main"
          sx={{
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
          onClick={() => {
            analytics.websiteButtonInteractions({
              buttonName: "Apply Now",
              source: "Clicked on Apply now form Home Page",
              urlPath: window.location.href,
              event_type: EAnalyticsEvents.ENTER_LOGIN,
              status: EAnalyticsStatus.SUCCESS,
              redirectPath: "",
            });
            router.push("/applynow");
          }}
        >
          Apply now
        </Box>

        <Box
          position="absolute"
          top={{ lg: "140px", md: "60px", sm: "60px", xs: "30px" }}
          left={{ lg: "195px", md: "105px", sm: "50px", xs: "25px" }}
        >
          {isMobile ? <SmallLeftFaced /> : <LeftFaced />}
        </Box>
        <Box
          position="absolute"
          top={{ lg: "320px", md: "320px", sm: "250px", xs: "240px" }}
          left={{ lg: "315px", md: "250px", sm: "100px", xs: "50px" }}
        >
          {isMobile ? <SmallStar /> : <Star />}
        </Box>
        <Box
          position="absolute"
          top={{ lg: "140px", md: "60px", sm: "60px", xs: "30px" }}
          right={{ lg: "195px", md: "105px", sm: "50px", xs: "25px" }}
        >
          {isMobile ? <SmallRightFaced /> : <RightFaced />}
        </Box>
        <Box
          position="absolute"
          top={{ lg: "320px", md: "320px", sm: "250px", xs: "240px" }}
          right={{ lg: "315px", md: "250px", sm: "100px", xs: "50px" }}
        >
          {isMobile ? <SmallStar /> : <Star />}
        </Box>
      </Box>
    </Box>
  );
}

export default StartApply;
