"use client";
import { getBlogs } from "@/api/web/blog.actions";
import { CacheConfigKey } from "@/constants";
import BlogBodyCardSkeleton from "@/page-components/blog/component/BlogSkeleton";
import { IBlog } from "@/types/blog";
import { IBlogResponse } from "@/types/utils";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ScholarshipBlogBodyCard from "./ScholarshipBlogBodyCard";
import { RootContainer } from "@/components/common";

type Props = {
  blogs: IBlogResponse;
};

const ScholarshipBlogs = ({ blogs }: Props) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [allBlogs, setAllBlogs] = useState<IBlog[]>(blogs?.blogs);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showAll, setShowAll] = useState(false);
  const [currentLimit, setCurrentLimit] = useState(isMobile ? 1 : 3);

  useEffect(() => {
    const newLimit = isMobile ? 1 : 3;
    if (newLimit !== currentLimit && !showAll) {
      setCurrentLimit(newLimit);
    }
  }, [isMobile]);

  const {
    isLoading,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: [CacheConfigKey.BLOG_QUERY_KEY, searchTerm],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getBlogs({
        page: pageParam,
        limit: showAll ? 999 : currentLimit,
        searchTerm,
      }),
    getNextPageParam: (lastPage, pages) =>
      lastPage?.data?.data.paginate?.hasMore ? pages.length + 1 : undefined,
    initialData: {
      pages: [
        {
          data: {
            data: {
              ...blogs,
              blogs: blogs.blogs.slice(0, currentLimit),
            },
          },
        },
      ],
      pageParams: [1],
    },
  });

  useEffect(() => {
    refetch();
  }, [currentLimit]);

  useEffect(() => {
    if (data) {
      const newBlogs = data.pages.flatMap((page) => page?.data?.data?.blogs);
      setAllBlogs(newBlogs);
    }
  }, [data]);

  const handleSeeAll = async () => {
    setShowAll(true);
    await refetch();
  };

  return (
    <RootContainer mt="116px">
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography
            component={"h3"}
            fontFamily="HankenGroteskExtraBold"
            fontSize={{ lg: "28px", md: "28px", sm: "24px", xs: "24px" }}
            lineHeight={{
              lg: "36.4px",
              md: "36.4px",
              sm: "31.2px",
              xs: "31.2px",
            }}
            letterSpacing="-2%"
            color="rgba(32, 28, 26, 1)"
            mb="24px"
          >
            Blogs
          </Typography>

          <Typography
            fontWeight={600}
            fontFamily="HankenGroteskSemiBold"
            fontSize={{ lg: "14px", md: "14px", sm: "14px", xs: "14px" }}
            lineHeight="19.6px"
            color="rgba(255, 107, 38, 1)"
            mt="10px"
            sx={{ cursor: "pointer" }}
            onClick={handleSeeAll}
          >
            See all
          </Typography>
        </Box>

        <Grid
          mt="40px"
          display="grid"
          gap={4}
          gridTemplateColumns={{
            lg: "repeat(3,1fr)",
            sm: "repeat(2,1fr)",
            xs: "repeat(1,1fr)",
          }}
        >
          {isLoading || isFetching ? (
            Array.from(Array(3).keys()).map((item) => (
              <BlogBodyCardSkeleton key={item} />
            ))
          ) : allBlogs && allBlogs.length > 0 ? (
            allBlogs.map((blog) => (
              <ScholarshipBlogBodyCard key={blog.id} blog={blog} />
            ))
          ) : (
            <Typography variant="h6" component="h6">
              No Blogs Found
            </Typography>
          )}
        </Grid>
      </Box>
    </RootContainer>
  );
};

export default ScholarshipBlogs;
