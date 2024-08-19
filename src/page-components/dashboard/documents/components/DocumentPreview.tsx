"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import {
  CloseDocumentIcon,
  DeleteIcon,
  DeleteIconMobile,
  ViewIcon,
} from "@/page-components/dashboard/documents/svg";
import { UseMutationResult } from "@tanstack/react-query";
import { IDocuments, Name } from "@/page-components/dashboard/documents/types";

type Props = {
  name: Name;
  src: string | string[];
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
  document: IDocuments;
};

const DocumentPreview = ({
  name,
  src,
  handlePreview,
  removeFileMutate,
  removeFileHandler,
  document,
}: Props) => {
  const theme = useTheme();
  const [currentFrame, setCurrentFrame] = useState(0);
  const [hovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isLargeScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const removeFileApiHandler = async ({ linkKey }: { linkKey: string }) => {
    if (!isDeleting) {
      setIsDeleting(true);
      await removeFileMutate.mutate(
        {
          coredocument: name.id,
          link: `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${linkKey}`,
          linkKey,
        },
        {
          onSuccess: () => {
            removeFileHandler(linkKey);
            setIsDeleting(false);
          },
          onError: () => {
            setIsDeleting(false);
          },
        }
      );
    }
  };

  const handleNext = () => {
    if (Array.isArray(src) && currentFrame < src.length - 1) {
      setCurrentFrame(currentFrame + 1);
    }
  };

  const handlePrevious = () => {
    if (Array.isArray(src) && currentFrame > 0) {
      setCurrentFrame(currentFrame - 1);
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
            fontSize="18px"
            lineHeight="25.2px"
            color="rgba(32, 28, 26, 1)"
          >
            View image or file
          </Typography>
          <Box
            display="flex"
            justifyContent="flex-end"
            sx={{ cursor: "pointer" }}
            onClick={handlePreview}
          >
            <CloseDocumentIcon />
          </Box>
        </Box>
      </DialogTitle>
      <Box
        padding="20px"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {Array.isArray(src) ? (
          <Box position="relative" height="100%">
            <iframe
              width="100vw"
              height="100vh"
              src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${src[currentFrame]}#toolbar=0&navpanes=0&scrollbar=0`}
              title={name.name}
              scrolling="no"
              style={{
                width: "100%",
                height: "50vh",
                border: "none",
                background: "transparent",
                objectFit: "contain",
              }}
              onClick={() => {
                window.open(
                  `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${src[currentFrame]}`,
                  "_blank"
                );
              }}
            />
            {hovered && isLargeScreen && (
              <Box
                height="100%"
                width="100%"
                position="absolute"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="rgba(0, 0, 0, 0.5)"
                gap="30px"
                top={0}
                right={0}
              >
                <Box
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    window.open(
                      `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${src[currentFrame]}`,
                      "_blank"
                    );
                  }}
                >
                  <ViewIcon />
                </Box>
                <Box
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    removeFileApiHandler({ linkKey: src[currentFrame] })
                  }
                >
                  <DeleteIcon />
                </Box>
              </Box>
            )}

            {!isLargeScreen && (
              <Box
                position="absolute"
                zIndex={111}
                top="-55px"
                right="45px"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  removeFileApiHandler({ linkKey: src[currentFrame] })
                }
              >
                <DeleteIconMobile />
              </Box>
            )}
          </Box>
        ) : (
          <Box position="relative" height="100%">
            <iframe
              src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${src}#toolbar=0&navpanes=0&scrollbar=0`}
              title={name.name}
              scrolling="no"
              style={{
                width: "100%",
                height: "85%",
                border: "none",
                background: "transparent",
                objectFit: "contain",
              }}
            />
          </Box>
        )}
      </Box>

      <DialogActions sx={{ padding: "0px", bgcolor: "rgba(245, 245, 246, 1)" }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {Array.isArray(src) && src.length > 1 && (
            <Box
              display="flex"
              justifyContent="flex-end"
              padding="10px 24px"
              gap="16px"
            >
              <Button
                onClick={handlePrevious}
                sx={{
                  width: "109px",
                  backgroundColor: "transparent",
                  borderRadius: "8px",
                  color: "primary.main",
                  border: "2px solid #ADADAD",
                  "@media (max-width: 600px)": {
                    width: "30px",
                  },
                }}
                disabled={currentFrame === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                variant="contained"
                sx={{
                  width: "109px",
                  borderRadius: "8px",
                  "@media (max-width: 600px)": {
                    width: "30px",
                  },
                }}
                disabled={currentFrame === src.length - 1}
              >
                Next
              </Button>
            </Box>
          )}
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DocumentPreview;
