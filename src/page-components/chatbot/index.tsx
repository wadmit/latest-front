"use client";
import { Box, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ChatBotBody,
  ChatBotHeader,
  ChatBotInput,
} from "@/page-components/chatbot/components";
import axios from "axios";

type Props = {
  onClick: () => void;
};

const ChatBotBox = ({ onClick }: Props) => {
  const [open, setOpen] = useState(true);
  const [initialQuestions, setInitialQuestions] = useState([]);
  const [message, setMessage] = useState<{ message: string; own: boolean }[]>(
    []
  );
  const [similarQuestions, setSimilarQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);

  const setInitialMessage = (messageInit: string) => {
    setMessage((prev) => [...prev, { message: messageInit, own: true }]);
    getChatResponse(messageInit);
  };

  const resetSimilarQuestions = () => {
    setSimilarQuestions([]);
  };

  const getInitialQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_CHAT_URL}/chatbot/initial_questions`
      );
      setInitialQuestions(response.data.initial_questions);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getChatResponse = async (messageInit: string) => {
    setMessageLoading(true);
    setIsAnimationPlaying(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_CHAT_URL}/chatbot/chat`,
        {
          message: messageInit,
        }
      );
      setMessage((prev) => [
        ...prev,
        {
          message: response.data.response,
          own: false,
        },
      ]);
      setSimilarQuestions(response.data.similar_questions ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setMessageLoading(false);
    }
  };

  const handleAnimationComplete = () => {
    setIsAnimationPlaying(false);
  };

  useEffect(() => {
    getInitialQuestions();
  }, []);

  return (
    <Dialog
      open={open}
      maxWidth="xl"
      onClose={() => {
        setOpen(false);
        onClick();
      }}
      fullWidth
      sx={{
        display: "flex",
        alignItems: "flex-end",
        zIndex: 999999,
        left: "unset",
        right: {
          lg: "60px",
          md: "30px",
          sm: "30px",
          xs: "0px",
        },
        bottom: "15%",
        "@media (max-height: 800px)": {
          bottom: "17%",
        },
        "& .MuiDialog-container": {
          height: "fit-content",
          width: {
            lg: "fit-content",
            md: "fit-content",
            sm: "fit-content",
            xs: "100%",
          },
        },
        "& .MuiDialog-paper": {
          borderRadius: "20px",
          margin: 0,
          width: {
            lg: "700px",
            md: "550px",
            sm: "350px",
            xs: "90%",
          },
        },
      }}
    >
      <Box
        borderRadius={"20px"}
        width={"100%"}
        maxHeight={"643px"}
        height={"75vh"}
        position={"relative"}
      >
        <Box height={"100%"} width={"100%"} position={"revert"}>
          <ChatBotHeader />
          <ChatBotBody
            message={message}
            isLoading={isLoading}
            similarQuestions={similarQuestions}
            messageLoading={messageLoading}
            initialQuestions={initialQuestions}
            setInitialMessage={setInitialMessage}
            resetSimilarQuestions={resetSimilarQuestions}
            isAnimationPlaying={isAnimationPlaying}
            onAnimationComplete={handleAnimationComplete}
          />
          <ChatBotInput
            onSubmit={(message: string) => {
              setMessage((prev) => [...prev, { message: message, own: true }]);
              getChatResponse(message);
            }}
            resetSimilarQuestions={resetSimilarQuestions}
            // isDisabled={isAnimationPlaying}
            isDisabled={messageLoading}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default ChatBotBox;
