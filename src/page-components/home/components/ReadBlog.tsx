import React from "react";
import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { RootContainer } from "@/components/common";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import LargeImage from "@/page-components/home/components/LargeImage";
import MobileImageSlider from "@/page-components/home/components/MobileImageSlider";

function ReadBlog() {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      py={{
        lg: "40px",
        md: "96px",
        sm: "86px",
        xs: "86px",
      }}
    >
      <RootContainer>
        <Grid container gap="10px">
          <Grid
            item
            lg={3.8}
            md={12}
            sm={12}
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent={{
                lg: "flex-start",
                md: "center",
                sm: "center",
                xs: "center",
              }}
              alignItems={{
                lg: "flex-start",
                md: "center",
                sm: "center",
                xs: "center",
              }}
            >
              <Typography
                fontFamily="HankenGroteskExtraBold"
                fontWeight={800}
                fontSize={{ lg: "28px", md: "28px", sm: "18px", xs: "18px" }}
                lineHeight={{
                  lg: "36.4px",
                  md: "36.4px",
                  sm: "25px",
                  xs: "23.4px",
                }}
                letterSpacing={{ lg: "-3%", md: "-3%", sm: "-2%", xs: "-2%" }}
                color="rgba(32, 28, 26, 1)"
                sx={{
                  textAlign: {
                    lg: "left",
                    md: "center",
                    sm: "center",
                    xs: "center",
                  },
                }}
                component="h3"
              >
                Discover valuable tips and advice for a better study abroad
                experience
              </Typography>
              <Box
                mt="20px"
                color="white"
                fontSize="16px"
                fontFamily="HankenGroteskSemiBold"
                height="42px"
                width="fit-content"
                borderRadius="8px"
                padding="8px 32px"
                bgcolor="white"
                border="1px solid rgba(131, 134, 139, 1)"
                sx={{
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  color: "rgba(255, 107, 38, 1)",
                }}
                onClick={() => {
                  analytics.websiteButtonInteractions({
                    buttonName: "Read Our blogs",
                    source: "Clicked on Read our blogs from Home Page",
                    urlPath: window.location.href,
                    event_type: EAnalyticsEvents.BLOG,
                    status: EAnalyticsStatus.SUCCESS,
                    redirectPath: "",
                  });
                  router.push("/blogs");
                }}
              >
                Read our blogs
              </Box>
            </Box>
          </Grid>
          <Grid
            container
            item
            lg={8}
            md={12}
            sm={12}
            xs={12}
            spacing="20px"
            mt="20px"
          >
            {!isSmallScreen && <LargeImage />}
          </Grid>
          {isSmallScreen && <MobileImageSlider />}
        </Grid>
      </RootContainer>
    </Box>
  );
}

export default ReadBlog;
