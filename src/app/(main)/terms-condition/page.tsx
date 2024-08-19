import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import TermsConditionHome from "@/page-components/terms-condition";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Terms & Conditions | WiseAdmit",
  description: "Terms & Conditions of WiseAdmit",
  endPoint: "/terms-condition",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return <TermsConditionHome />;
};

export default page;
