import { IUniversity } from "./university";

export interface ICoreDocument {
	id: string;
	name: string;
	sample: string;
	sample_key: string;
	university?: IUniversity;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
}
