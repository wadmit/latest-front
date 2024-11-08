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

// export async function generateMetadata({
//   params,
// }: {
//   params: {
//     slug: string;
//   };
// }): Promise<Metadata> {
//   const scholarshipData = await getSingleScholarship(params.slug);

//   if (!scholarshipData?.data) {
//     return {
//       title: "WiseAdmit scholarship",
//       description: "WiseAdmit scholarship section",
//     };
//   }

//   const { name, slug } = scholarshipData.data;
//   const endPoint = `scholarships/${params.slug}`;
//   const url = `${applicationConfig.frontendUrlConfig}/${endPoint}`;
//   const pageImage =
//     `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${scholarshipData.data.scholarship.scholarshipCoverImage}` ||
//     `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/utils/wiseadmit.png`;

//   return {
//     name,
//     description: meta,
//   };
// }

export default async function Page({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const scholarshipData: any = await getSingleScholarship(params.slug);
  console.log("🚀 ~ scholarshipData:", scholarshipData);

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
