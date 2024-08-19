import { IDocument } from "./document";

export interface IDiscipline {
	name: string;
	eligibilitySubjects: string[];
	document: IDocument;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
}
