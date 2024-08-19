import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import FAQHome from "@/page-components/faq";
import type { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = generateMetadata({
  title: "FAQ | WiseAdmit",
  description:
    "WiseAdmit is a platform that helps students to find the right university and program based on their profile. We also help universities to find the right students for their programs.",
  endPoint: "/faq",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = (props: Props) => {
  return <FAQHome />;
};

export default page;
