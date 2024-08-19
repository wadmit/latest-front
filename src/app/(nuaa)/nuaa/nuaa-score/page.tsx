import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import NuaaScoreHome from "@/page-components/nuaa";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "NUAA | WiseAdmit",
  description:
    "Test your eligibility score throughout WiseAdmit's highly optimized score tester WiseScore®",
  endPoint: "/nuaa/nuaa-score",
});

const page = () => {
  return <NuaaScoreHome />;
};

export default page;
