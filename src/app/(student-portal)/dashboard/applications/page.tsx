import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import ApplicationHome from "@/page-components/dashboard/applications";
import { Metadata } from "next";
import React, { Suspense } from "react";

// export const metadata: Metadata = {
//   title: "My Applications | WiseAdmit",
//   description: "WiseAdmit Application Page",
// };

export const metadata: Metadata = generateMetadata({
  title: "My Applications | WiseAdmit",
  description: "WiseAdmit Application Page",
  endPoint: "/dashboard/applications",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return( <Suspense>
    <ApplicationHome />
    </Suspense>
  )
}
export default page;
