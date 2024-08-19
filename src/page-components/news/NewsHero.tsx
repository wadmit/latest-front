"use client";
import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import type { INews } from "@/types/news";
import {
	HeroContentWrapper,
	HeroWrapper,
	StyledContainerWrapper,
} from "@/page-components/news/utils/provider";
import { EllipseSvg, GetArrow } from "@/page-components/news/svgs";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";

function NewsHero({ news }: { news: INews }) {
	const timestamp = news?.createdAt;
	const dateObject = new Date(timestamp);
	const formattedDate = dateObject.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return news ? (
		<HeroWrapper>
			<StyledContainerWrapper>
				<Grid
					container
					direction={{ lg: "row", xs: "column-reverse" }}
					rowGap="24px"
					columnSpacing="62px"
				>
					<Grid item xs={4.9}>
						<HeroContentWrapper>
							<Typography
								mb="8px"
								component={"h3"}
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
								variant="h5"
								fontSize={{ lg: "28px", xs: "20px" }}
								lineHeight={{ lg: "36.4px", xs: "26px" }}
								color="#201C1A"
								textAlign={{ lg: "left", xs: "center" }}
								letterSpacing="-3%"
								fontFamily="HankenGroteskExtrabold"
							>
								{news?.title}
							</Typography>
							<Typography
								mb="34px"
								component={"p"}
								aria-label={`Read more about ${news?.title}`}
								variant="body2"
								fontSize={{ lg: "16px", xs: "14px" }}
								lineHeight="20.8px"
								color="#201C1AE5"
								fontFamily="HankenGroteskRegular"
								textAlign={{ lg: "left", xs: "center" }}
							>
								{`${news?.meta?.slice(0, 400)}...`}
								<Box
									component={"span"}
									onClick={() => {
										analytics.websiteButtonInteractions({
											buttonName: "News Info",
											source: `User selected featured post: ${news?.title} from news`,
											urlPath: window.location.href,
											event_type: EAnalyticsEvents.NEWSLETTER,
											status: EAnalyticsStatus.SUCCESS,
											redirectPath: window.location.href + "/" + news?.slug,
										});
									}}
								>
									<Link
										aria-label={`Read more about ${news?.title}`}
										href={`/news/${news?.slug}`}
									>
										<Typography
											display="flex"
											component={"h4"}
											aria-label={`Read more about ${news?.title}`}
											alignItems="center"
											fontSize="14px"
											color="primary.main"
											gap={1}
											sx={{
												width: "fit-content",
												// textDecoration: 'underline',
												cursor: "pointer",
												fontWeight: "bold",
											}}
										>
											Explore <GetArrow />
										</Typography>
									</Link>
								</Box>
							</Typography>
						</HeroContentWrapper>
					</Grid>
					<Grid item xs={7.1}>
						<Box
							position="relative"
							width="100%"
							height={{ lg: "418px", xs: "231px" }}
							flex={0.5}
						>
							<Box
								width="100%"
								height="100%"
								borderRadius={{ lg: "12px", xs: "0px" }}
								overflow="clip"
							>
								<img
									width="100%"
									height="100%"
									alt={news?.title}
									style={{
										objectFit: "cover", // Set object-fit to cover
									}}
									src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${news?.cover_key}`}
								/>
							</Box>

							<Box
								borderRadius="90px"
								bgcolor="#AA4401"
								padding="7px 23px"
								fontFamily="HankenGroteskBold"
								color="white"
								top="32px"
								right="32px"
								position="absolute"
							>
								Featured news
							</Box>
						</Box>
					</Grid>
				</Grid>
			</StyledContainerWrapper>
		</HeroWrapper>
	) : (
		<Stack alignItems="center" justifyContent="center">
			<Typography
				my="36px"
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
	);
}

export default NewsHero;
