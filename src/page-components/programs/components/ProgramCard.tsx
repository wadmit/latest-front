import React from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { IProgram } from "@/types/program";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import {
  Calendar,
  Currency,
  Location,
  Time,
} from "@/page-components/programs/svg";
import { ButtonWrapper } from "@/components/common";
import applicationConfig from "@/config";
import useCostConverterMain from "@/hooks/costConverterMain";
import { useAppSelector } from "@/global-states/hooks/hooks";

function ProgramCard({ programs }: { programs: IProgram }) {
  const duration = programs.type?.name?.match(/\b(\d+(?:\.\d+)?)\b/);
  const getConvertedCosts = useCostConverterMain();
  const currency = useAppSelector((state) => state.currency);

  return (
    <Box
      border="1px solid var(--Scrim-Overlay, #E9E9E9)"
      borderRadius="8px"
      id="costs"
      bgcolor="white"
      p={3}
      display="flex"
      flexDirection="column"
      gap="25px"
    >
      <Box display="flex">
        <Box>
          <Image
            src={`${applicationConfig.distributionKey}/${programs.university?.logo_key}`}
            width="44"
            height="44"
            alt="university-logo"
          />
        </Box>
        <Box display="flex" flexDirection="column" gap="4px" ml={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
          >
            <Box
              onClick={() => {
                analytics.websiteButtonInteractions({
                  location: {
                    countryName: currency?.currentCountry ?? "",
                    city: currency?.city ?? "",
                  },
                  buttonName: "Program Info",
                  source: `User selected the ${programs.name} curriculum of ${programs?.university?.name}`,
                  urlPath: window.location.href,
                  event_type: EAnalyticsEvents.FIND_PROGRAMS,
                  status: EAnalyticsStatus.SUCCESS,
                  redirectPath: "",
                });
              }}
              sx={{ cursor: "pointer" }}
            >
              <Typography
                fontSize="20px"
                fontStyle="normal"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="150%"
                letterSpacing="-0.4px"
                color="var(--text-day-heading, #201C1A)"
              >
                <Link href={`/programs/${programs.slug}`}>
                  {programs?.name}
                </Link>
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography
              fontSize="16px"
              fontStyle="normal"
              fontFamily="HankenGroteskRegular"
              lineHeight="160%"
              color="var(--Complimentary-300, #3185FC)"
            >
              <Link href={`/universities/${programs?.university?.slug}`}>
                {programs.university?.name}
              </Link>
            </Typography>
          </Box>
          <Box maxWidth="378px">
            <Typography
              fontSize="14px"
              fontStyle="normal"
              fontFamily="HankenGroteskRegular"
              lineHeight="160%"
              color="var(--text-day-body, rgba(32, 28, 26, 0.90))"
              style={{
                overflow: "hidden",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                textOverflow: "ellipsis",
              }}
            >
              {programs.desc}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box>
        <Grid container justifyContent="space-between" spacing={3}>
          <Grid
            item
            container
            lg={10}
            md={12}
            sm={12}
            xs={12}
            gap={{ lg: "0px", md: "30px", sm: "20px", xs: "15px" }}
          >
            <Grid item lg={3} md={12} sm={12} xs={12}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent={{
                  lg: "center",
                  md: "flex-start",
                  sm: "flex-start",
                  xs: "flex-start",
                }}
                gap="8px"
              >
                <Location />
                <Typography
                  fontSize="14px"
                  fontStyle="normal"
                  fontFamily="HankenGroteskRegular"
                  lineHeight="120%"
                  letterSpacing="0.14px"
                  color="#000000FF"
                >
                  {programs.university?.location ?? "N/A"}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={2} md={12} sm={12} xs={12}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent={{
                  lg: "center",
                  md: "flex-start",
                  sm: "flex-start",
                  xs: "flex-start",
                }}
                gap="8px"
              >
                <Time />
                <Typography
                  fontSize="14px"
                  fontStyle="normal"
                  fontFamily="HankenGroteskRegular"
                  lineHeight="120%"
                  letterSpacing="0.14px"
                  color="#000000FF"
                >
                  {programs?.detail?.program_duration
                    ? `${programs.detail.program_duration} years`
                    : duration
                    ? `${duration} years`
                    : "NA"}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3.5} md={12} sm={12} xs={12}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent={{
                  lg: "center",
                  md: "flex-start",
                  sm: "flex-start",
                  xs: "flex-start",
                }}
                gap="8px"
              >
                <Calendar />
                <Typography
                  fontSize="14px"
                  fontStyle="normal"
                  fontFamily="HankenGroteskRegular"
                  lineHeight="120%"
                  letterSpacing="0.14px"
                  color="#000000FF"
                >
                  {programs?.detail?.intake !== ""
                    ? programs?.detail?.intake
                    : "N/A"}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={3.5} md={12} sm={12} xs={12}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent={{
                  lg: "center",
                  md: "flex-start",
                  sm: "flex-start",
                  xs: "flex-start",
                }}
                gap="8px"
              >
                <Currency />
                <Typography
                  fontSize="14px"
                  fontStyle="normal"
                  fontFamily="HankenGroteskRegular"
                  lineHeight="120%"
                  letterSpacing="0.14px"
                  color="#000000FF"
                >
                  {
                    getConvertedCosts(
                      programs.detail.fees.tution_fee,
                      programs.detail.base_currency
                    ).formattedValue
                  }{" "}
                  / year
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item lg={2} md={12} sm={12} xs={12}>
            <Box
              maxWidth="11.6875rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <ButtonWrapper
                variant="text"
                style={{
                  border: "1px solid var(--icon-disable, #A3A3A9)",
                  borderRadius: "8px",
                  background: "white",
                  marginTop: "-10px",
                  width: "100%",
                }}
                onClick={() => window.open(`/programs/${programs.slug}`)}
              >
                View details
              </ButtonWrapper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ProgramCard;
