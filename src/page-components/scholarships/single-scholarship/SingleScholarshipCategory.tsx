import { Box, Divider, Typography, Grid } from "@mui/material";
import React, { forwardRef } from "react";
import { TScholarshipCategoryProp } from "../utils/types";

const SingleScholarshipCategory = forwardRef(
  ({ categories }: TScholarshipCategoryProp, ref) => {
    return (
      <Box
        ref={ref}
        id="scholarshipCategories"
        borderRadius="8px"
        border={{
          lg: "1px solid #E9E9E9",
          md: "1px solid #E9E9E9",
          sm: "none",
          xs: "none",
        }}
        bgcolor={{
          lg: "white",
          md: "white",
          sm: "transparent",
          xs: "transparent",
        }}
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
              Categories
            </Typography>
          </Box>

          <Box p={{ lg: 0, md: 0, sm: 1.5, xs: 1.5 }}>
            <Box
              bgcolor="#EAF3FF"
              padding={3}
              display="flex"
              flexDirection="column"
              gap={{ lg: "16px", md: "16px", sm: "12px", xs: "12px" }}
              borderRadius="8px"
            >
              {Object.entries(categories).map(([category, points], index) => (
                <React.Fragment key={category}>
                  {index > 0 && <Divider />}
                  <Grid container spacing={2}>
                    <Grid item lg={3} md={3} sm={4} xs={5}>
                      <Typography
                        fontFamily="HankenGroteskSemiBold"
                        fontWeight={600}
                        color="#201C1A"
                        fontSize={{
                          lg: "16px",
                          md: "16px",
                          sm: "14px",
                          xs: "14px",
                        }}
                        lineHeight={{
                          lg: "22.4px",
                          md: "22.4px",
                          sm: "19.6px",
                          xs: "19.6px",
                        }}
                      >
                        {category}
                      </Typography>
                    </Grid>

                    <Grid item lg={9} md={9} sm={8} xs={7} mt="-5px">
                      {/* For large screens */}
                      <Typography
                        fontFamily="HankenGroteskRegular"
                        fontWeight={400}
                        color="#201C1A"
                        fontSize={{
                          lg: "16px",
                          md: "16px",
                          sm: "14px",
                          xs: "14px",
                        }}
                        lineHeight={{
                          lg: "22.4px",
                          md: "22.4px",
                          sm: "19.6px",
                          xs: "19.6px",
                        }}
                        sx={{ display: { xs: "none", md: "block" } }}
                      >
                        <ul
                          style={{
                            listStyleType: "square",
                            marginTop: "0",
                            paddingInlineStart: "20px",
                          }}
                        >
                          {points.map((point: any) => (
                            <li
                              key={point}
                              style={{
                                marginTop: "8px",
                              }}
                            >
                              {point}
                            </li>
                          ))}
                        </ul>
                      </Typography>

                      {/* For small screens */}
                      <Typography
                        sx={{ display: { xs: "block", md: "none" } }}
                        fontFamily="HankenGroteskRegular"
                        fontWeight={400}
                        color="#201C1A"
                        fontSize={{
                          sm: "14px",
                          xs: "14px",
                        }}
                        lineHeight={{
                          sm: "19.6px",
                          xs: "19.6px",
                        }}
                      >
                        <ul
                          style={{
                            listStyleType: "square",
                            marginTop: "0",
                            paddingInlineStart: "20px",
                          }}
                        >
                          <li
                            style={{
                              marginTop: "8px",
                            }}
                          >
                            {" "}
                            {points.join(", ")}
                          </li>
                        </ul>
                      </Typography>
                    </Grid>
                  </Grid>
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default SingleScholarshipCategory;
