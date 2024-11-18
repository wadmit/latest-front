import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatbotState } from "./types";


const initialState:IChatbotState= {
    chatbotMessages: [],
    lastMessageId: null,
    hasNext: false,
}

export const chatbotSlice = createSlice({
    name: "chatbot",
    initialState,
    reducers: {
        setChatbotMessages: (state, action: PayloadAction<IChatbotState>) => ({
            ...state,
            chatbotMessages: [...action.payload.chatbotMessages,...state.chatbotMessages],
            lastMessageId: action.payload.lastMessageId,
            hasNext: action.payload.hasNext,
        }),
        setChatbotSingleMessage: (state,action: PayloadAction<{message:string,own:boolean}>)=>({
            ...state,
            chatbotMessages:[...state.chatbotMessages,action.payload]
        })
        
    },
});

export const { setChatbotMessages,setChatbotSingleMessage } = chatbotSlice.actions;
export default chatbotSlice.reducer;