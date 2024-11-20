"use client";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const SingleScholarshipUniversity = () => {
  return (
    <Box p={{ lg: 0, md: 0, sm: 2, xs: 2 }}>
      <Box
        borderRadius="12px"
        // border="1px solid #E9E9E9"
        bgcolor="#F5F2D4"
        p={3}
      >
        <Typography
          fontWeight={400}
          fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
          fontFamily="HankenGroteskRegular"
          lineHeight={{
            lg: "22.4px",
            md: "22.4px",
            sm: "19.6px",
            xs: "19.6px",
          }}
          color="#201C1A"
        >
          Learn more about the{" "}
        </Typography>
        <Link href="/universities">
          <Typography
            fontWeight={400}
            fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
            fontFamily="HankenGroteskRegular"
            lineHeight={{
              lg: "22.4px",
              md: "22.4px",
              sm: "19.6px",
              xs: "19.6px",
            }}
            color="#FF6B26"
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            University.
          </Typography>
        </Link>{" "}
      </Box>
    </Box>
  );
};

export default SingleScholarshipUniversity;
