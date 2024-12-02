"use client";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  ChatBotMessage,
  ChatBotSuggestionQuestion,
} from "@/page-components/chatbot/components";
import { useAppSelector } from "@/global-states/hooks/hooks";
import ScheduleMeetText from "./ScheduleMeetText";

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
  showMessageEmailInput: boolean;
  createConversation: (phone: string) => void;
  loadMore: () => void;
  scheduleMeeting: boolean;
  handleMeetingModel: (value: boolean) => void;
  handleScheduleMeetingChat: (value: boolean) => void;
};

const ChatBotBody = ({
  message,
  similarQuestions,
  initialQuestions,
  messageLoading,
  isLoading,
  createConversation,
  setInitialMessage,
  isAnimationPlaying,
  onAnimationComplete,
  showMessageEmailInput,
  loadMore,
  scheduleMeeting,
  handleMeetingModel,
  handleScheduleMeetingChat
}: Props) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageBoxRef = useRef<HTMLDivElement>(null);
  const { hasNext } = useAppSelector((state) => state.chatbot);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const phone = localStorage.getItem("phone");
  const conversationId = localStorage.getItem("conversationId");
  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messages or animations change
  useEffect(() => {
    if (!isLoadingMore) scrollToBottom();

    setIsLoadingMore(false);
  }, [message, isAnimationPlaying]);

  // Function to check if `messagesEndRef` is visible within the scrollable container
  const isMessageEndVisible = () => {
    if (messagesEndRef.current && messageBoxRef.current) {
      const messageBoxRect = messageBoxRef.current.getBoundingClientRect();
      const messagesEndRect = messagesEndRef.current.getBoundingClientRect();
      return (
        messagesEndRect.top >= messageBoxRect.top &&
        messagesEndRect.bottom <= messageBoxRect.bottom
      );
    }
    return false;
  };

  // Handle scroll event to check if the message end is visible
  const handleScroll = () => {
    if (isMessageEndVisible()) {
      setShowScrollToBottom(false);
    } else {
      setShowScrollToBottom(true);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const currentMessageBox = messageBoxRef.current;
    currentMessageBox?.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      currentMessageBox?.removeEventListener("scroll", handleScroll);
    };
  }, [message]);

  // if (isLoading) <Loader />;
  return (
    <Box
      ref={messageBoxRef}
      padding={{
        lg: "14px 20px",
        md: "14px 20px",
        sm: "14px 20px",
        xs: "14px 10px",
      }}
      sx={{
        scrollBehavior: "smooth",
        height: {
          lg: `calc(100% - ${similarQuestions.length > 0 ? "150px" : "100px"})`,
          md: `calc(100% - ${similarQuestions.length > 0 ? "150px" : "100px"})`,
          sm: `calc(100% - ${similarQuestions.length > 0 ? "150px" : "100px"})`,
          xs: `calc(100% - ${similarQuestions.length > 0 ? "200px" : "140px"})`,
        },
        overflowY: "auto",
        position: "relative",
      }}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      paddingBottom={"10px"}
    >
      {/* Scroll to Bottom Button */}
      {showScrollToBottom && (
        <Box
          onClick={scrollToBottom}
          width={"34px"}
          height={"34px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            position: "sticky",
            top: "90%",
            left: "90%",
            border: "0.5px solid rgba(32, 28, 26, 0.40)",
            cursor: "pointer",
            backgroundColor: "#EBEBEB",
            color: "#fff",
            borderRadius: "50%",
            padding: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M7.99999 11.2004C7.53333 11.2004 7.06666 11.0204 6.71333 10.6671L2.36668 6.32042C2.17335 6.12708 2.17335 5.80708 2.36668 5.61375C2.56001 5.42042 2.88001 5.42042 3.07335 5.61375L7.41999 9.96039C7.73999 10.2804 8.25999 10.2804 8.57999 9.96039L12.9267 5.61375C13.12 5.42042 13.44 5.42042 13.6333 5.61375C13.8267 5.80708 13.8267 6.12708 13.6333 6.32042L9.28666 10.6671C8.93333 11.0204 8.46666 11.2004 7.99999 11.2004Z"
              fill="#383838"
            />
          </svg>
        </Box>
      )}

      {!conversationId && (
        <>
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
              message={
                "Hey there 👋! May I help you learn more about WiseAdmit?"
              }
              own={false}
              onAnimationComplete={onAnimationComplete}
            />
          </Box>
        </>
      )}
      {hasNext && !isLoading && (
        <Box
          width={"100%"}
          mt={"-24px"}
          display={"flex"}
          justifyContent={"center"}
          color={"primary.main"}
          fontSize={"16px"}
          onClick={() => {
            setIsLoadingMore(true);
            loadMore();
          }}
          sx={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Load More
        </Box>
      )}
      {message.length < 1 && !messageLoading && !isAnimationPlaying && (
        <ChatBotSuggestionQuestion
          questions={initialQuestions}
          onClick={(question: string) => {
            setInitialMessage(question);
          }}
        />
      )}
      {message.length > 0 &&
        message.filter(eachMessage => eachMessage.message).map((msg, index) => (
          <ChatBotMessage
            key={index}
            message={msg.message}
            own={msg.own}
            messageLoading={messageLoading}
            scrollToBottom={scrollToBottom}
            onAnimationComplete={
              index === message.length - 1 ? onAnimationComplete : undefined
            }
          />
        ))}
      {messageLoading && <ChatBotMessage loading message="" own={false} />}
      {!messageLoading && showMessageEmailInput && (
        <ChatBotMessage
          message={
            "Before we dive in, would you like me to send you updates or quick assistance on WhatsApp? It’s super convenient"
          }
          own={false}
          type="email"
          value={phone}
          onSubmit={createConversation}
        />
      )}
      {scheduleMeeting && (
        <ScheduleMeetText
        handleMeetingModel={handleMeetingModel}
        handleScheduleMeetingChat={handleScheduleMeetingChat}
        />
      )}
      {/* The div that indicates the end of the messages */}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatBotBody;
