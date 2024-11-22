import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { MeetingArrorLeft } from "../svg";

const MeetingSchedule = ({
  handleMeetingModel,
  expanded,
}: {
  handleMeetingModel: () => void;
  expanded: boolean;
}) => {
  // const MeetingSchedule = forwardRef(function MeetingSchedule(props, ref) {

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
        onClick={handleMeetingModel}
      ></Box>
      <Box
        sx={{
          background: "#FFFFFF",
          borderRadius: "24px 24px 18px 18px",
        }}
        py={"16px"}
        px={"21px"}
      >
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
            onClick={handleMeetingModel}
          >
            <MeetingArrorLeft />
          </Box>
          <Typography
            sx={{
              margin: "0 auto",
              fontSize: "16px",
            }}
            // variant="h5"
            // fontSize={"16px"}
          >
            Select your slot
          </Typography>
        </Box>

        <Box>
          <Typography fontSize={14} textAlign="center" fontWeight={"bold"}>
            Tuesday, 19 November 2024
          </Typography>
          <Box
            display={"flex"}
            justifyContent={expanded ? "flex-start" : "space-between"}
            alignItems={"center"}
            mt={"14px"}
            gap={expanded ? "8px" : "0px"}
          >
            <Box
              sx={{
                padding: "5px 13px",
                border: "0.5px solid #FFB584",
                borderRadius: "80px",
              }}
            >
              10:30 am
            </Box>
            <Box
              sx={{
                padding: "5px 13px",
                border: "0.5px solid rgba(0, 0, 0, 0.20)",
                borderRadius: "80px",
              }}
            >
              10:30 am
            </Box>
            <Box
              sx={{
                padding: "5px 13px",
                border: "0.5px solid rgba(0, 0, 0, 0.20)",
                borderRadius: "80px",
              }}
            >
              10:30 am
            </Box>
            <Box
              sx={{
                padding: "5px 13px",
                border: "0.5px solid rgba(0, 0, 0, 0.20)",
                borderRadius: "80px",
              }}
            >
              10:30 am
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: "24px" }} />
        <Box>
          <Typography fontSize={14} textAlign="center" fontWeight={"bold"}>
            Tuesday, 19 November 2024
          </Typography>
          <Box
            display={"flex"}
            justifyContent={expanded ? "flex-start" : "space-between"}
            alignItems={"center"}
            mt={"14px"}
            gap={expanded ? "8px" : "0px"}
          >
            <Box
              sx={{
                padding: "5px 13px",
                border: "0.5px solid rgba(0, 0, 0, 0.20)",
                borderRadius: "80px",
              }}
            >
              10:30 am
            </Box>
            <Box
              sx={{
                padding: "5px 13px",
                border: "0.5px solid rgba(0, 0, 0, 0.20)",
                borderRadius: "80px",
              }}
            >
              10:30 am
            </Box>
            <Box
              sx={{
                padding: "5px 13px",
                border: "0.5px solid rgba(0, 0, 0, 0.20)",
                borderRadius: "80px",
              }}
            >
              10:30 am
            </Box>
            <Box
              sx={{
                padding: "5px 13px",
                border: "0.5px solid rgba(0, 0, 0, 0.20)",
                borderRadius: "80px",
              }}
            >
              10:30 am
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: "28px", display: "flex", justifyContent: "center" }}>
          <Typography color={"#201C1A8C"}>
            30 min - (GMT +05:45) Asia/Kathmandu
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MeetingSchedule;
