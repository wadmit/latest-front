"use client";
import { getNews } from "@/api/web/news.actions";
import { RootContainer } from "@/components/common";
import { CacheConfigKey } from "@/constants";
import { Box, Button, debounce, Stack } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import NewsHeader from "@/page-components/news/NewsHeader";
import NewsHero from "@/page-components/news/NewsHero";
import UpcommingEvent from "@/page-components/news/UpcomingEvent";
import Loader from "@/components/common/circular-loader/Loader";
import NewsBody from "@/page-components/news/NewsBody";
import type { INewsResponse } from "@/types/utils";
import type { INews } from "@/types/news";

const NewsHome = ({ news }: { news: INewsResponse }) => {
	const [allNews, setAllNews] = useState<INews[]>(news.news);
	const [featuredNews, setFeaturedNews] = useState<INews>(news.featuredNews);
	const [searchTerm, setSearchTerm] = useState<string>("");
	const {
		isLoading,
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isFetching,
		status,
	} = useInfiniteQuery({
		queryKey: [CacheConfigKey.NEWS_QUERY_KEY, searchTerm],
		initialPageParam: 2,
		queryFn: ({ pageParam }) =>
			getNews({ page: pageParam, limit: 6, searchTerm }),
		getNextPageParam: (lastPage, pages) =>
			lastPage?.data?.data.paginate?.hasMore ? pages.length + 1 : undefined,
		initialData: {
			pages: [{ data: { data: news } }],
			pageParams: [1],
		},
	});

	useEffect(() => {
		if (data) {
			const newBlogs = data.pages.flatMap((page) => page?.data?.data?.news);
			setAllNews(newBlogs);
		}
	}, [data]);

	const handleSearch = debounce((term: string) => {
		setSearchTerm(term);
	}, 300);

	const handleNextPage = () => {
		fetchNextPage();
		const targetScrollPosition = window.scrollY + 500;
		window.scrollTo({
			top: targetScrollPosition,
			behavior: "smooth",
		});
	};
	return (
		<>
		  <Box mt={5}>
			<NewsHeader />
		  </Box>
			<NewsHero news={featuredNews} />
			<UpcommingEvent />
		<RootContainer my={5}>
			<NewsBody
				handleSearch={handleSearch}
				allNews={allNews}
				loading={isLoading}
			/>
			<Stack alignItems="center" mt={6}>
				{isFetchingNextPage && <Loader />}

				{hasNextPage && !isFetchingNextPage && (
					<Button
						aria-label="View more"
						variant="outlined"
						sx={{
							border: "1px solid #201C1A66",
							padding: "12px 32px 12px 32px",
							color: "#201C1A",
							borderRadius: "8px",
						}}
						onClick={handleNextPage}
					>
						View more
					</Button>
				)}
			</Stack>
		</RootContainer>
		</>
	);
};

export default NewsHome;
