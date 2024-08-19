"use client";
import useCostConverterMain from "@/hooks/costConverterMain";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import {
  BannerSvg,
  Calendar,
  Duration,
  House,
  MedalIcon,
  PlusSvg,
  Vector,
} from "@/page-components/nuaa/svg";
import {
  calculateScholarship,
  getScholarshipInfo,
} from "@/common/utils/getScholarship";
import moment from "moment";
import { ButtonWrapperNuaa } from "@/page-components/nuaa/styled-components";

type Props = {
  program: any;
  wisescore: number;
  foundation?: any;
};

const NuaaProgramCard = ({ program, wisescore, foundation }: Props) => {
  const router = useRouter();
  const getConvertedCosts = useCostConverterMain();

  // Extracting rankings
  const usNewsRanking = program?.detail?.program_rankings?.find(
    (rank: any) => "US NEWS Rankings" in rank
  );
  const shanghaiRanking = program?.detail?.program_rankings?.find(
    (rank: any) => "Shanghai Rankings" in rank
  );

  // Accessing the ranking values
  const usNewsValue = usNewsRanking ? usNewsRanking["US NEWS Rankings"] : "NA";

  const shanghaiValue = shanghaiRanking
    ? shanghaiRanking["Shanghai Rankings"]
    : "NA";

  const hasProgramScholarship = ({ program }: { program: any }) =>
    program?.detail?.scholarshipRange?.range &&
    program?.detail?.scholarshipRange?.type;
  return (
    <Box
      width="100%"
      // border="1px dashed black"
      overflow="hidden"
      boxShadow="0px 4px 20px 0px #0000000F"
      borderRadius="16px"
      p={{ lg: "36px 20px", xs: "36px 20px" }}
    >
      <Stack position="relative">
        <Stack direction="row" justifyContent="space-between">
          <Stack
            direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
            gap={{ lg: 6, md: 6, sm: 4, xs: 4 }}
          >
            {foundation && (
              <>
                <Stack gap={1}>
                  <Typography
                    fontStyle="normal"
                    width={{ lg: "100%", md: "100%", sm: "100%", xs: "65%" }}
                    fontSize={{
                      lg: "24px",
                      md: "24px",
                      sm: "16px",
                      xs: "16px",
                    }}
                    fontFamily="HankenGroteskExtraBold"
                  >
                    Foundation
                  </Typography>
                  <Grid spacing={2} container>
                    <Grid item xs={12}>
                      <Typography
                        fontStyle="normal"
                        fontSize="16px"
                        color="#201C1AF2"
                        lineHeight="25.6px"
                        fontFamily="HankenGroteskRegular"
                      >
                        {program?.discipline?.name === "Engineering & IT"
                          ? "Pre Engineering"
                          : "Pre Business"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Stack>
                <Stack mt={1}>
                  <PlusSvg />
                </Stack>
              </>
            )}

            <Stack gap={1}>
              <Typography
                fontStyle="normal"
                width={{ lg: "100%", md: "100%", sm: "100%", xs: "65%" }}
                fontSize={{ lg: "24px", md: "24px", sm: "16px", xs: "16px" }}
                fontFamily="HankenGroteskExtraBold"
              >
                {program?.name}
              </Typography>
              <Grid spacing={2} container>
                <Grid item xs={12}>
                  <Typography
                    fontStyle="normal"
                    fontSize="16px"
                    color="#201C1AF2"
                    lineHeight="25.6px"
                    fontFamily="HankenGroteskRegular"
                  >
                    ({program?.discipline?.name ?? ""})
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </Stack>

        <Box mx={-2} my={3} />

        <Grid container spacing={{ lg: 0, xs: 4 }} alignItems="center">
          <Grid item xs={12} lg={2.8}>
            <Stack gap="4px">
              <Vector />
              <Typography
                // fontStyle="normal"
                color="#666666"
                fontSize="14px"
                lineHeight="22.4px"
                fontFamily="HankenGroteskSemiBold"
              >
                Tuition fee
              </Typography>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="flex-start"
                gap="10px"
              >
                <Typography
                  fontStyle="normal"
                  textAlign="left"
                  color="#1A1A20"
                  fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
                  lineHeight="160%"
                  fontFamily="HankenGroteskSemiBold"
                >
                  {
                    getConvertedCosts(
                      calculateScholarship({
                        scholarShipRange: program?.detail?.scholarshipRange,
                        tutionFee: program?.detail?.fees?.tution_fee ?? 0,
                        wisescore,
                      }) ?? 0,
                      program.detail.base_currency
                    ).formattedValue
                  }
                  {hasProgramScholarship({ program }) && (
                    <>
                      <span
                        style={{
                          color: "#00000099",
                          paddingLeft: "10px",
                        }}
                      >
                        |
                      </span>
                      <span
                        style={{
                          textDecoration: "line-through",
                          // opacity: '0.6',
                          color: "#DB1920",
                          paddingLeft: "10px",
                        }}
                      >
                        {/* ${' '} */}
                        {
                          getConvertedCosts(
                            program?.detail?.fees?.tution_fee,
                            program.detail.base_currency
                          ).formattedValue
                        }
                      </span>
                    </>
                  )}
                </Typography>
                {hasProgramScholarship({ program }) && (
                  <Box>
                    <Box
                      borderRadius="32px"
                      bgcolor="#F5F2D4"
                      p="4px 16px"
                      display="inline-flex"
                      // justifyContent="center"
                      alignItems="center"
                      gap="8px"
                      // height="30px"
                      marginTop="-5px"
                    >
                      <MedalIcon />
                      <Typography
                        fontStyle="normal"
                        fontSize={{
                          lg: "14px",
                          md: "14px",
                          sm: "14px",
                          xs: "14px",
                        }}
                        fontFamily="HankenGroteskSemiBold"
                        lineHeight="160%"
                        color="#F0BA47"
                        textAlign="center"
                      >
                        {getScholarshipInfo({
                          scholarShipRange: program?.detail?.scholarshipRange,
                          currency: program?.detail?.base_currency,
                          wisescore,
                        })}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6} lg={2.5}>
            <Stack
              alignItems="flex-start"
              justifyContent="flex-start"
              direction="column"
              gap="4px"
            >
              <Calendar />
              <Typography
                fontStyle="normal"
                color="#666666"
                fontSize="14px"
                lineHeight="160%"
                fontFamily="HankenGroteskSemiBold"
              >
                Application deadline
              </Typography>
              <Box display="flex" gap="10px">
                <Typography
                  fontStyle="normal"
                  color="#1A1A20"
                  fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
                  lineHeight="160%"
                  fontFamily="HankenGroteskSemiBold"
                >
                  {" "}
                  {foundation &&
                  foundation?.detail?.general_application_deadline1
                    ? moment(
                        foundation?.detail?.general_application_deadline1
                      ).format("MMMM yyyy")
                    : program && program?.detail?.general_application_deadline1
                    ? moment(
                        program?.detail?.general_application_deadline1
                      ).format("MMMM yyyy")
                    : "September 2025"}
                  {}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6} lg={2.5}>
            <Stack
              alignItems="flex-start"
              justifyContent="flex-start"
              direction="column"
              gap="4px"
            >
              <House />
              <Typography
                fontStyle="normal"
                color="#666666"
                fontSize="14px"
                lineHeight="160%"
                fontFamily="HankenGroteskSemiBold"
              >
                Accommodation fee
              </Typography>
              <Box display="flex" gap="10px">
                <Typography
                  fontStyle="normal"
                  color="#1A1A20"
                  fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
                  lineHeight="160%"
                  fontFamily="HankenGroteskSemiBold"
                >
                  {/* ${program?.detail?.fees?.living_cost ?? 0} */}
                  {getConvertedCosts(
                    program?.detail?.fees?.living_cost,
                    program.detail.base_currency
                  ).formattedValue ?? 0}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6} lg={1.8}>
            <Stack
              alignItems="flex-start"
              justifyContent="flex-start"
              direction="column"
              gap="4px"
            >
              <Duration />
              <Typography
                fontStyle="normal"
                color="#666666"
                fontSize="14px"
                lineHeight="160%"
                fontFamily="HankenGroteskRegular"
              >
                Duration
              </Typography>
              <Box display="flex" gap="10px">
                <Typography
                  fontStyle="normal"
                  color="#1A1A20"
                  fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
                  lineHeight="160%"
                  fontFamily="HankenGroteskSemiBold"
                >
                  {foundation ? "4.5 years" : "2 years"}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6} lg={2.2}>
            <Stack
              alignItems="flex-start"
              justifyContent="flex-start"
              direction="column"
              gap="4px"
            >
              <Calendar />
              <Typography
                fontStyle="normal"
                color="#666666"
                fontSize="14px"
                lineHeight="160%"
                fontFamily="HankenGroteskSemiBold"
              >
                Intake
              </Typography>
              <Box display="flex" gap="10px">
                <Typography
                  fontStyle="normal"
                  color="#1A1A20"
                  fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
                  lineHeight="160%"
                  fontFamily="HankenGroteskSemiBold"
                >
                  {foundation && foundation.detail.startDate
                    ? moment(foundation?.detail?.startDate).format("MMMM YYYY")
                    : program && program.detail.startDate
                    ? moment(program?.detail?.startDate).format("MMMM YYYY")
                    : "September 2025"}
                  {}
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Box my="24px">
          <Divider />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="10px"
        >
          {wisescore > 74 &&
            program?.detail?.scholarshipRange["75-100"].value !== 0 && (
              <Box>
                {" "}
                <Typography
                  fontSize="16px"
                  fontFamily="HankenGroteskBold"
                  color="#2D8C37"
                >
                  Hurray! You are eligible for 1st year full tution wavier,
                  Apply now to know more about it.
                </Typography>{" "}
              </Box>
            )}
          {wisescore > 49 &&
            wisescore < 75 &&
            program?.detail?.scholarshipRange["60-74"] !== 0 && (
              <Box>
                {" "}
                <Typography
                  fontSize="16px"
                  fontFamily="HankenGroteskBold"
                  color="#F0BA47"
                >
                  Opportunity! You may be eligible for partial scholarship,
                  Apply now to know more about it.
                </Typography>{" "}
              </Box>
            )}
          <Box>
            <ButtonWrapperNuaa
              onClick={() => {
                localStorage.setItem(
                  "Program",
                  JSON.stringify({
                    programId: program.id,
                    foundationId: foundation ? foundation.id : "",
                  })
                );
                router.push("/applynow?signUp=true");
              }}
              sx={{
                boxShadow: "none",
                bgcolor: "#00509F",
                width: "100%",
                padding: "12px 25px",
                borderRadius: "50px",
                color: "#FFFFFF",
                "&:hover": {
                  bgcolor: "#00509F",
                },
              }}
            >
              Apply Now
            </ButtonWrapperNuaa>
          </Box>
        </Box>

        <Stack
          // display={{ lg: 'none', md: 'none', sm: 'flex', xs: 'flex' }}
          position="absolute"
          top={-34}
          right={-32}
        >
          <Box>
            <BannerSvg />
            <Box position="absolute" top={8} right={50}>
              <Stack gap={1.5}>
                <Stack>
                  <Typography
                    fontStyle="normal"
                    fontSize={{
                      lg: "18px",
                      md: "14px",
                      sm: "14px",
                      xs: "14px",
                    }}
                    color="#FFFFFF"
                    fontFamily="HankenGroteskRegular"
                  >
                    {usNewsValue}
                  </Typography>
                  <Typography
                    fontStyle="normal"
                    fontSize={{
                      lg: "12px",
                      md: "12px",
                      sm: "12px",
                      xs: "12px",
                    }}
                    color="#FFFFFFA6"
                    fontFamily="HankenGroteskSemiBold"
                  >
                    US Ranking
                  </Typography>
                </Stack>
                <Stack>
                  <Typography
                    fontStyle="normal"
                    fontSize={{
                      lg: "18px",
                      md: "16px",
                      sm: "14px",
                      xs: "14px",
                    }}
                    color="#FFFFFF"
                    fontFamily="HankenGroteskRegular"
                  >
                    {shanghaiValue}
                  </Typography>
                  <Typography
                    fontStyle="normal"
                    fontSize={{
                      lg: "12px",
                      md: "12px",
                      sm: "12px",
                      xs: "12px",
                    }}
                    color="#FFFFFFA6"
                    fontFamily="HankenGroteskSemiBold"
                  >
                    Shanghai Ranking
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NuaaProgramCard;
