import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/global-states/store";

// Define a type for the slice state
interface additionalFormState {
	additionalFormResUrl: Array<any>;
}

// Define the initial state using that type
const initialState: additionalFormState = {
	additionalFormResUrl: [],
};

export const AdditionalFormSlice = createSlice({
	name: "additionalForm",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setAdditionalFormResUrl: (
			state,
			action: PayloadAction<{ name: string; link: string; link_key: string }>,
		) => {
			const temp = state.additionalFormResUrl.filter(
				(item) => item.name !== action.payload.name,
			);

			return {
				additionalFormResUrl: [...temp, action.payload],
			};
		},
	},
});

export const { setAdditionalFormResUrl } = AdditionalFormSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAdditionalFormResUrl = (state: RootState) =>
	state.additionalForm.additionalFormResUrl;

export default AdditionalFormSlice.reducer;
