"use client";
import { EApplicationStatus } from "@/types/application";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { getCrossIcon } from "@/page-components/dashboard/documents/svg";
type Props = {
  imageUrl: string;
  name: string;
  handleRemove: () => void;
  previewUrl?: string;
  status: EApplicationStatus;
  activeStep: number;
  isDisabled: boolean;
};

const DisplayImageView = ({
  imageUrl,
  name,
  handleRemove,
  previewUrl,
  status,
  activeStep,
  isDisabled,
}: Props) => {
  const [removeButtonDisabled, setRemoveButtonDisabled] = useState(false);

  const handleRemoveClick = () => {
    if (!removeButtonDisabled) {
      // Disable the button to prevent further clicks
      setRemoveButtonDisabled(true);

      // Call the remove function
      handleRemove();
    }
  };
  return (
    <Box
      sx={{
        borderRadius: "4px",
        width: "160px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
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
      <img
        style={{
          width: "100%",
          height: "100px",
          objectFit: "cover",
        }}
        src={imageUrl}
        alt="image"
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          padding: "8px 4px",
          borderRadius: "0px 0px 4px 4px",
          background: "rgba(237, 236, 236, 0.99)",
        }}
      >
        <Typography
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "110px",
          }}
        >
          {name}
        </Typography>
      </Box>

      {!(
        status === EApplicationStatus.review ||
        activeStep > 2 ||
        isDisabled
      ) && (
        <Box
          onClick={handleRemoveClick}
          sx={{
            width: "25px",
            height: "25px",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            cursor: "pointer",
          }}
          className="cross-icon"
          bgcolor="#EDECECFC"
          right={-10}
          position="absolute"
          top="-10px"
        >
          {getCrossIcon()}
        </Box>
      )}

      <Box
        onClick={() => window.open(previewUrl || imageUrl, "_blank")}
        top="30%"
        display="none"
        p="7px 12px 7px 11px"
        borderRadius="4px"
        bgcolor="#fff"
        color="var(--primary-main, #FF6B26)"
        position="absolute"
        fontFamily="HankenGroteskBold"
        // variant="button"
        justifyContent="center"
        alignItems="center"
        width={86}
      >
        View
      </Box>
    </Box>
  );
};

export default DisplayImageView;
