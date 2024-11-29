import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  FaqSectionFoundation,
  FaqSectionFoundationSlice,
} from "@/page-components/programs/components/FoundationFAQ";

const FAQ = React.forwardRef(({ country }: { country: string }, ref) => {
  const [readMore, setReadMore] = useState(false);
  const handleToggleReadMore = () => {
    setReadMore((prev) => !prev);
  };
  return (
    <Box
      id="faq"
      borderRadius="8px"
      border="1px solid #E9E9E9"
      bgcolor="white"
      p={3}
      display="flex"
      flexDirection="column"
      gap="10px"
    >
      <Box flex="1">
        <Typography
          fontSize={{ lg: "24px", md: "24px", sm: "20px", xs: "20px" }}
          fontWeight={800}
          fontFamily="HankenGroteskExtraBold"
          lineHeight={{ lg: "31.2px", md: "31.2px", sm: "26px", xs: "26px" }}
          letterSpacing="-2%"
          color="#201C1A"
        >
          FAQ
        </Typography>
      </Box>
      <Box>
        {readMore ? (
          <FaqSectionFoundation country={country} />
        ) : (
          <FaqSectionFoundationSlice country={country} />
        )}
      </Box>
      <Box display="flex" justifyContent="center" mt="32px">
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
            textTransform="none"
          >
            {readMore ? "Load less" : "Load more"}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
});
export default FAQ;
