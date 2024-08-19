import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import WiseScoreHome from "@/page-components/wisescore";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Check Your WiseScore® | WiseAdmit",
  description:
    "Test your eligibility score through WiseAdmit's highly optimized score tester WiseScore®",
  endPoint: "/wisescore",
  pageImg: `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/utils/metas/wisescore-image.png`,
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return (
    <>
      <WiseScoreHome />
    </>
  );
};

export default page;
