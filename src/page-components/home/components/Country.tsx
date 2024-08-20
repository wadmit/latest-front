import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { RootContainer } from "@/components/common";
import CountUp from "react-countup";
import { stdRecCountData } from "@/page-components/home/utils/provider";
import Image from "next/image";
import { CountryBoxWrapper } from "@/page-components/home/styled-components";

function Country() {
  return (
    <CountryBoxWrapper sx={{ mt: "40px" }}>
      <RootContainer>
        <Box
          display={{ lg: "flex", md: "none", sm: "none", xs: "none" }}
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            fontFamily="HankenGroteskExtraBold"
            fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "24px" }}
            lineHeight={{
              lg: "36.4px",
              md: "36.4px",
              sm: "32px",
              xs: "31.2px",
            }}
            letterSpacing="-3%"
            color="rgba(32, 28, 26, 0.9)"
            mt="36px"
            component="h3"
          >
            We connect{" "}
            <Typography
              fontFamily="HankenGroteskExtraBold"
              fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "24px" }}
              lineHeight={{
                lg: "36.4px",
                md: "36.4px",
                sm: "32px",
                xs: "31.2px",
              }}
              letterSpacing="-3%"
              borderBottom="4px dotted rgba(170, 68, 1, 1)"
              color="rgba(170, 68, 1, 1)"
              component="span"
            >
              students, recruiters and institutions
            </Typography>{" "}
            from all over the world.
          </Typography>
        </Box>

        {/* Grid */}
        <Grid
          container
          padding={{
            lg: "94px 0px 8px 40px",
            md: "80px -20px 6px 44px",
            sm: "70px -18px 1px 110px",
            xs: "48px 1px 1px 1px",
          }}
          alignItems="center"
          gap={{ xl: "85px", lg: "0px", md: "53px", sm: "30px", xs: "10px" }}
        >
          <Grid item xl={2} lg={4} md={12} sm={12} xs={12}>
            <Grid item container display="flex" justifyContent="space-between">
              {stdRecCountData.map((item, index) => (
                <Grid
                  item
                  xl={12}
                  lg={6}
                  md={6}
                  sm={6}
                  xs={4.2}
                  key={index}
                  mb="64px"
                  gap="200px"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography
                      fontFamily="HankenGroteskExtraBold"
                      fontSize={{
                        lg: "32px",
                        md: "32px",
                        sm: "28px",
                        xs: "24px",
                      }}
                      lineHeight={{
                        lg: "41.6px",
                        md: "41.6px",
                        sm: "38px",
                        xs: "31.2px",
                      }}
                      letterSpacing="-2%"
                      color="rgba(255, 107, 38, 1)"
                      component="h3"
                    >
                      <CountUp end={item.value} enableScrollSpy scrollSpyOnce />
                      {item.label === "Visa success rate" ? "%" : "+"}
                    </Typography>
                    <Typography
                      textAlign="center"
                      fontFamily="HankenGroteskSemiBold"
                      fontSize={{
                        lg: "18px",
                        md: "18px",
                        sm: "16px",
                        xs: "14px",
                      }}
                      lineHeight={{
                        lg: "27px",
                        md: "27px",
                        sm: "24px",
                        xs: "18.2px",
                      }}
                      color="rgba(32, 28, 26, 0.9)"
                      component="h4"
                    >
                      {item.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xl={9} lg={8} xs={12} display={{ xs: "block" }}>
            <Image
              width="10000"
              height="0"
              // objectFit="cover"
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
              }}
              src="/images/home/mainbig.webp"
              alt="wiseadmit-study-in-china"
            />
          </Grid>
        </Grid>
      </RootContainer>
    </CountryBoxWrapper>
  );
}

export default Country;
