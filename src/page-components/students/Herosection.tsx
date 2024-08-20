"use client";
import { useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { analytics } from "@/services/analytics.service";
import dynamic from "next/dynamic";
import { theme } from "@/common/muicustomtheme/theme";
import { RootContainer } from "@/components/common";
import Image from "next/image";

const RedoAnimText = dynamic(
  () => import("@/page-components/students/components/AnimatedText"),
  { suspense: true }
);
const CursorBlinker = dynamic(
  () => import("@/page-components/students/components/CursorBlinker"),
  { suspense: true }
);

// Main Section export
function Herosection() {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const isMdScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  return (
    <Box
      sx={{
        position: "relative",
        // zIndex: 100,

        maxWidth: "120rem",
        overflow: "hidden",
        mx: "auto",
      }}
      bgcolor="rgba(240, 236, 235, 1)"
    >
      <RootContainer>
        <Box
          display="flex"
          // alignItems="center"
          gap={{ lg: "100px", md: "40px" }}
          flexDirection={{
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          }}
          justifyContent="space-between"
          alignItems={{ lg: "flex-start", md: "center", sm: "flex-start" }}
        >
          <Box
            minWidth={{ lg: "459px", md: "459px", sm: "100%", xs: "100%" }}
            display="flex"
            flexDirection="column"
            alignItems={{ lg: "flex-start", md: "center" }}
            flex={0.5}
            paddingTop={{ lg: "176px", md: "80px", sm: "32px", xs: "32px" }}
            paddingBottom={{ lg: "200px", md: "0px" }}
          >
            <Typography
              component={"span"}
              display={{
                lg: "block",
                md: "block",
                sm: "none",
                xs: "none",
              }}
              border={{
                lg: "1px solid rgba(32, 28, 26, 0.4)",
                md: "1px solid rgba(32, 28, 26, 0.4)",
                sm: "none",
                xs: "none",
              }}
              borderRadius="40px"
              bgcolor={{ lg: "white", md: "white", xs: "none", sm: "none" }}
              fontSize="14px"
              lineHeight="18.2px"
              maxWidth={{ lg: "430px", md: "430px", sm: "100%", xs: "100%" }}
              // width="386px"
              fontFamily="HankenGroteskSemiBold"
              color="rgba(32, 28, 26, 0.55)"
              padding={{ lg: "6px 16px", md: "6px 16px", sm: "0", xs: "0" }}
            >
              Launch your career by attending the world’s best universities
            </Typography>
            <Typography
              component={"h1"}
              fontSize={{
                lg: "48px",
                md: "42px",
                sm: "32px",
                xs: "32px",
              }}
              lineHeight={{
                lg: "62.4px",
                md: "62.4px",
                sm: "41px",
                xs: "41px",
              }}
              letterSpacing="-2%"
              fontFamily="HankenGroteskExtraBold"
              mt={{ lg: "18px", md: "18px", sm: "4px", xs: "4px" }}
              textAlign={{ lg: "left", md: "center" }}
            >
              Easiest way to find <br />
              scholarships{" "}
              <Typography
                fontSize={{
                  lg: "48px",
                  md: "42px",
                  sm: "32px",
                  xs: "32px",
                }}
                lineHeight={{
                  lg: "62.4px",
                  md: "62.4px",
                  sm: "41px",
                  xs: "41px",
                }}
                letterSpacing="-2%"
                fontFamily="HankenGroteskExtraBold"
                mt="18px"
                // color="primary.main"
              >
                <RedoAnimText delay={0.2} />
                <CursorBlinker />
                {/* <AnimatedTe */}
              </Typography>
            </Typography>
            <Typography
              component={"p"}
              mt={{ lg: "18px", md: "18px", sm: "12px", xs: "12px" }}
              fontFamily="HankenGroteskRegular"
              fontSize="16px"
              textAlign={{ lg: "left", md: "center" }}
              lineHeight="20.8px"
              color="rgba(32, 28, 26, 0.9)"
              width={{ lg: "85%", md: "70%", sm: "100%", xs: "100%" }}
            >
              Enjoy the convenience of our platform where scholarship matching
              takes only 3 minutes. Apply to multiple universities effortlessly
              with just one application form—all completely free for students.
            </Typography>

            {/* button */}
            <Box
              mt="32px"
              color="white"
              fontSize="16px"
              fontFamily="HankenGroteskSemiBold"
              width="fit-content"
              borderRadius="8px"
              padding={{
                lg: "17px 24px",
                md: "17px 24px",
                sm: "12px 13px",
                xs: "12px 13px",
              }}
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
                  source:
                    "User clicked on Find scholarships now from Student page",
                  urlPath: window.location.href,
                  event_type: EAnalyticsEvents.FIND_SCHOLARSHIP_NOW,
                  status: EAnalyticsStatus.SUCCESS,
                  redirectPath: "",
                });
                router.push("/wisescore");
              }}
            >
              Find scholarships now
            </Box>
          </Box>
          <Box
            position="relative"
            paddingTop={{ lg: "80px", md: "20px", sm: "60px", xs: "60px" }}
            paddingBottom="80px"
            display="flex"
            flex={0.5}
            width={{ lg: "auto", md: "563px", sm: "100%", xs: "100%" }}
            height={{ lg: "100%", md: "400px" }}
          >
            <Image
              width={100000000}
              height={1}
              style={{
                width: "100%",
                height: isMobile
                  ? "260px"
                  : isMdScreen && !isMobile
                  ? "358px"
                  : "100%",
              }}
              priority
              alt="Hero section"
              src={"/images/student/students.webp"}
            />

            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              position="absolute"
              zIndex={11}
              top={{ lg: "8%", md: "-3%", sm: "0%", xs: "0%" }}
              gap="10px"
              right={{ lg: "-8%", md: "-9%", sm: "-2%", xs: "-2%" }}
            >
              <Typography
                component={"span"}
                color="rgba(106, 101, 101, 1)"
                fontSize="16px"
                fontFamily="HankenGroteskRegular"
              >
                Ready, set, apply
              </Typography>
              <Image
                width={1000}
                height={76}
                style={{
                  width: 100,
                  height: 70,
                }}
                src="/images/student/arrow-ready.webp"
                alt="Arrow Ready"
              />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent={{
                lg: "center",
                md: "center",
                sm: "flex-end",
                xs: "flex-end",
              }}
              position="absolute"
              zIndex={11}
              bottom="5%"
              gap="6px"
              left={{ lg: "-10%", md: "-10%", sm: "-2%", xs: "-2%" }}
            >
              <Image
                width={1000}
                height={76}
                style={{
                  width: 45,
                  height: 76,
                }}
                src="/images/student/arrow-asap.webp"
                alt="Arrow Ready"
              />

              <Typography
                component={"span"}
                color="rgba(106, 101, 101, 1)"
                fontSize="16px"
                fontFamily="HankenGroteskRegular"
              >
                Scholarships ASAP? <br />
                We've got your back
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              position="absolute"
              zIndex={11}
              bottom="5%"
              gap="6px"
              right={{ lg: "2%", md: "30%", sm: "5%", xs: "5%" }}
            >
              <Image
                width={1000}
                height={76}
                style={{
                  width: 45,
                  height: 76,
                }}
                src="/images/student/arrow-apply.webp"
                alt="Arrow Ready"
              />

              <Typography
                color="rgba(106, 101, 101, 1)"
                fontSize="16px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="3px"
                component={"span"}
                fontFamily="HankenGroteskRegular"
              >
                Apply in a heartbeat!{" "}
                <Image
                  width={1000}
                  height={18}
                  style={{
                    width: 18,
                    height: 18,
                  }}
                  src="/images/student/heart.webp"
                  alt="Arrow Ready"
                />
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              position="absolute"
              zIndex={11}
              top={{ lg: "17%", md: "3%" }}
              gap="6px"
              left={{ lg: "-1%", md: "0%" }}
            >
              <Image
                width={1000}
                height={20}
                style={{
                  width: 20,
                  height: 20,
                }}
                src="/images/student/star-big.webp"
                alt="star big"
              />
            </Box>
            <Box
              display={{ lg: "flex", md: "flex", sm: "none", xs: "none" }}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              position="absolute"
              zIndex={11}
              top={{ lg: "17%", md: "3%" }}
              gap="6px"
              left={{ lg: "3%", md: "0%" }}
            >
              <Image
                width={1000}
                height={7}
                style={{
                  width: 7,
                  height: 7,
                }}
                src="/images/student/star-small.webp"
                alt="star small"
              />
            </Box>
          </Box>
        </Box>
      </RootContainer>
    </Box>
  );
}
export default Herosection;
