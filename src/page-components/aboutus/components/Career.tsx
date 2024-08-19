import { RootContainer } from "@/components/common";
import { Box, Typography } from "@mui/material";
import React from "react";

const Career = () => {
	return (
		<RootContainer>
			<Box
				display="flex"
				flexDirection="column"
				gap="24px"
				mt="84px"
				mb="100px"
			>
				<Typography
					fontFamily="HankenGroteskExtraBold"
					fontWeight={800}
					fontSize={{ lg: "32px", md: "32px", sm: "24px", xs: "24px" }}
					lineHeight={{
						lg: "41.6px",
						md: "41.6px",
						sm: "31.2px",
						xs: "31.2px",
					}}
					letterSpacing="-2%"
					color="rgba(32, 28, 26, 1)"
					component="h3"
				>
					Career
				</Typography>
				<Typography
					fontFamily="HankenGroteskRegular"
					fontWeight={400}
					fontSize={{ lg: "20px", md: "20px", sm: "16px", xs: "16px" }}
					lineHeight={{ lg: "26px", md: "26px", sm: "20.8px", xs: "20.8px" }}
					color="rgba(32, 28, 26, 0.9)"
					component="h4"
				>
					There are no new roles available right now. Come back later
				</Typography>
			</Box>
		</RootContainer>
	);
};

export default Career;
