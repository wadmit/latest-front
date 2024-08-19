import { getNews } from "@/api/web/news.actions";
import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import NewsHome from "@/page-components/news";
import type { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = generateMetadata({
  title: "News | WiseAdmit",
  description:
    "Stay informed with the latest news, insights, and updates on all things WiseAdmit..",
  endPoint: "/news",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const revalidate = 500;
const page = async () => {
  const response = await getNews({
    page: 1,
    limit: 6,
  });
  return (
    <>
      <NewsHome news={response?.data?.data} />
    </>
  );
};

export default page;
