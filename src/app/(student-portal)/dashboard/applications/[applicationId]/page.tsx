import { Metadata } from "next";
import ApplicationDetails from "@/app/(student-portal)/dashboard/applications/[applicationId]";
import React from "react";
import { generateMetadata } from "@/components/common/head-component/HeadComponent";

export const metadata: Metadata = generateMetadata({
  title: "My Applications | WiseAdmit",
  description: "WiseAdmit Application Page",
  endPoint: "/dashboard/applications/applicationId",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return <ApplicationDetails />;
};

export default page;
