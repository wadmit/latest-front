"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { RootContainer } from "@/components/common";
import {
	attractmorestudents,
	maximizeyourreach,
	servewithbetterefficiency,
} from "@/page-components/recruiting-partners/utils/provider";
import { WhyChooseCard } from "./components/WhyChooseCard";

function WhyChooseWiseAdmit() {
	return (
		<RootContainer>
			<Box color="grey.500" my={{ lg: 6, md: 6, sm: 5, xs: -4 }}>
				<Box display="flex" justifyContent="center" alignItems="center">
					<Typography
						component={"h1"}
						fontFamily="HankenGroteskExtraBold"
						fontSize={{ lg: "32px", md: "32px", sm: "32px", xs: "20px" }}
						lineHeight={{ lg: "41.6px", md: "41.6px", sm: "40px", xs: "26px" }}
						letterSpacing="-2%"
					>
						Why choose WiseAdmit?
					</Typography>
				</Box>

				<Box
					display="flex"
					flexDirection={{
						lg: "row",
						md: "column",
						sm: "column",
						xs: "column",
					}}
					alignItems={{
						lg: "center",
						md: "center",
						sm: "center",
						xs: "center",
					}}
					justifyContent="space-between"
					gap="20px"
					mt="48px"
				>
					<WhyChooseCard
						data={attractmorestudents}
						title="Convert More Students"
						src="/images/partners/cube.png"
					/>
					<WhyChooseCard
						data={servewithbetterefficiency}
						title="Be More Efficient"
						src="/images/partners/setting.png"
					/>
					<WhyChooseCard
						data={maximizeyourreach}
						title="Generate More Revenue"
						src="/images/partners/dollar.png"
					/>
				</Box>
			</Box>
		</RootContainer>
	);
}

export default WhyChooseWiseAdmit;
