import React from "react";
import CostCalculatorHero from "@/page-components/costcalculator/CostCaluclatorHero";
import { Box } from "@mui/material";
import CalculateYourExpenses from "@/page-components/costcalculator/components/CalculateYourExpenses";

const CostCalculatorHome = () => {
	return (
		<>
			<CostCalculatorHero />
			<Box pb={10} pt={1} bgcolor="white" sx={{ marginTop: "-50px" }}>
				<CalculateYourExpenses />
			</Box>
		</>
	);
};

export default CostCalculatorHome;
