import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/global-states/store";
import type { ITopMatches } from "@/types/utils";

// Define the initial state using that type
const initialState: {
  topMatches: ITopMatches | null;
} = {
  topMatches: null,
};

export const TopMatchesSlice = createSlice({
  name: "topMatches",
  initialState,
  reducers: {
    setTopMatches: (state, action: PayloadAction<ITopMatches>) => ({
      ...state,
      topMatches: action.payload,
    }),
  },
});

export const { setTopMatches } = TopMatchesSlice.actions;

export const selectTopMatches = (state: RootState) =>
  state.topMatches.topMatches;

export default TopMatchesSlice.reducer;
