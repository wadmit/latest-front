"use client";
import { Box, Grid, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import { TScholarshipProcessProp } from "../utils/types";
import { useRouter } from "next/navigation";

const SingleScholarshipApplicationProcess = forwardRef(
  ({ applicationProcess }: TScholarshipProcessProp, ref) => {
    const router = useRouter();
    return (
      <Box
        ref={ref}
        id="applicationProcess"
        borderRadius="8px"
        border={{
          lg: "1px solid #E9E9E9",
          md: "1px solid #E9E9E9",
          sm: "none",
          xs: "none",
        }}
        bgcolor="white"
        p={{ lg: 3, md: 3, sm: 0, xs: 0 }}
      >
        <Box display="flex" flexDirection="column" gap="16px">
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
              fontSize={{ lg: "24px", md: "24px", sm: "20px", xs: "20px" }}
              fontFamily="HankenGroteskExtraBold"
              lineHeight={{
                lg: "31.2px",
                md: "31.2px",
                sm: "26px",
                xs: "26px",
              }}
              letterSpacing="-3%"
              color="#201C1A"
            >
              Application process
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            gap="16px"
            p={{ lg: 0, md: 0, sm: 2, xs: 2 }}
          >
            {Object.entries(applicationProcess).map(([section, items]) => (
              <Box key={section}>
                <Typography
                  fontWeight={600}
                  fontFamily="HankenGroteskSemiBold"
                  fontSize={{ lg: "18px", md: "18px", sm: "16px", xs: "16px" }}
                  lineHeight={{
                    lg: "25.2px",
                    md: "25.2px",
                    sm: "22.4px",
                    xs: "22.4px",
                  }}
                  color="#201C1A"
                >
                  {section}
                </Typography>
                <Grid
                  container
                  sx={{
                    display: {
                      xs: "block",
                      sm: "block",
                      md: "flex",
                      lg: "flex",
                    },
                  }}
                >
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <ul
                      style={{
                        listStyleType: "square",
                        marginTop: "0",
                        paddingInlineStart: "20px",
                      }}
                    >
                      {items
                        .slice(0, Math.ceil(items.length / 2))
                        .map((item, index) => (
                          <li
                            key={index}
                            style={{
                              marginTop: "8px",
                            }}
                          >
                            {item}
                          </li>
                        ))}
                    </ul>
                  </Grid>
                  {items.length > 1 && (
                    <Grid
                      item
                      lg={6}
                      md={6}
                      sm={12}
                      xs={12}
                      sx={{
                        mt: { xs: 0, sm: 0, md: 0, lg: 0 },
                        "& ul": {
                          marginTop: {
                            xs: "-8px",
                            sm: "-8px",
                            md: "0",
                            lg: "0",
                          },
                        },
                      }}
                    >
                      <ul
                        style={{
                          listStyleType: "square",
                          marginTop: "0",
                          paddingInlineStart: "20px",
                        }}
                      >
                        {items
                          .slice(Math.ceil(items.length / 2))
                          .map((item, index) => (
                            <li
                              key={index}
                              style={{
                                marginTop: "8px",
                              }}
                            >
                              {item}
                            </li>
                          ))}
                      </ul>
                    </Grid>
                  )}
                </Grid>
              </Box>
            ))}
          </Box>

          <Box p={{ lg: 0, md: 0, sm: 2, xs: 2 }}>
            <Typography
              fontWeight={600}
              fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
              fontFamily="HankenGroteskExtraBold"
              lineHeight={{
                lg: "22.4px",
                md: "22.4px",
                sm: "19.6px",
                xs: "19.6px",
              }}
              letterSpacing="-3%"
              color="#201C1A"
            >
              Note:{" "}
            </Typography>
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
              letterSpacing="-3%"
              color="#201C1A"
            >
              Ensure you checked your{" "}
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
                letterSpacing="-3%"
                color="#FF6B26"
                onClick={() => router.push("/wisescore")}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                WiseScore®
              </Typography>{" "}
              before applying.
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default SingleScholarshipApplicationProcess;
