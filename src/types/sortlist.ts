"use client";
import { IDiscipline } from "./discipline";
import { IProgram, IProgramDetail, TypeClass } from "./program";
import { EBaseCurrency, IUniversity, IUniversityDetail } from "./university";
import { ScholarShipRangeType } from "./utils";

export interface Fees {
	tution_fee: number;
	living_cost: number;
	housing_cost: number;
	other: number;
	_id: string;
}

export interface Shortlist {
	name: string;
	university: IUniversity;
	detail: IProgramDetail;
	discipline: IDiscipline;
	sub_discipline: TypeClass[];
	scholarship_point: number;
	eligibility_point: number;
	type: string;
	desc: string;
	code: string;
	status: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
	cover: string;
	slug: string;
	id: string;
}

export type TShortListDetails = {
	program?: IProgram;
	foundation?: IProgram | null;
};
