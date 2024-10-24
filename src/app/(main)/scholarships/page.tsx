import { getBlogs } from "@/api/web/blog.actions";
import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import ScholarshipHome from "@/page-components/scholarships";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Scholarships | WiseAdmit",
  description: "Everything you need to know about Scholarships.",
  endPoint: "/scholarships",
});

const page = async () => {
  const response = await getBlogs({
    page: 1,
    limit: 3,
  });
  return <ScholarshipHome blogs={response?.data?.data} />;
};

export default page;
