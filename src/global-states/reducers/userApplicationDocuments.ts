import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IDocumentTypes {
	id: string;
	file: File;
	name: string;
}
interface IApplicationDocument {
	requiredDocuments: IDocumentTypes[];
	optionalDocuments: IDocumentTypes[];
	otherDocuments: IDocumentTypes[];
}

const initialState: IApplicationDocument = {
	requiredDocuments: [],
	optionalDocuments: [],
	otherDocuments: [],
};

export const ApplicationDocumentSlice = createSlice({
	name: "applicationDocument",
	initialState,
	reducers: {
		setRequiredDocuments: (state, action: PayloadAction<IDocumentTypes[]>) => {
			// eslint-disable-next-line no-param-reassign
			state.requiredDocuments = [...state.requiredDocuments, ...action.payload];
		},
		setOptionalDocuments: (state, action: PayloadAction<IDocumentTypes[]>) => {
			// eslint-disable-next-line no-param-reassign
			state.optionalDocuments = [...state.requiredDocuments, ...action.payload];
		},
		setOtherDocuments: (state, action: PayloadAction<IDocumentTypes[]>) => {
			// eslint-disable-next-line no-param-reassign
			state.otherDocuments = action.payload;
		},
	},
});

export const { setRequiredDocuments, setOptionalDocuments, setOtherDocuments } =
	ApplicationDocumentSlice.actions;
export default ApplicationDocumentSlice.reducer;
