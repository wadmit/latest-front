import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import AboutUsHome from "@/page-components/aboutus";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "About Us | WiseAdmit",
  description: "Everything you need to know about WiseAdmit.",
  endPoint: "/aboutus",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return <AboutUsHome />;
};

export default page;
