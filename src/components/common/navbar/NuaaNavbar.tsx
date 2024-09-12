"use client";
import { WiseAdmitColorFulSvg, WiseSvg } from "public/svg";
import { theme } from "@/common/muicustomtheme/theme";
import { IUniversityTemplateConfig } from "@/types/utils";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Divider,
  ListItem,
  Stack,
  Typography,
  Popover as Dropdown,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  config: IUniversityTemplateConfig;
};

const NuaaNavbar = ({ config }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "large-screen-popover" : undefined;
  return (
    <Box bgcolor={config?.navbarBgColor} height="6rem" component="nav">
      <Stack
        direction="row"
        color="white"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
        px={5}
        spacing={5}
      >
        <Box>
          <a href={config?.originalSiteUrl} target="_blank" rel="noreferrer">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                position="relative"
                sx={{
                  height: "25rem",
                  width: "20rem",
                  [theme.breakpoints.down("md")]: {
                    height: "20rem",
                    width: "15rem",
                  },
                }}
              >
                <Image
                  src={"/images/universities/nuaa-logo.png"}
                  layout="fill"
                  objectFit="contain"
                  alt="logo"
                />
              </Box>
              {/* <Typography variant="h5">NUAA</Typography> */}
            </Stack>
          </a>
        </Box>
        <Box
          display={{
            md: "block",
            xs: "none",
          }}
        >
          <Link href="/">
            {/* <a> */}
            <Stack direction="column" alignItems="flex-end">
              <Typography
                color="black"
                fontFamily="HankenGroteskRegular"
                variant="subtitle1"
              >
                Powered by{" "}
              </Typography>
              {/* <WiseAdmitColorFulSvg color="white" /> */}
              <WiseSvg />
            </Stack>
            {/* </a> */}
          </Link>
        </Box>
        <IconButton
          onClick={handleClick}
          sx={{
            display: "none",
            [theme.breakpoints.down("md")]: {
              display: "block",
            },
          }}
        >
          <MenuIcon
            fontSize="large"
            sx={{
              color: "black",
            }}
          />
        </IconButton>

        <Dropdown
          anchorEl={anchorEl}
          onClose={handleClose}
          id={id}
          open={open}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <ListItem>
            <Link href="/">
              <a>
                <Stack direction="column" alignItems="center">
                  <Typography variant="subtitle1">Powered by </Typography>
                  <WiseAdmitColorFulSvg color="black" />
                </Stack>
              </a>
            </Link>
          </ListItem>
          <Divider />
        </Dropdown>
      </Stack>
    </Box>
  );
};

export default NuaaNavbar;
