import { Box } from "@mui/material";
import React from "react";

type Props = {
  questions: string[];
  onClick: (question: string) => void;
};

const ChatBotSuggestionQuestion = ({ questions, onClick }: Props) => {
  return (
    <Box display={"flex"} flexWrap={"wrap"} gap="12px" mt={"24px"}>
      {questions.map((question: string, index: number) => (
        <Box
          key={index}
          onClick={() => onClick(question)}
          sx={{
            cursor: "pointer",
          }}
          padding={"10px 14px"}
          width={"fit-content"}
          borderRadius={"80px"}
          border={"1px solid rgba(32, 28, 26, 0.4)"}
        >
          <Box
            fontSize={"12px"}
            fontWeight={400}
            lineHeight={"12px"}
            sx={{
              "&::first-letter": {
                textTransform: "capitalize",
              },
            }}
          >
            {question}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ChatBotSuggestionQuestion;
