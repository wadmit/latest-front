"use client";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import {
	BigDownFrame,
	BigUpFrame,
	SmallDownFrame,
	SmallUpFrame,
} from "@/page-components/aboutus/svg";

const AboutJoin = () => {
	const theme = useTheme();
	const router = useRouter();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	return (
		<Box bgcolor="rgba(246, 241, 238, 1)">
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				padding={{ lg: "96px", md: "96px", sm: "130px 80px", xs: "64px 10px" }}
				position="relative"
			>
				<Box
					width={{ lg: "800px", md: "800px", sm: "500px", sx: "345px" }}
					height={{ lg: "84px", md: "84px", sm: "108px", sx: "145px" }}
					display="flex"
					justifyContent="center"
					alignItems="center"
				>
					<Typography
						fontFamily="HankenGroteskExtraBold"
						fontSize={{ lg: "32px", md: "32px", sm: "28px", xs: "20px" }}
						lineHeight={{
							lg: "41.6px",
							md: "41.6px",
							sm: "36.4px",
							xs: "36.4px",
						}}
						letterSpacing={{ lg: "-2%", md: "-2%", sm: "-3%", xs: "-3%" }}
						color="rgba(32, 28, 26, 1)"
						textAlign="center"
						component="h3"
					>
						<Typography
							fontFamily="HankenGroteskExtraBold"
							fontSize={{ lg: "32px", md: "32px", sm: "28px", xs: "20px" }}
							lineHeight={{
								lg: "41.6px",
								md: "41.6px",
								sm: "36.4px",
								xs: "36.4px",
							}}
							letterSpacing={{ lg: "-2%", md: "-2%", sm: "-3%", xs: "-3%" }}
							color="rgba(170, 68, 1, 1)"
							textAlign="center"
							borderBottom="6px dotted rgba(170, 68, 1, 1)"
							component="span"
						>
							Join us
						</Typography>{" "}
						as we continue to empower, educate, and inspire the next generation
						of global leaders.
					</Typography>
				</Box>
				<Box
					display="flex"
					justifyContent="center"
					alignItems="center"
					mt="40px"
					color="white"
					fontSize="16px"
					fontFamily="HankenGroteskSemiBold"
					width="187px"
					borderRadius="8px"
					padding="12px 32px"
					bgcolor="primary.main"
					sx={{
						cursor: "pointer",
						transition: "all 0.3s ease",
						"&:hover": {
							transform: "scale(1.05)",
						},
					}}
					onClick={() => {
						router.push("/joinus");
						analytics.trackEvent(EAnalyticsEvents.ABOUT_GET_STARTED, {
							buttonName: "Get started",
							source: "Clicked on About us join",
						});
					}}
				>
					Get started
				</Box>

				<Box
					position="absolute"
					top={{ lg: "210px", md: "210px", sm: "370px", xs: "250px" }}
					left={{ lg: "200px", md: "120px", sm: "80px", xs: "10px" }}
				>
					{isMobile ? <SmallDownFrame /> : <BigDownFrame />}
				</Box>
				<Box
					position="absolute"
					top={{ lg: "55px", md: "50px", sm: "60px", xs: "20px" }}
					right={{ lg: "195px", md: "90px", sm: "50px", xs: "25px" }}
				>
					{isMobile ? <SmallUpFrame /> : <BigUpFrame />}
				</Box>
			</Box>
		</Box>
	);
};

export default AboutJoin;
