import { Box, Typography } from "@mui/material";
import React from "react";

const DocumentUploadHeader = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
      gap={{ lg: "0px", md: "0px", sm: "10px", xs: "15px" }}
    >
      <Box mt={{ lg: 0, sm: 3, md: 2, xs: 2 }}>
        <Typography
          fontFamily="HankenGroteskExtraBold"
          fontWeight={800}
          fontSize={{ lg: "18px", md: "18px", sm: "18px", xs: "18px" }}
          lineHeight="23.4px"
          letterSpacing="-2%"
          color="rgba(32, 28, 26, 1)"
        >
          Uploaded documents
        </Typography>
        <Typography
          mt={1}
          width={{ lg: "50%", md: "70%", xs: "100%" }}
          variant="subtitle1"
          component="p"
          sx={{
            fontSize: "1rem",
            fontStyle: "normal",
            fontFamily: "HankenGroteskRegular",
            lineHeight: "140%",
          }}
        >
          All of the documents that have been uploaded for the universities can
          be seen here, and you can also update and review them.{" "}
        </Typography>
      </Box>
    </Box>
  );
};

export default DocumentUploadHeader;
