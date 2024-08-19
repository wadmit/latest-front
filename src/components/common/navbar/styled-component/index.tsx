"use client";
import { Drawer, styled } from "@mui/material";

export const DrawerWrapper = styled(Drawer, {
  name: "Drawer",
})`
  z-index: 999999999999;
  .MuiDrawer-paper {
    background-color: rgba(33, 21, 12, 1);
    width: 100%;
    max-width: 375px;
    padding: 26px 16px;
    @media (max-width: 600px) {
      max-width: 100%;
    }
  }
`;
