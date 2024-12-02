"use client";
import {
  Box,
  Dialog,
  Divider,
  Drawer,
  Slide,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import {
  ChatBotBody,
  ChatBotHeader,
  ChatBotInput,
} from "@/page-components/chatbot/components";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import {
  setChatbotMessages,
  setChatbotSingleMessage,
} from "@/global-states/reducers/chatbotReducers";
import { ArrowRight, MeetingArrorLeft } from "./svg";
import {
  ArrowBack,
  ArrowCircleLeft,
  ArrowForward,
  ArrowLeft,
} from "@mui/icons-material";
import { ArrowPointChat, ArrowSvg } from "../home/svg";
import { ArrowIconDown, ArrowIconUp } from "../programs/svg";
import MeetingSchedule from "./components/MeetingSchedule";
type Props = {
  onClick: () => void;
  onClose: () => void;
};

const CustomDrawer = styled(Drawer)({
  position: "relative", //imp
  width: 240, //drawer width
  "& .MuiDrawer-paper": {
    width: 240, //drawer width
    position: "absolute", //imp
    transition: "none !important",
  },
});

const defaultWdith = "423px";
const ChatBotBox = ({ onClick, onClose }: Props) => {
  const hasFetchedRef = useRef(false);

  const [open, setOpen] = useState(true);
  const [meetingModel, setMeetingModel] = useState(false);
  const [scheduleMeeting, setScheduleMeeting] = useState(false);

  const [initialQuestions, setInitialQuestions] = useState([]);
  const { chatbotMessages, hasNext, lastMessageId } = useAppSelector(
    (state) => state.chatbot
  );
  const [userMessageBeforeEmail, setUserMessageBeforeEmail] = useState<
    {
      userInput: string;
      response: string;
    }[]
  >([]);
  // ask user to input email if no conversation id saved on local storage and message.own is greater then 2
  const [conversationId, setConversationId] = useState(
    localStorage.getItem("conversationId")
  );
  const [toShowEmailInput, setToShowEmailInput] = useState(false);

  useEffect(() => {
    if (!conversationId && chatbotMessages.length > 6) {
      setToShowEmailInput(true);
    }
  }, [chatbotMessages]);

  const [width, setWidth] = useState(defaultWdith);
  const [similarQuestions, setSimilarQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const dispatch = useAppDispatch();
  const setInitialMessage = (messageInit: string) => {
    dispatch(setChatbotSingleMessage({ message: messageInit, own: true }));
    getChatResponse(messageInit);
  };

  const resetSimilarQuestions = () => {
    setSimilarQuestions([]);
  };

  const getPreviousConversation = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_CHAT_URL}/chatbot/conversation/${conversationId}` +
          (lastMessageId && hasNext ? `?lastMessageId=${lastMessageId}` : "")
      );
      if (response.data?.data?.messages) {
        const messages = response.data?.data?.messages as {
          userInput: string;
          response: string;
        }[];
        // now push each userinput with {own:true} and response with {own:false}
        const messagesToSet: { message: string; own: boolean }[] = [];
        messages.forEach((message) => {
          messagesToSet.unshift({ message: message.response, own: false });
          messagesToSet.unshift({ message: message.userInput, own: true });
        });
        dispatch(
          setChatbotMessages({
            chatbotMessages: messagesToSet,
            lastMessageId: response.data?.data?.lastMessageId,
            hasNext: response.data?.data?.hasNext,
          })
        );
      }
      // setInitialQuestions(response.data.initial_questions);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const createConversation = async (phone: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_CHAT_URL}/chatbot/create-conversation`,
        {
          phone: phone,
          messages: userMessageBeforeEmail,
        }
      );
      setConversationId(response.data?.data?.id);
      setToShowEmailInput(false);
      localStorage.setItem("conversationId", response?.data?.data?.id);
    } catch (e) {
      console.error(e);
    }
  };

  const getChatResponse = async (messageInit: string) => {
    setMessageLoading(true);
    setIsAnimationPlaying(true);
    const conversationId = localStorage.getItem("conversationId");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_CHAT_URL}/chatbot/chat`,
        {
          message: messageInit,
          conversationId: conversationId,
        }
      );

      if (response.data.response) {
        dispatch(
          setChatbotSingleMessage({
            message: response.data.response,
            own: false,
          })
        );
        if (!conversationId) {
          setUserMessageBeforeEmail((prev) => {
            return [
              ...prev,
              { userInput: messageInit, response: response.data.response },
            ];
          });
        }
        setSimilarQuestions(response.data.similar_questions ?? []);
      }


      // data.schedule is True if user wants an appointment
      if (response.data.schedule) {
        if (conversationId) {
          setScheduleMeeting(response.data.schedule);
        } else {
          setToShowEmailInput(true);
        }
      }
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
    if (
      conversationId &&
      chatbotMessages.length === 0 &&
      !hasFetchedRef.current
    ) {
      hasFetchedRef.current = true;
      getPreviousConversation();
    }
  }, [conversationId, chatbotMessages]);

  const handleMeetingModel = (value: boolean) => {
    setMeetingModel(value);
  };
  const handleScheduleMeetingChat = (value: boolean) => {
    setScheduleMeeting(value);
  };

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
        zIndex: 9999,
        left: "unset",
        right: {
          lg: "60px",
          md: "30px",
          sm: "30px",
          xs: "0px",
        },
        bottom: {
          lg: "15%",
          md: "15%",
          sm: "15%",
          xs: "0%",
        },
        height: {
          lg: "auto",
          md: "auto",
          sm: "auto",
          xs: "100%",
        },
        "& .MuiDialog-container": {
          height: {
            lg: "fit-content",
            md: "fit-content",
            sm: "fit-content",
            xs: "100svh",
          },
          width: {
            lg: "fit-content",
            md: "fit-content",
            sm: "fit-content",
            xs: "100%",
          },
          
        },
        "& .MuiDialog-paper": {
          borderRadius: { lg: "20px", md: "20px", sm: "20px", xs: "0px" },
          margin: 0,
          width: {
            lg: width,
            md: width,
            sm: "350px",
            xs: "100%",
          },
          maxHeight: {
            xs: "none",
            sm: "auto",
            md: "auto",
            lg: "auto",
          },
        },
      }}
    >
      <Box
        borderRadius={"20px"}
        width={"100%"}
        maxHeight={{ lg: "643px", md: "643px", sm: "643px", xs: "100%" }}
        height={{
          lg: "75vh",
          md: "75vh",
          sm: "75vh",
          xs: "100svh",
        }}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        position={"relative"}
      >
        <Box height={"100%"} width={"100%"} position={"revert"}>
          <ChatBotHeader
            onClose={onClose}
            changeWidth={(width: string) => setWidth(width)}
          />
          <ChatBotBody
            scheduleMeeting={scheduleMeeting}
            handleMeetingModel={handleMeetingModel}
            handleScheduleMeetingChat={handleScheduleMeetingChat}
            message={chatbotMessages}
            isLoading={isLoading}
            similarQuestions={similarQuestions}
            messageLoading={messageLoading}
            initialQuestions={initialQuestions}
            setInitialMessage={setInitialMessage}
            resetSimilarQuestions={resetSimilarQuestions}
            isAnimationPlaying={isAnimationPlaying}
            loadMore={getPreviousConversation}
            onAnimationComplete={handleAnimationComplete}
            showMessageEmailInput={toShowEmailInput}
            createConversation={(phone: string) => createConversation(phone)}
          />
          {meetingModel ? (
            <Box
              position={"absolute"}
              sx={{ zIndex: 2000, height: "100%", width: "100%", bottom: 0 }}
            >
              <MeetingSchedule
                expanded={width > defaultWdith ? true : false}
                handleMeetingModel={handleMeetingModel}
                handleScheduleMeetingChat={handleScheduleMeetingChat}
              />
            </Box>
          ) : (
            <ChatBotInput
              onSubmit={(message: string) => {
                dispatch(
                  setChatbotSingleMessage({ message: message, own: true })
                );
                getChatResponse(message);
              }}
              width={width}
              similarQuestions={similarQuestions}
              messageLoading={messageLoading}
              setInitialMessage={setInitialMessage}
              resetSimilarQuestions={resetSimilarQuestions}
              // isDisabled={isAnimationPlaying}
              isDisabled={messageLoading || toShowEmailInput}
            />
          )}
        </Box>
      </Box>
    </Dialog>
  );
};

export default ChatBotBox;
