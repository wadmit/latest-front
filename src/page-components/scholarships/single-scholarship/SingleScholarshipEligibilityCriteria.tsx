import {
  Box,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { forwardRef } from "react";
import { TScholarshipEligibilityCriteriaProp } from "@/page-components/scholarships/utils/types";
import { StyledTableCellScholarship } from "@/page-components/scholarships/styled-components";

const SingleScholarshipEligibilityCriteria = forwardRef(
  (
    { criteria, language, qualification }: TScholarshipEligibilityCriteriaProp,
    ref
  ) => {
    const hasQualificationData = qualification?.title && qualification?.value;

    return (
      <Box
        ref={ref}
        id="eligibilityCriteria"
        borderRadius="8px"
        border={{
          lg: "1px solid #E9E9E9",
          md: "1px solid #E9E9E9",
          sm: "none",
          xs: "none",
        }}
        bgcolor="white"
        // p={2}
        p={{ lg: 3, md: 3, sm: 0, xs: 0 }}
      >
        <Box display="flex" flexDirection="column" gap="33px">
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
              Eligibility criteria
            </Typography>
          </Box>

          <Box
            p={{ lg: 0, md: 0, sm: 2, xs: 2 }}
            display="flex"
            flexDirection="column"
            gap="28px"
          >
            {criteria && criteria.length > 0 && (
              <Box>
                <Typography
                  fontFamily="HankenGroteskSemiBold"
                  fontWeight={600}
                  color="#201C1A"
                  fontSize={{
                    lg: "18px",
                    md: "18px",
                    sm: "18px",
                    xs: "18px",
                  }}
                  lineHeight={{
                    lg: "25.2px",
                    md: "25.2px",
                    sm: "25.2px",
                    xs: "25.2px",
                  }}
                >
                  Academic Excellence
                </Typography>

                {criteria?.map((value, index) => (
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
                  >
                    <ul
                      style={{
                        listStyleType: "square",
                        marginTop: "0",
                        paddingInlineStart: "20px",
                      }}
                    >
                      <li
                        key={index}
                        style={{
                          marginTop: "8px",
                        }}
                      >
                        {value}
                      </li>
                    </ul>
                  </Typography>
                ))}
              </Box>
            )}

            {hasQualificationData && (
              <Box>
                <Typography
                  fontFamily="HankenGroteskSemiBold"
                  fontWeight={600}
                  color="#201C1A"
                  fontSize={{
                    lg: "18px",
                    md: "18px",
                    sm: "18px",
                    xs: "18px",
                  }}
                  lineHeight={{
                    lg: "25.2px",
                    md: "25.2px",
                    sm: "25.2px",
                    xs: "25.2px",
                  }}
                >
                  Qualifications
                </Typography>

                <TableContainer
                  component={Paper}
                  sx={{ overflowx: "auto", width: "100%", borderRadius: "8px" }}
                >
                  <Table
                    sx={{ minWidth: "700px", mt: "16px", borderRadius: "8px" }}
                    aria-label="application table"
                  >
                    <TableHead
                      sx={{
                        "& .MuiTableRow-root th:first-child": {
                          borderTopLeftRadius: "8px",
                        },
                        "& .MuiTableRow-root th:last-child": {
                          borderTopRightRadius: "8px",
                        },
                      }}
                    >
                      <TableRow>
                        {qualification?.title.map((header, index) => (
                          <StyledTableCellScholarship
                            sortDirection={false}
                            key={index}
                            align="left"
                            style={{
                              color: "white",
                              fontSize: "16px",
                              minWidth: 170,
                            }}
                          >
                            {header}
                          </StyledTableCellScholarship>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {qualification?.value &&
                      qualification?.value.length > 0 ? (
                        qualification?.value.map((row, index) => (
                          <TableRow key={index}>
                            {row.map((cell, index) => (
                              <StyledTableCellScholarship
                                key={index}
                                sx={{
                                  color: "#201C1A",
                                  fontFamily: "HankenGroteskRegular",
                                  fontSize: "14px",
                                }}
                              >
                                {cell}
                              </StyledTableCellScholarship>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <Typography>No Scholarships Available</Typography>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            <Box>
              <Box>
                <Typography
                  fontFamily="HankenGroteskSemiBold"
                  fontWeight={600}
                  color="#201C1A"
                  fontSize={{
                    lg: "18px",
                    md: "18px",
                    sm: "18px",
                    xs: "18px",
                  }}
                  lineHeight={{
                    lg: "25.2px",
                    md: "25.2px",
                    sm: "25.2px",
                    xs: "25.2px",
                  }}
                >
                  Language proficiency
                </Typography>

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
                      Proof of English language proficiency is required, with
                      acceptable scores including:
                    </li>
                  </ul>
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    bgcolor="#EAF3FF"
                    borderRadius="8px"
                    padding="14px 20px"
                    gap="14px"
                  >
                    {language?.map((lang, index) => (
                      <React.Fragment key={index}>
                        <Grid container spacing={1}>
                          <Grid item lg={4} md={3} sm={4} xs={5}>
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
                              {lang?.title}
                            </Typography>
                          </Grid>

                          <Grid item lg={8} md={9} sm={4} xs={5}>
                            {Array.isArray(lang?.details) &&
                            lang.details.length > 1 ? (
                              <ul
                                style={{
                                  listStyleType: "square",
                                  paddingInlineStart: "20px",
                                  margin: 0,
                                }}
                              >
                                {lang.details.map((detail, detailIndex) => (
                                  <li
                                    key={detailIndex}
                                    // style={{
                                    //   marginTop: "8px",
                                    // }}
                                  >
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
                                    >
                                      {detail}
                                    </Typography>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <ul
                                style={{
                                  listStyleType: "square",
                                  paddingInlineStart: "20px",
                                  margin: 0,
                                }}
                              >
                                <li>
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
                                  >
                                    {lang?.details}
                                  </Typography>
                                </li>
                              </ul>
                            )}
                          </Grid>
                        </Grid>
                        {index < language.length - 1 && (
                          <Divider
                            sx={{
                              borderColor: "rgba(32, 28, 26, 0.1)",
                              width: "100%",
                            }}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default SingleScholarshipEligibilityCriteria;
