export interface ITextFieldType {
	label: any | React.ReactElement;
	placeholder?: string;
	name: string;
	type: "select" | "input";
	options?: {
		value: string;
		key: string;
	}[];
}
