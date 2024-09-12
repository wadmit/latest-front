import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/global-states/store";

// Define the initial state using that type
const initialState: {
  countryList: Array<any>;
} = {
  countryList: [],
};

export const CountrySlice = createSlice({
  name: "countryList",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCountryList: (state, action: PayloadAction<any>) => {
      state.countryList = action.payload;
    },
  },
});

export const { setCountryList } = CountrySlice.actions;

export const selectCountryList = (state: RootState) =>
  state.countryList.countryList;

export default CountrySlice.reducer;
