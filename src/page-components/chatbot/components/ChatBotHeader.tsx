import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

const ChatBotHeader = () => {
  return (
    <Box
      width={"100%"}
      height={"64px"}
      display={"flex"}
      padding={"14px 20px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      position={"sticky"}
      top={"0px"}
      borderRadius={"14px 14px 0px 0px"}
      bgcolor={"rgba(170, 68, 1, 1)"}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Box gap={"12px"} alignItems={"center"} display={"flex"}>
          <Avatar
            alt="WiseAdmit"
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "white",
            }}
            src="/images/home/avatar.webp"
          />
          <Box display={"flex"} gap={"1px"} flexDirection={"column"}>
            <Typography
              color={"rgba(255, 255, 255, 1)"}
              fontSize={"16px"}
              fontWeight={"600"}
              lineHeight={"16px"}
            >
              Wise Dai
            </Typography>
            <Typography
              mt={"6px"}
              fontWeight={400}
              gap={"4px"}
              fontSize={"12px"}
              lineHeight={"12px"}
              color={"rgba(255, 255, 255, 0.75)"}
            >
              Active Now
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"8px"}
        border={"1px solid #fff"}
        padding={"5px 10px"}
        borderRadius={"8px"}
        onClick={() => {
          window.open("https://wa.me/message/NVIYDISAR7JYM1");
        }}
        style={{
          cursor: "pointer",
        }}
      >
        <Typography
          fontSize={"14px"}
          lineHeight={"14px"}
          fontWeight={400}
          color={"#fff"}
        >
          Talk to expert
        </Typography>
        <img width={"28px"} height={"28px"} src="/images/home/whatsapp.webp" />
      </Box>
    </Box>
  );
};

export default ChatBotHeader;
