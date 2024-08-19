"use client";
import { Box, Typography } from "@mui/material";

export function Chip({ text }: { text: string }) {
  return (
    <Box
      mt={2}
      mb={2}
      sx={{
        background: "var(--Complimentary-400, #054196)",
        color: "#FFFFFF",
        width: "fit-content",
        padding: "8px 23px",
        borderRadius: "25px",
      }}
    >
      <Typography variant="button">{text}</Typography>
    </Box>
  );
}
