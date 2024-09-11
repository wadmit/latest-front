import type { CircularProgressProps } from "@mui/material";

export interface ILoader extends CircularProgressProps {
	buttonState?: boolean;
	center?: boolean;
}