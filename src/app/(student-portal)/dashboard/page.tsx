import { auth } from "@/auth/auth";
import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import { DashboardHome } from "@/page-components/dashboard";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Dashboard | WiseAdmit",
  description: "Dashboard | WiseAdmit",
  endPoint: "/dashboard",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = async () => {
  const session = await auth();
  if (!session?.accessToken) {
    redirect("/applynow");
  }
  return (
    <>
      <DashboardHome />
    </>
  );
};

export default page;
