import { getProgramsForStudentPage } from "@/api/web/student.action";
import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import StudentHome from "@/page-components/students";
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Students | WiseAdmit",
  description:
    "WiseAdmit offer  to access the world’s top-ranked university programs for international students.",
  endPoint: "/students",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

async function page() {
  const programs = await getProgramsForStudentPage();
  return <StudentHome programs={programs} />;
}

export default page;
