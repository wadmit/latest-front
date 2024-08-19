import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import RevenueCalculatorHome from "@/page-components/revenue-calculator";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Calculate Your Revenue | WiseAdmit",
  description:
    "Calculate your revenue with WiseAdmit. It helps you to calculate your earnings with WiseAdmit.",
  endPoint: "/revenue-calculator",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return (
    <>
      <RevenueCalculatorHome />
    </>
  );
};

export default page;
