import { ButtonProps } from "@mui/material";

export interface IFeedbackButtonProps {
	onClick: () => void;
	color: "transparent" | "filled";
}

export interface IWapperButtonTypes extends ButtonProps {
	children: string | React.ReactNode;
	url: string;
}

