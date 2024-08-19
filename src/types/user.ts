import { ICountry } from "./country";
import { IRole } from "./role";
import { IStudent } from "./student";
import { EBaseCurrency } from "./university";
import { ScholarShipRangeType } from "./utils";

export enum EUserStatus {
	submitted = "submitted",
	review = "review",
	approved = "approved",
	rejected = "rejected",
	disabled = "disabled",
}
export interface IUserDoc {
	name: string;
	email: string;
	user_status: EUserStatus;
	first_name: string;
	last_name: string;
	photoUrl: string;
	creator?: IUserDoc;
	lastUpdatedBy?: IUserDoc;
	deletedBy?: IUserDoc;
	photoUrl_key: string;
	role: IRole;
	roleDetail?: {
		country?: ICountry;
		location?: string;
		adminAssociate?: boolean;
	};
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IUserDashboardData {
	data?: IStudent;
	score: number;
	latestWisescoreCheckDate?: Date;
}
