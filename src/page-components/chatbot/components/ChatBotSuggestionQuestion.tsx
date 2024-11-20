import { Box, Typography, Tooltip } from "@mui/material";
import React from "react";

type Props = {
  questions: string[];
  onClick: (question: string) => void;
};

const ChatBotSuggestionQuestion = ({ questions, onClick }: Props) => {
  return (
    <Box display="flex" gap="12px" mt="24px" mb="4px"
    sx={{
      // firstchld padding 20xp
      "& > div:first-child": {
        marginLeft: "20px",
      },
    }}
    >
      {questions.map((question: string, index: number) => (
     
          <Box
            onClick={() => onClick(question)}
            sx={{
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "#054196",
                color: "white",
              },
            }}
            padding="10px 12px"
            minWidth="fit-content"
            height="32px"
            display="flex"
            alignItems="center"
            overflow="hidden"
            borderRadius="8px"
            position={"relative"}
            border="1px solid rgba(32, 28, 26, 0.4)"
          >
            <Typography
              fontSize="14px"
              fontWeight={400}
              lineHeight="12px"
              sx={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {question}
            </Typography>
          </Box>
      ))}
    </Box>
  );
};

export default ChatBotSuggestionQuestion;
