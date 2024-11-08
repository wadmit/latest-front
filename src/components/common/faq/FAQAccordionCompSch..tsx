"use client";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { DownArrowAcc, MinusIcon, PlusIcon, UpArrowAcc } from "public/svg";
import { BodyB2, HeadingH5 } from "@/components/styled-components/design";
import type { IFAQData } from "@/page-components/faq/utils/types";
import { Stack, Typography, useMediaQuery, useTheme } from "@mui/material";

function FAQAccordionCompSch({ title, details, index }: IFAQData) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [expanded, setExpanded] = useState(index === 0);

  const handleChange = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  const getExpandIcon = () => {
    if (isMobile) {
      return expanded ? <MinusIcon /> : <PlusIcon />;
    }
    return expanded ? <UpArrowAcc /> : <DownArrowAcc />;
  };

  return (
    <Accordion
      sx={{
        boxShadow: "none",
        left: isMobile ? "-10px" : "0",
        borderBottom: "1px solid #ccc",
        pb: "10px",
        "&.MuiAccordion-root:before": {
          display: "none",
        },
      }}
      expanded={expanded}
      onChange={handleChange}
    >
      <AccordionSummary
        expandIcon={getExpandIcon()}
        aria-controls="panel1a-content"
        id="panel1a-header"
        sx={{
          paddingLeft: { lg: " 0px", md: "0px", sm: "0px", xs: "16px" },
          // Add space between title and expand icon
          ".MuiAccordionSummary-content": {
            paddingRight: "30px",
          },
        }}
      >
        <Stack direction="row" gap="30px" alignItems="center">
          <Typography
            fontWeight={600}
            fontFamily="HankenGroteskSemiBold"
            fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
            lineHeight={{
              lg: "22.4px",
              md: "22.4px",
              sm: "19.6px",
              xs: "19.6px",
            }}
            color="#201C1A"
            sx={{ maxWidth: "400px" }}
          >
            {title}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          paddingRight: { lg: " 120px", md: "120px", sm: "80px", xs: "80px" },
          paddingLeft: { lg: " 0px", md: "0px", sm: "0px", xs: "16px" },
        }}
      >
        <Typography
          fontWeight={400}
          fontFamily="HankenGroteskRegular"
          fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
          lineHeight={{
            lg: "22.4px",
            md: "22.4px",
            sm: "19.6px",
            xs: "19.6px",
          }}
          color="#201C1A"
        >
          {details}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default FAQAccordionCompSch;
