import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import RecruitingPartnersHome from "@/page-components/recruiting-partners";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Become Our Recruiting Partner | WiseAdmit",
  description:
    "WiseAdmit is a one-stop admission solution for Study Abroad companies. We streamline the process of admission to over 100 world-class universities",
  endPoint: "/recruiting-partners",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return <RecruitingPartnersHome />;
};

export default page;
