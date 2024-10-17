"use client";

import {
  LandingHeroSection,
  TrustedBy,
  StartApply,
  StartApplying,
  Support,
  ReadBlog,
  Country,
  Awards,
  Testimonials,
  JoinCommunity,
} from "@/page-components/home/components";
import HomeScript from "@/page-components/scripts/HomeScript";

const HomePage = () => {
  return (
    <>
      <HomeScript />
      <LandingHeroSection />
      <TrustedBy />
      <StartApplying />
      <Support />
      <ReadBlog />
      <Country />
      <Awards />
      <JoinCommunity />
      <Testimonials />
      <StartApply />
    </>
  );
};

export default HomePage;
