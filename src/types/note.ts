import { IUserDoc } from "./user";

export enum ENoteType {
	EMAIL = "email",
	PHONE = "phone-call",
	SMS = "sms",
	MESSAGE = "message",
	FACETOFACE = "face-to-face",
}
export interface INotes {
	note: string;
	noteType: ENoteType;
	noteDate?: Date;
	createdBy: IUserDoc;
}
