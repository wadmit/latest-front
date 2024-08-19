import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import ProfileHome from "@/page-components/dashboard/profile";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "My Profile | WiseAdmit",
  description: "Wise Admit Profile Page",
  endPoint: "/dashboard/profile",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return <ProfileHome />;
};

export default page;
