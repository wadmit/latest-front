import { deleteStudentAccount } from "@/api/web/user.action";
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
import React from "react";

type Props = {
  deleteWarningModalHandler: () => void;
};

const DeleteWarningModal = ({ deleteWarningModalHandler }: Props) => {
  const { mutate: deleteAccountMutate, isPending } = useMutation({
    mutationFn: deleteStudentAccount,
    onSuccess: (data) => {
      enqueueSnackbar("Account deleted successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      // auth.logOut(Cookies, router);
    },

    onError: (data) => {
      enqueueSnackbar("Failed to delete account", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    },
  });

  const confirmDelete = async () => {
    await deleteAccountMutate();
    deleteWarningModalHandler();
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
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteWarningModal;
