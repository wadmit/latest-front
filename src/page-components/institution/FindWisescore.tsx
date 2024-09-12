"use client";
import React from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { RootContainer } from "@/components/common";

function FindWiseScore() {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <RootContainer>
      <Box
        mt={{ lg: "100px", md: "147px", sm: "84px", xs: "84px" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box mt="-30px">
          <Typography
            component={"h2"}
            lineHeight="41.6px"
            fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "24px" }}
            fontFamily="HankenGroteskExtraBold"
          >
            Find the{" "}
            <Typography
              lineHeight="41.6px"
              fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "24px" }}
              fontFamily="HankenGroteskExtraBold"
              color="rgba(170, 68, 1, 1)"
              borderBottom="6px dotted rgba(170, 68, 1, 1)"
            >
              right students
            </Typography>{" "}
            with WiseScore®
          </Typography>
        </Box>

        <Box
          flexDirection={{
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          }}
          mt="54px"
          gap="20px"
          display="flex"
        >
          <Box
            padding={{ lg: "41px", md: "41px", sm: "28px", xs: "28px" }}
            maxWidth={{ lg: "380px", md: "320px", sm: "100%", xs: "100%" }}
            width="100%"
            display="flex"
            borderRadius="12px"
            flexDirection="column"
            bgcolor="rgba(239, 233, 174, 1)"
          >
            <Typography
              fontWeight={400}
              fontSize="16px !important"
              color="rgba(32, 28, 26, 0.9)"
              fontFamily="HankenGroteskRegular"
              lineHeight="22.4px"
            >
              Step 1
            </Typography>
            <Typography
              fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
              fontFamily="HankenGroteskExtraBold"
              lineHeight="26px"
              mt="20px"
              letterSpacing="-2%"
              color="rgba(32, 28, 26, 1)"
            >
              Students check their eligibility in {isMobile && <br />} less than
              60 seconds with {isMobile && <br />} WiseScore®
            </Typography>
          </Box>
          <Box
            padding={{ lg: "41px", md: "41px", sm: "28px", xs: "28px" }}
            maxWidth={{ lg: "380px", md: "320px", sm: "100%", xs: "100%" }}
            width="100%"
            display="flex"
            borderRadius="12px"
            flexDirection="column"
            bgcolor="rgba(219, 244, 255, 1)"
          >
            <Typography
              fontWeight={400}
              fontSize="16px !important"
              color="rgba(32, 28, 26, 0.9)"
              fontFamily="HankenGroteskRegular"
              lineHeight="22.4px"
            >
              Step 2
            </Typography>
            <Typography
              fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
              fontFamily="HankenGroteskExtraBold"
              lineHeight="26px"
              mt="20px"
              letterSpacing="-2%"
              color="rgba(32, 28, 26, 1)"
            >
              Students apply to their best-{isMobile && <br />}matched program
              with the {isMobile && <br />} required info and documents.
            </Typography>
          </Box>
          <Box
            padding={{ lg: "41px", md: "41px", sm: "28px", xs: "28px" }}
            maxWidth={{ lg: "380px", md: "320px", sm: "100%", xs: "100%" }}
            width="100%"
            display="flex"
            borderRadius="12px"
            flexDirection="column"
            bgcolor="rgba(235, 219, 255, 1)"
          >
            <Typography
              fontWeight={400}
              fontSize="16px !important"
              color="rgba(32, 28, 26, 0.9)"
              fontFamily="HankenGroteskRegular"
              lineHeight="22.4px"
            >
              Step 3
            </Typography>
            <Typography
              fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
              fontFamily="HankenGroteskExtraBold"
              lineHeight="26px"
              mt="20px"
              letterSpacing="-2%"
              color="rgba(32, 28, 26, 1)"
            >
              Students get an offer letter from {isMobile && <br />} the
              university once they fulfill all {isMobile && <br />} the
              requirements.
            </Typography>
          </Box>
        </Box>
      </Box>
    </RootContainer>
  );
}

export default FindWiseScore;
