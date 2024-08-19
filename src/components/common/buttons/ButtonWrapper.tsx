import React, { FC } from "react";
import { Button, ButtonProps, Typography } from "@mui/material";

interface wrapperButtonTypes extends ButtonProps {
	variant?: ButtonProps["variant"];
	children: string | React.ReactNode;
}

export function ButtonWrapper(props: wrapperButtonTypes) {
	const { children, variant, ...rest } = props;
	return (
		<Button
			size="medium"
			sx={{
				width: "100%",
				"& 	.MuiButton-iconSizeLarge": {
					fontSize: 40,
				},
			}}
			disableElevation
			variant={variant || "contained"}
			{...rest}
		>
			{children}
		</Button>
	);
}
