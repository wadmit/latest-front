import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { MeetingArrorLeft } from "../svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment-timezone";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";
import { setChatbotSingleMessage } from "@/global-states/reducers/chatbotReducers";
import { useDispatch } from "react-redux";
import Loader from "@/components/common/circular-loader/Loader";
const MeetingSchedule = ({
  handleMeetingModel,
  handleScheduleMeetingChat,
  expanded,
}: {
  handleMeetingModel: (value: boolean) => void;
  expanded: boolean;
  handleScheduleMeetingChat: (value: boolean) => void;
}) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [conversationId] = useState(localStorage.getItem("conversationId"));
  const dispatch = useDispatch();

  const {
    data: meetingSchedule,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["meetingSchedule"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_CHAT_URL}/appointments/time-slot`
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });

  const postCalander = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_CHAT_URL}/appointments/schedule-meet`,
      { time_slot: selectedTime, email: userEmail, conversationId }
    );
    return response.data;
  };
  const mutation = useMutation({
    mutationFn: async () => {
      const res = await postCalander();

      dispatch(
        setChatbotSingleMessage({
          message: res.message.response,
          own: false,
        })
      );
      handleMeetingModel(false);
      handleScheduleMeetingChat(false);
    },
    onError: (error: any) => {
      console.error("Error fetching data:", error);
    },
  });

  const handleSubmit = () => {
    mutation.mutate();
  };


  if (isError) {
    return <p>Error...</p>;
  }

  const handleSelectedTime = (time: any) => {
    setSelectedTime(time);
  };

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        background: "rgba(0, 0, 0, 0.52)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
        }}
        onClick={() => handleMeetingModel(false)}
      ></Box>
      <Box
        sx={{
          background: "#FFFFFF",
          borderRadius: "24px 24px 18px 18px",
        }}
        py={"16px"}
        px={"21px"}
      >
        {isLoading ? (
          <Box
            sx={{
              minHeight: "296px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              fontSize: "14px",
              color: "rgba(32, 28, 26, 0.55)"
            }}
          >
            <Loader />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: "30px",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  alignSelf: "flex-start",
                  cursor: "pointer",
                }}
                onClick={() => handleMeetingModel(false)}
              >
                <MeetingArrorLeft />
              </Box>
              <Typography
                sx={{
                  margin: "0 auto",
                  fontSize: "16px",
                }}
              >
                {selectedTime ? "Send invitation" : "Select your slot"}
              </Typography>
            </Box>

            {selectedTime ? (
              <Box
                sx={{
                  background: "#F2F2F2",
                  borderRadius: "12px",
                  p: "16px 14px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  // mb: 11.8
                }}
              >
                <Typography sx={{fontSize: "14px", color: "rgba(32, 28, 26, 0.90)", lineHeight: "130%"}}>Please enter your email</Typography>
                <TextField
                  variant="outlined"
                  sx={{
                    "& fieldset": { border: "none" },
                    mt: "8px",
                    mb: "12px",
                    width: "100%",
                  }}
                  size="small"
                  InputProps={{ style: { borderRadius: "8px" } }}
                  placeholder="example@gmail.com"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
                <Button
                  variant="contained"
                  disabled={mutation.isPending || !userEmail}
                  sx={{
                    padding: "16px 8px",
                    maxHeight: "0px",
                    width: "auto",
                    maxWidth: "100%",
                    borderRadius: "8px",
                    fontSize: "14px",
                  }}
                  onClick={handleSubmit}
                >
                  {mutation.isPending ? "Submitting..." : "Submit"}
                </Button>
              </Box>
            ) : (
              <Box>
                {meetingSchedule.data.map((each: any, index: number) => {
                  return (
                    <>
                      <Box>
                        <Typography
                          fontSize={"14px"}
                          textAlign="center"
                          fontWeight={"bold"}
                        >
                          {moment(each.date, "ddd, DD MMM YYYY HH:mm:ss [GMT]").format("ddd, DD MMM YYYY")}
                          {/* {moment(each.date, "YYYY-MM-DD").format(
                            "dddd, D MMMM YYYY"
                          )} */}
                        </Typography>
                        <Box
                          display={"flex"}
                          justifyContent={
                            expanded ? "flex-start" : "space-between"
                          }
                          alignItems={"center"}
                          mt={"14px"}
                          gap={expanded ? "8px" : "0px"}
                        >
                          {each.available_slots
                            .slice(0, 4)
                            .map((eachSlot: any) => {
                              return (
                                <Box
                                  sx={{
                                    padding: "5px 13px",
                                    cursor: "pointer",
                                    border: "0.5px solid rgba(0, 0, 0, 0.20)",
                                    borderRadius: "80px",
                                    "&:hover": {
                                      border: "0.5px solid #FFB584",
                                      color: "#EE701E",
                                    },
                                  }}
                                  onClick={() => {
                                    handleSelectedTime(eachSlot.start);
                                  }}
                                >
                                  {moment(eachSlot.start)
                                    .utc()
                                    .format("h:mm a")}
                                </Box>
                              );
                            })}
                        </Box>
                      </Box>
                      <Divider
                        sx={{
                          my: "24px",
                          display:
                            index + 1 === meetingSchedule.data.length
                              ? "none"
                              : "block",
                        }}
                      />
                    </>
                  );
                })}

                <Box
                  sx={{ mt: "28px", display: "flex", justifyContent: "center" }}
                >
                  <Typography color={"#201C1A8C"}>
                    15 min - {moment.tz.guess()}
                  </Typography>
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MeetingSchedule;
