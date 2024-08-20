import { Box, Typography } from "@mui/material";
import Image from "next/image";

function ProgramUniversityHeader({
  headerFor,
}: {
  headerFor?: "program" | "university";
}) {
  return (
    <>
      <Box
        mt={9.4}
        display="flex"
        flexDirection={{ xs: "column", sm: "column", md: "row", lg: "row" }}
        justifyContent="center"
        alignItems="center"
        gap={{ xs: "20px", sm: "20px", md: "40px", lg: "109px" }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap="14px"
          flexDirection={{ xs: "column", sm: "column", md: "row", lg: "row" }}
        >
          <Typography
            color="var(--text-day-heading, #201C1A)"
            fontSize="48px"
            fontStyle="normal"
            fontFamily="HankenGroteskExtraBold"
            lineHeight="130%"
            letterSpacing="-0.96px"
            textAlign={{ lg: "left", md: "left", sm: "center", xs: "center" }}
          >
            {headerFor === "university"
              ? "Find the right universities for you"
              : "Kick-start your studies abroad with diverse programs"}
          </Typography>
          <Box>
            {headerFor === "university" ? (
              <Image
                src="/images/universities/university-shape-icon.webp"
                width={1000}
                style={{
                  width: 56,
                }}
                height={66}
                alt="university-shape-icon"
              />
            ) : (
              <Image
                src="/images/programs/book-icon.webp"
                width={1000}
                style={{
                  width: 74,
                }}
                height={65}
                alt="university-shape-icon"
              />
            )}
          </Box>
        </Box>

        <Box maxWidth="600px" width="100%" mx="auto" mt={2.5}>
          <Typography
            color="var(--text-day-heading, #201C1A)"
            fontSize="18px"
            fontStyle="normal"
            fontFamily="HankenGroteskRegular"
            lineHeight="150%"
            textAlign={{ lg: "left", md: "left", sm: "center", xs: "center" }}
          >
            {headerFor === "university"
              ? "Studying abroad has never been this easy. Find your perfect opportunity by writing a specific university below or find the perfect university with our filters"
              : "Browse the program that aligns with your needs. Apply to top-tier programs at Chinese universities."}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default ProgramUniversityHeader;
