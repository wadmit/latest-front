import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import InstitutionHome from "@/page-components/institution";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Institution | WiseAdmit",
  description:
    "WiseAdmit is a platform that helps students to find the right university and program based on their profile. We also help universities to find the right students for their programs.",
  endPoint: "/institution",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return <InstitutionHome />;
};

export default page;
