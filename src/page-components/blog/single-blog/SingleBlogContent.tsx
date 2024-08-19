"use client";
import React from "react";
import { Box } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import { CustomBlogBoxWrapper } from "@/styles/CustomBlogBoxWrapper";
import type { IBlog } from "@/types/blog";

function SingleBlogContent({ blog }: { blog: IBlog }) {
	return (
		<Box mt={4} width="100%">
			<CustomBlogBoxWrapper
				component="article"
				id="blog-content-article"
				width="100%"
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(blog?.desc, {
						FORBID_TAGS: ["br"],
					}),
				}}
			/>
		</Box>
	);
}

export default SingleBlogContent;
