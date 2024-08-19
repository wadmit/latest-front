import { Stack } from "@mui/material";

export function IconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Stack
      minWidth="24px"
      height={{ md: "28px", xs: "16px" }}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {children}
    </Stack>
  );
}
