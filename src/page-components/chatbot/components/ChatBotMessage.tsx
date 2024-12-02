import { Avatar, Box, TextField, Typography } from "@mui/material";
import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { ButtonWrapper } from "@/components/common";
import { PhoneField } from "@/components/common/formfields/phone-field";
import { Form, Formik } from "formik";
import { GlobalYup } from "@/config/formik";
import moment from "moment-timezone";

import {
  CalanderIcon,
  ClockIcon,
  CopyLink,
  MeetingLink,
  TimezoneIcon,
} from "../svg";
import { TickIcon } from "@/page-components/nuaa/svg";

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
  messageLoading,
  value,
  onSubmit,
}: Props) => {
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
            src="/images/home/chatbot-avatar.webp"
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
              <>
                {/* for normal message */}
                {typeof message === "string" && (
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

                {/* for appointment message */}
                {typeof message !== "string" && (
                  <Box
                    sx={{
                      borderRadius: "10px 10px 10px 1px",
                      background: " #F2F2F2",
                    }}
                  >
                    <Avatar sx={{ width: "32px", height: "32px" }} />
                    <Box mt={"8px"}>
                      <Typography
                        fontSize={"14px"}
                        sx={{ color: "rgba(32, 28, 26, 0.90)" }}
                      >
                        {(message as any).title}
                      </Typography>
                    </Box>
                    <Box
                      my={"16px"}
                      display={"flex"}
                      flexDirection={"column"}
                      rowGap="8px"
                    >
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        columnGap={"8px"}
                      >
                        <ClockIcon />
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "rgba(127, 124, 123, 0.90)",
                          }}
                        >
                          15min
                        </Typography>
                      </Box>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        columnGap={"8px"}
                      >
                        <CalanderIcon />
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "rgba(127, 124, 123, 0.90)",
                          }}
                        >
                          {moment((message as any).date)
                            .utcOffset(0)
                            .format("MMMM DD, YYYY hh:mm a")}
                          {/* {(message as any).date} */}
                        </Typography>
                      </Box>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        columnGap={"8px"}
                      >
                        <TimezoneIcon />
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "rgba(127, 124, 123, 0.90)",
                          }}
                        >
                          {moment.tz.guess()}
                        </Typography>
                      </Box>
                      <Box
                        display={"flex"}
                        alignItems={"center"}
                        columnGap={"8px"}
                        flexDirection={"row"}
                      >
                        <MeetingLink />
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "rgba(127, 124, 123, 0.90)",
                          }}
                        >
                          Google link:{" "}
                          <a
                            style={{
                              color: "#3185FC",
                            }}
                            target="_"
                            href={`${(message as any).meeting_link}`}
                          >
                            {(message as any).meeting_link}
                          </a>
                        </Typography>
                        <Box sx={{ cursor: "pointer" }}>
                          <CopyLink />
                        </Box>
                      </Box>
                    </Box>
                    <Box display={"flex"} alignItems={"center"} gap="8px">
                      <Typography sx={{ fontSize: "16px", fontWeight: "bold" }}>
                        Meeting booked
                      </Typography>
                      <TickIcon />
                    </Box>
                  </Box>
                )}
              </>
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
