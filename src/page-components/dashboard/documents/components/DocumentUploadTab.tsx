"use client";
import React, { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CloseIcon } from "@/components/common";
import { getCrossIcon } from "@/page-components/dashboard/documents/svg";
import { IDocuments } from "@/page-components/dashboard/documents/types";

type Props = {
  document: IDocuments;
  src: string | string[];
  handleUploadDocument: () => void;
  handlePreview: () => void;
  removeFileHandler: (url: string) => void;
  removeFileMutate: UseMutationResult<
    any,
    unknown,
    {
      coredocument: string;
      link: string;
      linkKey: string;
    },
    unknown
  >;
  selectedImagePreviewHandler: (params: {
    event: React.ChangeEvent<HTMLInputElement>;
    coreDocument: string;
  }) => void;
  inputButtonId: string;
};

const DocumentUploadTab = ({
  document,
  src,
  handleUploadDocument,
  handlePreview,
  removeFileMutate,
  removeFileHandler,
  selectedImagePreviewHandler,
  inputButtonId,
}: Props) => {
  const theme = useTheme();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const removeFileApiHandler = async ({ linkKey }: { linkKey: string }) => {
    if (!isDeleting) {
      setIsDeleting(true);
      await removeFileMutate.mutate(
        {
          coredocument: document.name.id,
          link: `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${linkKey}`,
          linkKey: linkKey,
        },
        {
          onSuccess: () => {
            removeFileHandler(linkKey);
            setIsDeleting(false);
            handleUploadDocument();
            handlePreview();
          },
          onError: () => {
            setIsDeleting(false);
          },
        }
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("Cannot upload file larger than 2MB");
        return;
      }
      if (!["image/jpeg", "image/png", "application/pdf"].includes(file.type)) {
        setErrorMessage(
          "Invalid file type. Please upload a JPEG, PNG, or PDF file."
        );
        return;
      }
      setErrorMessage(null);
      selectedImagePreviewHandler({ event: e, coreDocument: document.name.id });
      // selectedImagePreviewHandler(e, document.name.id);
    }
  };

  return (
    <Dialog
      fullWidth
      open
      sx={{
        backdropFilter: "blur(5px) sepia(5%)",
        "& .MuiDialog-paper": {
          borderRadius: "8px, 8px, 0px, 0px",
        },
      }}
    >
      <DialogTitle sx={{ padding: "0px" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="rgba(245, 245, 246, 1)"
          height="45px"
          padding="10px 24px"
        >
          <Typography
            fontFamily="HankenGroteskBold"
            fontWeight={600}
            fontSize={{ lg: "18px", md: "18px", sm: "18px", xs: "18px" }}
            lineHeight="25.2px"
            color="rgba(32, 28, 26, 1)"
          >
            Preview image or file
          </Typography>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ cursor: "pointer" }}
            onClick={handleUploadDocument}
          >
            <CloseIcon />
          </Box>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ padding: "5px", mt: "10px", mb: "10px" }}>
        {src && src.length > 0 ? (
          Array.isArray(src) ? (
            <Grid container spacing={2} sx={{ padding: "10px" }}>
              {src.map((eachSrc, index) => (
                <Grid item xs={6} lg={4} key={index}>
                  <Box
                    border="1px solid rgba(211, 215, 217, 1)"
                    display="flex"
                    flexDirection="column"
                    position="relative"
                    padding="10px"
                    sx={{
                      "&:hover": {
                        "& > div:last-child": {
                          display: "flex",
                          cursor: "pointer",
                        },
                      },
                      "&:hover > .cross-icon": {
                        display: "flex",
                      },
                    }}
                  >
                    <iframe
                      src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${eachSrc}`}
                      height="140px"
                      width="100%"
                      scrolling="no"
                      // alt="Arrow Ready"
                    />
                    <Typography
                      fontWeight={400}
                      fontSize="12px"
                      lineHeight="16.8px"
                      color="rgba(32, 28, 26, 0.9)"
                    >
                      {document.name.name}
                    </Typography>
                    <Typography
                      fontWeight={400}
                      fontSize="12px"
                      lineHeight="16.8px"
                      color="rgba(32, 28, 26, 0.55)"
                      mt="10px"
                    >
                      {new Date(
                        document.updatedAt ?? Date.now()
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>

                    <Box
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeFileApiHandler({ linkKey: eachSrc });
                      }}
                      sx={{
                        width: "15px",
                        height: "15px",
                        display: "none",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      className="cross-icon"
                      bgcolor="rgba(196, 199, 206, 1)"
                      right={-10}
                      position="absolute"
                      top="-10px"
                    >
                      {getCrossIcon()}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box position="relative" height="100%">
              <iframe
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                }}
                scrolling="no"
                src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${src}`}
              />
              <Typography
                fontWeight={400}
                fontSize="12px"
                lineHeight="16.8px"
                color="rgba(32, 28, 26, 0.9)"
              >
                {document.name.name}
              </Typography>
              <Typography
                fontWeight={400}
                fontSize="12px"
                lineHeight="16.8px"
                color="rgba(32, 28, 26, 0.55)"
              >
                {new Date(
                  document.updatedAt ?? Date.now()
                ).toLocaleDateString()}
              </Typography>
            </Box>
          )
        ) : (
          <Typography
            fontWeight={400}
            fontSize="16px"
            lineHeight="24px"
            color="rgba(32, 28, 26, 0.7)"
            textAlign="center"
          >
            No document uploaded
          </Typography>
        )}
        {errorMessage && (
          <Typography
            fontWeight={400}
            fontSize="16px"
            lineHeight="24px"
            color="red"
            textAlign="center"
            mb="10px"
            mt="20px"
          >
            Note: {errorMessage}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ padding: "0px", bgcolor: "rgba(245, 245, 246, 1)" }}>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          height="60px"
          padding="10px 24px"
          gap="16px"
        >
          <Box
            onClick={handleUploadDocument}
            borderRadius="8px"
            bgcolor="transparent"
            color="rgba(255, 107, 38, 1)"
            padding="8px 32px"
            border="1px solid rgba(32, 28, 26, 0.4)"
            sx={{ cursor: "pointer" }}
          >
            Back
          </Box>
          <Box
            borderRadius="8px"
            bgcolor="rgba(255, 107, 38, 1)"
            color="rgba(255, 255, 255, 1)"
            padding="8px 32px"
            // sx={{
            //     width: '109px',
            //     height: "36px",
            //     borderRadius: "8px",
            //     '@media (max-width: 600px)': {
            //         width: '90px',
            //     },
            // }}
          >
            <input
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id={inputButtonId}
              type="file"
            />
            <label htmlFor={inputButtonId} style={{ width: "100%" }}>
              Upload
            </label>
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DocumentUploadTab;
