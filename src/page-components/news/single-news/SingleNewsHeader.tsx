import { Box, Stack, Typography } from "@mui/material";
import type { INews } from "@/types/news";
import { EllipseSvg } from "@/page-components/news/svgs";

export function SingleNewsHeader({ news }: { news: INews }) {
	const timestamp = news?.createdAt;
	const dateObject = new Date(timestamp);
	const formattedDate = dateObject.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<Stack alignItems="center" mt={6}>
			{/* <Button onClick={extractAndReadText}>Read</Button> */}
			<Typography
				component={"h3"}
				mb="8px"
				variant="body2"
				display="flex"
				alignItems="center"
				fontSize="16px"
				lineHeight="20.8px"
				color="#00000099"
				fontFamily="HankenGroteskRegular"
			>
				{news?.readTime} min read
				<Box mx="6px">
					<EllipseSvg />
				</Box>
				{formattedDate}
			</Typography>
			<Typography
				mb="8px"
				component={"h4"}
				variant="h5"
				fontSize={{ lg: "28px", xs: "20px" }}
				lineHeight={{ lg: "36.4px", xs: "26px" }}
				color="#201C1A"
				textAlign={{ lg: "center", xs: "center" }}
				letterSpacing="-3%"
				fontFamily="HankenGroteskExtrabold"
			>
				{news?.title}
			</Typography>
		</Stack>
	);
}
