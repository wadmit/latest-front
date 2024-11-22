import { CloseIcon } from "@/components/common";
import { Expand } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { ExpandIconChat } from "public/svg";
import React from "react";

type Props = {
  changeWidth: (width: string) => void;
  onClose: () => void;
};
const ChatBotHeader = ({ changeWidth, onClose }: Props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    changeWidth(!isExpanded ? "660px" : "423px");
  };
  return (
    <Box
      width={"100%"}
      height={"64px"}
      display={"flex"}
      padding={{
        lg: "14px 20px",

        md: "14px 20px",
        sm: "14px 20px",
        xs: "14px 10px",
      }}
      justifyContent={"space-between"}
      alignItems={"center"}
      position={"sticky"}
      top={"0px"}
      borderRadius={{
        lg: "14px 14px 0px 0px",
        md: "14px 14px 0px 0px",
        sm: "14px 14px 0px 0px",
        xs: "0px 0px 0px 0px",
      }}
      bgcolor={"#231F20"}
      zIndex={9999}
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
              Wise AI
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
        alignContent={"center"}
        justifyContent={"center"}
        gap={"8px"}
      >
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
          <img
            width={"28px"}
            height={"28px"}
            src="/images/home/whatsapp.webp"
          />
        </Box>
        <IconButton
          sx={{
            m: "0px",
            height: "20px",

            display: { xs: "none", sm: "none", md: "block" },
          }}
          onClick={handleExpand}
        >
          <ExpandIconChat />
        </IconButton>
        <IconButton
          onClick={onClose}
          sx={{
            m: "0px",
            height: "20px",

            display: { xs: "block", sm: "none", md: "none", lg: "none" },
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5 5L15 15"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatBotHeader;
