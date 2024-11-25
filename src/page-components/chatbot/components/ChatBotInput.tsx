"use client";
import { Box, IconButton } from "@mui/material";
import React, { useState } from "react";
import { ArrowRight, ArrowRightEnable } from "@/page-components/chatbot/svg";
import ChatBotSuggestionQuestion from "./ChatBotSuggestionQuestion";

type Props = {
  onSubmit: (message: string) => void;
  resetSimilarQuestions: () => void;
  isDisabled?: boolean;
  messageLoading?: boolean;
  setInitialMessage: (message: string) => void;
  similarQuestions: string[];
  width?: string;
};

const ChatBotInput = ({
  onSubmit,
  resetSimilarQuestions,
  isDisabled,
  similarQuestions,
  messageLoading,
  setInitialMessage,
  width,
}: Props) => {
  const [message, setMessage] = useState("");
  return (
    <Box>
      {similarQuestions.length > 0 && !messageLoading && (
        <Box
          height={"65px"}
          sx={{
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "1px",
              height: "6px",
              display: "none",
              mt: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#A6A4A3",
              borderRadius: "8px",
            },

            "&:hover": {
              "&::-webkit-scrollbar": {
                display: "block",
              },
            },
          }}
          width={{
            lg: width,
            md: width,
            sm: "350px",
            xs: "100vw",
          }}
        >
          <ChatBotSuggestionQuestion
            questions={similarQuestions}
            onClick={(question: string) => {
              if (!isDisabled) {
                resetSimilarQuestions();
                setInitialMessage(question);
              }
            }}
          />
        </Box>
      )}
      <Box
        borderTop={"1px solid #e7e7e7"}
        width={{
          lg: width,
          md: width,
          sm: "350px",
          xs: "100%",
        }}
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
    </Box>
  );
};

export default ChatBotInput;
