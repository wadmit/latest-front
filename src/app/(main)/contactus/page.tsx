import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import ContactUsHome from "@/page-components/contactus";
import type { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = generateMetadata({
  title: "Contact Us | WiseAdmit",
  description: "Contact WiseAdmit",
  endPoint: "/contactus",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = (props: Props) => {
  return <ContactUsHome />;
};

export default page;
