import React from "react";
import { Grid, Stack, Typography } from "@mui/material";
import BlogBodyCard from "@/page-components/blog/component/BlogBodyCard";
import { RootContainer } from "@/components/common";
import type { IBlog } from "@/types/blog";

function RelatedBlogs({ suggestedBlogs }: { suggestedBlogs: IBlog[] }) {
	return (
		<RootContainer>
			<Stack>
				<Typography variant="h4" fontFamily="HankenGroteskBold">
					Related Blogs
				</Typography>
				<Grid
					mt={4}
					display="grid"
					gap={4}
					gridTemplateColumns={{
						lg: "repeat(3,1fr)",
						sm: "repeat(2,1fr)",
						xs: "repeat(1,1fr)",
					}}
				>
					{suggestedBlogs &&
						suggestedBlogs.map((blog, index) => (
							<BlogBodyCard key={blog.id} blog={blog} />
						))}
				</Grid>
			</Stack>
		</RootContainer>
	);
}

export default RelatedBlogs;
