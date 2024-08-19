"use client";
import { RootContainer } from "@/components/common";
import ImageComponent from "@/page-components/costcalculator/components/ImageComponent";
import TitleComponent from "@/components/common/shareble/TitleComponent";
import { Box, Stack } from "@mui/material";

function CostCalculatorHero() {
	return (
		<RootContainer mt={{ xl: "6.8125rem", xs: 6 }} mb="6.8125rem">
			<Stack
				direction="row"
				alignItems={{ lg: "center", xs: "flex-start" }}
				position="relative"
				justifyContent="space-between"
				minHeight="26.25rem"
			>
				{/* title section */}

				<Box maxWidth={{ md: "37.5rem", xl: "51.8125rem" }}>
					<TitleComponent
						title={
							<>
								Annual Cost
								<br />
								Calculator - For Students
							</>
						}
						desc={
							<>
								Our Annual Cost Calculator is a tool that simplifies the
								budgeting
								<br />
								process for students. Provide the required information to
								receive <br /> an estimate of the annual cost to study in China.
							</>
						}
					/>
				</Box>
				{/* Image section  */}
				<ImageComponent />
			</Stack>
		</RootContainer>
	);
}

export default CostCalculatorHero;
