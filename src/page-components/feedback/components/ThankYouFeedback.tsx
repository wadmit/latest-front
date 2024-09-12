import { GreenSmileFace } from "public/svg";
import { ButtonWrapper } from "@/components/common";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  setShowThankyouForm: (val: boolean) => void;
};

const ThankYouFeedback = ({ setShowThankyouForm }: Props) => {
  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth="xs"
      sx={{
        right: "-50%",
        top: "0%",
        "@media (max-width: 768px)": {
          width: "90%",
          right: "0px",
          top: "15px",
          height: "100vh",
        },
      }}
    >
      <DialogTitle sx={{ padding: "0px" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="rgba(5, 65, 150, 1)"
          color="white"
          height="45px"
          padding="10px 24px"
        >
          <Typography
            fontFamily="HankenGroteskBold"
            fontWeight={600}
            fontSize="18px"
            lineHeight="25.2px"
            color="rgba(255, 255, 255, 1)"
          >
            Feedbacks
          </Typography>
          <button
            type="button"
            style={{
              background: "transparent",
              color: "black",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setShowThankyouForm(false)}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12"
                stroke="white"
                stroke-width="1.27414"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4 4L12 12"
                stroke="white"
                stroke-width="1.27414"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ padding: "0px" }}>
        <Stack
          sx={{
            padding: "20px",
            height: "100%",
            overflowY: "auto",
            background: "rgba(255, 255, 255, 1)",

            "@media (max-heigth: 760px)": {
              overflowY: "auto",
            },
            "@media (max-width: 768px)": {
              overflowY: "auto",
              height: "auto",
              borderRadius: "8px",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            marginTop={{ lg: "50px", md: "50px", sm: "10px", xs: "0px" }}
          >
            <GreenSmileFace />
          </Box>
          <Box marginTop={{ lg: "20px", md: "20px", sm: "10px", xs: "10px" }}>
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                fontFamily="HankenGroteskExtraBold"
                fontWeight={800}
                fontSize={{ lg: "32px", md: "32px", sm: "28px", xs: "28px" }}
                lineHeight="36.4px"
                color="rgba(32, 28, 26, 1)"
                letterSpacing="-3%"
                style={{ marginTop: "20px" }}
              >
                Thank you.
              </Typography>
              <Typography
                fontFamily="HankenGroteskRegular"
                fontWeight={400}
                fontSize="14px"
                lineHeight="19.6px"
                color="rgba(32, 28, 26, 0.9)"
                textAlign="center"
                style={{ marginTop: "10px" }}
              >
                We greatly appreciate your feedback. This will allow us to
                improve our problems or challenges in the near future.
              </Typography>

              <ButtonWrapper
                onClick={() => setShowThankyouForm(false)}
                style={{
                  borderRadius: "8px",
                  width: "247px",
                  marginTop: "35px",
                }}
              >
                Done
              </ButtonWrapper>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ThankYouFeedback;
