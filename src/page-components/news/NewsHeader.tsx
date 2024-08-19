import { Box, Typography } from "@mui/material";
import React from "react";
import { HandSvg, LightSvg } from "@/page-components/news/svgs";

const NewsHeader = () => {
	return (
		<Box padding={{ lg: "0px 200px", sm: "0px 20px" }}>
			<Typography
				fontSize={{ lg: "32px", sm: "28px", xs: "28px" }}
				variant="h3"
				lineHeight={{ lg: "41.6px", sm: "36.4px", xs: "36.4px" }}
				letterSpacing="-2%"
				component="h3"
				fontFamily="HankenGroteskExtraBold"
				textAlign="center"
				flexWrap="wrap"
			>
				Journey of growth: Get the latest scoop on our{" "}
				<Box>
					<Typography
						fontSize={{ lg: "32px", sm: "28px", xs: "28px" }}
						component={"span"}
						lineHeight={{ lg: "41.6px", sm: "36.4px", xs: "36.4px" }}
						letterSpacing="-2%"
						fontFamily="HankenGroteskExtraBold"
						borderBottom="6px dotted rgba(170, 68, 1, 1)"
						color="rgba(170, 68, 1, 1)"
					>
						innovations
						<LightSvg />
						and collaborations! <HandSvg />
					</Typography>
				</Box>
			</Typography>
		</Box>
	);
};

export default NewsHeader;
