import { ICoreDocument } from "./core-document";
import { ICountry } from "./country";
import { INotes } from "./note";
import { IPayment } from "./payment";
import { IRole } from "./role";
import { IUniversity } from "./university";

export enum EStudentStatus {
	submitted = "submitted",
	review = "review",
	approved = "approved",
	declined = "declined",
	disabled = "disabled",
}

export enum EReligion {
	Anglican = "anglican",
	Atheism = "atheism",
	Mormon = "mormon",
	Christianity = "christianity",
	Judaism = "judaism",
	Catholicism = "catholicism",
	"Eastern Orthodoxy" = "eastern-orthodoxy",
	Hinduism = "hinduism",
	Islam = "islam",
	Buddhism = "buddhism",
	Taoism = "taoism",
	None = "none",
	Lutheranism = "lutheranism",
	Other = "other",
}

export interface IStudentDocument {
	// student: ObjectId;
	name: ICoreDocument;
	link: string | string[];
	link_key: string | string[];
	createdAt: Date;
	updatedAt: Date;
}

export interface IStudentDetail {
	date_of_birth: number;
	first_language: string;
	country_of_citizenship: ICountry;
	religion?: string;
	father_name: string;
	mother_name: string;
	father_occupation: string;
	mother_occupation: string;
	passport_number: string;
	passport_expiry_date: number;
	marital_status: string;
	gender: string;
	address: string;
	city: string;
	country: ICountry;
	province: string;
	postal_zip_code: string;
	country_of_education: ICountry;
	highest_level_of_education: string;
	grading_scheme: string;
	grade_average: string;
	country_of_institution: string;
	name_of_institution: string;
	level_of_institution: string;
	attended_institution_from: number;
	attended_institution_to: number;
	degree_name: string;
	graduated_institution: boolean;
	graduation_date: number;
	school_address: string;
	school_city: string;
	school_province: string;
	school_postal_zip_code: string;
	english_proficiency_test: boolean;
	language_of_proficiency_test: string;
	test_format?: {
		listening: number;
		speaking: number;
		reading: number;
		writing: number;
	};
	total_score: number;
	emergency_person: string;
	emergency_email: string;
	emergency_number: string;
	notes: INotes[];
	additional_configuration: {
		[key: string]: any;
	};

	active: boolean;
	createdAt: Date;
	updatedAt: Date;

	complete: boolean;

	father_company_name?: string;
	mother_company_name?: string;
	father_company_address?: string;
	mother_company_address?: string;

	eighth_institution_name?: string;
	eighth_grading?: string;
	eighth_start_date?: number;
	eighth_end_date?: number;

	tenth_institution_name?: string;
	tenth_grading?: string;
	tenth_start_date?: number;
	tenth_end_date?: number;
}
export interface IStudent {
	email: string;
	user_status: EStudentStatus;
	first_name: string;
	middle_name?: string;
	last_name: string;
	document: IStudentDocument;
	photoUrl?: string | null;
	photoUrl_key?: string | null;
	isUserVerified: boolean;
	role: IRole;
	detail: IStudentDetail;
	phone?: string;
	priority?: string;
	payments: IPayment[];
	referralUniversity?: IUniversity;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
	isProfileComplete: boolean;
	deletedAt?: Date;
}
