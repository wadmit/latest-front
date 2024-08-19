"use client";
import { RootContainer } from "@/components/common";
import React, { useEffect, useState } from "react";
import BlogHeader from "@/page-components/blog/BlogHeader";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getBlogs } from "@/api/web/blog.actions";
import BlogHero from "@/page-components/blog/BlogHero";
import { CacheConfigKey } from "@/constants";
import BlogBody from "@/page-components/blog/BlogBody";
import Loader from "@/components/common/circular-loader/Loader";
import { Button, debounce, Stack } from "@mui/material";
import type { IBlog } from "@/types/blog";
import type { IBlogResponse } from "@/types/utils";

const BlogHome = ({ blogs }: { blogs: IBlogResponse }) => {
	const [allBlogs, setAllBlogs] = useState<IBlog[]>(blogs.blogs);
	const [featuredBlog, setFeaturedBlog] = useState<IBlog>(blogs.featuredBlog);
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
		queryKey: [CacheConfigKey.BLOG_QUERY_KEY, searchTerm],
		initialPageParam: 2,
		queryFn: ({ pageParam }) =>
			getBlogs({ page: pageParam, limit: 6, searchTerm }),
		getNextPageParam: (lastPage, pages) =>
			lastPage?.data?.data.paginate?.hasMore ? pages.length + 1 : undefined,
		initialData: {
			pages: [{ data: { data: blogs } }],
			pageParams: [1],
		},
	});

	useEffect(() => {
		if (data) {
			const newBlogs = data.pages.flatMap((page) => page?.data?.data?.blogs);
			setAllBlogs(newBlogs);
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
		<RootContainer my={5}>
			<BlogHeader />
			<BlogHero blogs={featuredBlog} />
			<BlogBody
				handleSearch={handleSearch}
				allBlogs={allBlogs}
				loading={isLoading || isFetching}
			/>
			<Stack alignItems="center" mt={6}>
				{isFetchingNextPage && <Loader />}

				{hasNextPage && !isFetchingNextPage && (
					<Button
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
	);
};

export default BlogHome;
