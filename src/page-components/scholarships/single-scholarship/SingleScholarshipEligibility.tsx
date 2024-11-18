import { Box, Typography } from "@mui/material";
import React from "react";
import { GetCallIconScholarship, SingleScholarshipBubble } from "../utils/svg";

type Props = {};

const SingleScholarshipEligibility = (props: Props) => {
  return (
    <Box borderRadius="8px" padding="32px 24px" bgcolor="#F5F2D4">
      <Typography
        fontWeight={800}
        lineHeight={{ lg: "31.2px", md: "31.2px", sm: "26px", xs: "26px" }}
        color="#000"
        fontSize={{ lg: "24px", md: "24px", sm: "20px", xs: "20px" }}
        fontFamily="HankenGroteskExtraBold"
        letterSpacing="-2%"
      >
        Curious about your eligibility?
        <br /> It only takes 3 minutes.
      </Typography>
      <Box display="flex" gap="14px">
        <Box
          mt="24px"
          width="fit-content"
          borderRadius="8px"
          padding="11px 17px"
          bgcolor="#FF6B26"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="12px"
          onClick={() =>
            window.open("https://meetings.hubspot.com/sanju-dongol")
          }
          sx={{
            cursor: "pointer",
          }}
        >
          <Typography
            fontWeight={600}
            fontFamily="HankenGroteskSemiBold"
            color="white"
            fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
            lineHeight={{
              lg: "19.2px",
              md: "19.2px",
              sm: "16.8px",
              xs: "16.8px",
            }}
          >
            Schedule a call
          </Typography>
          <GetCallIconScholarship />
        </Box>
        <Box mt="30px">
          <SingleScholarshipBubble />
        </Box>
      </Box>
    </Box>
  );
};

export default SingleScholarshipEligibility;
