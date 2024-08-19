import type { IFeatureProps } from "@/types/other";
import { Stack, Typography } from "@mui/material";

function Cards({ item }: { item: IFeatureProps }) {
	return (
		<Stack
			direction="row"
			columnGap={{ lg: "5px", md: "5px", sm: "16px", xs: "16px" }}
			alignItems="center"
			component="li"
		>
			<Stack
				height={{ lg: "72px", md: "72px", sm: "48px", xs: "48px" }}
				minWidth={{ lg: "72px", md: "72px", sm: "0px", xs: "0px" }}
				bgcolor="common.white"
				direction="row"
				alignItems="center"
				justifyContent="center"
				borderRadius={1000}
			>
				{item.svg}
			</Stack>
			<Typography
				fontSize="16px"
				fontFamily="HankenGroteskRegular"
				lineHeight="20.8px"
				// variant="body1"
				component="span"
			>
				{item.title}
			</Typography>
		</Stack>
	);
}

export default Cards;
