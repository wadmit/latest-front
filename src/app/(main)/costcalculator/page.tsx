import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import CostCalculatorHome from "@/page-components/costcalculator";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Calculate Your Expenses | WiseAdmit",
  description:
    "Calculate your expenses with WiseAdmit. It helps you to calculate your expenses with WiseAdmit.",
  endPoint: "/costcalculator",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return <CostCalculatorHome />;
};

export default page;
