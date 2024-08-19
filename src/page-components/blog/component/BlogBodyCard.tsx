"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { analytics } from "@/services/analytics.service";
import { IBlog } from "@/types/blog";

type Props = {
  blog: IBlog;
};
function GetArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M12.0243 15.6849C11.866 15.6849 11.7076 15.6265 11.5826 15.5015C11.341 15.2599 11.341 14.8599 11.5826 14.6182L16.1993 10.0015L11.5826 5.3849C11.341 5.14323 11.341 4.74323 11.5826 4.50156C11.8243 4.2599 12.2243 4.2599 12.466 4.50156L17.5243 9.55988C17.766 9.80155 17.766 10.2015 17.5243 10.4432L12.466 15.5015C12.341 15.6265 12.1826 15.6849 12.0243 15.6849Z"
        fill="#EE701E"
      />
      <path
        d="M16.942 10.625H2.91699C2.57533 10.625 2.29199 10.3417 2.29199 10C2.29199 9.65833 2.57533 9.375 2.91699 9.375H16.942C17.2837 9.375 17.567 9.65833 17.567 10C17.567 10.3417 17.2837 10.625 16.942 10.625Z"
        fill="#EE701E"
      />
    </svg>
  );
}
function BlogBodyCard({ blog }: Props) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "500px",
      }}
    >
      <Box height="250px">
        <img
          alt={blog.title}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            objectFit: "cover",
          }}
          src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${blog.cover_key}`}
        />
      </Box>
      <Box>
        <Typography
          mt={2}
          fontSize="20px"
          fontFamily="HankenGroteskExtraBold"
          variant="h5"
          component="h5"
          lineHeight="150%"
          width="80%"
        >
          {blog.title}{" "}
        </Typography>
        <Typography
          mt={2}
          style={{
            whiteSpace: "normal",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "block",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            width: "90%",
          }}
          variant="body1"
          component="p"
        >
          {`${blog?.meta?.slice(0, 80)}...`}
        </Typography>
        <Box
          onClick={() => {
            analytics.websiteButtonInteractions({
              buttonName: "Blog Info",
              source: `User selected post: ${blog.title} from blog`,
              urlPath: window.location.href,
              event_type: EAnalyticsEvents.BLOG,
              status: EAnalyticsStatus.SUCCESS,
              redirectPath: window.location.href + "/" + blog?.slug,
            });
          }}
        >
          <Link
            about="Read More"
            aria-label={`Read more ${blog.title}`}
            aria-description="Read More"
            href={`/blogs/${blog.slug}`}
          >
            <Typography
              aria-description={`${blog.title}`}
              aria-label={`Read more ${blog.title}`}
              component={"a"}
              mt={2}
              display="flex"
              alignItems="center"
              fontSize="14px"
              color="primary.main"
              gap={1}
              sx={{
                fontWeight: 800,
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Explore <GetArrow />
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}

export default BlogBodyCard;
