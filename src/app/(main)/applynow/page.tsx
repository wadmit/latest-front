import { auth } from "@/auth/auth";
import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import ApplyNowHome from "@/page-components/apply-now";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "ApplyNow | WiseAdmit",
  description:
    "Apply for your dream university with WiseAdmit. Apply worldwide universities with WiseAdmit and get latest updates about your application.",
  endPoint: "/applynow",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = async () => {
  const session = await auth();
  if (session) {
    redirect("/dashboard");
  }
  return (
    <>
      <ApplyNowHome />
    </>
  );
};

export default page;
