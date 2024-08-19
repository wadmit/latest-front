import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import EditProfileHome from "@/page-components/dashboard/profile/edit-profile";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Edit Profile | WiseAdmit",
  description: "WiseAdmit Edit Profile Page",
  endPoint: "/dashboard/profile/edit-profile",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return <EditProfileHome />;
};

export default page;
