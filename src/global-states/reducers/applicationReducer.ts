import { EApplicationStatus, IApplication } from "@/types/application";
import { ResponseUtils } from "@/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/global-states/store";

interface ApplicationResource {
	applications: IApplication[];
	applicationsWithStatus: {
		paid: IApplication[];
		unpaid: IApplication[];
	};
	singleApplication: IApplication;
}

const initialState: ApplicationResource = {
	applications: [],
	applicationsWithStatus: {
		paid: [],
		unpaid: [],
	},
	singleApplication: {} as IApplication,
};

export const applicationSlice = createSlice({
	name: "application",
	initialState,
	reducers: {
		setUserApplications: (
			state,
			action: PayloadAction<ResponseUtils<IApplication>>,
		) => ({
			...state,
			applications: action.payload.data,
		}),
		setCreatedApplications: (state, action: PayloadAction<IApplication[]>) => ({
			...state,
			applications: [...state.applications, ...action.payload],
		}),
		setUserApplicationsWithStatus: (
			state,
			action: PayloadAction<ResponseUtils<IApplication>>,
		) => ({
			...state,
			applicationsWithStatus: {
				paid: action.payload.data.filter((application) => application.paid),
				unpaid: action.payload.data.filter((application) => !application.paid),
			},
		}),
		setSingleApplication: (state, action: PayloadAction<IApplication>) => ({
			...state,
			singleApplication: action.payload,
		}),
		// find by the coredocument id in document and update the link and linkKey

		setAddImageToApplication: (state, action) => {
			const { coreDocument, link, key, status } = action.payload;

			const documentIndex = state.singleApplication.documents.findIndex(
				(doc) => doc.coreDocument === coreDocument,
			);

			if (documentIndex !== -1) {
				const updatedDocument = {
					...state.singleApplication.documents[documentIndex],
				};
				updatedDocument.link = [...updatedDocument.link, ...link];
				updatedDocument.linkKey = [...updatedDocument.linkKey, ...key];

				const updatedDocuments = [...state.singleApplication.documents];
				updatedDocuments[documentIndex] = updatedDocument;

				const updatedSingleApplication = {
					...state.singleApplication,
					status,
					documents: updatedDocuments,
				};
				// console.log(updatedDocuments);
				return {
					...state,
					singleApplication: updatedSingleApplication,
				};
			}
			// If the document with the given id was not found, return the current state unchanged
			return state;
		},
		setRemoveImageFromApplication: (state, action) => {
			const { link, linkKey, coredocumentId } = action.payload;
			const documentIndex = state.singleApplication.documents.findIndex(
				(doc) => doc.coreDocument?.id === coredocumentId,
			);
			if (documentIndex !== -1) {
				const updatedDocument = {
					...state.singleApplication.documents[documentIndex],
				};
				updatedDocument.link = updatedDocument.link.filter((l) => l !== link);
				updatedDocument.linkKey = updatedDocument.linkKey.filter(
					(l) => l !== linkKey,
				);

				const updatedDocuments = [...state.singleApplication.documents];
				updatedDocuments[documentIndex] = updatedDocument;
				const updatedSingleApplication = {
					...state.singleApplication,
					documents: updatedDocuments,
				};

				const status = updatedDocuments.every((doc) => {
					if (doc.type === "required" || doc.type === "additional") {
						return doc.link.length !== 0;
					}
					return true;
				});
				// console.log(status);
				if (state.singleApplication.status !== "initial") {
					updatedSingleApplication.status = !status
						? EApplicationStatus.incomplete
						: EApplicationStatus.document_complete;
				}

				// console.log(updatedDocuments);
				return {
					...state,
					singleApplication: updatedSingleApplication,
				};
			}
		},
		setNewStatus: (state, action) => {
			const updatedApplication = {
				...state.singleApplication,
				status: action.payload.status,
			};
			return {
				...state,
				singleApplication: updatedApplication,
			};
		},
		setStatusWhenPaid: (state, action) => {
			const isApplicationComplete = state.singleApplication.documents.every(
				(doc) => {
					if (doc.type === "required" || doc.type === "additional") {
						return doc.link.length !== 0;
					}
					return true;
				},
			);
			const updatedApplication = {
				...state.singleApplication,
				status: isApplicationComplete
					? EApplicationStatus.document_complete
					: EApplicationStatus.incomplete,
			};

			return {
				...state,
				singleApplication: updatedApplication,
			};
		},
		setStatusOfAllSelectedApplication: (
			state,
			action: PayloadAction<{ application: string[] }>,
		) => {
			const { application } = action.payload;
			const updatedApplication = state.applications.map((app) => {
				if (application.includes(app.id)) {
					return {
						...app,
						paid: true,
						status: EApplicationStatus.incomplete,
					};
				}
				return app;
			});
			return {
				...state,
				applications: updatedApplication,
			};
		},
	},
});

export const {
	setUserApplications,
	setCreatedApplications,
	setUserApplicationsWithStatus,
	setSingleApplication,
	setNewStatus,
	setAddImageToApplication,
	setRemoveImageFromApplication,
	setStatusWhenPaid,
	setStatusOfAllSelectedApplication,
} = applicationSlice.actions;

export const getUserApplications = (state: RootState) =>
	state.applications.applications;

export default applicationSlice.reducer;
