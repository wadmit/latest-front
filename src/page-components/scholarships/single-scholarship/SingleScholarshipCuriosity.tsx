"use client";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const SingleScholarshipCuriosity = (props: Props) => {
  const router = useRouter();
  return (
    <Box padding={{ lg: 0, md: 0, sm: "24px 16px", xs: "1px 16px" }}>
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
          Curious about your eligibility? Check your{" "}
          <Link href="/wisescore">
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
                cursor: "pointer",
              }}
              onClick={() => router.push("/wisescore")}
            >
              WiseScore®
            </Typography>
          </Link>{" "}
          now.
        </Typography>
      </Box>
    </Box>
  );
};

export default SingleScholarshipCuriosity;
