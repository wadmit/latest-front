export interface IDropzoneHOC {
	name: string;
	variant?: "small" | "big";
	label: string;
	sample_key?: string;
	keyName?: string;
	handleChange: (...args: any) => any;
	type?: "Requried" | "Optional" | "Others";
}
