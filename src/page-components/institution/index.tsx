import React from "react";
import InstitutionHero from "@/page-components/institution/InstitutionHero";
import PartnerUniversity from "@/page-components/institution/PartnerUniversity";
import ReachTarget from "@/page-components/institution/ReachTarget";
import FindWiseScore from "@/page-components/institution/FindWisescore";
import OurAiPlatform from "@/page-components/institution/OurAiPlaftorm";
import dynamic from "next/dynamic";
import OurServices from "@/page-components/institution/OurServices";

const MenuSwiper = dynamic(
  () => import("@/page-components/institution/MenuList"),
  { ssr: false }
);

const InstitutionHome = () => {
  return (
    <>
      <InstitutionHero />
      <PartnerUniversity />
      <ReachTarget />
      <FindWiseScore />
      <OurServices />
      <OurAiPlatform />
      <MenuSwiper />
    </>
  );
};

export default InstitutionHome;
