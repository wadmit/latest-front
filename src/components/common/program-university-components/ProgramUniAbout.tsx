"use client";

import React, { useContext, useState } from "react";
import { Box, Divider, Link, Typography } from "@mui/material";
import type { TProgramUniAboutProp } from "@/page-components/programs/utils/types";
import { ArrowIconUp, ArrowIconDown } from "@/page-components/programs/svg";

const ProgramUniAbout = React.forwardRef(
  ({ details, reasons, type }: TProgramUniAboutProp, ref) => {
    const [readMore, setReadMore] = useState(false);

    return (
      <Box
        ref={ref}
        id="about"
        borderRadius="8px"
        border="1px solid #E9E9E9"
        bgcolor="white"
        p={3}
      >
        <Box display="flex" flexDirection="column" gap="12px">
          <Box>
            <Typography
              fontSize="28px"
              fontStyle="normal"
              fontFamily="HankenGroteskExtraBold"
              lineHeight="150%"
              letterSpacing="-0.56px"
              color="#201C1A"
            >
              About
            </Typography>
          </Box>
          <Box>
            <Typography
              fontSize="16px"
              fontStyle="normal"
              fontFamily="HankenGroteskRegular"
              lineHeight="160%"
              color="#201C1A"
              component="p"
            >
              {details}
            </Typography>
          </Box>
        </Box>
        {reasons && reasons.length > 0 && (
          <Box mt="51px" display="flex" flexDirection="column" gap="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                fontSize="24px"
                fontStyle="normal"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="150%"
                letterSpacing="-0.48px"
                color="#201C1A"
              >
                Top reasons to study in this {type}?
              </Typography>
            </Box>
            <Divider />
            <Box>
              <Typography
                fontSize="16px"
                fontStyle="normal"
                fontFamily="HankenGroteskRegular"
                lineHeight="160%"
                color="#201C1A"
                display={readMore ? "block" : "-webkit-box"}
                component="p"
              >
                {readMore && (
                  <ol
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {reasons && reasons.map((reason) => <li>{reason}</li>)}
                  </ol>
                )}
              </Typography>
              {reasons && reasons.length > 0 && (
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Link
                    onClick={() => setReadMore((prev) => !prev)}
                    role="button"
                    color="secondary"
                    sx={{ cursor: "pointer" }}
                    underline="hover"
                  >
                    <Typography
                      fontSize="14px"
                      fontStyle="normal"
                      fontFamily="HankenGroteskSemiBold"
                      lineHeight="120%"
                      color="#FF6B26"
                    >
                      {readMore ? "Read Less" : "Read more"}
                    </Typography>
                  </Link>
                  {readMore ? <ArrowIconUp /> : <ArrowIconDown />}
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    );
  }
);

export default ProgramUniAbout;
