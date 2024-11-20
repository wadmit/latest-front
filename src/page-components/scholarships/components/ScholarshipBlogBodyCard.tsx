import { useAppSelector } from "@/global-states/hooks/hooks";
import { analytics } from "@/services/analytics.service";
import { IBlog } from "@/types/blog";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import { ScholarshipGetArrowBlog } from "../utils/svg";

type Props = {
  blog: IBlog;
};

const ScholarshipBlogBodyCard = ({ blog }: Props) => {
  const currency = useAppSelector((state) => state.currency);
  return (
    <Box
      sx={{
        width: "100%",
        height: "500px",
      }}
    >
      <Box height="250px">
        <img
          alt={blog?.title}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "8px",
            objectFit: "cover",
          }}
          src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${blog?.cover_key}`}
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
          {blog?.title ?? ""}{" "}
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
              location: {
                countryName: currency?.currentCountry ?? "",
                city: currency?.city ?? "",
              },
              buttonName: "Blog Info",
              source: `User selected post: ${blog?.title} from blog`,
              urlPath: window.location.href,
              event_type: EAnalyticsEvents.BLOG,
              status: EAnalyticsStatus.SUCCESS,
              redirectPath: window.location.href + "/" + blog?.slug,
            });
          }}
        >
          <Link
            about="Read More"
            aria-label={`Read more ${blog?.title}`}
            aria-description="Read More"
            href={`/blogs/${blog?.slug}`}
          >
            <Typography
              aria-description={`${blog?.title}`}
              aria-label={`Read more ${blog?.title}`}
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
              Read more <ScholarshipGetArrowBlog />
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default ScholarshipBlogBodyCard;
