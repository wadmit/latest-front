import type { ButtonProps } from "@mui/material";

export interface IIWapperButtonTypes extends ButtonProps {
	variant?: ButtonProps["variant"];
	children: string | React.ReactNode;
}