import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import DocumentsHome from "@/page-components/dashboard/documents";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "My Documents | WiseAdmit",
  description: "Wise Admit Documents Page",
  endPoint: "/dashboard/documents",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return <DocumentsHome />;
};

export default page;
