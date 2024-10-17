"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { RootContainer } from "@/components/common";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import Image from "next/image";
import { useAppSelector } from "@/global-states/hooks/hooks";

function WiseScoreIntro() {
  const router = useRouter();

  const currency = useAppSelector((state) => state.currency);

  return (
    <Box bgcolor="rgba(239, 233, 174, 1)">
      <RootContainer>
        <Box
          paddingTop={{ lg: "86px", md: "86px", sm: "64px", xs: "64px" }}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography
            component={"h2"}
            fontFamily="HankenGroteskExtraBold"
            fontSize={{ lg: "32px", md: "32px", sm: "28px", xs: "24px" }}
            lineHeight="41.6px"
            letterSpacing="-2%"
          >
            Introducing{" "}
            <Typography
              fontFamily="HankenGroteskExtraBold"
              fontSize={{ lg: "32px", md: "32px", sm: "28px", xs: "24px" }}
              borderBottom="6px dotted rgba(170, 68, 1, 1)"
              color="rgba(170, 68, 1, 1)"
            >
              WiseScore®
            </Typography>
          </Typography>
          <Typography
            component={"p"}
            fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
            fontFamily="HankenGroteskRegular"
            lineHeight="21px"
            textAlign="center"
            color="rgba(32, 28, 26, 0.9)"
            mt="18px"
            maxWidth="587px"
          >
            WiseScore recommends the most suitable programs based on your
            interests and analyzes your likelihood of acceptance into those
            programs and universities based on your academic history
          </Typography>
          <Box
            mt="32px"
            color="white"
            fontSize="16px"
            fontFamily="HankenGroteskSemiBold"
            width="fit-content"
            borderRadius="12px"
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
                location: {
                  countryName: currency?.currentCountry ?? "",
                  city: currency?.city ?? "",
                },
                buttonName: "Check My Score",
                source: "Clicked on Check my score from Student page",
                urlPath: window.location.href,
                event_type: EAnalyticsEvents.FIND_SCHOLARSHIP_NOW,
                status: EAnalyticsStatus.SUCCESS,
                redirectPath: "",
              });
              router.push("/wisescore");
            }}
          >
            Check my score
          </Box>

          <Box
            height={{ lg: "500px", md: "auto", sm: "200px", xs: "190px" }}
            mt={{ lg: "64px", md: "64px", sm: "32px", xs: "32px" }}
          >
            <Image
              width={100000000}
              height={1}
              style={{
                width: "100%",
                height: "100%",
              }}
              loading="lazy"
              alt="Score check"
              src="/images/student/findwisescore.webp"
            />
          </Box>
        </Box>
      </RootContainer>
    </Box>
  );
}
export default WiseScoreIntro;
