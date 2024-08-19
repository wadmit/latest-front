import { uploadStudentDocument } from "@/api/web/user.action";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { enqueueSnackbar } from "notistack";
import React from "react";

type Props = {
  file: File;
  closeUploadImageModal: () => void;
  updateFileDisplayHandler: (url: string[]) => void;
  coreDocument: string;
  fileName?: string;
};

const DisplaySelectedFile = ({
  file,
  closeUploadImageModal,
  updateFileDisplayHandler,
  coreDocument,
  fileName,
}: Props) => {
  const fileUrl = URL.createObjectURL(file);

  const { mutate: uploadImageMutate, isPending } = useMutation({
    mutationFn: uploadStudentDocument,
    onSuccess: (data) => {
      enqueueSnackbar("File uploaded successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      updateFileDisplayHandler(data?.data?.linkKey ?? []);
      // analytics.websiteButtonInteractions({
      //   buttonName: 'Upload Document',
      //   source: `${fileName} has been uploaded successfully`,
      //   urlPath: window.location.href,
      //   event_type: EAnalyticsEvents.NAVIGATION_DOCUMENT_UPLOAD,
      //   status: EStatus.SUCCESS
      // });
      closeUploadImageModal();
    },
  });

  const uploadImageApiHandler = async () => {
    if (fileUrl) {
      const formData = new FormData();
      formData.append("file", file);
      await uploadImageMutate({ formData, coreDocumentId: coreDocument });
    }
  };

  return (
    <Dialog open sx={{ p: 2 }}>
      <Card sx={{ p: 2 }}>
        <DialogContent>
          <Box sx={{ height: "250px", width: "200px", objectFit: "contain" }}>
            {file.type.startsWith("image/") ? (
              <Image
                src={fileUrl}
                layout="fill"
                objectFit="contain"
                alt="profie"
              />
            ) : (
              <iframe
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
                src={fileUrl}
                title="name"
                seamless
              />
            )}
          </Box>
        </DialogContent>
      </Card>

      <DialogActions>
        <Button size="small" onClick={closeUploadImageModal}>
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={uploadImageApiHandler}
          disabled={isPending}
        >
          {isPending ? "Uploading.." : "Confirm"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DisplaySelectedFile;
