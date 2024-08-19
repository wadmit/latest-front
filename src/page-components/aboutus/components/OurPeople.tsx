import { RootContainer } from "@/components/common";
import { Box, Typography } from "@mui/material";
import React from "react";
import Photos from "@/page-components/aboutus/components/Photos";

const OurPeople = () => {
	return (
		<RootContainer>
			<Box
				display="flex"
				flexDirection="column"
				gap="48px"
				mt={{ lg: "110px", md: "110px", sm: "84px", xs: "84px" }}
				mb={{ lg: "116px", md: "116px", sm: "84px", xs: "84px" }}
			>
				<Typography
					fontSize={{
						lg: "28px",
						md: "28px",
						sm: "24px",
						xs: "24px",
					}}
					fontFamily="HankenGroteskExtraBold"
					fontWeight={800}
					lineHeight={{
						lg: "36.4px",
						md: "36.4px",
						sm: "31px",
						xs: "31px",
					}}
					letterSpacing="-2%"
					mt="12px"
					color="rgba(32, 28, 26, 1)"
				>
					Meet our people
				</Typography>
				<Photos />
			</Box>
		</RootContainer>
	);
};

export default OurPeople;
