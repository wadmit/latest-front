import React from "react";
import { Box, Typography } from "@mui/material";
import { RootContainer } from "@/components/common";

function FindWiseScore() {
  return (
    <RootContainer>
      <Box
        mt={{ lg: "117px", md: "147px", sm: "84px", xs: "84px" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography
          component={"h2"}
          lineHeight="41.6px"
          fontSize={{ lg: "32px", md: "32px", sm: "24px", xs: "24px" }}
          fontFamily="HankenGroteskExtraBold"
        >
          Find the right students with WiseScore®
        </Typography>

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
            padding="41px"
            maxWidth={{ lg: "380px", md: "320px", sm: "100%", xs: "100%" }}
            width="100%"
            display="flex"
            borderRadius="12px"
            flexDirection="column"
            bgcolor="rgba(219, 255, 231, 1)"
          >
            <Typography
              component={"h3"}
              fontSize="16px !important"
              color="rgba(32, 28, 26, 0.9)"
              fontFamily="HankenGroteskRegular"
            >
              Step 1
            </Typography>
            <Typography
              component={"p"}
              fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
              fontFamily="HankenGroteskExtraBold"
              lineHeight="26px"
              mt="20px"
            >
              Students check their eligibility in less than 60 seconds with with
              WiseScore®
            </Typography>
          </Box>
          <Box
            padding="41px"
            maxWidth={{ lg: "380px", md: "320px", sm: "100%", xs: "100%" }}
            width="100%"
            display="flex"
            borderRadius="12px"
            flexDirection="column"
            bgcolor="rgba(219, 244, 255, 1)"
          >
            <Typography
              component={"h3"}
              fontSize="16px !important"
              color="rgba(32, 28, 26, 0.9)"
              fontFamily="HankenGroteskRegular"
            >
              Step 2
            </Typography>
            <Typography
              component={"p"}
              fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
              fontFamily="HankenGroteskExtraBold"
              lineHeight="26px"
              mt="20px"
            >
              Students apply to their best-matched program with the required
              info and documents.
            </Typography>
          </Box>
          <Box
            padding="41px"
            maxWidth={{ lg: "380px", md: "320px", sm: "100%", xs: "100%" }}
            width="100%"
            display="flex"
            borderRadius="12px"
            flexDirection="column"
            bgcolor="rgba(235, 219, 255, 1)"
          >
            <Typography
              component={"h3"}
              fontSize="16px !important"
              color="rgba(32, 28, 26, 0.9)"
              fontFamily="HankenGroteskRegular"
            >
              Step 3
            </Typography>
            <Typography
              component={"p"}
              fontSize={{ lg: "20px", md: "20px", sm: "18px", xs: "18px" }}
              fontFamily="HankenGroteskExtraBold"
              lineHeight="26px"
              mt="20px"
            >
              Students get an offer letter from the university once they fulfill
              all the requirements.
            </Typography>
          </Box>
        </Box>
      </Box>
    </RootContainer>
  );
}

export default FindWiseScore;
