import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import BlogNavMenu from "@/page-components/blog/component/BlogNavMenu";
import BlogBodyCard from "@/page-components/blog/component/BlogBodyCard";
import BlogBodyCardSkeleton from "@/page-components/blog/component/BlogSkeleton";
import type { IBlogBodyProps } from "@/page-components/blog/utils/types";

function BlogBody({ allBlogs, handleSearch, loading }: IBlogBodyProps) {
	return (
		<Box mt="116px">
			<Box>
				<Typography
					component={"h3"}
					fontFamily="HankenGroteskExtraBold"
					fontSize="32px"
					mb="24px"
				>
					What are you interested in?
				</Typography>

				<BlogNavMenu handleSearch={handleSearch} allTags={["All"]} />
				<Grid
					mt="48px"
					display="grid"
					gap={4}
					gridTemplateColumns={{
						lg: "repeat(3,1fr)",
						sm: "repeat(2,1fr)",
						xs: "repeat(1,1fr)",
					}}
				>
					{loading ? (
						Array.from(Array(3).keys()).map((item) => (
							<BlogBodyCardSkeleton key={item} />
						))
					) : allBlogs && allBlogs.length > 0 ? (
						allBlogs.map((blog) => <BlogBodyCard key={blog.id} blog={blog} />)
					) : (
						<Typography variant="h6" component="h6">
							No Blogs Found
						</Typography>
					)}
				</Grid>
			</Box>
		</Box>
	);
}

export default BlogBody;
