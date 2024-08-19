import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import NuaaResultHome from "@/page-components/nuaa/NuaaResultHome";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "NUAA-SCORE | WiseAdmit",
  description:
    "Test your eligibility score throught WiseAdmit's highly optimized score tester WiseScore®",
  endPoint: "/nuaa/nuaa-score/result",
});

const page = () => {
  return <NuaaResultHome />;
};

export default page;
