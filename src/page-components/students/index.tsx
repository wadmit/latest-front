import React from "react";
import dynamic from "next/dynamic";
import Herosection from "@/page-components/students/Herosection";
import InfoCard from "@/page-components/students/InfoCard";
import WiseScoreIntro from "@/page-components/students/WiseScoreIntro";
import Motivational from "@/page-components/students/Motivational";
import AboutUs from "@/page-components/students/AboutUs";
import SupportedBy from "@/page-components/students/SupportedBy";
import HowWeWork from "@/page-components/students/HowWeWork";
import ServiceSection from "@/page-components/students/ServiceSection";
import Testimonial from "@/page-components/students/Testimonial";
import PartnerUni from "@/page-components/students/PartnerUni";
import ProgramSection from "@/page-components/students/ProgramSection";
import type { TProgramSectionType } from "@/page-components/students/utils/types";

const FAQ = dynamic(() => import("@/components/common/faq/FAQ"), {
  ssr: false,
});

const StudentHome = ({ programs }: TProgramSectionType) => {
  return (
    <>
      <Herosection />
      <InfoCard />
      <WiseScoreIntro />
      <Motivational />
      <ProgramSection programs={programs} />
      <AboutUs />
      <SupportedBy />
      <HowWeWork />
      <ServiceSection />
      <Testimonial />
      <PartnerUni />
      <FAQ />
    </>
  );
};

export default StudentHome;
