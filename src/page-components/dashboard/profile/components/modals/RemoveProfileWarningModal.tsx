import { deleteStudentProfile } from "@/api/web/user.action";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import React from "react";

type Props = {
  closeRemoveImageModal: () => void;
};

const RemoveProfileWarningModal = ({ closeRemoveImageModal }: Props) => {
  const { mutate: removeImageMutate, isPending } = useMutation({
    mutationFn: deleteStudentProfile,
    onSuccess: (data) => {
      closeRemoveImageModal();

      enqueueSnackbar("Image removed successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    },
    onError: (data) => {
      closeRemoveImageModal();

      enqueueSnackbar("Failed to removed image", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    },
  });

  const removeApiHandler = async () => {
    await removeImageMutate();
  };

  return (
    <Dialog open sx={{ p: 2 }}>
      <DialogTitle>Do you want to remove your current image?</DialogTitle>
      <DialogActions>
        <Button size="small" onClick={closeRemoveImageModal}>
          Cancel
        </Button>
        <Button size="small" variant="contained" onClick={removeApiHandler}>
          {isPending ? "Removing.." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RemoveProfileWarningModal;
