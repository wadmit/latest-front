export interface ResponseUtils<T> {
	data: T[];
}

export interface IFilters {
	title: string;
	filterData: IFilterData[];
}
export interface IFilterData {
	name: string;
	options: IOptions[];
	query: string;
}

export interface IOptions {
	name: string;
	id: string;
}
