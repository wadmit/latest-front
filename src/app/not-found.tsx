"use client";

import { ButtonWrapper } from "../components/common";
import { generateMetadata } from "../components/common/head-component/HeadComponent";
import { Box, Stack } from "@mui/material";
import { Metadata } from "next";
import { useRouter } from "next/navigation";

export const metadata: Metadata = generateMetadata({
  title: "404 | WiseAdmit",
  description: "Page not found",
  endPoint: "404",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Stack
        direction="column"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        {/* <DataNotfound title="404-Page Not Found" /> */}
        <Box maxWidth="400px" width="100%">
          <ButtonWrapper onClick={() => router.push("/")}>
            Go to Homepage
          </ButtonWrapper>
        </Box>
      </Stack>
    </>
  );
}
