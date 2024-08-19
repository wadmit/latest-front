import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import {
  ChatBotMessage,
  ChatBotSuggestionQuestion,
} from "@/page-components/chatbot/components";

type Props = {
  message: {
    message: string;
    own: boolean;
  }[];
  messageLoading: boolean;
  initialQuestions: string[];
  setInitialMessage: (message: string) => void;
  isLoading: boolean;
  similarQuestions: string[];
  resetSimilarQuestions: () => void;
  isAnimationPlaying: boolean;
  onAnimationComplete: () => void;
};

const ChatBotBody = ({
  message,
  similarQuestions,
  initialQuestions,
  messageLoading,
  isLoading,
  resetSimilarQuestions,
  setInitialMessage,
  isAnimationPlaying,
  onAnimationComplete,
}: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [message, isAnimationPlaying]);
  return (
    <Box
      padding={"14px 20px"}
      sx={{
        scrollBehavior: "smooth",
        height: "calc(100% - 100px)",
        overflowY: "auto",
      }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      paddingBottom={"10px"}
    >
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        mb={"12px"}
      >
        <Typography
          fontSize={"14px"}
          fontWeight={400}
          lineHeight={"19.6px"}
          textAlign={"center"}
          color={"rgba(87, 85, 85, 0.56)"}
        >
          Today {moment(Date.now()).format("hh:mm A")}
        </Typography>
      </Box>
      <Box sx={{ cursor: "pointer" }}>
        <ChatBotMessage
          message={"Hey there 👋! May I help you learn more about WiseAdmit?"}
          own={false}
          onAnimationComplete={onAnimationComplete}
        />
      </Box>
      {message.length < 1 && !messageLoading && !isAnimationPlaying && (
        <ChatBotSuggestionQuestion
          questions={initialQuestions}
          onClick={(question: string) => {
            setInitialMessage(question);
          }}
        />
      )}
      {message.length > 0 &&
        message.map((msg, index) => (
          <ChatBotMessage
            key={index}
            message={msg.message}
            own={msg.own}
            scrollToBottom={scrollToBottom}
            onAnimationComplete={
              index === message.length - 1 ? onAnimationComplete : undefined
            }
          />
        ))}
      {messageLoading && <ChatBotMessage loading message="" own={false} />}

      {similarQuestions.length > 0 &&
        !messageLoading &&
        !isAnimationPlaying && (
          <ChatBotSuggestionQuestion
            questions={similarQuestions}
            onClick={(question: string) => {
              resetSimilarQuestions();
              setInitialMessage(question);
            }}
          />
        )}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatBotBody;
