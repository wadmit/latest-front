import { EBaseCurrency, IUniversity } from "@/types/university";
import { ICoreDocument } from "./core-document";
import { IProgram } from "./program";

export enum EApplicationDocumentStatus {
	REQUIRED = "required",
	OPTIONAL = "optional",
	OTHERS = "others",
	ADDITIONAL = "additional",
}

export enum EApplicationStatus {
	initial = "initial",
	incomplete_document = "incomplete_document",
	incomplete = "incomplete",
	document_complete = "document_complete",
	review = "review",
	submission = "submission",
	submitted = "submitted",
	decision = "decision",
	rejected = "rejected",
	accepted = "accepted",
	pre_enrollment = "pre_enrollment",
	enrolled = "enrolled",
	pre_accept = "pre_accept",
}

export interface IApplication {
	incompleteNote: string;
	student: string;
	note?: {
		reason?: string;
		title?: string;
	};
	program?: IProgram;
	foundation?: IProgram;
	university: IUniversity;
	offer_letter: string;
	offer_letter_key: string;
	scholarship_letter: string;
	scholarship_letter_key: string;
	paid: boolean;
	admission_free: boolean;
	application_fee: number;
	documents: IApplicationDocument[];
	currentScore: number;
	status: EApplicationStatus;
	assignment_result: string;
	is_assignment_active: boolean;
	assignment_score: number;
	base_currency: EBaseCurrency;
	createdAt: Date;
	updatedAt: Date;
	id: string;
}

export interface IApplicationDocument {
	link: string[];
	linkKey: string[];
	type: EApplicationDocumentStatus;
	coreDocument: ICoreDocument | null;
	_id: string;
}
