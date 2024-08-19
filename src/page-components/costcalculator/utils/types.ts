export interface ITextFieldType {
	inputLabel: string;
	name: string;
	label?: string;
	select: boolean;
	fullWidth?: boolean;
}

export interface IDownloadFileProps {
	showModal: boolean;
	setShowModal: (show: boolean) => void;
}

export interface IInputBox {
	onCurrencyChange: (value: string) => void;
	currencyOptions?: string[];
	selectCurrency?: string;
	currencyDisable?: boolean;
}
