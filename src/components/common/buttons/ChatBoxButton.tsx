import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { CustomTooltip } from "@/components/common";
import { ChatBubble } from "@mui/icons-material";

export const ChatBoxButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <>
      <CustomTooltip
        placement="left"
        title={<Typography>Chat with our AI</Typography>}
        arrow
      >
        <Button
          onClick={onClick}
          sx={{
            position: "fixed",
            right: { lg: "25px", md: "-12px", sm: "-13px", xs: "-18px" },
            top: "80%",

            zIndex: 9999999,
            background: "transparent",
            border: "1px solid transparent",
            "&:hover": {
              background: "transparent",
            },
            borderRadius: "47px",
            padding: "18px 26px",
            cursor: "pointer",
          }}
        >
          <Stack
            sx={{
              padding: { lg: "10px", md: "10px", sm: "12px", xs: "12px" },
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.2)",
              boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* <NewWhatsApp /> */}
            <ChatBubble
              sx={{
                fontSize: { lg: "30px", md: "25px", sm: "18px", xs: "18px" },
              }}
            />
          </Stack>
        </Button>
      </CustomTooltip>
    </>
  );
};
