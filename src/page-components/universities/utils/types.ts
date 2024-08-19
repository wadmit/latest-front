import type { IProgram } from "@/types/program";

export interface IUniversityAppPageProps {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
}

export interface IUniversityAdmissionCardPros {
	getConvertedCosts: (
		value: number,
		base_currency: string,
	) => {
		formattedValue: string;
		amount: number;
	};
}

export interface IUniversityProgramCardProps {
	program: IProgram;
	getConvertedCosts: (
		value: number,
		base_currency: string,
	) => {
		formattedValue: string;
		amount: number;
	};
}
