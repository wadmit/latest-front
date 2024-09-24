import { Box, styled } from "@mui/material";

export const AlertButtonWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",

  borderRadius: "4px",
  border: "1px solid #004D29",
  background: "#FFF",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: "400",
  padding: "6px 10px",
  color: "#262626",
  cursor: "pointer",
  "&:hover": {
    background: "#F1FFF8",
    border: "1px solid #004D29",
    color: "#004D29",
  },
}));
