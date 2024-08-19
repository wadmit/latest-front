import { Box, Typography } from "@mui/material";
import React from "react";
import { GetClipBoard } from "@/page-components/dashboard/documents/svg/index";

const NoDocumentAvailable = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      // height="35vh"
      mt={10}
    >
      <Box
        flexDirection="column"
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={1}
      >
        <GetClipBoard />
        <Typography variant="h6">
          Oops... looks like there are no files or media here.
        </Typography>
        <Typography width="80%" textAlign="center">
          Sorry, no files have been posted as of yet. Please post your files or
          documents so that they can be viewed here.
        </Typography>
      </Box>
    </Box>
  );
};

export default NoDocumentAvailable;
