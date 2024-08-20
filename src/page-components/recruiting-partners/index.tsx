import React, { Suspense } from "react";
import RecruitingHero from "@/page-components/recruiting-partners/RecruitingHero";
import WhyChooseWiseAdmit from "@/page-components/recruiting-partners/WhyChooseWiseAdmit";
import BecomeOurPartner from "@/page-components/recruiting-partners/BecomePartners";
import CalculateYourRevenue from "@/page-components/recruiting-partners/CalculateYourRevenue";
import RecruitingPartnerUniversity from "@/page-components/recruiting-partners/RecruitingPartnerUniversity";
import SuccessStories from "@/page-components/recruiting-partners/SuccessStories";

const RecruitingPartnersHome = () => {
  return (
    <>
      <RecruitingHero />
      <WhyChooseWiseAdmit />
      <BecomeOurPartner />
      <CalculateYourRevenue />
      <Suspense fallback={<div>Loading...</div>}>
        <RecruitingPartnerUniversity />
      </Suspense>
      <SuccessStories />
    </>
  );
};

export default RecruitingPartnersHome;
