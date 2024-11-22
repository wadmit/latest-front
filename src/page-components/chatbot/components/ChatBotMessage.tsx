import TextToClickableLinks from "@/utils/TextToClickableLinks";
import { Avatar, Box, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { ButtonWrapper } from "@/components/common";
import { PhoneField } from "@/components/common/formfields/phone-field";
import { Form, Formik } from "formik";
import { GlobalYup } from "@/config/formik";
import Loader from "@/components/common/circular-loader/Loader";
import { getSession } from "next-auth/react";

type Props = {
  own: boolean;
  message: string;
  loading?: boolean;
  type?: "initial" | "other" | "email";
  onAnimationComplete?: () => void;
  scrollToBottom?: () => void;
  messageLoading?: boolean;
  onSubmit?: (value: string) => void;
  value?: string | null;
};

const ChatBotMessage = ({
  own,
  message,
  loading,
  type,
  onAnimationComplete,
  scrollToBottom,
  messageLoading,
  value,
  onSubmit,
}: Props) => {
  const [messageArray, setMessageArray] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (message && type !== "other") {
      setMessageArray(message.split(" "));
    }
  }, [message, type]);

  return (
    <>
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
        {type !== "email" ? (
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
            bgcolor={own ? "#3D9CF0" : "rgba(242, 242, 242, 1)"}
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
                  {/* {renderMessage(message)} */}
                  <MarkdownPreview
                    source={message}
                    style={{
                      background: "transparent",
                      color: own ? "#fff" : "rgba(32, 28, 26, 0.9)",
                      fontSize: "14px",
                      fontFamily: "HankenGroteskRegular",
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          <Formik
            initialValues={{
              phone: value ?? "",
            }}
            onSubmit={(values) => {
              onSubmit && values.phone && onSubmit(values.phone);
            }}
            validationSchema={GlobalYup.object().shape({
              phone: GlobalYup.string()
                .required("Phone is required")
                .customPhoneSign(),
            })}
          >
            {(formik) => (
              <Box
                borderRadius={"12px 12px 1px 12px"}
                margin={!loading ? "8px" : "0px"}
                bgcolor={"#F2F2F2"}
                padding={"16px 18px 16px 18px"}
                maxWidth={"80%"}
              >
                <Typography
                  mb={"8px"}
                  fontSize={"14px"}
                  fontWeight={400}
                  lineHeight={"18.2px"}
                  color={"#201C1AE5"}
                >
                  {message}
                </Typography>
                <PhoneField label="" name="phone" formik={formik} />
                <ButtonWrapper
                  type="submit"
                  onClick={() => formik.handleSubmit()}
                  sx={{
                    padding: "16px 15px",
                    maxHeight: 0,
                    mt: "12px",
                    width: "90px",
                    // height: "20px",
                    fontSize: "14px",
                    borderRadius: "8px",
                  }}
                >
                  {formik.isSubmitting ? "Submitting" : "Submit"}
                </ButtonWrapper>
              </Box>
            )}
          </Formik>
        )}
      </Box>
      {messageLoading && own && (
        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Typography
            alignItems="center"
            gap="3px"
            display={"flex"}
            color={"#201C1A8C"}
            fontSize={"12px"}
            fontWeight={400}
          >
            Just Now{" "}
            <Box
              bgcolor="#737376"
              width={"3px"}
              height={"3px"}
              borderRadius={"50%"}
            />{" "}
            Not seen yet
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ChatBotMessage;
