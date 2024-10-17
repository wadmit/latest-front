import type { BoxProps } from "@mui/material";

export interface IBreadCrumbComponentProps extends BoxProps {
	crumbs: Array<{ label: string; href: string }>;
	textColor?: string;
}