import { IDocument } from "@/types/document";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IApplicationDocument } from "@/global-states/reducers/types";

// interface IDocumentTypes {
// 	id: string;
// 	file: File;
// 	name: string;
// }

const initialState: IApplicationDocument = {
	requiredDocuments: [],
	optionalDocuments: [],
	otherDocuments: [],
};

export const ApplicationDocumentSlice = createSlice({
	name: "applicationDocument",
	initialState,
	reducers: {
		setRequiredDocuments: (state, action: PayloadAction<IDocument[]>) => {
			state.requiredDocuments = [...state.requiredDocuments, ...action.payload];
		},
		setOptionalDocuments: (state, action: PayloadAction<IDocument[]>) => {
			state.optionalDocuments = [...state.requiredDocuments, ...action.payload];
		},
		setOtherDocuments: (state, action: PayloadAction<IDocument[]>) => {
			state.otherDocuments = action.payload;
		},
	},
});

export const { setRequiredDocuments, setOptionalDocuments, setOtherDocuments } =
	ApplicationDocumentSlice.actions;
export default ApplicationDocumentSlice.reducer;
