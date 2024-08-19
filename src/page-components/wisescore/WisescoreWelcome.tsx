"use client";
import React from "react";
import { Box, BoxProps, Grid, Stack, Typography } from "@mui/material";
import {
  StyledContainerWrapper,
  StyledTypography,
  SvgWrapper,
} from "./utils/provider";
import { GetWaveIcon, SmallHand } from "./svgs";
import RenderSvg from "./components/RenderSvg";
interface Props extends BoxProps {
  primaryColor: string;
  version?: string;
  secondaryColor: string;
  header: {
    title: string;
    subHeader: string;
  };
}

function WiseScoreWelcome({
  primaryColor,
  version,
  secondaryColor,
  onClick,
  header: { title, subHeader },
  ...rest
}: Props) {
  const findOut = [
    {
      id: 1,
      text:
        version === "NuaaScore"
          ? "Qualify for admission at NUAA."
          : "Qualify to study at a top-ranked university.",
      variant: "blue",
    },
    {
      id: 2,
      text:
        version === "NuaaScore"
          ? "Can get full or partial scholarship opportunities."
          : "Can get full or partial scholarships from leading universities in the world",
      variant: "white",
    },
    {
      id: 3,
      text:
        version === "NuaaScore"
          ? " Are eligible for admissions pre-approval."
          : "Are eligible for admissions pre-approval.",
      variant: "blue",
    },
  ];

  const borderColor = version === "NuaaScore" ? "#C07641" : "#3185FC";
  const highlightColor = version === "NuaaScore" ? "#DCD6FF" : "#BCD8FF";

  return (
    <Box
      overflowx="hidden"
      position="relative"
      minHeight="95vh"
      component="div"
      {...rest}
    >
      <StyledContainerWrapper zIndex={40}>
        <Grid container spacing={10}>
          <Grid item lg={6} xs={12}>
            <Box
              padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
              display="flex"
              sx={{
                borderBottomRightRadius: "50%",
                borderBottomLeftRadius: "0%",
              }}
              alignItems={{
                lg: "flex-start",
                md: "center",
                sm: "center",
                xs: "flex-start",
              }}
              flexDirection="column"
              bgcolor={{
                lg: "transparent",
                md: "transparent",
                sm: "transparent",
                xs: secondaryColor,
              }}
            >
              <Box
                mt={{ lg: "90px", md: "72px", sm: "72px", xs: "36px" }}
                gap="8px"
                component="div"
                display="flex"
                alignItems="center"
              >
                <GetWaveIcon />
                <Typography
                  fontSize="14px"
                  lineHeight="18.2px"
                  fontFamily="HankenGroteskExtraBold"
                  component="p"
                >
                  Hey, glad to have you here!
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                mt={{ lg: "26px", xs: "15px" }}
              >
                <StyledTypography
                  textAlign={{
                    lg: "left",
                    md: "center",
                    sm: "center",
                    xs: "left",
                  }}
                >
                  Check your{" "}
                  <span style={{ color: primaryColor }}>{title}</span>
                </StyledTypography>

                <Typography
                  mt={{ lg: "26px", md: "26px", sm: "16px", xs: "16px" }}
                  color="#201C1AE5"
                  width={{ lg: "487px", md: "487px", sm: "100%", xs: "309px" }}
                  fontSize={{ lg: "16px", xs: "14px" }}
                  lineHeight={{ lg: "20.8px", xs: "18.2px" }}
                  textAlign={{
                    lg: "left",
                    md: "center",
                    sm: "center",
                    xs: "left",
                  }}
                  fontFamily="HankenGroteskRegular"
                  component="p"
                >
                  {title}, {subHeader}
                </Typography>
                <Box
                  width="100%"
                  display="flex"
                  justifyContent={{
                    lg: "flex-start",
                    md: "center",
                    sm: "center",
                    xs: "flex-start",
                  }}
                >
                  <Box
                    onClick={onClick}
                    borderRadius="8px"
                    bgcolor={primaryColor}
                    padding="16px 72px"
                    border="none"
                    sx={{
                      cursor: "pointer",
                      zIndex: 99,
                    }}
                    mt={{ lg: "42px", md: "42px", sm: "40px", xs: "40px" }}
                    component="button"
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        leadingTrim: "both",
                        textEdge: "cap",
                        letterSpacing: "0.75px",
                      }}
                      color="white"
                      fontFamily="HankenGroteskSemiBold"
                      fontSize="16px"
                    >
                      Let&apos;s start
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Box
              border="1.16px solid #D3D7D9"
              bgcolor="#ffffff"
              borderRadius="8px"
              display="flex"
              alignItems="center"
              flexDirection="column"
              mx={{ lg: "58px", md: "48px", sm: "20px", xs: "20px" }}
              mb={{ lg: "0px", md: "48px", sm: "40px", xs: "40px" }}
              mt={{ lg: "48px", md: "48px", sm: "40px", xs: "40px" }}
            >
              <Typography
                fontSize={{ lg: "20px", xs: "14px" }}
                lineHeight="31.25px"
                // variant="h6"
                fontFamily="HankenGroteskExtraBold"
                mt={{ lg: "38px", xs: "24px" }}
                mb={{ lg: "32px", xs: "24px" }}
              >
                Find out in 3 minutes if you:
              </Typography>
              <Stack
                direction="column"
                rowGap={3}
                position="relative"
                alignItems="center"
                mb="46px"
              >
                {findOut.map(({ id, text, variant }, index) => (
                  <Stack
                    key={index}
                    position="relative"
                    padding={{ lg: "12px 26px", xs: "10px 16px" }}
                    width={
                      variant === "blue"
                        ? "80%"
                        : { lg: "130%", md: "130%", sm: "110%", xs: "110%" }
                    }
                    borderRadius="8px"
                    border={
                      variant === "blue" ? "0px" : `1.5px solid ${borderColor}`
                    }
                    bgcolor={variant === "blue" ? highlightColor : "#ffffff"}
                    boxShadow={
                      variant === "blue"
                        ? "0px"
                        : "0px 4.628930568695068px 19.441509246826172px 0px #0000001A"
                    }
                  >
                    <Typography
                      fontSize={{ lg: "16px", xs: "12px" }}
                      lineHeight={{ lg: "25px", xs: "19.2px" }}
                      textAlign="center"
                      fontFamily={
                        variant === "blue"
                          ? "HankenGroteskRegular"
                          : "HankenGroteskSemiBold"
                      }
                    >
                      {text}
                    </Typography>
                    {id === 2 && (
                      <Box position="absolute" bottom="-50px" left="-30px">
                        <SmallHand />
                      </Box>
                    )}
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </StyledContainerWrapper>
      <SvgWrapper zIndex={20}>
        <RenderSvg step={14} />
      </SvgWrapper>
    </Box>
  );
}

export default WiseScoreWelcome;
