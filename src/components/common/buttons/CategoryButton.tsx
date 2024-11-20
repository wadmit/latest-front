"use client";
import ChatBotBox from "@/page-components/chatbot";
import FeedbackForm from "@/page-components/feedback";
import ThankYouFeedback from "@/page-components/feedback/components/ThankYouFeedback";
import { Box, Button, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowDown, CategoryIcon, MessageIcon, SmileIcon } from "public/svg";
import { useEffect, useState } from "react";
import { CustomTooltip, CustomTypography } from "./styled-components";
import { analytics } from "@/services/analytics.service";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import HomePopUp from "../home-popup";

type Props = {};

const CategoryButton = (props: Props) => {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showPopUpAnimation, setShowPopUpAnimation] = useState(true);
  const [showHiddenFields, setShowHiddenFields] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showThankyouForm, setShowThankyouForm] = useState(false);
  const [showChatBox, setShowChatBox] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showMsgTooltip, setShowMsgTooltip] = useState(true);

  const currency = useAppSelector((state) => state.currency);

  useEffect(() => {
    if (showHiddenFields) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
        setShowMsgTooltip(false);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showHiddenFields]);

  // get the value from local storage and it will be true if the user has not clicked on the got it button
  // useEffect(() => {
  //   const showMoreInfo = localStorage.getItem("showMoreInfo");
  //   const timer = setTimeout(() => {
  //     setShowChatBox(true);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  //   // if (showMoreInfo === "false") {
  //   //   // setShowMoreInfo(false);
  //   // } else {
  //   //   // setShowMoreInfo(true);
  //   // }
  // }, []);
  // useEffect(() => {
  //   const showMoreInfo = localStorage.getItem("showMoreInfo");
  //   const timer = setTimeout(() => {
  //     setShowChatBox(true);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  //   // if (showMoreInfo === "false") {
  //   //   // setShowMoreInfo(false);
  //   // } else {
  //   //   // setShowMoreInfo(true);
  //   // }
  // }, []);

  const hideShowMoreInfo = () => {
    setShowMoreInfo(false);
    localStorage.setItem("showMoreInfo", "false");
    localStorage.setItem("showChatPopup", "false");
  };

  const reset = () => {
    setShowFeedbackForm(false);
    setShowThankyouForm(false);
    setShowChatBox(false);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={"20px"}
      sx={{
        position: "fixed",
        right: { lg: "25px", md: "-12px", sm: "-13px", xs: "-18px" },
        bottom: "5%",
        zIndex: {
          lg: 99999,
          md: 99999,
          sm: 99999,
          xs: 9999,
        },
      }}
    >
      {showChatBox && (
        <ChatBotBox
          onClose={() => {setShowChatBox(false)
            setShowHiddenFields(false);
          }}
          onClick={() => {
            analytics.websiteButtonInteractions({
              location: {
                countryName: currency?.currentCountry ?? "",
                city: currency?.city ?? "",
              },
              buttonName: "Chatbox clicked",
              source: `User opened an chatbox model`,
              urlPath: window.location.href,
              event_type: EAnalyticsEvents.CHAT_BOX,
              status: EAnalyticsStatus.SUCCESS,
              redirectPath: "",
            });
            setShowHiddenFields(false);
            setShowChatBox((prev) => !prev);
          }}
        />
      )}
      {showFeedbackForm && (
        <FeedbackForm
          setShowFeedbackForm={setShowFeedbackForm}
          setShowThankyouForm={setShowThankyouForm}
        />
      )}
      {showThankyouForm && (
        <ThankYouFeedback setShowThankyouForm={setShowThankyouForm} />
      )}
      {showMoreInfo && showPopUpAnimation && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: [0.1, 1],
          }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
        >
          <Box
            bgcolor={"white"}
            width={"200px"}
            position={"absolute"}
            bottom={"100%"}
            borderRadius={"4px"}
            padding={"12px"}
            boxShadow={"13px 13px 40px 0px rgba(0, 0, 0, 0.08)"}
            right={{ lg: "35px", md: "26px", sm: "20px", xs: "28px" }}
          >
            <CustomTypography>Hello, have a question?</CustomTypography>
            <CustomTypography>Let's chat!</CustomTypography>

            <Box
              mt={"6px"}
              width={"100%"}
              sx={{
                cursor: "pointer",
              }}
              onClick={hideShowMoreInfo}
              display={"flex"}
              justifyContent={"flex-end"}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "rgba(228, 108, 39, 1)",
                  fontFamily: "HankenGroteskRegular",
                  lineHeight: "19.6px",
                }}
              >
                Got it
              </Typography>
            </Box>
          </Box>
        </motion.div>
      )}
      {showHiddenFields && !showFeedbackForm && !showChatBox && (
        <>
          <CustomTooltip
            open={showTooltip}
            sx={{
              transform: "translateX(-60px)",
            }}
            placement="left"
            title={<Typography>Give us a feedback</Typography>}
            arrow
          >
            <Button
              // onClick={onClick}
              sx={{
                background: "transparent",
                border: "1px solid transparent",
                "&:hover": {
                  background: "transparent",
                },
                borderRadius: "47px",
                padding: "18px 26px",
                cursor: "pointer",
              }}
              onClick={() => {
                setShowFeedbackForm((prev) => !prev);
              }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Stack
                sx={{
                  padding: { lg: "10px", md: "10px", sm: "12px", xs: "12px" },
                  borderRadius: "50%",
                  background: "#ffffff",
                  height: "48px",
                  width: "48px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "s0px 0px 8px 0px rgba(0, 0, 0, 0.3)",
                }}
              >
                {/* <NewWhatsApp /> */}
                <SmileIcon />
              </Stack>
            </Button>
          </CustomTooltip>
          <CustomTooltip
            open={showMsgTooltip}
            placement="left"
            title={<Typography>Chat with our AI bot</Typography>}
            arrow
          >
            <Button
              onClick={() => {
                setShowChatBox((prev) => !prev);
              }}
              sx={{
                background: "transparent",
                border: "1px solid transparent",
                "&:hover": {
                  background: "transparent",
                },
                borderRadius: "47px",
                padding: "18px 26px",
                cursor: "pointer",
              }}
              onMouseEnter={() => setShowMsgTooltip(true)}
              onMouseLeave={() => setShowMsgTooltip(false)}
            >
              <Stack
                sx={{
                  padding: { lg: "10px", md: "10px", sm: "12px", xs: "12px" },
                  borderRadius: "50%",
                  background: "#ffffff",
                  height: "48px",
                  width: "48px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.3)",
                }}
              >
                <MessageIcon />
              </Stack>
            </Button>
          </CustomTooltip>
        </>
      )}

      <Button
        // onClick={onClick}
        sx={{
          background: "transparent",
          border: "1px solid transparent",
          "&:hover": {
            background: "transparent",
          },
          borderRadius: "47px",
          padding: "18px 26px",
          cursor: "pointer",
        }}
        onClick={() => {
          hideShowMoreInfo();
          if (showHiddenFields) {
            reset();
          }
          setShowHiddenFields((prev) => !prev);
        }}
      >
        <Stack
          sx={{
            padding: { lg: "10px", md: "10px", sm: "12px", xs: "12px" },
            borderRadius: "50%",
            background: "#AA4401",
            height: "56px",
            width: "56px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.3)",
          }}
        >
          {/* <NewWhatsApp /> */}
          {showHiddenFields ? <ArrowDown /> : <CategoryIcon />}
        </Stack>
      </Button>

      <HomePopUp 
      openChatBox={()=>setShowChatBox(true)}
      />
    </Box>
  );
};

export default CategoryButton;
