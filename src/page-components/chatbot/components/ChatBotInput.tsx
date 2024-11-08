"use client";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { ArrowRight, ArrowRightEnable } from "@/page-components/chatbot/svg";

type Props = {
  onSubmit: (message: string) => void;
  resetSimilarQuestions: () => void;
  isDisabled?: boolean;
};

const ChatBotInput = ({
  onSubmit,
  resetSimilarQuestions,
  isDisabled,
}: Props) => {
  const [message, setMessage] = useState("");
  return (
    <Box
      // position={""}
      borderTop={"1px solid #e7e7e7"}
      width={{
        lg: "700px",
        md: "550px",
        sm: "350px",
        xs: "90%",
      }}
      // sx={{
      //   "@media (min-width:442px) and (max-width: 600px) ": {
      //     width: "100%",
      //   },
      // }}
      bgcolor={"#ffffff"}
      height={"66px"}
      borderRadius={"0px 0px 14px 14px"}
      alignItems={"center"}
      position={"fixed"}
      padding={"20px"}
      display={"flex"}
    >
      <form
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          if (message.length > 0 && !isDisabled) {
            onSubmit(message);
            resetSimilarQuestions();
            setMessage("");
          }
        }}
      >
        <input
          disabled={isDisabled}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          style={{
            fontSize: "14px",
            fontFamily: "HankenGroteskRegular",
            padding: "10px",
            width: "100%",
            height: "100%",
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
          }}
        />
        <IconButton
          onClick={() => {
            if (message.length > 0 && !isDisabled) {
              onSubmit(message);
              resetSimilarQuestions();
              setMessage("");
            }
          }}
        >
          {isDisabled ? <ArrowRight /> : <ArrowRightEnable />}
        </IconButton>
      </form>
    </Box>
  );
};

export default ChatBotInput;
