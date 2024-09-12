import { IFilters } from "@/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/global-states/store";

// Define the initial state using that type
const initialState: {
  filters: IFilters[] | null;
} = {
  filters: null,
};

export const universityCountrySlice = createSlice({
  name: "universityCountryList",
  initialState,
  reducers: {
    setUniversityCountryList: (state, action: PayloadAction<IFilters[]>) => {
      return {
        ...state,
        filters: action.payload,
      };
    },
  },
});

export const { setUniversityCountryList } = universityCountrySlice.actions;

export const selectUniversityCountryList = (state: RootState) =>
  state.countryList.countryList;

export default universityCountrySlice.reducer;
