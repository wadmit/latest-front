"use client";
import { Box, Grid, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import { SingleScholarshipBenefitsIcon } from "../utils/svg";
import { TScholarshipBenefitsProp } from "../utils/types";

const SingleScholarshipBenefits = forwardRef(
  ({ benefits }: TScholarshipBenefitsProp, ref) => {
    const benefitsArray = Object.entries(benefits).map(
      ([title, descriptions]) => ({
        title,
        descriptions: Array.isArray(descriptions)
          ? descriptions
          : [descriptions],
      })
    );

    return (
      <Box
        ref={ref}
        id="scholarshipBenefits"
        borderRadius="8px"
        border={{
          lg: "1px solid #E9E9E9",
          md: "1px solid #E9E9E9",
          sm: "none",
          xs: "none",
        }}
        // bgcolor={{
        //   lg: "white",
        //   md: "white",
        //   sm: "#F9F9F9",
        //   xs: "#F9F9F9",
        // }}
        bgcolor={{
          lg: "white",
          md: "white",
          sm: "transparent",
          xs: "transparent",
        }}
        p={{ lg: 3, md: 3, sm: 0, xs: 0 }}
      >
        <Box display="flex" flexDirection="column" gap="12px">
          <Box
            bgcolor={{
              lg: "transparent",
              md: "transparent",
              sm: "#0000000A",
              xs: "#0000000A",
            }}
            p={{ lg: 0, md: 0, sm: 2, xs: 2 }}
          >
            <Typography
              fontSize={{ lg: "28px", md: "28px", sm: "20px", xs: "20px" }}
              fontFamily="HankenGroteskExtraBold"
              lineHeight={{
                lg: "36.4px",
                md: "36.4px",
                sm: "26px",
                xs: "26px",
              }}
              letterSpacing="-3%"
              color="#201C1A"
            >
              Scholarship benefits
            </Typography>
          </Box>
          <Box p={{ lg: 0, md: 0, sm: 2, xs: 2 }}>
            <Grid container spacing={{ lg: 3, md: 3, sm: "12px", xs: "12px" }}>
              {benefitsArray.map((benefit, index) => (
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <Box
                    border="1px solid #E4E7EC"
                    padding={2}
                    borderRadius="24px"
                    display="flex"
                    gap="17px"
                    bgcolor={"white"}
                  >
                    <SingleScholarshipBenefitsIcon />
                    <Box display="flex" flexDirection="column" gap="10px">
                      <Typography
                        fontFamily="HankenGroteskSemiBold"
                        fontWeight={600}
                        letterSpacing="-2%"
                        color="rgba(32, 28, 26, 1)"
                        fontSize={{
                          lg: "16px",
                          md: "16px",
                          sm: "16px",
                          xs: "16px",
                        }}
                        lineHeight={{
                          lg: "22.4px",
                          md: "22.4px",
                          sm: "22.4px",
                          xs: "22.4px",
                        }}
                      >
                        {benefit?.title}
                      </Typography>
                      {benefit.descriptions.map((description, descIndex) => (
                        <Typography
                          key={descIndex}
                          fontFamily="HankenGroteskRegular"
                          fontWeight={400}
                          color="#201C1AE5"
                          fontSize={{
                            lg: "16px",
                            md: "16px",
                            sm: "14px",
                            xs: "14px",
                          }}
                          lineHeight={{
                            lg: "22.4px",
                            md: "22.4px",
                            sm: "22.4px",
                            xs: "22.4px",
                          }}
                        >
                          {description}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                </Grid>
              ))}
              <Grid item lg={6} md={6} sm={12} xs={12}></Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default SingleScholarshipBenefits;
