"use client";
import React, { FC, useEffect, useState } from "react";
import FeedbackIcon from "@mui/icons-material/Feedback";
import {
  Avatar,
  Box,
  Button,
  Stack,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { CustomTooltip } from "@/components/common";
import { NewFeedback, NewFeedbackMobile } from "$/svg";
import { FeedbackButtonProps } from "@/components/common";

export const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  onClick,
  color,
}) => {
  const [isHovered, setHovered] = useState(false);

  const handleHoverEnter = () => {
    setHovered(true);
  };

  const handleHoverLeave = () => {
    setHovered(false);
  };

  const router = useRouter();

  const [showFeedback, setShowFeedback] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      if (router.pathname === "/wisescore") {
        setShowFeedback(false);
      } else {
        setShowFeedback(true);
      }
    }
  }, [router]);

  return (
    showFeedback && (
      <>
        <Avatar
          onClick={onClick}
          sx={{
            position: "fixed",
            display: { lg: "none", xs: "flex" },
            right: "10px",
            top: "90%",
            zIndex: 9999999,
            cursor: "pointer",
            background: "transparent",
            borderRadius: "20px",
          }}
          variant="rounded"
        >
          <NewFeedbackMobile />
        </Avatar>
        <CustomTooltip
          placement="left"
          title={<Typography>Give us a feedback</Typography>}
          arrow
        >
          <Button
            sx={{
              position: "fixed",
              display: { lg: "flex", xs: "none" },
              right: "25px",
              top: "90%",
              zIndex: 9999999,
              background: "transparent",
              border: "1px solid transparent",
              "&:hover": {
                background: "transparent",
              },
              borderRadius: "47px",
              padding: "18px 26px",
              "@media (max-width: 500px)": {
                top: "30%",
              },
            }}
            onMouseEnter={handleHoverEnter}
            onMouseLeave={handleHoverLeave}
            onClick={onClick}
          >
            <Stack
              direction="row-reverse"
              gap={2}
              alignItems="center"
              justifyContent="space-around"
              sx={{
                borderRadius: "50%",
                background: "rgba(128, 128, 128, 0.2)",
                boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.3)",
              }}
            >
              <NewFeedback />
            </Stack>
          </Button>
        </CustomTooltip>
      </>
    )
  );
};
