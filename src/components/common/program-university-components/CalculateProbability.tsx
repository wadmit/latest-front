"use client";

import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { GetPhoneIcon } from "@/page-components/programs/svg";

function CalculateProbability() {
	const router = useRouter();

	return (
		<Box position="relative" sx={{ backgroundColor: "#DEF5EC" }}>
			<Box
				display="flex"
				justifyContent="space-between"
				gap="14px"
				alignItems={{
					lg: "center",
					md: "center",
					sm: "flex-start",
					xs: "flex-start",
				}}
				flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
				borderRadius="12px"
				padding="48px 24px 48px 32px"
			>
				<Stack gap="8px">
					<Typography
						lineHeight="150%"
						color="#201C1A"
						fontFamily="HankenGroteskExtraBold"
						fontSize="clamp(20px,28px,28px)"
					>
						Calculate your probability
					</Typography>
					<Typography
						fontSize="16px"
						fontFamily="HankenGroteskRegular"
						fontStyle="normal"
						lineHeight="160%"
					>
						All we need is a little more info
					</Typography>
				</Stack>
				<Box
					zIndex={10}
					sx={{
						cursor: "pointer",
					}}
					onClick={() => router.push("/wisescore")}
					display="flex"
					alignItems="center"
					justifyContent="center"
					color="#FF6B26"
					fontSize="14px"
					fontFamily="HankenGroteskSemiBold"
					borderRadius="40px"
					padding="14px 27px"
					border="1px solid #A3A3A9"
				>
					Check your WiseScore®
				</Box>
			</Box>
			<Box
				sx={{
					top: 0,
					left: "40%",
					bottom: 0,
					right: 0,
					margin: "auto",
				}}
				position="absolute"
				zIndex={1}
			>
				<GetPhoneIcon />
			</Box>
		</Box>
	);
}

export default CalculateProbability;
