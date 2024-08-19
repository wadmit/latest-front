import { IUserDoc } from "./user";

export interface IBlog {
	title: string;
	createdBy: IUserDoc;
	cover: string;
	cover_key: string;
	desc: string;
	readTime: number;
	meta: string;
	slug: string;
	tags: string[];
	createdAt: Date;
	updatedAt: Date;
	id: string;
}
