import { getBlogs } from "@/api/web/blog.actions";
import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import BlogHome from "@/page-components/blog";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Blogs | WiseAdmit",
  description:
    "Find the blogs about the world's top universities to help you make the right decision.",
  endPoint: "/blogs",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const revalidate = 500;
const page = async () => {
  const response = await getBlogs({
    page: 1,
    limit: 6,
  });
  return (
    <>
      <BlogHome blogs={response?.data?.data} />
    </>
  );
};

export default page;
