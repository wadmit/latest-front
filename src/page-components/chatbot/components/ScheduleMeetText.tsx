import { Avatar, Box, Button } from "@mui/material";
import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

const ScheduleMeetText = ({
  handleMeetingModel,
  handleScheduleMeetingChat
}: {
  handleMeetingModel: (value: boolean) => void;
  handleScheduleMeetingChat: (value: boolean) => void;

}) => {
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={"flex-start"}
      alignItems={"flex-end"}
    >
      <Avatar
        alt="WiseAdmit"
        sx={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "white",
        }}
        src="/images/home/avatar.webp"
      />
      <Box
        maxWidth={"80%"}
        margin={"8px"}
        padding={"16px 18px 16px 18px"}
        borderRadius={"16px 16px 16px 1px"}
        bgcolor={"rgba(242, 242, 242, 1)"}
      >
        <Box display={"flex"}>
          <Box
            sx={{
              textOverflow: "clip",
              overflowWrap: "break-word",
              "&::first-letter": {
                textTransform: "capitalize",
              },
            }}
            fontSize={"14px"}
            fontFamily={"HankenGroteskRegular"}
            color={"rgba(32, 28, 26, 0.9)"}
          >
            <MarkdownPreview
              source={"Would you like to schedule a call?"}
              style={{
                background: "transparent",
                color: "rgba(32, 28, 26, 0.9)",
                fontSize: "14px",
                fontFamily: "HankenGroteskRegular",
              }}
            />
          </Box>
        </Box>
        <Box mt={"12px"} gap={"8px"} display={"flex"}>
          <Button
            sx={{
              padding: "16px 8px",
              maxHeight: "0px",
              minWidth: "96px",
              border: "1px solid #201C1A",
              borderRadius: "8px",
              background: "none",
              fontSize: "14px",
              color: "rgba(32, 28, 26, 0.90)",
              "&:hover": {
                background: "#054196",
                color: "rgba(255, 255, 255, 0.90)",
              },
            }}
            onClick={()=> handleMeetingModel(true)}
          >
            Yes, urgently
          </Button>
          <Button
            sx={{
              padding: "16px 8px",
              maxHeight: "0px",
              minWidth: "96px",
              border: "1px solid #201C1A",
              borderRadius: "8px",
              fontSize: "14px",
              background: "none",
              color: "rgba(32, 28, 26, 0.90)",
              "&:hover": {
                background: "#054196",
                color: "rgba(255, 255, 255, 0.90)",
              },
            }}
            onClick={()=> {
                handleMeetingModel(false)
                handleScheduleMeetingChat(false)
            }}
          >
            Not right now
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ScheduleMeetText;
