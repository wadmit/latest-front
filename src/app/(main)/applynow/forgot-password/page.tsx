import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import ForgotPasswordHome from "@/page-components/apply-now/forgot-password";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "ForgotPassword | WiseAdmit",
  description: "Wise Admit Forget Password Page",
  endPoint: "/forgot-password",
});

const page = () => {
  return <ForgotPasswordHome />
};

export default page;
