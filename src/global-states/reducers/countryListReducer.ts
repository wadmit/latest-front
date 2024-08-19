import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/global-states/store";

// Define a type for the slice state
interface countryListState {
	countryList: Array<any>;
}

// Define the initial state using that type
const initialState: countryListState = {
	countryList: [],
};

export const CountrySlice = createSlice({
	name: "countryList",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setCountryList: (state, action: PayloadAction<any>) => {
			// eslint-disable-next-line no-param-reassign
			state.countryList = action.payload;
		},
	},
});

export const { setCountryList } = CountrySlice.actions;

export const selectCountryList = (state: RootState) =>
	state.countryList.countryList;

export default CountrySlice.reducer;
