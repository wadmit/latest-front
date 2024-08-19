"use client";
import React, { useContext } from "react";
import { Box } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import { CustomBlogBoxWrapper } from "@/styles/CustomBlogBoxWrapper";
import type { INews } from "@/types/news";

function SingleNewsContent({ news }: { news: INews }) {
	return (
		<Box mt={4} width="100%">
			<CustomBlogBoxWrapper
				component="article"
				id="blog-content-article"
				width="100%"
				dangerouslySetInnerHTML={{
					__html: DOMPurify.sanitize(news?.desc, {
						FORBID_TAGS: ["br"],
						ADD_TAGS: ["iframe"],
					}),
				}}
			/>
		</Box>
	);
}

export default SingleNewsContent;
