import { IUserDoc } from "./user";
import { ITableOfContent } from "./utils";

export interface INews {
	title: string;
	creator: IUserDoc;
	cover: string;
	cover_key: string;
	desc: string;
	readTime: number;
	meta: string;
	slug: string;
	tags: string[];
	toc: ITableOfContent[];
	createdAt: Date;
	updatedAt: Date;
	id: string;
}
