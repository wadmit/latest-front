import { EBaseCurrency, IUniversity } from "@/types/university";
import type { IDocument } from "@/types/document";
import type { IDiscipline } from "@/types/discipline";

export interface IProgram {
	name: string;
	slug: string;
	isActiveFoundation: boolean;
	university: IUniversity;
	discipline: IDiscipline;
	sub_discipline: TypeClass[];
	scholarship_point: number;
	eligibility_point: number;
	cover: string;
	cover_key: string;
	type: IDocument;
	detail: IProgramDetail;
	desc: string;
	code: IProgramCode;
	status: IProgramStatus;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
	id: string;
}
export interface TypeClass {
	name: string;
	id: string;
	sample?: string;
	sample_key?: string;
}

export enum IProgramCode {
	Clng = "CLNG",
	Empty = "",
	Foundation = "Foundation",
}

export interface IProgramDetail {
	language: IProgramDetailLanguage;
	scholarships: IProgramScholarship[];
	images: any[];
	startDate: string;
	scholarship_application_deadline1: string;
	scholarship_application_deadline2: string;
	general_application_deadline1: string;
	general_application_deadline2: string;
	reasons: string[];
	skills: string[];
	documents: IProgramDocument[];
	fees: IProgramFees;
	base_currency: EBaseCurrency;
	program_rankings: IProgramRanking[];
	discipline_rankings: any[];
	requirements: IProgramRequirements;
	subjects?: IProgramSubjects;
	intake: string;
	createdAt: Date;
	updatedAt: Date;
	program_duration?: number;
	id: string;
	scholarshipRange?: any;
}

export enum IProgramDocument {
	BachelorsDegreeCertificate = "Bachelors Degree Certificate",
	HighSchoolDegreeCertificate = "High School Degree Certificate",
	HighSchoolTranscripts = "High School Transcripts",
	LanguageCertificate = "Language Certificate",
	OtherCertificates = "Other Certificates",
	Passport = "Passport",
}

export interface IProgramFees {
	tution_fee: number;
	living_cost: number;
	housing_cost: number;
	other: number | null;
	id: string;
}

export enum IProgramDetailLanguage {
	English = "english",
}

export interface IProgramRanking {
	"US NEWS Rankings"?: string;
	"Shanghai Rankings"?: string;
}

export enum EProgramRanking {
	USRANKING = "US NEWS Rankings",
	SANGHAIRANKING = "Shanghai Rankings",
}

export interface IProgramRequirements {
	academic: IProgramAcademic;
	language: IProgramRequirementsLanguage;
	age: IProgramAge;
}

export enum IProgramAcademic {
	Grade10OrOLevels = "Grade 10 or O Levels",
	HighSchoolGraduateOrIBALevels = "High School Graduate or IB/A Levels",
}

export enum IProgramAge {
	LessThan25YearsOld = "Less than 25 Years Old",
	LessThan28YearsOld = "Less than 28 Years Old",
}

export enum IProgramRequirementsLanguage {
	IeltsToeflPteDuolinguo = "IELTS/TOEFL/PTE/DUOLINGUO",
	LanguageTestNOTRequired = "Language Test NOT required",
}

export enum IProgramScholarship {
	The62Eb644903720E0E77E5434F = "62eb644903720e0e77e5434f",
	The62Eb644903720E0E77E54351 = "62eb644903720e0e77e54351",
	The62Eb644903720E0E77E54353 = "62eb644903720e0e77e54353",
	The62Eb644903720E0E77E54355 = "62eb644903720e0e77e54355",
}

export interface IProgramSubjects {
	semester1: string[];
	semester2?: string[];
	semester3?: string[];
	semester4?: string[];
	semester5?: string[];
	semester6?: string[];
	semester7?: string[];
	semester8?: string[];
}

// export enum IProgramDiscipline {
//   The62F3769Ee2A137De0929Fb11 = "62f3769ee2a137de0929fb11",
//   The62F376A1E2A137De0929Fb6B = "62f376a1e2a137de0929fb6b",
//   The62F376A2E2A137De0929Fb92 = "62f376a2e2a137de0929fb92",
// }

export enum IProgramStatus {
	Draft = "draft",
}

// export enum IProgramType {
//   The62Ece97789Cab9C13C72023A = "62ece97789cab9c13c72023a",
//   The62Ece97789Cab9C13C72023C = "62ece97789cab9c13c72023c",
//   The62Ece97889Cab9C13C72023E = "62ece97889cab9c13c72023e",
// }
