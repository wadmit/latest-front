"use client";
import { RootContainer } from "@/components/common";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import { serviceItems } from "@/page-components/institution/utils/provider";

const OurServices = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <RootContainer>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={{ lg: "100px", md: "100px", sm: "70px", xs: "70px" }}
      >
        <Typography
          component={"h2"}
          lineHeight="41.6px"
          fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "24px" }}
          fontFamily="HankenGroteskExtraBold"
        >
          Our{" "}
          <Typography
            lineHeight="41.6px"
            fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "24px" }}
            fontFamily="HankenGroteskExtraBold"
            color="rgba(170, 68, 1, 1)"
            borderBottom="6px dotted rgba(170, 68, 1, 1)"
            display="inline"
          >
            services
          </Typography>{" "}
        </Typography>
      </Box>

      <Box
        mt={{ lg: "80px", md: "80px", sm: "50px", xs: "50px" }}
        position="relative"
        sx={{
          "&::before": {
            content: '""',
            position: "absolute",
            borderRadius: "40px",
            backgroundColor: "rgba(235, 219, 255, 1)",
            top: { xs: "-10px", sm: "-25px" },
            left: { xs: "5px", sm: "10px" },
            right: { xs: "-7px", sm: "-20px" },
            height: "100%",
            zIndex: -2,
          },
        }}
        // sx={{
        //   "&::before, &::after": {
        //     content: '""',
        //     position: "absolute",
        //     borderRadius: "40px",
        //     backgroundColor: "rgba(235, 219, 255, 1)",
        //   },
        //   "&::before": {
        //     top: "-25px",
        //     left: "10px",
        //     right: "-20px",
        //     height: "100%",
        //     zIndex: -2,
        //   },
        //   //   "&::after": {
        //   //     top: "0px",
        //   //     right: "-10px",
        //   //     width: "100%",
        //   //     height: "100%",
        //   //     zIndex: -1,
        //   //   },
        // }}
      >
        <Box
          bgcolor="white"
          border="1px solid rgba(18, 2, 112, 1)"
          borderRadius="20px"
          padding={{ lg: "48px 0px 48px", md: "48px", sm: "30px", xs: "30px" }}
        >
          <Grid container spacing={3} justifyContent="space-evenly">
            {serviceItems.map((item, index) => (
              <Grid item xs={12} sm={5} key={index}>
                <Box
                  display="flex"
                  flexDirection={{
                    lg: "row",
                    md: "row",
                    sm: "column",
                    xs: "column",
                  }}
                  alignItems="flex-start"
                >
                  <img
                    src={item.imgSrc}
                    alt={`Image ${index + 1}`}
                    style={{ marginRight: "10px" }}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap="12px"
                    mt={{ lg: "0px", md: "0px", sm: "10px", xs: "10px" }}
                  >
                    <Typography
                      fontWeight={800}
                      fontFamily="HankenGroteskExtraBold"
                      fontSize={{
                        lg: "20px",
                        md: "20px",
                        sm: "18px",
                        xs: "18px",
                      }}
                      lineHeight={{
                        lg: "26px",
                        md: "26px",
                        sm: "23.4px",
                        xs: "23.4px",
                      }}
                      letterSpacing="-2%"
                      color="rgba(32, 28, 26, 0.95)"
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      fontWeight={400}
                      fontFamily="HankenGroteskRegular"
                      fontSize={{
                        lg: "16px",
                        md: "16px",
                        sm: "14px",
                        xs: "14px",
                      }}
                      lineHeight={{
                        lg: "22.4px",
                        md: "22.4px",
                        sm: "19.6px",
                        xs: "19.6px",
                      }}
                      color="rgba(32, 28, 26, 0.9)"
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </RootContainer>
  );
};

export default OurServices;
