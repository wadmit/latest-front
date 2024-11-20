import { getBlogs } from "@/api/web/blog.actions";
import { getScholarships } from "@/api/web/scholarship.action";
import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import ScholarshipHome from "@/page-components/scholarships";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Scholarships | WiseAdmit",
  description: "Everything you need to know about Scholarships.",
  endPoint: "/scholarships",
});

const page = async () => {

  notFound()
  // const response = await getBlogs({
  //   page: 1,
  //   limit: 3,
  // });

  // const scholarshipResponse = await getScholarships({ searchTerm: "" });
  return (
    <></>
    // <ScholarshipHome
    //   blogs={response?.data?.data}
    //   scholarships={scholarshipResponse?.data}
    // />
  );
};

export default page;
