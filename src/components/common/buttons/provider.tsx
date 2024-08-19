import { ButtonProps } from "@mui/material";

export interface FeedbackButtonProps {
	onClick: () => void;
	color: "transparent" | "filled";
}

export interface wrapperButtonTypes extends ButtonProps {
	children: string | React.ReactNode;
	url: string;
}

export type ChatBoxProps = {
	onClick: () => void;
};
