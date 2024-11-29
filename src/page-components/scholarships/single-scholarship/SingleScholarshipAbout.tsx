import React, { useState, useMemo } from "react";
import {
  Box,
  Divider,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TScholarshipAboutProp } from "@/page-components/scholarships/utils/types";
import {
  SingleScholarshipReadLess,
  SingleScholarshipReadMore,
} from "@/page-components/scholarships/utils/svg";

const SingleScholarshipAbout = React.forwardRef(
  ({ details }: TScholarshipAboutProp, ref) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [readMore, setReadMore] = useState(false);

    const { shortText, shouldShowReadMore } = useMemo(() => {
      const words = details.split(/\s+/);
      const shouldShow = words.length > 80;
      const truncated = shouldShow
        ? words.slice(0, 80).join(" ") + "..."
        : details;

      return {
        shortText: truncated,
        shouldShowReadMore: shouldShow,
      };
    }, [details]);

    return (
      <Box
        ref={ref}
        id="about"
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
        p={3}
      >
        <Box display="flex" flexDirection="column" gap="12px">
          <Box>
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
              About
            </Typography>
          </Box>
          <Box>
            <Typography
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
              {readMore ? details : shortText}
            </Typography>
            <Divider
              sx={{
                mt: "24px",
                mb: "25px",
                display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
              }}
            />
            {shouldShowReadMore && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent={{
                  lg: "center",
                  md: "center",
                  sm: "flex-start",
                  xs: "flex-start",
                }}
                mt={{ lg: "0px", md: "0px", sm: "16px", xs: "16px" }}
              >
                <Link
                  onClick={() => setReadMore((prev) => !prev)}
                  role="button"
                  color="secondary"
                  sx={{ cursor: "pointer" }}
                  underline="hover"
                >
                  <Typography
                    fontWeight={600}
                    fontSize={{
                      lg: "16px",
                      md: "16px",
                      sm: "14px",
                      xs: "14px",
                    }}
                    fontFamily="HankenGroteskSemiBold"
                    lineHeight={{
                      lg: "19.6px",
                      md: "19.6px",
                      sm: "19.2px",
                      xs: "19.2px",
                    }}
                    color="#FF6B26"
                  >
                    {readMore ? "Read Less" : "Read more"}
                  </Typography>
                </Link>
                {readMore ? (
                  <SingleScholarshipReadMore />
                ) : (
                  <SingleScholarshipReadLess />
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
);

export default SingleScholarshipAbout;
