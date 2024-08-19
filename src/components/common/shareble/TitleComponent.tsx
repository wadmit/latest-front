"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

interface ITitleProps {
	title: string | React.ReactElement;
	desc: string | React.ReactElement;
	textAlign?: "left" | "right" | "center" | "justify" | "flex-start";
	titleComponent?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
	descComponent?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
}

function TitleComponent({
	title,
	desc,
	textAlign = "left",
	titleComponent = "h1",
	descComponent = "p",
}: ITitleProps) {
	return (
		<Box>
			<Typography
				variant="h3"
				sx={{
					textAlign: { md: textAlign, xs: "flex-start" },
				}}
				component={titleComponent}
			>
				{title}
			</Typography>
			<Typography
				fontFamily="HankenGroteskRegular"
				fontSize="16px"
				lineHeight="20.8px"
				color="rgba(32, 28, 26, 0.9)"
				sx={{
					mt: "22px",
					textAlign: { md: textAlign, xs: "flex-start" },
				}}
				component={descComponent}
			>
				{desc}
			</Typography>
		</Box>
	);
}

TitleComponent.defaultProps = {
	textAlign: "left",
};

export default TitleComponent;
