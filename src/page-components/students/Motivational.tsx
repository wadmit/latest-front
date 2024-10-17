"use client";
import { RootContainer } from "@/components/common";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Motivational() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:830px)");

  const currency = useAppSelector((state) => state.currency);

  return (
    <RootContainer pt="96px" position="relative" overflow="hidden">
      <Box
        flexDirection={{
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column",
        }}
        alignItems="center"
        display="flex"
        gap={{ lg: "100px", md: "100px", sm: "32px", xs: "32px" }}
      >
        <Box height={{ lg: "auto", md: "400px" }} width="100%" flex={0.5}>
          <Image
            loading="lazy"
            width={100000000}
            height={1}
            // height="100%"
            style={{
              width: "100%",
              height: isMobile ? "350px" : "auto",
              borderRadius: "8px",
              objectFit: "cover",
            }}
            src="/images/student/ceremonytwo.webp"
            alt="ceremony"
          />
        </Box>
        <Box flex={0.5} display="flex" flexDirection="column">
          <Typography
            component={"h3"}
            fontSize={{ lg: "32px", md: "28px", sm: "24px", xs: "20px" }}
            lineHeight={{
              lg: "41.6px",
              md: "36.4px",
              sm: "28.4px",
              xs: "28.4px",
            }}
            letterSpacing="-2%"
            fontFamily="HankenGroteskExtraBold"
          >
            Access the{" "}
            <Typography
              fontSize={{ lg: "32px", md: "28px", sm: "24px", xs: "20px" }}
              fontFamily="HankenGroteskExtraBold"
              borderBottom="6px dotted rgba(170, 68, 1, 1)"
              color="rgba(170, 68, 1, 1)"
            >
              world’s top-ranked
            </Typography>{" "}
            <br /> university programs for <br /> international students at{" "}
            <br />
            affordable prices
          </Typography>

          <Typography
            component={"p"}
            mt={{ lg: "24px", md: "24px", sm: "16px", xs: "16px" }}
            fontSize={{ lg: "18px", md: "16px", sm: "14px", xs: "14px" }}
            fontFamily="HankenGroteskRegular"
            color="rgba(32, 28, 26, 0.9)"
            lineHeight="23.4px"
          >
            Thanks to WiseAdmit, you can now access some of the top-ranked
            post-secondary programs in the world.
          </Typography>
          <Box
            mt={{ lg: "48px", md: "48px", sm: "32px", xs: "32px" }}
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
                buttonName: "Find Programs",
                source: "User clicked on Find programs from Student page",
                urlPath: window.location.href,
                event_type: EAnalyticsEvents.FIND_PROGRAMS,
                status: EAnalyticsStatus.SUCCESS,
                redirectPath: window.location.href,
              });
              router.push("/programs");
            }}
          >
            Find programs
          </Box>
        </Box>
      </Box>
    </RootContainer>
  );
}

export default Motivational;
