import { EAnalyticsEvents } from "@/types/mix-panel-analytic";

export interface IWiseScoreDetailsContext {
	primaryColor: string;
	variant: string;
	secondaryColor: string;
	endPoint: string;
	version: string;
	closeModal: () => void;
}

export interface IWisescoreForm {
	screenHeader: string;
	screenSubHeader: string;
	Screen: React.FC<IScreenProps>;
	value: string;
	isEnd: boolean;
	showIn: TShowIn;
	skipStep: number;
	hasNext?: boolean;
	showValidation?: boolean;
	multiple?: boolean;
	children?: any;
	eventName?: EAnalyticsEvents;
}

export interface IScreenProps {
	handleNext: () => void;
	value: string;
	handleGoBack: () => void;
}
export type TShowIn = "masters" | "bachelors" | "both";
