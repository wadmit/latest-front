import React from "react";
import { RootContainer } from "@/components/common";
import { Box } from "@mui/material";
import FaqHero from "@/page-components/faq/components/FaqHero";
import FaqBody from "@/page-components/faq/components/FaqBody";

const FAQHome = () => {
	return (
		<RootContainer>
			<Box
				mt={{
					xs: "32px",
					sm: "32px",
					md: "48px",
					lg: "48px",
				}}
				flexDirection="column"
				display="flex"
				alignItems="center"
			>
				<Box
					width={{
						xs: "100%",
						sm: "80%",
						md: "668px",
						lg: "779px",
					}}
				>
					<FaqHero />
					<FaqBody />
				</Box>
			</Box>
		</RootContainer>
	);
};

export default FAQHome;
