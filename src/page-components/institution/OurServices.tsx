"use client";
import { RootContainer } from "@/components/common";
import { Box, Typography, Grid, useTheme, useMediaQuery } from "@mui/material";
import React from "react";

const serviceItems = [
  {
    imgSrc: "/images/institution/one.svg",
    title: "Recruitment of exceptional foreign students",
    description:
      "Partnering with WiseAdmit increases your university's visibility among top international students. It simplifies the application process, making it easier for students to apply.",
  },
  {
    imgSrc: "/images/institution/two.svg",
    title: "Technological partnership",
    description:
      "WiseScore® simplifies program matching, helping students find the best academic fit. It enhances your admissions system with seamless integration, real-time insights, and a user-friendly interface.",
  },
  {
    imgSrc: "/images/institution/third.svg",
    title: "Raising brand awareness and visibility",
    description:
      "We boost your brand’s visibility with social media management, strategic campaigns, and online advertising to attract students. We also organize virtual open houses and webinars to showcase your campus and programs effectively.",
  },
  {
    imgSrc: "/images/institution/four.svg",
    title: "Quality compliance",
    description:
      "We increase applicant reach and quality by partnering with top recruitment agents in key markets, ensuring they adhere to strict quality and ethical standards. We also provide them with training and resources to maximize their effectiveness.",
  },
  {
    imgSrc: "/images/institution/five.svg",
    title: "Strategic partnership with local high schools",
    description:
      "We build a pipeline of qualified students by partnering with top local high schools, organizing informational sessions, and hosting campus tours to engage potential applicants.",
  },
  {
    imgSrc: "/images/institution/sixth.svg",
    title: "Online lessons to boost awareness",
    description:
      "We boost awareness of your university by offering online language courses that highlight cultural and academic benefits while engaging a broader international audience.",
  },
];

const OurServices = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <RootContainer>
      <Box display="flex" justifyContent="center" alignItems="center" mt="50px">
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
        mt="80px"
        position="relative"
        sx={{
          "&::before": {
            content: '""',
            position: "absolute",
            borderRadius: "40px",
            backgroundColor: "rgba(235, 219, 255, 1)",
            top: { xs: "-10px", sm: "-25px" },
            left: { xs: "5px", sm: "10px" },
            right: { xs: "-10px", sm: "-20px" },
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
          padding={{ lg: "48px", md: "48px", sm: "30px", xs: "30px" }}
        >
          <Grid container spacing={3}>
            {serviceItems.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
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
