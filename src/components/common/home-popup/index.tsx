import { Box, Button, Dialog, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";

import { BannerMascot, LeftMark, LeftPoint, RightMark, StarIcon } from "./svg";

type Props = {
  openChatBox: () => void;
};

const HomePopUp = ({ openChatBox }: Props) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);

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
      open={true}
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
          background: `url('/images/home/banner-background.webp') no-repeat center center`,
          backgroundSize: "cover",
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
          posotion: "relative",
        }}
      >
        {/* <img
          src={"/images/home/banner-background.webp"}
          height={100}
          width={10}
          style={{
            height: "100%",
            width: "600px",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          alt="test"
        /> */}

        {/* <Box width={"100%"} display={"flex"} justifyContent={"flex-end"}>
        
        </Box> */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography
            sx={{
              mb: "2px",
              color: "#201C1A",
              fontSize: {
                md: "32px",
                xs: "22px",
              },
              fontWeight: 700,
              letterSpacing: "-0.96px",
            }}
          >
            Got questions?
          </Typography>
          <Typography
            sx={{
              mb: "10px",
              color: "#201C1A",
              fontSize: {
                md: "48px",
                xs: "30px",
              },
              fontWeight: 700,
              letterSpacing: "-1.44px",
            }}
          >
            WiseAI answers
          </Typography>
          <Typography
            sx={{
              fontSize: {
                md: "20px",
                xs: "16px",
              },
              color: "black",
              width: "340px",
              wordWrap: "break-word",
              textAlign: "center",
              mb: "33px",
            }}
          >
            Get instant answers and guidance on scholarships, admissions, and
            more.
          </Typography>

          <Box
            sx={{ display: "flex", alignItems: "center", mb: "51px" }}
            gap={"14px"}
          >
            <LeftMark />
            <Button
              sx={{
                borderRadius: "10.54px",
                padding: "20px 20px",
              }}
              variant="contained"
              onClick={() => {
                openChatBox();
                handleClose();
              }}
            >
              Chat now
            </Button>
            <RightMark />
          </Box>

          <Box
            display={"flex"}
            sx={{ width: "100%" }}
            alignItems={"flex-start"}
          >
            <BannerMascot />
            <StarIcon />
            <Box
              sx={{
                position: "relative",
                borderRadius: "16px",
                background: "#FFF",
                maxHeight: "100px",
                ml: "10px",
                top: "28px",
                height: "auto",
                padding: "12px 12px 12px 18px",
                width: "194px",
              }}
            >
              <Box sx={{ position: "absolute", top: "30px", left: "-13px" }}>
                <LeftPoint />
              </Box>
              <Typography
                sx={{
                  width: "182px",
                  wordWrap: "break-word",
                  fontSize: "16px",
                }}
              >
                Hi 👋, I am WiseAI, an AI assistant to help you.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default HomePopUp;
