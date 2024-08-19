import { ISocialMediaType } from "@/types/utils";
import type { ICountry } from "@/types/country";
import { IProgram } from "./program";

export interface IUniversity {
	name: string;
	slug: string;
	status: EUniversityStatus;
	type: EUniversityType;
	base_currency: EBaseCurrency;
	cover?: string;
	cover_key: string;
	logo: string;
	logo_key: string;
	desc: string;
	location: string;
	detail: IUniversityDetail;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
	id: string;
	programs: IProgram[];
	profile?: string;
	programCount?: number;
	country?: ICountry | null;
	admission_free: boolean;
}

export interface IUniversityDetail {
	chinese_name?: string;
	images: string[];
	scholarships: EUniversityScholarship[];
	short_name: string;
	locationType: EUniversityLocationType;
	rankings: EUniversityRanking[];
	fees: IUniversityFees;
	reasons: string[];
	facilities: any[];
	internship: boolean;
	parttimejob: boolean;
	workpermit: boolean;
	total_stds: number;
	total_international_stds: number;
	undergraduateEmployment: number;
	postgraduateEmployment: number;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
	id: string;
	tier?: EUniversityTier;
	base_currency: EBaseCurrency;
	images_key?: string[];
	socials?: ISocialMediaType;
}

export interface IUniversityFees {
	"Application Fee": number;
	"On-Campus Acommodation/Year": number;
	"Average Tution Fee/Year": number;
	"Cost of Living": number;
}

export enum EBaseCurrency {
	USDOLLAR = "usd",
	YUAN = "cny",
	KOREANWON = "krw",
}

export enum EUniversityScholarship {
	MunicipalGovernmentScholarship = "Municipal Government Scholarship",
	ProvincialGovernmentFullScholarship = "Provincial Government Full Scholarship",
	ProvincialGovernmentPartialScholarship = "Provincial Government Partial Scholarship",
	UniversityFreshmanScholarship = "University Freshman Scholarship",
}

export enum EUniversityTier {
	NationalKeyUniversity = "National Key University",
	NationalKeyUniversity985 = "National Key University 985",
}

export enum EUniversityStatus {
	Draft = "draft",
	Published = "published",
}

export enum EUniversityType {
	Private = "private",
	Public = "public",
}

export enum EUniversityLocationType {
	Urban = "Urban",
	Rural = "Rural",
}

export interface EUniversityRanking {
	"Shanghai Rankings"?: string;
	"US NEWS Rankings"?: string;
}
