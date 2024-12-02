import { getBlogs, getSingleBlog } from "@/api/web/blog.actions";
import {
  getScholarships,
  getSingleScholarship,
} from "@/api/web/scholarship.action";
import applicationConfig from "@/config";
import SingleScholarshipHome from "@/page-components/scholarships/single-scholarship/SingleScholarshipHome";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const scholarships = await getScholarships({
    searchTerm: "",
  });

  const allScholarships = [scholarships?.data].filter(Boolean);
  return allScholarships.map((scholarship) => ({
    slug: scholarship?.scholarship?.slug,
  }));
}

export const revalidate = 86400; // 24 hours

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const scholarshipData = await getSingleScholarship(params.slug);

  if (!scholarshipData) {
    notFound();
  }

  return (
    <SingleScholarshipHome
      scholarship={scholarshipData?.scholarship}
      popularScholarships={scholarshipData?.popularScholarships}
    />
  );
}
