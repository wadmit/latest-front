import React from "react";
import SingleBlogContainer from "@/page-components/blog/component/single-blog/SingleBlogContainer";
import { BreadCrumbComponent } from "@/components/common/breadcrumb/BreadCrumbComponent";
import { SingleBlogHeader } from "@/page-components/blog/single-blog/SingleBlogHeader";
import SingleBlogContent from "@/page-components/blog/single-blog/SingleBlogContent";
import RelatedBlogs from "@/page-components/blog/single-blog/RelatedBlogs";
import type { IBlog } from "@/types/blog";

const SingleBlogHome = ({
	blog,
	suggestedBlogs,
}: {
	blog: IBlog;
	suggestedBlogs: IBlog[];
}) => {
	return (
		<>
			<SingleBlogContainer>
				<BreadCrumbComponent
					crumbs={[
						{ label: "Blogs", href: "/blogs" },
						{ label: blog?.title, href: `/blogs/${blog?.slug}` },
					]}
					// textColor="grey.500"
					sx={{
						pt: 2,
					}}
				/>
				<SingleBlogHeader blog={blog} />
				<SingleBlogContent blog={blog} />
			</SingleBlogContainer>
			<RelatedBlogs suggestedBlogs={suggestedBlogs} />
		</>
	);
};

export default SingleBlogHome;
