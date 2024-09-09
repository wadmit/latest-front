import { deleteStudentAccount } from "@/api/web/user.action";
import { signOut } from "@/auth/auth";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { logout } from "@/api/web/logout.action";

type Props = {
  deleteWarningModalHandler: () => void;
};

const DeleteWarningModal = ({ deleteWarningModalHandler }: Props) => {

  const [isLoading, setLoading]= useState(false)

  const { mutate: deleteAccountMutate, isPending } = useMutation({
    mutationFn: deleteStudentAccount,
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: async (data) => {
      logout();
      setLoading(false)
      enqueueSnackbar("Account deleted successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      deleteWarningModalHandler()
    },

    onError: (data) => {
      setLoading(false)
      enqueueSnackbar("Failed to delete account", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      deleteWarningModalHandler()

    },
  });

  const confirmDelete = async () => {
    await deleteAccountMutate();
  };
  return (
    <Dialog open sx={{ p: 2 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <DialogTitle>
          <Typography variant="h4">Are you sure?</Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText textAlign="center">
            This action can be reversed in 30 days. After 30 days all data
            associated with the account will be lost.
          </DialogContentText>
        </DialogContent>
      </Box>
      <DialogActions>
        <Button size="small" onClick={deleteWarningModalHandler}>
          Cancel
        </Button>
        <Button size="small" variant="contained" onClick={confirmDelete}>
          {isLoading ? "Deleting..." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteWarningModal;
