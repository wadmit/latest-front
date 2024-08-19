import type { IProgram } from "@/types/program";
import type { IRecommendation, TRecommendationType } from "@/types/utils";

export interface IProgramAppPageProps {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
}
export type TProgramNavType =
	| "About"
	| "Costs"
	| "Scholarships"
	| "Pre requisties"
	| "FAQ";

export type TProgramUniAboutProp = {
	details: string;
	reasons: string[];
	type: "program" | "university";
};

export type TProgramCostProp = {
	getConvertedCosts: (
		value: number,
		base_currency: string,
	) => {
		formattedValue: string;
		amount: number;
	};
	isFoundation?: boolean;
};

export type TSimilarRcommendationProp = {
	type: "programs" | "universities";
	recommendation: IRecommendation[];
};

export interface IFilters {
	title: string;
	filterData: IFilterData[];
}

interface IFilterData {
	name: string;
	options: {
		name: string;
		id: string;
	}[];
	query: string;
}

export interface IAccordion extends IFilters {
	handleFilter: (queryParams: URLSearchParams) => void;
	componentFor?: "program" | "university";
}

export interface IProgramUniversityCardProps {
	uniProgram: IProgram;
	dataType?: TRecommendationType;
	getConvertedCosts: (
		value: number,
		base_currency: string,
	) => {
		formattedValue: string;
		amount: number;
	};
}
