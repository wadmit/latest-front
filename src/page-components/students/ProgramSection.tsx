"use client";
import { RootContainer } from "@/components/common";
import useCostConverterMain from "@/hooks/costConverterMain";
import { IProgram } from "@/types/program";
import { Box, Divider, Grid, Typography } from "@mui/material";
import moment from "moment";

function ProgramSection({ programs }: { programs: IProgram[] }) {

  const getConvertedCost = useCostConverterMain();

  const extractUsRank = (rankings: any) => {
    const usRank = rankings.find((rank: any) => rank["US NEWS Rankings"]);
    if (usRank) {
      return usRank["US NEWS Rankings"];
    }
    return "N/A";
  };
  return (
    <RootContainer pt="86px">
      <Grid justifyContent="center" columnGap="20px" rowGap="32px" container>
        {/* card */}
        {programs &&
          programs.length > 0 &&
          programs.map((program) => (
            <Box
              sx={{
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              key={program.id + program.name}
              borderRadius="8px"
              padding="24px"
              border="1px solid rgba(218, 218, 218, 1)"
              width={{ lg: "380px", md: "320px", sm: "100%", xs: "100%" }}
              position="relative"
            >
              {" "}
              <Box height="105px" top="24px" right={0} width="70%">
                {/* wrap text if overflow.. */}
                <Typography
                  component={"h4"}
                  fontSize={{ lg: "24px", md: "24px", sm: "20px", xs: "20px" }}
                  fontFamily="HankenGroteskExtraBold"
                  lineHeight="31.2px"
                  letterSpacing="-2%"
                  textOverflow="ellipsis"
                >
                  {program?.name}
                </Typography>
              </Box>
              <Box mt="17px" display="flex" flexDirection="column" gap="20px">
                <Grid columnGap="20px" container>
                  <Grid
                    gap="8px"
                    display="flex"
                    flexDirection="column"
                    item
                    lg={6}
                    xs={5}
                  >
                    <Typography
                      component={"h6"}
                      fontSize="14px"
                      fontFamily="HankenGroteskSemiBold"
                      color="rgba(32, 28, 26, 0.55)"
                    >
                      Tuition
                    </Typography>
                    <Typography
                      color="black"
                      fontSize="16px"
                      component={"p"}
                      fontFamily="HankenGroteskRegular"
                      lineHeight="20.8px"
                    >
                      {
                        getConvertedCost(
                          program?.detail?.fees?.tution_fee ?? 0,
                          program.detail.base_currency
                        ).formattedValue
                      }
                      /year
                    </Typography>
                  </Grid>
                  <Grid
                    gap="8px"
                    display="flex"
                    flexDirection="column"
                    item
                    lg={5}
                    xs={5}
                  >
                    <Typography
                      component={"h6"}
                      fontSize="14px"
                      fontFamily="HankenGroteskSemiBold"
                      color="rgba(32, 28, 26, 0.55)"
                    >
                      Duration
                    </Typography>
                    <Typography
                      color="black"
                      fontSize="16px"
                      component={"p"}
                      fontFamily="HankenGroteskRegular"
                      lineHeight="20.8px"
                    >
                      {program.detail.program_duration} years
                    </Typography>
                  </Grid>
                </Grid>
                <Divider />
                <Grid columnGap="20px" container>
                  <Grid
                    gap="8px"
                    display="flex"
                    flexDirection="column"
                    item
                    lg={6}
                    xs={5}
                  >
                    <Typography
                      component={"h6"}
                      fontSize="14px"
                      fontFamily="HankenGroteskSemiBold"
                      color="rgba(32, 28, 26, 0.55)"
                    >
                      Language
                    </Typography>
                    <Typography
                      color="black"
                      fontSize="16px"
                      component={"p"}
                      fontFamily="HankenGroteskRegular"
                      lineHeight="20.8px"
                      sx={{
                        textTransform: "capitalize",
                      }}
                    >
                      {program?.detail?.language ?? "English"}
                    </Typography>
                  </Grid>
                  <Grid
                    gap="8px"
                    display="flex"
                    flexDirection="column"
                    item
                    lg={5}
                    xs={5}
                  >
                    <Typography
                      fontSize="14px"
                      component={"span"}
                      fontFamily="HankenGroteskSemiBold"
                      color="rgba(32, 28, 26, 0.55)"
                    >
                      Intake
                    </Typography>
                    <Typography
                      color="black"
                      fontSize="16px"
                      fontFamily="HankenGroteskRegular"
                      lineHeight="20.8px"
                    >
                      {moment(program.detail.startDate).format("MMMM")}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box
                borderRadius="20px 0px 0px 20px"
                bgcolor="rgba(5, 65, 150, 1)"
                position="absolute"
                right={0}
                top="24px"
                padding="6px 12px"
                color="white"
                fontSize="14px"
                fontFamily="HankenGroteskRegular"
              >
                {/* find rank with key US NEWS Rankings US NEWS Rankings  */}
                U.S rank {extractUsRank(program?.detail?.program_rankings)}
              </Box>
            </Box>
          ))}
      </Grid>
    </RootContainer>
  );
}

export default ProgramSection;
