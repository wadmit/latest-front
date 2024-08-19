import SingleBlogContainer from "@/page-components/blog/component/single-blog/SingleBlogContainer";
import type { INews } from "@/types/news";
import React from "react";
import { SingleNewsHeader } from "@/page-components/news/single-news/SingleNewsHeader";
import SingleNewsContent from "@/page-components/news/single-news/SingleNewsContent";

const SingleNewsHome = ({
	news,
	suggestedNews,
}: {
	news: INews;
	suggestedNews: INews[];
}) => {
	return (
		<>
			<SingleBlogContainer>
				<SingleNewsHeader news={news} />
				<SingleNewsContent news={news} />
			</SingleBlogContainer>
		</>
	);
};

export default SingleNewsHome;
