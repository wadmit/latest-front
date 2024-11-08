"use client";
import FAQAccordionCompSch from "@/components/common/faq/FAQAccordionCompSch.";
import { Box, Button, Typography } from "@mui/material";
import React, { forwardRef, useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const SingleScholarshipFAQ = forwardRef(
  ({ faqs }: { faqs: FAQItem[] }, ref) => {
    const [readMore, setReadMore] = useState(false);
    const handleToggleReadMore = () => {
      setReadMore((prev) => !prev);
    };
    return (
      <Box
        ref={ref}
        id="faqs"
        borderRadius="8px"
        border="1px solid #E9E9E9"
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
              FAQ
            </Typography>
          </Box>

          <Box p={{ lg: 0, md: 0, sm: 1.5, xs: 1.5 }}>
            {readMore ? (
              <Box display="flex" flexDirection="column" gap="20px">
                {faqs.map((faq, index) => (
                  <FAQAccordionCompSch
                    key={index}
                    title={faq.question}
                    details={faq.answer}
                  />
                ))}
              </Box>
            ) : (
              <Box display="flex" flexDirection="column" gap="20px">
                {faqs.slice(0, 3).map((faq, index) => (
                  <FAQAccordionCompSch
                    key={index}
                    title={faq.question}
                    details={faq.answer}
                  />
                ))}
              </Box>
            )}
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            p={{ lg: 0, md: 0, sm: 1.5, xs: 1.5 }}
          >
            <Button
              sx={{
                border: "1px solid var(--icon-disable, #A3A3A9)",
                borderRadius: "8px",
                background: "white",
                padding: "22px",
              }}
              onClick={handleToggleReadMore}
            >
              <Typography
                fontSize="14px"
                fontStyle="normal"
                fontFamily="HankenGroteskSemiBold"
                lineHeight="120%"
                color="#FF6B26"
                textAlign="center"
              >
                {readMore ? "Load Less" : "Load more"}
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default SingleScholarshipFAQ;
