import React from "react";
import { Box, Typography } from "@mui/material";
import { GetCallIcon } from "@/page-components/programs/svg";

function HelpMeDecide() {
  return (
    <Box borderRadius="8px" padding="32px 24px" bgcolor="#F5F2D4">
      <Typography
        lineHeight="150%"
        color="#000"
        fontSize="24px"
        fontFamily="HankenGroteskExtraBold"
      >
        Need assistance to decide on your major? Let us guide you!{" "}
      </Typography>
      <Box>
        <Box
          mt="24px"
          width="fit-content"
          borderRadius="40px"
          padding="13px 17px"
          bgcolor="#FF6B26"
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="4px"
          onClick={() =>
            window.open("https://meetings.hubspot.com/sanju-dongol")
          }
          sx={{
            cursor: "pointer",
          }}
        >
          <Typography
            fontFamily="HankenGroteskSemiBold"
            color="white"
            fontSize="14px"
          >
            Help me decide
          </Typography>
          <GetCallIcon />
        </Box>
      </Box>
    </Box>
  );
}

export default HelpMeDecide;
