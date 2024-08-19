import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import PrivacyPolicyHome from "@/page-components/privacy-policy";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Privacy Policy | WiseAdmit",
  description: "Privacy policy of WiseAdmit",
  endPoint: "/privacy-policy",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return <PrivacyPolicyHome />;
};

export default page;
