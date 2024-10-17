import { RootContainer } from "@/components/common";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { ArrowDown, ArrowSvg } from "@/page-components/home/svg";
import React from "react";
import { useAppSelector } from "@/global-states/hooks/hooks";

const LandingHeroSection = () => {
  const isMobile = useMediaQuery("(max-width:1024px)");
  const currency = useAppSelector((state) => state.currency);
  return (
    <Box position="relative">
      <RootContainer>
        <Box
          gap={{ lg: "60px", md: "20px", sm: "0", xs: "0" }}
          display="flex"
          flexDirection={{
            lg: "row",
            md: "column",
            sm: "column-reverse",
            xs: "column-reverse",
          }}
          justifyContent={isMobile ? "center" : "space-between"}
          component={"div"}
        >
          <Box
            display="flex"
            flexDirection="column"
            flex={0.54}
            width="100%"
            py={{ lg: "56px", md: "56px", sm: "32px", xs: "32px" }}
          >
            <Typography
              fontSize={{ lg: "48px", md: "42px", sm: "32px", xs: "32px" }}
              fontFamily="HankenGroteskExtraBold"
              lineHeight={{
                lg: "62.4px",
                md: "54.6px",
                sm: "42.4px",
                xs: "42.4px",
              }}
              textAlign={{
                lg: "left",
                md: "center",
                sm: "center",
                xs: "center",
              }}
              component={"h1"}
            >
              Your{" "}
              <Typography
                fontSize={{ lg: "48px", md: "42px", sm: "32px", xs: "32px" }}
                fontFamily="HankenGroteskExtraBold"
                borderBottom="6px dotted rgba(170, 68, 1, 1)"
                color="rgba(170, 68, 1, 1)"
                component={"span"}
              >
                study abroad
              </Typography>{" "}
              <br /> journey in just a <br /> few steps
            </Typography>
            <Typography
              sx={{
                display: "none",
              }}
              component={"h2"}
            >
              Study in china
            </Typography>
            <Typography
              mt="20px"
              width={{ lg: "70%", md: "100%", sm: "100%", xs: "100%" }}
              fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
              fontFamily="HankenGroteskRegular"
              lineHeight="26px"
              textAlign={{
                lg: "left",
                md: "center",
                sm: "center",
                xs: "center",
              }}
              component={"p"}
            >
              We’ve helped 10,000+ students turn <br /> their dreams into
              reality, for FREE!
            </Typography>

            <Box
              justifyContent={{
                lg: "flex-start",
                md: "center",
                sm: "center",
                xs: "center",
              }}
              display="flex"
              alignItems="center"
              mt={{ lg: "48px", md: "48px", sm: "24px", xs: "24px" }}
            >
              <Typography
                fontSize={{ lg: "24px", md: "24px", sm: "20px", xs: "20px" }}
                lineHeight="31.2px"
                fontFamily="HankenGroteskExtraBold"
                component={"p"}
              >
                Start your search as
              </Typography>
              <ArrowDown />
            </Box>
            <Box
              component={"a"}
              bgcolor="white"
              display="flex"
              justifyContent="center"
              borderRadius="8px"
              height={{ lg: "64px", md: "64px", sm: "52px", xs: "52px" }}
              alignItems="center"
              padding="12px 32px 12px 32px"
              fontSize="16px"
              fontFamily="HankenGroteskSemiBold"
              lineHeight="19.2px"
              color="rgba(255, 107, 38, 1)"
              gap="10px"
              href="/students"
              onClick={() => {
                analytics.websiteButtonInteractions({
                  location: {
                    countryName: currency?.currentCountry ?? "",
                    city: currency?.city ?? "",
                  },
                  buttonName: "Student",
                  source: "Clicked on Student from Home Page",
                  urlPath: window.location.href,
                  event_type: EAnalyticsEvents.STUDENT,
                  status: EAnalyticsStatus.SUCCESS,
                  redirectPath: "",
                });
              }}
              mt={{ lg: "30px", md: "30px", sm: "28px", xs: "28px" }}
              sx={{
                cursor: "pointer",
                transition: "all 0.3s ease",

                "&:hover": {
                  transform: "scale(1.02)",
                  border: "1px solid #FF6B26",
                  bgcolor: "transparent",
                },
              }}
            >
              Student <ArrowSvg width={20} height={20} fill="#FF6B26" />
            </Box>
            <Box
              flexDirection={{
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              }}
              gap={{ lg: "18px", md: "24px", sm: "18px", xs: "18px" }}
              mt={{ lg: "24px", md: "24px", sm: "18px", xs: "18px" }}
              display="flex"
            >
              <Box
                component={"a"}
                height={{ lg: "64px", md: "64px", sm: "52px", xs: "52px" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="12px"
                href="/recruiting-partners"
                onClick={() => {
                  analytics.websiteButtonInteractions({
                    location: {
                      countryName: currency?.currentCountry ?? "",
                      city: currency?.city ?? "",
                    },
                    buttonName: "Recruitment Partner",
                    source: "Clicked on Recruitment Partner from Home Page",
                    urlPath: window.location.href,
                    event_type: EAnalyticsEvents.RECRUITMENT_PARTNER,
                    status: EAnalyticsStatus.SUCCESS,
                    redirectPath: "",
                  });
                }}
                padding="12px 30px 12px 32px"
                border="1px solid rgba(131, 134, 139, 1)"
                borderRadius="8px"
                width={{ lg: "50%", md: "100%", sm: "100%", xs: "100%" }}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    border: "1px solid #FF6B26",
                  },
                }}
                fontSize="16px"
                fontFamily="HankenGroteskSemiBold"
                lineHeight="19.2px"
              >
                Recruitment partner <ArrowSvg width={20} height={20} />
              </Box>
              <Box
                component={"a"}
                height={{ lg: "64px", md: "64px", sm: "52px", xs: "52px" }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="12px"
                padding="12px 32px 12px 32px"
                border="1px solid rgba(131, 134, 139, 1)"
                borderRadius="8px"
                width={{ lg: "50%", md: "100%", sm: "100%", xs: "100%" }}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    border: "1px solid #FF6B26",
                  },
                }}
                href="/institution"
                onClick={() => {
                  analytics.websiteButtonInteractions({
                    location: {
                      countryName: currency?.currentCountry ?? "",
                      city: currency?.city ?? "",
                    },
                    buttonName: "Institution Partner",
                    source: "Clicked on Institution partner from Home Page",
                    urlPath: window.location.href,
                    event_type: EAnalyticsEvents.INSTITUTION,
                    status: EAnalyticsStatus.SUCCESS,
                    redirectPath: "",
                  });
                }}
                fontSize="16px"
                fontFamily="HankenGroteskSemiBold"
                lineHeight="19.2px"
              >
                Institution partner <ArrowSvg width={20} height={20} />
              </Box>
            </Box>
          </Box>
          {isMobile && isMobile ? null : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flex={0.56}
              py={{ lg: "48px", md: "48px", sm: "0px", xs: "0px" }}
            >
              <Box
                sx={{ clipPath: "rect(0px , 100px , 0px, 0px)" }}
                marginRight={-8}
                position="relative"
                height="100%"
                width="100%"
              >
                <Image
                  width={1000}
                  height={1}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    clipPath: "rect(0px , 100px , 0px, 0px)",
                  }}
                  priority
                  src="/images/home/hero4.webp"
                  alt="hero"
                />
                <Box
                  bottom="30%"
                  position="absolute"
                  right="-15%"
                  display={{ lg: "flex", md: "none", sm: "none", xs: "none" }}
                >
                  <Image
                    width={1000}
                    height={22}
                    alt="home-dot"
                    style={{
                      height: 22,
                      width: 22,
                    }}
                    src={"/images/home/dot.webp"}
                  />

                  {/* <Dot /> hello */}
                </Box>
                <Box
                  top="8%"
                  position="absolute"
                  right="-8%"
                  display={{ lg: "flex", md: "none", sm: "none", xs: "none" }}
                >
                  <Image
                    width={1000}
                    height={22}
                    alt="home-dot"
                    style={{
                      height: 27,
                      width: 27,
                    }}
                    src={"/images/home/star.webp"}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </RootContainer>
      <Box
        position="absolute"
        width="80%"
        height="100%"
        display="flex"
        bottom="-70%"
        left="15%"
        zIndex={-1}
        className="blur-bg"
      >
        <Box
          display={{
            lg: "flex",
            md: "flex",
            sm: "none",
            xs: "none",
          }}
          bgcolor="rgba(49, 133, 252, 1)"
          height="35%"
          width="20%"
          sx={{
            rotate: "-43.58deg",
          }}
          zIndex={-1}
        />
        <Box
          display={{
            lg: "flex",
            md: "flex",
            sm: "none",
            xs: "none",
          }}
          height="30%"
          width="20%"
          sx={{
            rotate: "43.58deg",
            background:
              "linear-gradient(80.79deg, #FF6B26 6.98%, #FEE500 83.58%)",
          }}
          zIndex={-1}
        />
      </Box>
      {/* for mobile */}
      <Box
        display={{
          lg: "none",
          md: "none",
          sm: "flex",
          xs: "flex",
        }}
        bottom="20%"
        right="0%"
        bgcolor="rgba(96, 181, 144, 1)"
        height="30%"
        width="40%"
        sx={{
          filter: "blur(180px)",
          opacity: "0.8",
        }}
        position="absolute"
        zIndex={-1}
      />
      <Box
        display={{
          lg: "none",
          md: "none",
          sm: "flex",
          xs: "flex",
        }}
        bottom="20%"
        height="20%"
        left="0%"
        width="30%"
        sx={{
          filter: "blur(180px)",
          opacity: "0.8",
          background:
            "linear-gradient(80.79deg, #FF6B26 6.98%, #FEE500 57.58%)",
        }}
        position="absolute"
        zIndex={-1}
      />
    </Box>
  );
};

export default LandingHeroSection;
