import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { StartApplyStyledContainerWrapper } from "@/page-components/home/styled-components";
import { useAppSelector } from "@/global-states/hooks/hooks";

function StartApplying() {
  const isMobile = useMediaQuery("(max-width:440px)");
  const router = useRouter();

  const currency = useAppSelector((state) => state.currency);

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignContent="flex-end"
      bgcolor="rgba(240, 236, 235, 1)"
    >
      <StartApplyStyledContainerWrapper
        justifyContent="flex-end"
        flexDirection={{
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column",
        }}
        width={{ lg: "100%", md: "100%", sm: "100%", xs: "100%" }}
        gap={{ lg: "100px", md: "100px", sm: "32px", xs: "32px" }}
        display="flex"
      >
        <Box
          flex={0.4}
          pb={{ lg: "200px", md: "200px", sm: "40px", xs: "40px" }}
          pt={{ lg: "107px", md: "107px", sm: "49px", xs: "49px" }}
          width={{ lg: "412px", md: "412px", sm: "412px", xs: "100%" }}
          flexDirection="column"
          display="flex"
        >
          {isMobile ? (
            <Typography
              fontSize="28px !important"
              fontFamily="HankenGroteskExtraBold"
              lineHeight="36.4px"
              letterSpacing="-2%"
            >
              Find everything you need to study abroad in one place.
            </Typography>
          ) : (
            <Typography
              fontSize={{ lg: "32px", md: "28px", sm: "28px", xs: "28px" }}
              fontFamily="HankenGroteskExtraBold"
              lineHeight={{
                lg: "41.6px",
                md: "41.6px",
                sm: "36.4px",
                xs: "36.4px",
              }}
              letterSpacing="-2%"
              component="h3"
            >
              Find everything you need to
              <br /> study abroad in one place.
            </Typography>
          )}
          <Typography
            mt={{ lg: "18px", md: "18px", sm: "14px", xs: "14px" }}
            fontSize={{ lg: "18px", md: "18px", sm: "14px", xs: "14px" }}
            fontFamily="HankenGroteskRegular"
            lineHeight={{
              lg: "23.4px",
              md: "23.4px",
              sm: "20.8px",
              xs: "20.8px",
            }}
            color="rgba(32, 28, 26, 0.9)"
            width="90%"
            component="h5"
          >
            Discover best-fit programs, easily apply to universities, find
            scholarships, and more with the ultimate study abroad platform made
            for your success.
          </Typography>

          <Box
            fontFamily="HankenGroteskSemiBold"
            fontSize="16px"
            width="fit-content"
            mt={{ lg: "36px", md: "36px", sm: "24px", xs: "24px" }}
            color="white"
            borderRadius="8px"
            lineHeight="19.2px"
            padding={{
              lg: "17px 38px",
              md: "17px 38px",
              sm: "12px 24px",
              xs: "12px 24px",
            }}
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              analytics.websiteButtonInteractions({
                location: {
                  countryName: currency?.currentCountry ?? "",
                  city: currency?.city ?? "",
                },
                buttonName: "Apply Now",
                source: "Clicked on Apply Now from Home Page",
                urlPath: window.location.href,
                event_type: EAnalyticsEvents.FIND_SCHOLARSHIP_NOW,
                status: EAnalyticsStatus.SUCCESS,
                redirectPath: "",
              });
              router.push("/applynow");
            }}
            bgcolor="rgba(255, 107, 38, 1)"
          >
            Apply now
          </Box>
        </Box>

        <Box
          display="flex"
          flex={0.6}
          height={{ lg: "500px", md: "540px", sm: "100%", xs: "100%" }}
          width={{ lg: "60%", md: "60%", sm: "100%", xs: "100%" }}
          mt={{ lg: "87px", md: "87px", sm: "0px", xs: "0px" }}
          position="relative"
        >
          <Image
            style={{
              borderRadius: "8px",
              objectFit: "fill",
              width: "100%",
              height: "100%",
            }}
            width={100000}
            height={1}
            src="/images/home/applying-three.webp"
            alt="apply-to-chinese-universities"
          />
        </Box>
      </StartApplyStyledContainerWrapper>
    </Box>
  );
}

export default StartApplying;
