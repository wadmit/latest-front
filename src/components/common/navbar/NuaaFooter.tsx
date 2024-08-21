"use client";
import { WiseAdmitColorFulSvg } from "$/svg";
import { theme } from "@/common/muicustomtheme/theme";
import { IUniversityTemplateConfig } from "@/types/utils";
import { Box, Divider, Stack } from "@mui/material";
import Link from "next/link";
import React from "react";
import ImageComponent from "../image-component";

type Props = {
  config: IUniversityTemplateConfig;
};

const NuaaFooter = ({ config }: Props) => {
  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        px: 3,
        mt: 5,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={3}
      >
        <Link href="/">
          {/* <a> */}
          <WiseAdmitColorFulSvg color="black" />
          {/* </a> */}
        </Link>
        <Divider
          orientation="vertical"
          sx={{ bgcolor: "grey.A100", height: "5rem" }}
        />
        <a href={config?.originalSiteUrl} target="_blank" rel="noreferrer">
          <Box
            position="relative"
            sx={{
              height: "12rem",
              width: "15rem",
              [theme.breakpoints.down("md")]: {
                height: "8rem",
                width: "10rem",
              },
            }}
          >
            <ImageComponent
              src={"/images/universities/nuaa-logo.png"}
              style={{
                filter: "brightness(0) invert(1)",
              }}
              alt="footer-logo"
            />
          </Box>
        </a>
      </Stack>
    </Box>
  );
};

export default NuaaFooter;
