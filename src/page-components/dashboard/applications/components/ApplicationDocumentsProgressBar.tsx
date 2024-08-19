import {
  Box,
  CircularProgress,
  circularProgressClasses,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const ApplicationDocumentsProgressBar = () => {
  return (
    <Stack
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={1}
      flexDirection="column"
    >
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          color="primary"
          variant="indeterminate"
          size={56}
          thickness={3}
          sx={{
            zIndex: 11,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
        />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <CircularProgress
          variant="indeterminate"
          thickness={3}
          size={56}
          sx={{
            color: "#ed5e1c",
            position: "absolute",
            zIndex: 0,
          }}
        />
      </Box>
      <Box>
        <Typography
          sx={{
            color: "#FF6B26",
            fontFamily: "HankenGroteskRegular",
            fontSize: "14px",
            fontStyle: "normal",
            lineHeight: "102%" /* 14.28px */,
            // textDecorationLine: 'underline',
          }}
          variant="button"
        >
          Uploading
        </Typography>
      </Box>
    </Stack>
  );
};

export default ApplicationDocumentsProgressBar;
