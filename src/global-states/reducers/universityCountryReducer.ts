import { IFilters } from "@/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/global-states/store";

// Define a type for the slice state

interface IFilterData {
	name: string;
	options: IOptions[];
	query: string;
}
type TInitialValues = {
	filters: IFilters[] | null;
};

interface IOptions {
	name: string;
	id: string;
}

// Define the initial state using that type
const initialState: TInitialValues = {
	filters: null,
};

export const UniversityCountrySlice = createSlice({
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

export const { setUniversityCountryList } = UniversityCountrySlice.actions;

export const selectUniversityCountryList = (state: RootState) =>
	state.countryList.countryList;

export default UniversityCountrySlice.reducer;
