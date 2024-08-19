import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/global-states/store";
import type { ITopMatches } from "@/types/utils";

// Define a type for the slice state
interface ITopMatchesState {
	topMatches: ITopMatches | null;
}

// Define the initial state using that type
const initialState: ITopMatchesState = {
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
