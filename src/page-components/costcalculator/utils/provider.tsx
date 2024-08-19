import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { ITextFieldType } from "@/page-components/costcalculator/utils/types";

export const HeroSectionContainer = styled(
	Stack,
	{},
)(({ theme }) => ({
	position: "relative",
	minHeight: "420px",
}));

export const ImagePositionedElements = styled(
	Stack,
	{},
)((theme) => ({
	borderRadius: "10px",
	position: "absolute",
	padding: "5px",
	width: "auto",
	height: "60px",
	backgroundColor: "white",
	justifyContent: "space-between",
	alignItems: "center",
	boxShadow: "0px 4px 14px rgba(0, 0, 0, 0.1)",
}));

export const boxStyle = {
	borderRadius: "10px",
	height: "50px",
	width: "50px",
	position: "relative",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
};

export const wrapperBoxStyle = {
	position: "absolute",
	top: "-60px",
	right: "0",
	zIndex: "-100",
};

export const wrapperDisplayStyle = {
	md: "block",
	xs: "none",
};

export const TitlefontSize = { xl: "50px", sm: "32px", xs: "22px" };
export const TitleDescfontSize = { xl: "24px", sm: "22px", xs: "16px" };

export interface TextFieldType {
	inputLabel: string;
	name: string;
	label?: string;
	select: boolean;
	fullWidth?: boolean;
}

// data
export const CostCalculatorInputFields: ITextFieldType[] = [
	{
		inputLabel: "What is the annual tuition fee? In RMB / CNY*",
		name: "annual_tution_fee",
		label: "Enter value",
		select: true,
	},
	{
		inputLabel: "Which city you wish to live in?",
		name: "city",
		label: "Select your option",
		select: true,
	},
	{
		inputLabel: "What is your accommodation preference?",
		name: "stay",
		label: "Select your option",
		select: true,
	},
];
