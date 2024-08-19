import { generateMetadata } from "@/components/common/head-component/HeadComponent";
import WisescoreThankyouHome from "@/page-components/wisescore/wisescore-thankyou";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = generateMetadata({
  title: "Wisescore Thankyou | WiseAdmit®",
  description:
    "Find your universities based on your wisescore®. Top universities listed based on your score such as IELTS, TOEFL, SAT, GRE, GMAT, etc",
  endPoint: "/wisescore-thankyou",
});
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

const page = () => {
  return (
    <>
      <WisescoreThankyouHome />
    </>
  );
};

export default page;
