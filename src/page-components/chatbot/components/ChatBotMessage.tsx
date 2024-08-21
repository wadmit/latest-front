import TextToClickableLinks from "@/utils/TextToClickableLinks";
import { Avatar, Box } from "@mui/material";
import React, { useEffect, useState } from "react";

type Props = {
  own: boolean;
  message: string;
  loading?: boolean;
  type?: "initial" | "other";
  onAnimationComplete?: () => void;
  scrollToBottom?: () => void;
};

const ChatBotMessage = ({
  own,
  message,
  loading,
  type,
  onAnimationComplete,
  scrollToBottom,
}: Props) => {
  const [messageArray, setMessageArray] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (message && type !== "other") {
      setMessageArray(message.split(" "));
    }
  }, [message, type]);

  useEffect(() => {
    if (messageArray.length > 0 && type !== "other") {
      const timer = setInterval(() => {
        setIndex((prev) => {
          if (prev < messageArray.length) {
            scrollToBottom && scrollToBottom();
            return prev + 1;
          } else {
            clearInterval(timer);
            return prev;
          }
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [messageArray]);

  const messageSliced = messageArray.slice(0, index).join(" ");
  useEffect(() => {
    if (
      onAnimationComplete &&
      message.split(" ").length === messageSliced.split(" ").length &&
      !own
    ) {
      onAnimationComplete();
    }
  }, [messageSliced, index]);

  const renderMessage = (text: string) => {
    if (type !== "other" && !own) {
      return TextToClickableLinks(messageSliced);
    } else {
      return TextToClickableLinks(text);
    }
  };
  return (
    <Box
      width={"100%"}
      display={"flex"}
      justifyContent={own ? "flex-end" : "flex-start"}
      alignItems={"flex-end"}
    >
      {!own && (
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
      )}
      <Box
        maxWidth={"80%"}
        margin={!loading ? "8px" : "0px"}
        padding={
          !loading
            ? own
              ? "16px 19px 16px 19px"
              : "16px 18px 16px 18px"
            : "0px"
        }
        borderRadius={own ? "16px 16px 1px 16px" : "16px 16px 16px 1px"}
        bgcolor={own ? "rgba(170, 68, 1, 1)" : "rgba(242, 242, 242, 1)"}
      >
        {loading ? (
          <img
            height={"40px"}
            width={"50px"}
            style={{
              objectFit: "contain",
            }}
            src="/images/home/loading.gif"
            alt="Loading"
          />
        ) : (
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
              color={own ? "#fff" : "rgba(32, 28, 26, 0.9)"}
            >
              {/* {type !== "other" && !own ? messageSliced : message} */}
              {renderMessage(message)}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ChatBotMessage;
