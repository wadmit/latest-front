"use client";
import React, { ChangeEvent, useId, useState } from "react";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { removeStudentDocument } from "@/api/web/user.action";
import Image from "next/image";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  DocumentBox,
  DocumentUploadTab,
  DisplaySelectedFile,
  DocumentPreview,
} from "@/page-components/dashboard/documents/components";
import { DocumentNullState } from "@/page-components/dashboard/documents/svg";
import { ShowPdf } from "./DocumentBox";
import { IDocuments } from "@/page-components/dashboard/documents/types";

type Props = {
  document: IDocuments;
};

const DocumentCard = ({ document }: Props) => {
  const [previewDocument, setPreviewDocument] = useState(false);

  const [uploadDocument, setUploadDocument] = useState(false);

  const [currentCoreDocument, setCurrentCoreDocument] = useState("");
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [displayPreview, setDisplayPreview] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(document.link_key);
  const inputButtonId = useId();

  const handlePreview = () => {
    setPreviewDocument((prev) => !prev);
  };

  const handleUploadDocument = () => {
    setUploadDocument((prev) => !prev);
  };

  const selectedImagePreviewHandler = ({
    event,
    coreDocument,
  }: {
    event: ChangeEvent<HTMLInputElement>;
    coreDocument: string;
  }) => {
    if (event?.target?.files && event?.target?.files[0]) {
      setCurrentCoreDocument(coreDocument);
      setDisplayPreview(true);
      setSelectedFile(event.target.files[0]);
    }
  };

  const closeUploadImageModal = () => {
    setDisplayPreview(false);
  };

  const updateFileDisplayHandler = (url: string[]) => {
    setUploadedFileUrl((prev) => [...prev, ...url]);
  };

  const removeFileMutation = useMutation({
    mutationFn: removeStudentDocument,
    onSuccess: (data) => {
      enqueueSnackbar("File removed successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      updateFileDisplayHandler(data?.data?.linkKey ?? []);
      handlePreview();
    },
  });

  const removeFileHandler = (url: string) => {
    setUploadedFileUrl((prev) => prev.filter((each) => each !== url));
  };

  return (
    <>
      <Stack
        borderRadius="8px"
        // flex={1}
        border="1px solid rgba(211, 215, 217, 1)"
        padding={3}
        width={{ xs: "100%" }}
      >
        <Stack
          flexDirection="row"
          display="flex"
          justifyContent="space-between"
        >
          <Typography color="rgba(32, 28, 26, 1)" variant="h7">
            {document.name.name}
          </Typography>
        </Stack>
        <Box display="flex" flexDirection="column" gap={1} mt="8px">
          <Typography color="#5B5B5B" variant="body1">
            Last updated:{" "}
            {new Date(document.updatedAt ?? Date.now())
              .toISOString()
              .slice(0, 10)}
          </Typography>
        </Box>
        <Box
          justifyContent={{ lg: "space-between", sm: "center", xs: "center" }}
          alignItems={{ lg: "flex-start", sm: "center", xs: "center" }}
          mt={3}
          flex={1}
          display="flex"
          flexDirection={{
            xs: "column-reverse",
            md: "column-reverse",
            lg: "row",
          }}
          gap={2}
        >
          <Box display="flex" flexDirection="column" gap="16px">
            <Box
              display="flex"
              flexDirection={{ lg: "column", xs: "row" }}
              gap={2}
              // flex={0.5}
            >
              {" "}
              <Button
                onClick={handleUploadDocument}
                variant="contained"
                sx={{
                  width: "183px",
                  borderRadius: "8px",
                  "@media (max-width: 600px)": {
                    width: "130px",
                  },
                }}
              >
                Upload
              </Button>
              <Button
                onClick={handlePreview}
                disabled={!(uploadedFileUrl.length > 0)}
                sx={{
                  width: "183px",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  color: "primary.main",
                  border: "2px solid #ADADAD",
                  "@media (max-width: 600px)": {
                    width: "130px",
                  },
                }}
              >
                View
              </Button>
            </Box>
          </Box>

          <Box
            position="relative"
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
          >
            <Box
              width={{ lg: "300px", md: "200px", sm: "150px", xs: "200px" }}
              position="relative"
              height="143px"
              bottom="30px"
            >
              {uploadedFileUrl && typeof uploadedFileUrl !== "string"
                ? uploadedFileUrl.map((link, idx) => {
                    const fileType = link.split(".").pop() as string;
                    return fileType === "pdf" ? (
                      <ShowPdf idx={idx} />
                    ) : (
                      <Box
                        key={idx}
                        width="153px"
                        height="143px"
                        top={{ lg: 0, md: 10, sm: 10, xs: 10 }}
                        boxShadow="0px 5px 20px 0px rgba(0, 0, 0, 0.15)"
                        style={{
                          zIndex: idx * 10,
                          position: "absolute",
                          right: `${idx * 10}px`,
                          borderRadius: "8px",
                        }}
                      >
                        <Image
                          objectFit="cover"
                          width={153}
                          height={143}
                          style={{
                            borderRadius: "8px",
                          }}
                          src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${link}`}
                          alt="passport"
                        />
                      </Box>
                    );
                  })
                : typeof document.link_key === "string" && (
                    <DocumentBox link={uploadedFileUrl} />
                  )}

              {document.link_key.length === 0 && (
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  height={{ lg: "120px", md: "120px", sm: "80%", xs: "125%" }}
                >
                  <DocumentNullState />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Stack>
      {displayPreview && selectedFile && (
        <DisplaySelectedFile
          file={selectedFile}
          fileName={document?.name?.name}
          coreDocument={currentCoreDocument}
          closeUploadImageModal={closeUploadImageModal}
          updateFileDisplayHandler={updateFileDisplayHandler}
        />
      )}
      {previewDocument && (
        <DocumentPreview
          name={document.name}
          handlePreview={handlePreview}
          removeFileMutate={removeFileMutation}
          removeFileHandler={removeFileHandler}
          src={uploadedFileUrl}
          document={document}
        />
      )}
      {uploadDocument && (
        <DocumentUploadTab
          document={document}
          handleUploadDocument={handleUploadDocument}
          handlePreview={handlePreview}
          removeFileMutate={removeFileMutation}
          removeFileHandler={removeFileHandler}
          src={uploadedFileUrl}
          selectedImagePreviewHandler={selectedImagePreviewHandler}
          inputButtonId={inputButtonId}
        />
      )}
    </>
  );
};

export default DocumentCard;
