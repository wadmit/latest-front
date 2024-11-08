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
import { TScholarshipEligibilityCriteriaProp } from "../utils/types";
import { StyledTableCellScholarship } from "../styled-components";

const SingleScholarshipEligibilityCriteria = forwardRef(
  (
    { criteria, language, qualification }: TScholarshipEligibilityCriteriaProp,
    ref
  ) => {
    const columns =
      qualification && qualification.length > 0
        ? Object.keys(qualification[0]).map((key) => ({
            id: key,
            label:
              key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1"),
            minWidth: 170,
            align: "left",
          }))
        : [];

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
              Eligibility criteria
            </Typography>
          </Box>

          <Box
            p={{ lg: 0, md: 0, sm: 2, xs: 2 }}
            display="flex"
            flexDirection="column"
            gap="15px"
          >
            {Object.entries(criteria).map(([key, value], index) => (
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
                  {key}
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
                      key={key}
                      style={{
                        marginTop: "8px",
                      }}
                    >
                      {value}
                    </li>
                  </ul>
                </Typography>
              </Box>
            ))}

            {qualification && qualification.length > 0 && (
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
                  sx={{ overflowx: "auto", width: "100%" }}
                >
                  <Table
                    sx={{ minWidth: "700px", mt: "16px", borderRadius: "8px" }}
                    aria-label="application table"
                  >
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <StyledTableCellScholarship
                            sortDirection={false}
                            key={column.id}
                            align={column.align as any}
                            style={{
                              color: "white",
                              fontSize: "16px",
                              minWidth: column.minWidth,
                            }}
                          >
                            {column.label}
                          </StyledTableCellScholarship>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {qualification && qualification.length > 0 ? (
                        qualification.map((qual: any, index: number) => (
                          <TableRow key={index}>
                            {Object.entries(qual).map(([key, value]) => (
                              <StyledTableCellScholarship
                                key={key}
                                sx={{
                                  color: "#201C1A",
                                  fontFamily: "HankenGroteskRegular",
                                  fontSize: "14px",
                                }}
                              >
                                {value as any}
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
                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    bgcolor="#EAF3FF"
                    borderRadius="8px"
                    padding="14px 20px"
                    gap="14px"
                  >
                    {Object.entries(language).map(([lang, value], index) => (
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
                            {lang}
                          </Typography>
                        </Grid>

                        <Grid item lg={9} md={9} sm={4} xs={5}>
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
                            {value}
                          </Typography>
                        </Grid>
                      </Grid>
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
