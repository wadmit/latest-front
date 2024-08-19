import { Box } from "@mui/material";
import React from "react";
import CalculateYourRevSection from "@/page-components/revenue-calculator/components/CalculateYourRevSection";

const RevenueCalculatorHome = () => {
	return (
		<>
			<Box pb={10} pt={4}>
				<CalculateYourRevSection />
			</Box>
		</>
	);
};

export default RevenueCalculatorHome;
