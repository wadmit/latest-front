import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/global-states/store";

// Define a type for the slice state
interface eligibilityState {
	value: string;
	highestlevelofeducation: any;
	eligibilitysubjects: any;
	sortedList: any;
	eligibilityformdata: any;
	subjects: string[];
}

// Define the initial state using that type
const initialState: eligibilityState = {
	value: "",
	highestlevelofeducation: [{}],
	eligibilitysubjects: [],
	sortedList: [{}],
	eligibilityformdata: "",
	subjects: [],
};

export const eligibilitySlice = createSlice({
	name: "eligibility",
	initialState,
	reducers: {
		getCountry: (state, action: PayloadAction<string>) => ({
			...state,
			value: action.payload,
		}),
		setHigherLevelEducation: (state, action: PayloadAction<any>) => ({
			...state,
			highestlevelofeducation: action.payload,
		}),
		setEligibilitySubjects: (state, action: PayloadAction<any>) => ({
			...state,
			eligibilitysubjects: action.payload,
		}),
		setWiseScoreSubjects: (state, action: PayloadAction<any>) => ({
			...state,
			subjects: action.payload,
		}),
		setSortedUniversitiesList: (state, action: PayloadAction<any>) => ({
			...state,
			sortedList: action.payload,
		}),

		setEligibilityFormData: (state, action: PayloadAction<string>) => ({
			...state,
			eligibilityformdata: action.payload,
		}),
	},
});

export const {
	getCountry,
	setHigherLevelEducation,
	setEligibilitySubjects,
	setSortedUniversitiesList,

	setEligibilityFormData,
	setWiseScoreSubjects,
} = eligibilitySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectEligibilityCountryValue = (state: RootState) =>
	state.eligibility.value;

export const selectEligibilityFormData = (state: RootState) =>
	state.eligibility.eligibilityformdata;
export const selectWiseScoreSubjects = (state: RootState) =>
	state.eligibility.subjects;

export default eligibilitySlice.reducer;
