import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import type { IUniversity } from "@/types/university";
import { useRouter } from "next/navigation";
import useCostConverterMain from "@/hooks/costConverterMain";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import applicationConfig from "@/config";
import WiseAdmitDefault from "public/images/universities/wiseadmit_main.svg";
import { useAppSelector } from "@/global-states/hooks/hooks";

function UniversityCard({ university }: { university: IUniversity }) {
  const router = useRouter();
  const currency = useAppSelector((state) => state.currency);

  const getConvertedCost = useCostConverterMain();
  return (
    <Box
      boxShadow="0px 8px 20px 0px rgba(0, 0, 0, 0.06)"
      minHeight="347px"
      bgcolor="white"
      paddingBottom="24px"
      borderRadius="12px"
      onClick={() => {
        // window.open(`/universities/${university.slug}`);
        analytics.websiteButtonInteractions({
          location: {
            countryName: currency?.currentCountry ?? "",
            city: currency?.city ?? "",
          },
          buttonName: "University Info",
          source: `User clicked on ${university.name}`,
          urlPath: window.location.href,
          event_type: EAnalyticsEvents.UNIVERSITY,
          status: EAnalyticsStatus.SUCCESS,
          redirectPath: "",
        });
      }}
      sx={{
        cursor: "pointer",
        transition: "all .3s cubic- bezier(0.19, 1, 0.22, 1) ease",
        "&:hover": {
          transform: "scale(1.02)",
        },
      }}
    >
      <Box width="100%" height="100%" position="relative">
        {university.cover_key ? (
          <Box minHeight="131px">
            <Image
              width={1000}
              height={1}
              style={{
                width: "100%",
                objectFit: "cover",
                height: "131px",
                borderRadius: "12px 12px 0px 0px",
              }}
              alt="University image"
              src={
                university.cover_key
                  ? `${applicationConfig.distributionKey}/${university.cover_key}`
                  : WiseAdmitDefault.src
              }
            />
          </Box>
        ) : (
          <WiseAdmitDefault />
        )}

        <Box
          zIndex={100000}
          position="absolute"
          top="70px"
          left="20px"
          borderRadius="12px"
          bgcolor="#FFFFFF"
          boxShadow="0px 8px 20px 0px rgba(0, 0, 0, 0.06)"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {university.logo_key !== "" ? (
            <Image
              src={`${applicationConfig.distributionKey}/${university.logo_key}`}
              style={{
                objectFit: "contain",
                objectPosition: "center",
              }}
              width="80"
              height="80"
              alt="university-logo"
            />
          ) : (
            <WiseAdmitDefault />
          )}
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        gap="24px"
        p={2}
        height="100%"
      >
        <Box display="flex" flexDirection="column" gap="4px" mt="20px">
          <Typography
            color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
            fontSize="14px"
            fontStyle="normal"
            fontFamily="HankenGroteskRegular"
            lineHeight="120%"
            letterSpacing="0.14px"
          >
            {university?.location}
          </Typography>
          <Typography
            color="var(--text-day-heading, #201C1A)"
            fontSize="20px"
            fontStyle="normal"
            fontFamily="HankenGroteskExtraBold"
            height={{ lg: "60px", md: "60px", sm: "0px", xs: "0" }}
            lineHeight="150%"
            letterSpacing="-0.4px"
            sx={{
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              textOverflow: "ellipsis",
            }}
          >
            <Link href={`/universities/${university.slug}`}>
              {university.name}
            </Link>
          </Typography>
        </Box>
        <Box>
          <Grid container spacing={2}>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Typography
                color="var(--text-day-body, rgba(32, 28, 26, 0.55))"
                fontSize="14px"
                fontStyle="normal"
                fontFamily="HankenGroteskRegular"
                lineHeight="120%"
                letterSpacing="0.14px"
              >
                Taught In:
              </Typography>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Typography
                  color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
                  fontSize="16px"
                  fontStyle="normal"
                  fontFamily="HankenGroteskSemiBold"
                  lineHeight="180%"
                >
                  English
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Typography
                color="var(--text-day-body, rgba(32, 28, 26, 0.55))"
                fontSize="14px"
                fontStyle="normal"
                fontFamily="HankenGroteskRegular"
                lineHeight="120%"
                letterSpacing="0.14px"
              >
                Application Fee:
              </Typography>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Typography
                  color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
                  fontSize="16px"
                  fontStyle="normal"
                  fontFamily="HankenGroteskSemiBold"
                  lineHeight="160%"
                >
                  {
                    getConvertedCost(
                      university?.detail?.fees?.["Application Fee"],
                      university.base_currency
                    ).formattedValue
                  }
                </Typography>
              </Grid>
            </Grid>
            <Grid item lg={4} md={12} sm={12} xs={12}>
              <Typography
                color="var(--text-day-body, rgba(32, 28, 26, 0.55))"
                fontSize="14px"
                fontStyle="normal"
                fontFamily="HankenGroteskRegular"
                lineHeight="120%"
                letterSpacing="0.14px"
              >
                Programs:
              </Typography>
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <Typography
                  color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
                  fontSize="16px"
                  fontStyle="normal"
                  fontFamily="HankenGroteskSemiBold"
                  lineHeight="160%"
                >
                  {university.programCount || 0}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default UniversityCard;
