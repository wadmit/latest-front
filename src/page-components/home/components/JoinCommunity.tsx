"use client";
import { RootContainer } from "@/components/common";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useMemo } from "react";
import { ArrowPointChat } from "../svg";
import Community from "public/images/home/community.svg";
import CommunitySm from "public/images/home/communitysm.svg";
import { useAppSelector } from "@/global-states/hooks/hooks";


const containerGap = { lg: "100px", md: "100px", sm: "35px", xs: "35px" };

const typographyHeaderStyles = {
  fontWeight: 800,
  fontFamily: "HankenGroteskExtraBold",
  fontSize: { lg: "28px", md: "28px", sm: "24px", xs: "24px" },
  lineHeight: { lg: "36.4px", md: "36.4px", sm: "31.2px", xs: "31.2px" },
  letterSpacing: { lg: "-3%", md: "-3%", sm: "-2%", xs: "-2%" },
  color: "rgba(32, 28, 26, 1)",
};

const typographySubStyles = {
  fontWeight: 400,
  fontFamily: "HankenGroteskRegular",
  fontSize: { lg: "20px", md: "20px", sm: "16px", xs: "16px" },
  lineHeight: { lg: "26px", md: "26px", sm: "20.8px", xs: "20.8px" },
  letterSpacing: { lg: "-2%", md: "-2%", sm: "-2%", xs: "-2%" },
  color: "rgba(32, 28, 26, 1)",
};

const innerContainerFlexDirection = "column";
const innerContainerGap = { lg: "35px", md: "35px", sm: "28px", xs: "28px" };
const innerTypographyGap = "12px";

const JoinCommunity = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const currency = useAppSelector((state) => state.currency);

  const communityComponent = useMemo(() => (
    isMobile ? <CommunitySm /> : <Community />
  ), [isMobile]);

  const chatButton = (
    <Box
      mt="20px"
      color="white"
      fontSize="16px"
      fontFamily="HankenGroteskSemiBold"
      height="42px"
      width="fit-content"
      borderRadius="8px"
      padding="8px 32px"
      bgcolor="transparent"
      border="1px solid rgba(131, 134, 139, 1)"
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
        color: "rgba(255, 107, 38, 1)",
      }}
      onClick={() => {
        analytics.websiteButtonInteractions({
          location: {
            countryName: currency?.currentCountry ?? "",
            city: currency?.city ?? "",
          },
          buttonName: "Chat with us",
          source: "Clicked on Chat with us from Home Page",
          urlPath: window.location.href,
          event_type: EAnalyticsEvents.CHAT_WITH_US,
          status: EAnalyticsStatus.SUCCESS,
          redirectPath: "",
        });
        window.open("https://wa.me/message/NVIYDISAR7JYM1");
      }}
    >
      Chat with us
    </Box>
  );

  const arrowPointChat = <ArrowPointChat />;

  return (
    <Box bgcolor="rgba(234, 243, 255, 1)" mt="90px">
      <RootContainer>
        <Box
          display="flex"
          flexDirection={{
            lg: "row",
            md: "row",
            sm: "column-reverse",
            xs: "column-reverse",
          }}
          gap={containerGap}
          pt="38px"
        >
          {communityComponent}
          <Box
            display="flex"
            flexDirection={innerContainerFlexDirection}
            gap={innerContainerGap}
            justifyContent="center"
          >
            <Box display="flex" flexDirection="column" gap={innerTypographyGap}>
              <Typography {...typographyHeaderStyles}>
                Join our community
              </Typography>

              <Typography {...typographySubStyles}>
                Have questions about studying abroad? Chat with us directly{" "}
                {!isMobile && <br />} on WhatsApp for real-time support and
                guidance.
              </Typography>
            </Box>
            <Box display="flex" gap="12px">
              {chatButton}
              {arrowPointChat}
            </Box>
          </Box>
        </Box>
      </RootContainer>
    </Box>
  );
};

export default React.memo(JoinCommunity);
