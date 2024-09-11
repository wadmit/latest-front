import type { IProgram } from "@/types/program";

export interface IRedoAnimITextProps {
	delay: number;
}

export interface ISupportedByCard {
	title: string;
	src: () => React.ReactElement;
	url: string;
}

export type TProgramSectionType = {
	programs: IProgram[];
};
