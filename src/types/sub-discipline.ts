import { IDiscipline } from "./discipline";

export interface ISubDiscipline {
	name: string;
	discipline: IDiscipline;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;
}
