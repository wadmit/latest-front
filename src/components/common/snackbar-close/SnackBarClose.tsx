"use client";
import { CloseRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";

export const SnackbarCloseButton = ({ snackbarKey }: { snackbarKey: any }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <CloseRounded color="inherit" />
    </IconButton>
  );
};
