import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import SitemapHome from "@/page-components/sitemap";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Sitemap | WiseAdmit",
  description: "Sitemap of WiseAdmit",
  endPoint: "/sitemap",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return <SitemapHome />;
};

export default page;
