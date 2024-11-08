"use client";
import React, { useMemo } from "react";
import { RootContainer } from "@/components/common";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  ScholarshipBook,
  ScholarshipBookMobile,
  ScholarshipDeadline,
  ScholarshipDeadlineMobile,
  ScholarshipUniversity,
  ScholarshipUniversityMobile,
} from "../utils/svg";
import { IScholarshipResponse } from "@/types/utils";

type Props = {
  scholarship: IScholarshipResponse;
};

const SingleScholarshipQualification = ({ scholarship }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const qualificationItems = useMemo(
    () => [
      {
        key: "Qualification",
        icon: isMobile ? <ScholarshipBookMobile /> : <ScholarshipBook />,
        title: "Qualification",
        description: scholarship?.scholarship?.qualification,
      },
      {
        key: "Deadline",
        icon: isMobile ? (
          <ScholarshipDeadlineMobile />
        ) : (
          <ScholarshipDeadline />
        ),
        title: "Deadline",
        description: scholarship?.scholarship?.scholarshipDeadline,
      },
      {
        key: "Universities",
        icon: isMobile ? (
          <ScholarshipUniversityMobile />
        ) : (
          <ScholarshipUniversity />
        ),
        title: "Universities",
        description: `${scholarship?.scholarship?.totalUniversityPartners} Chinese universities`,
      },
    ],
    [isMobile, scholarship]
  );

  return (
    <Box
      borderBottom="1px solid rgba(233, 233, 233, 1)"
      color="rgba(255, 255, 255, 1)"
      bgcolor="#FFFF"
    >
      <RootContainer>
        <Box
          padding={{ lg: "29px", md: "29px", sm: "20px", xs: "24px 6px" }}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "column", md: "row", lg: "row" },
            justifyContent: {
              lg: "space-between",
              md: "space-between",
              sm: "flex-start",
              xs: "flex-start",
            },
            gap: {
              xs: "10px",
              sm: "10px",
              md: "250px",
              lg: "280px",
            },
          }}
        >
          {qualificationItems.map((item) => (
            <Box
              key={item.key}
              sx={{
                display: "flex",
                gap: "12px",
                flex: "0 1 auto",
                mb: isMobile ? 2 : 0,
                "&:not(:last-child)": {
                  marginBottom: { xs: "16px", sm: "16px", md: 0, lg: 0 },
                },
              }}
            >
              <Box>{item.icon}</Box>
              <Box display="flex" flexDirection="column" gap="8px">
                <Typography
                  fontFamily="HankenGroteskExtraBold"
                  fontWeight={800}
                  letterSpacing="-2%"
                  color="rgba(32, 28, 26, 1)"
                  fontSize={{
                    lg: "20px",
                    md: "20px",
                    sm: "16px",
                    xs: "16px",
                  }}
                  lineHeight={{
                    lg: "20px",
                    md: "20px",
                    sm: "16px",
                    xs: "16px",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  fontFamily="HankenGroteskRegular"
                  fontWeight={400}
                  color="rgba(0, 0, 0, 0.6)"
                  fontSize={{
                    lg: "14px",
                    md: "14px",
                    sm: "14px",
                    xs: "14px",
                  }}
                  lineHeight={{
                    lg: "14px",
                    md: "14px",
                    sm: "14px",
                    xs: "14px",
                  }}
                >
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </RootContainer>
    </Box>
  );
};

export default SingleScholarshipQualification;
