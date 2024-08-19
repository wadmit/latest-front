import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import UniversityAndPrograms from "@/page-components/dashboard/universitiesandprograms";
import { Metadata } from "next";
import React from "react";

type Props = {};

export const metadata: Metadata = generateMetadata({
  title: "Dashboard Sorted Universities | Wise Admit",
  description: "WiseAdmit Sorted Universities Page Dashboard",
  endPoint: "/dashboard/universitiesandprograms",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = (props: Props) => {
  return (
    <>
      <UniversityAndPrograms />
    </>
  );
};

export default page;
