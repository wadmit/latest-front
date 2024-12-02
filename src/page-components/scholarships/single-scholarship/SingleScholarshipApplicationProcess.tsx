"use client";
import { Box, Grid, Typography } from "@mui/material";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { TScholarshipProcessProp } from "@/page-components/scholarships/utils/types";
import { useRouter } from "next/navigation";

interface SectionLayout {
  useFullWidth: boolean;
}

interface SectionLayouts {
  [key: number]: SectionLayout;
}

interface ListItemRefs {
  [key: number]: React.RefObject<HTMLLIElement>[];
}

const SingleScholarshipApplicationProcess = forwardRef(
  ({ applicationProcess }: TScholarshipProcessProp, ref) => {
    const router = useRouter();
    const [sectionLayouts, setSectionLayouts] = useState<SectionLayouts>({});
    const listItemRefs = useRef<ListItemRefs>({});

    useEffect(() => {
      applicationProcess?.forEach((section, sectionIndex) => {
        listItemRefs.current[sectionIndex] = section.details.map(() =>
          React.createRef<HTMLLIElement>()
        );
      });
    }, [applicationProcess]);

    useEffect(() => {
      const layouts: SectionLayouts = {};
      applicationProcess?.forEach((section, sectionIndex) => {
        const hasMultilineItem = Object.values(
          listItemRefs.current[sectionIndex] || {}
        ).some((itemRef) => {
          const element = itemRef.current;
          if (element) {
            return element.clientHeight > 24;
          }
          return false;
        });

        layouts[sectionIndex] = {
          useFullWidth: section.details.length === 1 || hasMultilineItem,
        };
      });
      setSectionLayouts(layouts);
    }, [applicationProcess]);

    const renderListItems = (
      section: any,
      sectionIndex: number,
      startIdx: number,
      endIdx: number
    ) => {
      return section?.details
        .slice(startIdx, endIdx)
        .map((item: string, itemIndex: number) => (
          <Box
            key={itemIndex}
            sx={{
              display: "flex",
              minHeight: {
                lg: "40px",
                md: "40px",
                sm: "auto",
                xs: "auto",
              },
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <li
              ref={listItemRefs.current[sectionIndex]?.[startIdx + itemIndex]}
              style={{
                marginTop: "0px",
              }}
            >
              {item}
            </li>
          </Box>
        ));
    };

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
            gap="26px"
            p={{ lg: 0, md: 0, sm: 2, xs: 2 }}
          >
            {applicationProcess?.map((section, sectionIndex) => (
              <Box key={sectionIndex}>
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
                  mb={1}
                >
                  {section?.title}
                </Typography>
                <Grid
                  container
                  spacing={{
                    lg: 2,
                    md: 2,
                    sm: 0,
                    xs: 0,
                  }}
                  sx={{
                    display: sectionLayouts[sectionIndex]?.useFullWidth
                      ? "block"
                      : {
                          xs: "block",
                          sm: "block",
                          md: "flex",
                          lg: "flex",
                        },
                  }}
                >
                  <Grid
                    item
                    lg={sectionLayouts[sectionIndex]?.useFullWidth ? 12 : 6}
                    md={sectionLayouts[sectionIndex]?.useFullWidth ? 12 : 6}
                    sm={12}
                    xs={12}
                  >
                    <ul
                      style={{
                        listStyleType: "square",
                        margin: "15",
                        paddingInlineStart: "20px",
                      }}
                    >
                      {sectionLayouts[sectionIndex]?.useFullWidth
                        ? renderListItems(
                            section,
                            sectionIndex,
                            0,
                            section.details.length
                          )
                        : renderListItems(
                            section,
                            sectionIndex,
                            0,
                            Math.ceil(section.details.length / 2)
                          )}
                    </ul>
                  </Grid>
                  {!sectionLayouts[sectionIndex]?.useFullWidth &&
                    section?.details.length > 1 && (
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <ul
                          style={{
                            listStyleType: "square",
                            margin: "15",
                            paddingInlineStart: "20px",
                          }}
                        >
                          {renderListItems(
                            section,
                            sectionIndex,
                            Math.ceil(section.details.length / 2),
                            section.details.length
                          )}
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
                component="span"
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

SingleScholarshipApplicationProcess.displayName =
  "SingleScholarshipApplicationProcess";

export default SingleScholarshipApplicationProcess;
