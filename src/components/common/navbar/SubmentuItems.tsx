"use client";
import { useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Divider,
	Grid,
	Typography,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { INavbarMenu } from "@/components/common";

export function SubMenuItems({
	nav,
	closeDrawer,
}: {
	nav: INavbarMenu;
	closeDrawer: () => void;
}) {
	const router = useRouter();
	const pathName = usePathname();
	const [showDropdown, setShowDropdown] = useState(false);

	const selectItems = {
		position: "relative",
		backgroundImage: "linear-gradient(to right,#ff6b26,#ff6b26)",
		backgroundRepeat: "no-repeat",
		backgroundSize: "0% 1px",
		backgroundPosition: "left bottom",
		transition: "background-size 0.3s ease",
		"&:hover": {
			backgroundSize: "100% 2px",
			color: "#ff6b26",
		},
	};

  return (
    <Box
      onMouseEnter={() => setShowDropdown(true)}
      onMouseLeave={() => setShowDropdown(false)}
      sx={pathName !== nav.link ? selectItems : {}}
      height="100%"
      display="flex"
      alignItems="center"
      key={nav.name}
      position="relative"
    >
      <Box
        sx={{
          cursor: "pointer",
        }}
        onClick={() => {
          analytics.navigationSelect(
            nav.name,
            pathName,
            EAnalyticsEvents.NAVIGATION_CLICK,
            EAnalyticsStatus.SUCCESS,
            ""
          );
        }}
      >
        {!nav.isDropdown && nav.link ? (
          <Link href={nav.link}>
            <Typography
              lineHeight="20px"
              fontSize="14px"
              fontWeight={600}
              color="rgba(32, 28, 26, 1)"
              display="flex"
              alignItems="center"
              fontFamily="HankenGroteskSemibold"
            >
              {nav.name} {nav.isDropdown && <KeyboardArrowDown />}
            </Typography>
          </Link>
        ) : (
          <Box
            onClick={() => {
              if (!nav.isDropdown) {
                router.push(nav?.link ?? "");
                analytics.navigationSelect(
                  nav.name,
                  pathName,
                  EAnalyticsEvents.NAVIGATION_CLICK,
                  EAnalyticsStatus.SUCCESS,
                  ""
                );
              }
            }}
          >
            <Typography
              lineHeight="20px"
              fontSize="14px"
              fontWeight={600}
              color="rgba(32, 28, 26, 1)"
              display="flex"
              alignItems="center"
              fontFamily="HankenGroteskSemibold"
            >
              {nav.name} {nav.isDropdown && <KeyboardArrowDown />}
            </Typography>
          </Box>
        )}
      </Box>
      {pathName === nav.link && (
        <Box
          position="absolute"
          width="100%"
          height="2px"
          bgcolor="rgba(255, 107, 38, 1)"
          bottom="-2px"
        />
      )}
      {showDropdown && nav.isDropdown && (
        <Grid
          top="72px"
          width="fit-content"
          display="flex"
          position="absolute"
          container
          left="-200px"
          padding="24px"
          minWidth="572px"
          borderRadius="8px"
          bgcolor="white"
          gap="24px"
          boxShadow="0px 2px 45px 0px rgba(0, 0, 0, 0.13)"
        >
          {nav.options?.map((option, i) => (
            <Grid
              key={i}
              onClick={() => {
                router.push(option.link);
                analytics.navigationSelect(
                  option.name,
                  pathName,
                  EAnalyticsEvents.NAVIGATION_CLICK,
                  EAnalyticsStatus.SUCCESS,
                  ""
                );
              }}
              sx={{
                "& section": {
                  "& h1": {
                    position: "relative",
                    width: "fit-content",
                    backgroundImage:
                      "linear-gradient(to right,rgba(32, 28, 26, 1),rgba(32, 28, 26, 1))",
                    backgroundRepeat: "no-repeat",
                    paddingY: "4px",
                    backgroundSize: "0% 1px",
                    backgroundPosition: "left bottom",
                    transition: "background-size 0.3s ease",
                    "&:hover": {
                      backgroundSize: "100% 2px",
                    },
                  },
                },
                "&:hover": {
                  "& div": {
                    backgroundColor: "rgba(255, 242, 234, 1)",
                  },
                  "& svg": {
                    "& path": {
                      fill: "rgba(255, 107, 38, 1) !important",
                    },
                  },
                },
                cursor: "pointer",
              }}
              display="flex"
              gap="20px"
              item
              lg={5.7}
              md={5.7}
            >
              <Box
                borderRadius="50%"
                height="48px"
                padding="12px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="48px"
                bgcolor="rgba(240, 240, 240, 1)"
                component="div"
              >
                {option.icon}
              </Box>
              <Box
                gap="7px"
                component="section"
                display="flex"
                flexDirection="column"
              >
                <Typography
                  fontFamily="HankenGroteskSemibold"
                  color="rgba(32, 28, 26, 1)"
                  fontSize="14px"
                  component="h1"
                >
                  {option.name}
                </Typography>
                <Typography
                  color="rgba(0, 0, 0, 0.6)"
                  fontWeight={400}
                  fontSize="14px"
                >
                  {option.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export function SubMenuItemMobile({
	nav,
	closeDrawer,
}: {
	nav: INavbarMenu;
	closeDrawer: () => void;
}) {
	const router = useRouter();
	const pathName = usePathname();

  return (
    <Box>
      {nav.isDropdown ? (
        <Accordion
          sx={{
            bgcolor: "transparent !important",
            boxShadow: "none",
            padding: "12px 0px",
          }}
        >
          <AccordionSummary
            sx={{
              padding: 0,
            }}
            expandIcon={
              <KeyboardArrowDown htmlColor="white" fontSize="large" />
            }
          >
            <Typography
              fontSize="28px !important"
              fontWeight={800}
              color="#ffffff"
              display="flex"
              alignItems="center"
              fontFamily="HankenGroteskSemibold"
            >
              {nav.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 0,
            }}
          >
            {nav.options?.map((option, i) => (
              <Box
                key={i}
                display="flex"
                padding="15px"
                alignItems="center"
                gap="12px"
                marginBottom="8px"
                sx={{
                  cursor: "pointer",
                  "& svg": {
                    "& path": {
                      fill: "rgba(182, 180, 180, 0.6)",
                    },
                  },
                  "&:hover": {
                    bgcolor: "rgba(50, 39, 31, 1)",
                    borderRadius: "8px",
                  },
                }}
                onClick={() => {
                  analytics.navigationSelect(
                    option.name,
                    pathName,
                    EAnalyticsEvents.NAVIGATION_CLICK,
                    EAnalyticsStatus.SUCCESS,
                    ""
                  );
                  router.push(option.link);
                  closeDrawer();
                }}
              >
                {option.icon}
                <Typography
                  fontSize="18px !important"
                  fontWeight={600}
                  fontFamily="HankenGroteskSemibold"
                  lineHeight="25.2px"
                  color="rgba(255, 255, 255, 1)"
                >
                  {option.name}
                </Typography>
              </Box>
            ))}
          </AccordionDetails>
        </Accordion>
      ) : (
        <Box
          padding="24px 0px"
          onClick={() => {
            if (!nav.isDropdown) {
              analytics.navigationSelect(
                nav.name,
                pathName,
                EAnalyticsEvents.NAVIGATION_CLICK,
                EAnalyticsStatus.SUCCESS,
                ""
              );
              router.push(nav?.link ?? "");
              closeDrawer();
            }
          }}
        >
          <Typography
            fontSize="28px !important"
            lineHeight="36.4px"
            letterSpacing="-3%"
            color="white"
            fontWeight={800}
            sx={{
              cursor: "pointer",
            }}
            fontFamily="HankenGroteskBold"
          >
            {nav.name}
          </Typography>
        </Box>
      )}

			<Divider
				sx={{
					bgcolor: "rgba(255, 255, 255, 0.3)",
				}}
			/>
		</Box>
	);
}
