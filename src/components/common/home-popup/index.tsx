import {
  Box,
  Button,
  Dialog,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import { ButtonWrapper } from "../buttons/ButtonWrapper";
import Image from "next/image";

type Props = {
  openChatBox: () => void;
};

const CloseIcon = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 5L5 15"
        stroke="#201C1A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5 5L15 15"
        stroke="#201C1A"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
const HomePopUp = ({ openChatBox }: Props) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  //   after 3 seconds open it
  useEffect(() => {
    const showMoreInfoValue = localStorage.getItem("showChatPopup");
    const timer = setTimeout(() => {
      setShowMoreInfo(showMoreInfoValue ? showMoreInfoValue === "true" : true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowMoreInfo(false);
    localStorage.setItem("showMoreInfo", "false");
    localStorage.setItem("showChatPopup", "false");

  };

  const isTab = useMediaQuery("(max-width: 832px) and (min-width: 600px)");
  const isMobile = useMediaQuery("(max-width: 600px) and (min-width: 0px)");
  return (
    <Dialog
      open={showMoreInfo}
      onClose={handleClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "32px",
          margin: {
            xs: "16px",
            sm: "16px",
            md: "auto",
          },
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: "550px",
            md: "600px",
          },
          overflow: "hidden",
          height: {
            xs: "480px",
            md: "623px",
          },
          padding: {
            lg: "24px 24px 0px 36px",
            md: "24px 24px 0px 36px",
            sm: "24px 24px 0px 20px",
            xs: "24px 24px 0px 20px",
          },
          borderRadius: "32px",
        }}
      >
        {/* <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
        
        </Box> */}
        <Box display={"flex"} flexDirection={"column"}>
          <Box width={"100%"} pt={2} display={"flex"} justifyContent={"space-between"} alignItems={"flex-start"} position={"relative"}>
            <Typography
              fontSize={{
                xs: "20px",
                md: "24px",
                lg: "24px",
                xl: "24px",
              }}
              lineHeight={"28.8px"}
              fontWeight={700}
              color={"#201C1A"}
              fontFamily={"HankenGroteskRegular"}
            >
              Got Questions?
            </Typography>
            <IconButton
              sx={{
                top: "-7px",
                backgroundColor: "#D9D9D9",
                borderRadius: "50%",
                width: "34px",
                height: "34px",
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography
            fontFamily={"HankenGroteskRegular"}
            fontSize={{
              xs: "28px",
              md: "36px",
              lg: "36px",
              xl: "36px",
            }}
            lineHeight={"43.2px"}
            fontWeight={700}
            color={"#201C1A"}
          >
            {" "}
            WiseAI answers
          </Typography>
          <Typography
            width={{
              xs: "80%",
              sm: "310px",
              md: "310px",
              lg: "310px",
              xl: "310px",
            }}
            mt={"8px"}
            fontSize={{
              xs: "14px",
              md: "16px",
              lg: "16px",
              xl: "16px",
            }}
            lineHeight={"22.4px"}
            fontWeight={400}
            color={"#201C1A"}
          >
            Get instant answers and guidance on scholarships, admissions, and
            more.{" "}
          </Typography>

          <ButtonWrapper
            sx={{
              width: "115px",
              mt: "24px",
              borderRadius: "8px",
              padding: "11px 23px",
            }}
            onClick={() => {
              openChatBox();
              handleClose();
            }}
          >
            Chat now
          </ButtonWrapper>
        </Box>
        <Box
          pt={"38px"}
          maxWidth={"600px"}
          maxHeight={"623px"}
          sx={{ overflow: "hidden" }}
        >
          <Image
            quality={100}
            style={{
              zIndex: 1,
              objectFit: "contain",
              width: "100%",
              height: "100%",
            }}
            src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/utils/chatbot-popup.webp`}
            alt="home-popup"
            width="500"
            // width={isMobile ? 310 : isTab ? 500 : 1000}
            height={isMobile ? 220 : 600}
          />
        </Box>

        {/* <Box
          height={{ lg: "400px", md: "400px", sm: "380px", xs: "220px" }}
          overflow={"hidden"}
          position={"relative"}
        >
          <Box
            width={"100%"}
            display={"flex"}
            height={"100%"}
            alignItems={"flex-end"}
            justifyContent={"center"}
            position={"absolute"}
            top={"10px"}
          >
            <Image
              quality={100}
              style={{
                zIndex: 1,
                objectFit: "contain",
                width: isMobile ? "100%" : "",
                // height: isMobile ? "320px":"",
              }}
              // src="/images/popup/chatbot.webp"
              src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/utils/chatbot-popup.webp`}
              alt="home-popup"
              width="500"
              // width={isMobile ? 310 : isTab ? 500 : 1000}
              height={isMobile ? 220 : 600}
            />
          </Box>
        </Box> */}
      </Box>
    </Dialog>
  );
};

export default HomePopUp;
