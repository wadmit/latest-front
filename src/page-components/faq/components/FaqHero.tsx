"use client";
import { Box, Typography } from "@mui/material";
import React from "react";

const FaqHero = () => {
	return (
		<Box>
			<Typography
				fontSize={{
					xs: "28px",
					sm: "32px",
					md: "48px",
					lg: "48px",
				}}
				fontWeight={800}
				fontFamily="HankenGroteskExtraBold"
				lineHeight={{
					lg: "62.4px",
					md: "62.4px",
					sm: "41px",
					xs: "36.2px",
				}}
				component="h1"
			>
				Your questions, <br /> answered.
			</Typography>
		</Box>
	);
};

export default FaqHero;
