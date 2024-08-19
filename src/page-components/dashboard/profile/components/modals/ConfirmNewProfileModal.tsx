import { uploadStudentProfile } from "@/api/web/user.action";
import { Box, Card, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import { UpdateProfilePhotoButton } from "@/page-components/dashboard/profile/styled-components";
import React from "react";

type Props = {
  imageFile: File;
  closeUploadImageModal: () => void;
};

const ConfirmNewProfileModal = ({
  imageFile,
  closeUploadImageModal,
}: Props) => {
  const imageUrl = URL.createObjectURL(imageFile);
  const { mutate: uploadImageMutate, isPending } = useMutation({
    mutationFn: uploadStudentProfile,
    onSuccess: (data) => {
      enqueueSnackbar("Image uploaded successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      closeUploadImageModal();
    },
    onError: (data) => {
      enqueueSnackbar("Failed to upload image", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      closeUploadImageModal();
    },
  });

  const uploadImageApiHandler = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      await uploadImageMutate(formData);
    }
  };
  return (
    <Dialog open sx={{ p: 2 }}>
      <Card sx={{ p: 2 }}>
        <DialogContent>
          <Box sx={{ height: "250px", width: "200px", objectFit: "contain" }}>
            <Image
              src={imageUrl}
              layout="fill"
              objectFit="cover"
              alt="profie"
            />
          </Box>
        </DialogContent>
      </Card>

      <DialogActions>
        <UpdateProfilePhotoButton size="small" onClick={closeUploadImageModal}>
          Cancel
        </UpdateProfilePhotoButton>
        <UpdateProfilePhotoButton
          size="small"
          variant="contained"
          onClick={uploadImageApiHandler}
        >
          {isPending ? "Uploading.." : "Confirm"}
        </UpdateProfilePhotoButton>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmNewProfileModal;
