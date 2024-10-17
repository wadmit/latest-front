"use client";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RootContainer } from "@/components/common";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { analytics } from "@/services/analytics.service";
import Link from "next/link";
import { WiseAdmitColorFulSvg2 } from "public/svg/index";
import { CloseIcon } from "@/components/common";
import { SubMenuItemMobile, SubMenuItems } from "@/components/common";
import { ButtonWrapper } from "@/components/common";
import { DrawerWrapper } from "@/components/common";
import { DeleteForever, MenuRounded } from "@mui/icons-material";
import { navbarLinks } from "@/components/common";
import { useAppSelector } from "@/global-states/hooks/hooks";

export function Navbar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [showDrawer, setShowDrawer] = useState(false);

  const currency = useAppSelector((state) => state.currency);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "white",
        zIndex: 999,
        height: "70px",
      }}
    >
      <Box
        height="100%"
        position="sticky"
        top="0"
        width="100%"
        zIndex={999}
        // boxShadow={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        component="header"
        borderBottom="1px solid rgba(233, 233, 233, 1)"
        // bgcolor="w"
      >
        <RootContainer
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",

            "& > div": {
              height: "100%",
            },
          }}
          component="nav"
        >
          <Box
            display="flex"
            height="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box height="100%" alignItems="center" gap="48px" display="flex">
              <Link
                aria-label="Wise Admit"
                href="/"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* <a
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                > */}
                <WiseAdmitColorFulSvg2 />
                {/* </a> */}
              </Link>
              <Box
                height="100%"
                justifyContent="center"
                alignItems="center"
                display={isMobile ? "none" : "flex"}
                gap="24px"
              >
                {navbarLinks.map((nav) => (
                  <SubMenuItems
                    closeDrawer={() => setShowDrawer(false)}
                    nav={nav}
                    key={nav.name}
                  />
                ))}
              </Box>
            </Box>

            <Box
              display={isMobile ? "none" : "flex"}
              gap="24px"
              alignItems="center"
            >
              <Box
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  analytics.trackPageView({
                    page: "Login",
                  });
                  analytics.navigationSelect(
                    {
                      countryName: currency?.currentCountry ?? "",
                      city: currency?.city ?? "",
                    },
                    "Login",
                    window.location.href,
                    EAnalyticsEvents.NAVIGATION_CLICK,
                    EAnalyticsStatus.SUCCESS,
                    ""
                  );
                  router.push("/applynow");
                }}
              >
                <Typography
                  fontWeight={600}
                  fontFamily="HankenGroteskSemibold"
                  fontSize="14px"
                  color="rgba(32, 28, 26, 1)"
                >
                  Login
                </Typography>
              </Box>
              <ButtonWrapper
                sx={{
                  width: "107px",
                  borderRadius: "8px",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "rgba(170, 68, 1, 1)",
                  },
                }}
                onClick={() => {
                  analytics.trackPageView({
                    page: "Apply Now",
                  });
                  analytics.navigationSelect(
                    {
                      countryName: currency?.currentCountry ?? "",
                      city: currency?.city ?? "",
                    },
                    "Apply Now",
                    window.location.href,
                    EAnalyticsEvents.NAVIGATION_CLICK,
                    EAnalyticsStatus.SUCCESS,
                    ""
                  );
                  router.push("/applynow?signUp=true");
                }}
              >
                Signup
              </ButtonWrapper>
            </Box>

            {/* for mobiel hamburger */}
            {isMobile && (
              <IconButton
                id="hamburger"
                aria-label="hamburger"
                className="hamburger"
                onClick={() => setShowDrawer((prev) => !prev)}
              >
                <MenuRounded
                  sx={{
                    cursor: "pointer",
                  }}
                  fontSize="large"
                />
              </IconButton>
            )}
          </Box>
        </RootContainer>
      </Box>

      <DrawerWrapper
        onClose={() => setShowDrawer(false)}
        open={showDrawer && isMobile}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <IconButton
            onClick={() => {
              analytics.trackPageView({
                page: "Home",
              });
              analytics.navigationSelect(
                {
                  countryName: currency?.currentCountry ?? "",
                  city: currency?.city ?? "",
                },
                "Home",
                window.location.href,
                EAnalyticsEvents.NAVIGATION_CLICK,
                EAnalyticsStatus.SUCCESS,
                ""
              );
              router.push("/");
              setShowDrawer(false);
            }}
          >
            <WiseAdmitColorFulSvg2 color="white" />
          </IconButton>
          <IconButton onClick={() => setShowDrawer(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box gap="24px" display="flex" flexDirection="column" mt="32px">
          <ButtonWrapper
            onClick={() => {
              analytics.trackPageView({
                page: "Login",
              });
              analytics.navigationSelect(
                {
                  countryName: currency?.currentCountry ?? "",
                  city: currency?.city ?? "",
                },
                "Login",
                window.location.href,
                EAnalyticsEvents.NAVIGATION_CLICK,
                EAnalyticsStatus.SUCCESS,
                ""
              );
              router.push("/applynow");
              setShowDrawer(false);
            }}
            sx={{
              boxShadow: "none",
              width: "100%",
              bgcolor: "transparent",
              border: "1px solid white",
              color: "white",
              height: "52px !important",
              borderRadius: "8px",
              padding: "17px 0px",
              fontSize: "16px !important",
              "&:hover": {
                bgcolor: "#FFD3B6",
                // borderColor: 'primary.main',
                color: "primary.main",
              },
            }}
          >
            Login
          </ButtonWrapper>
          <ButtonWrapper
            sx={{
              boxShadow: "none",
              width: "100%",
              fontSize: "16px !important",
              bgcolor: "white",
              height: "52px !important",
              color: "primary.main",
              borderRadius: "8px",
              padding: "17px 0px",
              "&:hover": {
                bgcolor: "primary.main",
                color: "white",
              },
            }}
            onClick={() => {
              analytics.trackPageView({
                page: "Apply Now",
              });
              analytics.navigationSelect(
                {
                  countryName: currency?.currentCountry ?? "",
                  city: currency?.city ?? "",
                },
                "Apply Now",
                window.location.href,
                EAnalyticsEvents.NAVIGATION_CLICK,
                EAnalyticsStatus.SUCCESS,
                ""
              );
              router.push("/applynow?signUp=true");
              setShowDrawer(false);
            }}
          >
            Signup
          </ButtonWrapper>
        </Box>
        {/* <Box mt="36px"> */}
        {navbarLinks.map((nav) => (
          <SubMenuItemMobile
            closeDrawer={() => setShowDrawer(false)}
            nav={nav}
            key={nav.name}
          />
        ))}
      </DrawerWrapper>
    </div>
  );
}
