"use client";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { Avatar, Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { GetArrow } from "@/page-components/blog/utils/provider";
import type { IBlog } from "@/types/blog";

const BlogHero = ({ blogs }: { blogs: IBlog }) => {
	return (
		<Box
			gap={6}
			alignItems="center"
			flexDirection={{ xs: "column", sm: "column", md: "row", lg: "row" }}
			display="flex"
			mt={4}
		>
			<Box
				position="relative"
				width="100%"
				height={{ lg: "380px", md: "240px" }}
				flex={0.5}
			>
				<img
					width="100%"
					height="100%"
					alt={blogs?.title}
					style={{
						objectFit: "cover", // Set object-fit to cover
						borderRadius: "8px",
					}}
					src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${blogs?.cover_key}`}
				/>
				<Box
					borderRadius="38px"
					bgcolor="#3185FC"
					padding="4px 15px"
					fontFamily="HankenGroteskBold"
					color="white"
					top={10}
					right="10px"
					position="absolute"
				>
					Featured Post
				</Box>
			</Box>
			<Box display="flex" gap={2} flexDirection="column" flex={0.5}>
				<Typography
					sx={{
						width: "80%",
						textOverflow: "ellipsis",
						fontSize: "24px",
						fontStyle: "normal",
						fontWeight: "800",
						overflowWrap: "break-word",
						lineHeight: "150%",
					}}
					variant="h4"
					component="h4"
				>
					{blogs?.title}
				</Typography>
				<Typography
					style={{
						whiteSpace: "normal",
						overflow: "hidden",
						textOverflow: "ellipsis",
						display: "block",
						WebkitLineClamp: 3,
						WebkitBoxOrient: "vertical",
						lineHeight: "160%",
						width: "90%",
						fontSize: "14px",
						color: "var(--text-day-body, rgba(32, 28, 26, 0.90))",
					}}
					variant="body1"
					component="p"
					fontFamily="HankenGroteskRegular"
				>
					{`${blogs?.meta.slice(0, 150)}`}
				</Typography>
				<Box gap={1} display="flex" alignItems="center">
					<Avatar
						sx={{ width: 32, height: 32 }}
						alt="WiseAdmit"
						src="/svg/wiseadmit.svg"
					/>

					<Typography color="grey.300" variant="body1">
						Written By {blogs?.createdBy?.name ?? "Wise Admit"}
						{/* on{' '} {new Date(blogs?.createdAt).toLocaleDateString()} */}
					</Typography>
				</Box>
				<Box
					onClick={() => {
						analytics.websiteButtonInteractions({
							buttonName: "Blog Info",
							source: `User selected featured post: ${blogs.title} from blog`,
							urlPath: window.location.href,
							event_type: EAnalyticsEvents.BLOG,
							status: EAnalyticsStatus.SUCCESS,
							redirectPath: window.location.href + "/" + blogs?.slug,
						});
					}}
				>
					<Link
						aria-label={`Read more about ${blogs?.title}`}
						href={`/blogs/${blogs?.slug}`}
					>
						<Typography
							aria-label={`Read more about ${blogs?.title}`}
							display="flex"
							alignItems="center"
							fontSize="14px"
							color="primary.main"
							gap={1}
							sx={{
								textDecoration: "underline",
								cursor: "pointer",
								fontWeight: "bold",
							}}
						>
							Explore <GetArrow />
						</Typography>
					</Link>
				</Box>
			</Box>
		</Box>
	);
};

export default BlogHero;
