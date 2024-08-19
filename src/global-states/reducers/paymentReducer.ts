import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/global-states/store";

type checked = {
	id: string;
	free: boolean;
};

// Define a type for the slice state
interface PaymentState {
	paidItems: string[];
	requiredDocumentStatus: boolean;
	docSubmissionData: any;
	checkedItems: checked[];
}

// Define the initial state using that type
const initialState: PaymentState = {
	paidItems: [],
	requiredDocumentStatus: false,
	docSubmissionData: [],
	checkedItems: [],
};

export const PaymentSlice = createSlice({
	name: "payment",
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		setPaidItemsList: (state, action: PayloadAction<string[]>) => ({
			...state,
			paidItems: action.payload,
		}),
		setCheckItems: (state, action: PayloadAction<checked>) => ({
			...state,
			checkedItems: [...state.checkedItems, action.payload],
		}),
		removeCheckItems: (state, action: PayloadAction<string>) => ({
			...state,
			checkedItems: state.checkedItems.filter(
				(item) => item.id !== action.payload,
			),
		}),
		setRequiredDocumentStatus: (state, action: PayloadAction<boolean>) => {
			// eslint-disable-next-line no-param-reassign
			state.requiredDocumentStatus = action.payload;
		},
		setDocSubmissionData: (state, action: PayloadAction<boolean>) => {
			// eslint-disable-next-line no-param-reassign
			state.docSubmissionData = action.payload;
		},
	},
});

export const {
	setPaidItemsList,
	setRequiredDocumentStatus,
	setDocSubmissionData,
	setCheckItems,
	removeCheckItems,
} = PaymentSlice.actions;

export const selectPaidItems = (state: RootState) => state.payment.paidItems;
export const selectRequiredDocumentStatus = (state: RootState) =>
	state.payment.requiredDocumentStatus;
export const selectDocSubmissionData = (state: RootState) =>
	state.payment.docSubmissionData;
export const selectCheckedItems = (state: RootState) =>
	state.payment.checkedItems;

export default PaymentSlice.reducer;
