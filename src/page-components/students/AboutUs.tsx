"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { RootContainer } from "@/components/common";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import Image from "next/image";

// About Us Section
function AboutUs() {
  const router = useRouter();
  return (
    <RootContainer
      mb={{ lg: "6.25rem", md: "1.2rem", sm: "1rem", xs: "1rem" }}
      mt={{ lg: "4.375rem", md: "1rem", sm: "1rem", xs: "1rem" }}
      sx={{
        height: "100%",
        position: "relative",
        zIndex: 10,
        width: "100%",
        backgroundColor: {
          xs: "transparent",
          sm: "transparent",
          md: "transparent",
          lg: "rgba(246, 241, 238, 1)",
        },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        padding: "30px 0px 30px 0px",
      }}
    >
      <Grid
        container
        gap={{ xl: "245px", lg: "245px", md: "100px", sm: "70px", xs: "50px" }}
      >
        <Grid
          item
          xl={4}
          lg={4}
          md={12}
          sm={12}
          xs={12}
          sx={{ display: { lg: "block", md: "block", xs: "none", sm: "flex" } }}
        >
          <Box
            width={{
              xl: "550px",
              lg: "550px",
              md: "800px",
              sm: "100%",
              xs: "100%",
            }}
            py={{
              xl: "2.1875rem",
              lg: "1rem",
              md: "0.1rem",
              sm: "0rem",
              xs: "0rem",
            }}
            display="flex"
            flexDirection="column"
            gap="12px"
          >
            <Typography
              component={"h3"}
              fontFamily="HankenGroteskExtraBold"
              fontSize={{ lg: "40px", md: "40px", sm: "35px", xs: "24px" }}
              lineHeight={{ lg: "60px", md: "60px", sm: "50px", xs: "31.2px" }}
              letterSpacing={{ lg: "-3%", md: "-3%", sm: "-2.5%", xs: "-2%" }}
              mt="1.25rem"
              color="rgba(32, 28, 26, 1)"
              onClick={() => router.push("/aboutus")}
              sx={{ cursor: "pointer" }}
            >
              What is{" "}
              <Typography
                fontFamily="HankenGroteskExtraBold"
                fontSize={{ lg: "40px", md: "40px", sm: "35px", xs: "24px" }}
                lineHeight={{
                  lg: "60px",
                  md: "60px",
                  sm: "50px",
                  xs: "31.2px",
                }}
                borderBottom="6px dotted rgba(170, 68, 1, 1)"
                color="rgba(170, 68, 1, 1)"
                letterSpacing={{ lg: "-3%", md: "-3%", sm: "-2.5%", xs: "-2%" }}
              >
                WiseAdmit?
              </Typography>
            </Typography>
            <Typography
              fontFamily="HankenGroteskRegular"
              fontSize="14px"
              component={"p"}
              lineHeight="20.8px"
              color="rgba(32, 28, 26, 1)"
            >
              WiseAdmit Technology, a global admission platform based in{" "}
              <Typography
                fontFamily="HankenGroteskRegular"
                fontSize="14px"
                lineHeight="20.8px"
                color="rgba(49, 133, 252, 1)"
              >
                Vancouver, Canada,
              </Typography>{" "}
              is ushering in a new era in the innovative method of studying
              abroad. We use AI-enabled matching technology to eliminate
              guesswork and wasted time and money from the admission process. By
              automating the workflow, we reduce processing time, allowing
              students and service providers to make informed decisions and
              receive faster service. We work on a global scale from China,
              Nepal, and Canada.
            </Typography>
            <Box width="7.25rem" mt="1.875rem">
              <Button
                onClick={() => {
                  analytics.websiteButtonInteractions({
                    buttonName: "Learn More",
                    source: "User clicked on Learn more from Student page",
                    urlPath: window.location.href,
                    event_type: EAnalyticsEvents.LEARN_MORE,
                    status: EAnalyticsStatus.SUCCESS,
                    redirectPath: "",
                  });
                  window.open("https://meetings.hubspot.com/rupesh-regmi");
                }}
                sx={{
                  borderRadius: "12px",
                  padding: "12px 32px",
                  bgcolor: "transparent",
                  width: "fit-content",
                  minHeight: "48px",
                  minWidth: "164px",
                  color: "rgba(255, 107, 38, 1)",
                  border: "1px solid rgba(131, 134, 139, 1)",
                  textTransform: "none",
                }}
              >
                Learn more
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xl={5.5}
          lg={5.5}
          md={12}
          sm={12}
          xs={12}
          sx={{ display: { lg: "block", md: "block", xs: "none", sm: "flex" } }}
        >
          <Image
            loading="lazy"
            width={100000000}
            height={1}
            // height="100%"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src="/images/home/aboutus.webp"
            alt="wiseadmit"
          />
          {/* <img
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              // aspectRatio: '16/9',
            }}
            loading="lazy"
            src="/images/home/aboutus.svg"
            alt="wiseadmit"
          /> */}
        </Grid>
        {/* For small screen sizes */}
        <Grid
          item
          lg={5.5}
          md={10}
          sm={12}
          xs={12}
          sx={{ display: { lg: "none", md: "none", xs: "block", sm: "none" } }}
        >
          <Image
            loading="lazy"
            width={1000}
            height={1}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src="/images/home/aboutus.webp"
            alt="wiseadmit"
          />
        </Grid>
        <Grid
          item
          lg={4}
          md={4}
          sm={12}
          xs={12}
          sx={{ display: { lg: "none", md: "none", xs: "block", sm: "none" } }}
        >
          <Box
            width={{ lg: "521px", md: "800px", sm: "100%", xs: "100%" }}
            py={{ lg: "2.1875rem", md: "0.1rem", sm: "0rem", xs: "0rem" }}
            display="flex"
            flexDirection="column"
            gap="12px"
          >
            <Typography
              component={"h3"}
              fontFamily="HankenGroteskExtraBold"
              fontSize={{ lg: "40px", md: "40px", sm: "35px", xs: "24px" }}
              lineHeight={{ lg: "60px", md: "60px", sm: "50px", xs: "31.2px" }}
              letterSpacing={{ lg: "-3%", md: "-3%", sm: "-2.5%", xs: "-2%" }}
              mt="1.25rem"
              color="rgba(32, 28, 26, 1)"
              onClick={() => {
                analytics.websiteButtonInteractions({
                  buttonName: "About WiseAdmit",
                  source: "User clicked on What is WiseAdmit from Student page",
                  urlPath: window.location.href,
                  event_type: EAnalyticsEvents.ABOUT_US,
                  status: EAnalyticsStatus.SUCCESS,
                  redirectPath: "",
                });
                router.push("/aboutus");
              }}
              sx={{ cursor: "pointer" }}
            >
              What is WiseAdmit?
            </Typography>
            <Typography
              fontFamily="HankenGroteskRegular"
              fontSize="14px"
              component={"p"}
              lineHeight="20.8px"
              color="rgba(32, 28, 26, 1)"
            >
              WiseAdmit Technology, a global admission platform based in{" "}
              <Typography
                fontFamily="HankenGroteskRegular"
                fontSize="14px"
                lineHeight="20.8px"
                color="rgba(49, 133, 252, 1)"
              >
                Vancouver, Canada,
              </Typography>
              is ushering in a new era in the innovative method of studying
              abroad. We use AI-enabled matching technology to eliminate
              guesswork and wasted time and money from the admission process. By
              automating the workflow, we reduce processing time, allowing
              students and service providers to make informed decisions and
              receive faster service. We work on a global scale from China,
              Nepal, and Canada.
            </Typography>
            <Box width="7.25rem" mt="1.875rem">
              <Button
                onClick={() => {
                  analytics.websiteButtonInteractions({
                    buttonName: "Learn More",
                    source: "User clicked on Learn more from Student page",
                    urlPath: window.location.href,
                    event_type: EAnalyticsEvents.LEARN_MORE,
                    status: EAnalyticsStatus.SUCCESS,
                    redirectPath: "",
                  });
                  window.open("https://meetings.hubspot.com/rupesh-regmi");
                }}
                sx={{
                  borderRadius: "12px",
                  padding: "12px 32px",
                  bgcolor: "transparent",
                  width: "fit-content",
                  minHeight: "48px",
                  minWidth: "164px",
                  color: "rgba(255, 107, 38, 1)",
                  border: "1px solid rgba(131, 134, 139, 1)",
                  textTransform: "none",
                }}
              >
                Learn more
              </Button>
            </Box>
          </Box>
        </Grid>{" "}
      </Grid>
    </RootContainer>
  );
}

export default AboutUs;
