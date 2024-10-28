import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/global-states/store";
import type { IProgram } from "@/types/program";
import type { IUniversity } from "@/types/university";
import type { IUserDashboardData } from "@/types/user";
import { IUserState } from "@/global-states/reducers/types";

const initialState: IUserState = {
	dashboardDataGlobal: null,
	didUserSignedUp: false,
	shortListLoading: true,
	shortList: [],
	shortlistDetails: [],
	shortlistedPrograms: [],
	activeStepGlobal: undefined,
	maxActiveStepGlobal: 0,
	universities: null,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setActiveStepGlobal: (state, action: PayloadAction<number>) => {
			state.activeStepGlobal = action.payload;
		},
		setProfileImage: (state, action: PayloadAction<{
			photoUrl_key: string;
			photoUrl: string;
		}>) => {
			if (state.dashboardDataGlobal?.data) {
				state.dashboardDataGlobal.data.photoUrl_key = action.payload.photoUrl_key;
				state.dashboardDataGlobal.data.photoUrl = action.payload.photoUrl;
			}	
		},
		
		setMaxActiveStepGlobal: (state, action: PayloadAction<number>) => {
			state.maxActiveStepGlobal = action.payload;
		},
		setUniversities: (state, action: PayloadAction<IUniversity[]>) => {
			state.universities = action.payload;
		},
		setDidUserSignedUp: (state, action: PayloadAction<boolean>) => {
			state.didUserSignedUp = action.payload;
		},
		setDashboardDataGlobal: (
			state,
			action: PayloadAction<IUserDashboardData>,
		) => {
			state.dashboardDataGlobal = action.payload;
		},
		setShortListedPrograms: (state, action: PayloadAction<IProgram[]>) => {
			state.shortlistedPrograms = action.payload;
		},
		setShortListedDetails: (
			state,
			action: PayloadAction<{ program: IProgram; foundation: IProgram }[]>,
		) => {
			state.shortlistDetails = action.payload;
		},
		addShortlistedPrograms: (state, action: PayloadAction<IProgram>) => {
			state.shortlistedPrograms = [
				...state.shortlistedPrograms,
				action.payload,
			];
		},
		removeShortlistedProgram: (state, action: PayloadAction<string>) => {
			state.shortlistedPrograms = state.shortlistedPrograms.filter(
				(p) => p.id !== action.payload,
			);
		},
		setWiseScore: (state, action: PayloadAction<number>) => ({
			...state,
			dashboardDataGlobal: {
				...state.dashboardDataGlobal!,
				score: action.payload,
			},
		}),
		setProgramShortListCompleteArray: (
			state,
			action: PayloadAction<string[]>,
		) => {
			state.shortList = action.payload;
		},
		setShortListLoading: (
			state,
			// action: PayloadAction<string[]>
		) => {
			state.shortListLoading = false;
		},
		setProgramShortList: (state, action: PayloadAction<string>) => {
			state.shortList = [...state.shortList, action.payload];
		},
		removeProgramShortList: (state, action: PayloadAction<string>) => ({
			...state,
			shortList: state.shortList.filter(
				(program: string) => program !== action.payload,
			),
		}),
	},
});

export const {
	setDidUserSignedUp,
	setProgramShortList,
	removeProgramShortList,
	setDashboardDataGlobal,
	setProgramShortListCompleteArray,
	setShortListLoading,
	setShortListedPrograms,
	setShortListedDetails,
	addShortlistedPrograms,
	removeShortlistedProgram,
	setActiveStepGlobal,
	setMaxActiveStepGlobal,
	setUniversities,
	setWiseScore,
	setProfileImage
} = userSlice.actions;

export const selectShortListPrograms = (state: RootState) =>
	state.user.shortList;
export const SelectShortlistedPrograms = (state: RootState) =>
	state.user.shortlistedPrograms;
export const SelectShortlistedDetails = (state: RootState) =>
	state.user.shortlistDetails;
export const isShortListHandleLoading = (state: RootState) =>
	state.user.shortListLoading;
export const selectDashboardDataGlobal = (state: RootState) =>
	state.user.dashboardDataGlobal;

export const selectDidUserSignedUp = (state: RootState) =>
	state.user.didUserSignedUp;

export const selectActiveStepGlobal = (state: RootState) =>
	state.user.activeStepGlobal;
export const selectMaxActiveStepGlobal = (state: RootState) =>
	state.user.maxActiveStepGlobal;
export const selectUniversities = (state: RootState) => state.user.universities;

export default userSlice.reducer;
