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
      <Testimonials />
      <StartApply />
    </>
  );
};

export default HomePage;
