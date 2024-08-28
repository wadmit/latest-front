import { RootContainer } from "@/components/common";
import { Box, Typography } from "@mui/material";
import React from "react";
import ForgotPassword from "./ForgotPassword";


const ForgotPasswordWrapper = () => {
  return (
    <RootContainer>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="32px"
      sx={{ py: 5, my: 4 }}
    >
      <Box>
        <Typography
          fontWeight={800}
          fontSize="48px"
          lineHeight="62.4px"
          letterSpacing="-2%"
          color="rgba(32, 28, 26, 1)"
          fontFamily="HankenGroteskExtraBold"
        >
          Reset your password?
        </Typography>
      </Box>

      <Box
        border=" 1px solid rgba(0, 0, 0, 0.2)"
        padding="32px"
        width={{ lg: "580px", md: "550px", sm: "100%", xs: "100%" }}
        borderRadius="8px"
      >
        <ForgotPassword />
      </Box>
    </Box>
  </RootContainer>
  )
};

export default ForgotPasswordWrapper;
