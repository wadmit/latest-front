import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import type { INews } from "@/types/news";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { EllipseSvg } from "@/page-components/news/svgs";
import Link from "next/link";

const NewsBody = ({
	handleSearch,
	allNews,
	loading,
}: {
	handleSearch: (term: string) => void;
	allNews: INews[];
	loading: boolean;
}) => {
	return (
		<>
			<Typography
				component={"h3"}
				mb="38px"
				display="flex"
				alignItems="center"
				fontSize={{ lg: "32px", xs: "28px" }}
				lineHeight={{ lg: "41.6px", xs: "36.4px" }}
				variant="h3"
				color="#201C1A"
				letterSpacing="-2%"
				fontFamily="HankenGroteskExtrabold"
			>
				Trending news
			</Typography>
			{allNews && allNews.length > 0 ? (
				<Grid container rowGap={{ lg: "64px", xs: "45px" }} spacing="20px">
					{allNews.map((singleNews) => {
						const timestamp = singleNews?.createdAt;
						const dateObject = new Date(timestamp);
						const formattedDate = dateObject.toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						});
						return (
							<Grid
								item
								lg={4}
								xs={12}
								onClick={() => {
									analytics.websiteButtonInteractions({
										buttonName: "News Info",
										source: `User selected trending post: ${singleNews?.title} from news`,
										urlPath: window.location.href,
										event_type: EAnalyticsEvents.NEWSLETTER,
										status: EAnalyticsStatus.SUCCESS,
										redirectPath: window.location.href + "/" + singleNews?.slug,
									});
								}}
							>
								<Box
									mb="32px"
									position="relative"
									width="100%"
									height="248px"
									flex={0.5}
								>
									<Link href={`/news/${singleNews?.slug}`}>
										<img
											width="100%"
											height="100%"
											alt={singleNews?.title}
											style={{
												objectFit: "cover", // Set object-fit to cover
												borderRadius: "12px",
												cursor: "pointer",
											}}
											src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${singleNews?.cover_key}`}
										/>
									</Link>
								</Box>
								<Link
									aria-label={`Read more about ${singleNews?.title}`}
									href={`/news/${singleNews?.slug}`}
								>
									<Typography
										aria-label={`Read more about ${singleNews?.title}`}
										component={"h4"}
										fontSize={{ lg: "24px", xs: "20px" }}
										lineHeight={{ lg: "31.2px", xs: "26px" }}
										color="#201C1A"
										variant="h5"
										letterSpacing="-2%"
										fontFamily="HankenGroteskExtrabold"
										sx={{
											cursor: "pointer",
										}}
									>
										{singleNews?.title}
									</Typography>
								</Link>
								<Typography
									mt="12px"
									display="flex"
									alignItems="center"
									fontSize="16px"
									lineHeight="20.8px"
									color="#00000099"
									fontFamily="HankenGroteskRegular"
								>
									{singleNews?.readTime} min read
									<Box mx="6px">
										<EllipseSvg />
									</Box>
									{formattedDate}
								</Typography>
							</Grid>
						);
					})}
				</Grid>
			) : (
				<Stack alignItems="center" justifyContent="center">
					<Typography
						my="36px"
						component={"h3"}
						variant="h5"
						fontSize={{ lg: "28px", xs: "20px" }}
						lineHeight={{ lg: "36.4px", xs: "26px" }}
						color="#201C1A"
						textAlign={{ lg: "left", xs: "center" }}
						letterSpacing="-3%"
						fontFamily="HankenGroteskExtrabold"
					>
						Stay Tuned For News
					</Typography>
				</Stack>
			)}
		</>
	);
};

export default NewsBody;
