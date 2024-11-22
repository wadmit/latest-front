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
import { useMemo } from "react";
import HomeScript from "@/page-components/scripts/HomeScript";

const HomePage = () => {
  const memoLandingHeroSection = useMemo(() => <LandingHeroSection />, []);
  const memoTrustedBy = useMemo(() => <TrustedBy />, []);
  const memoStartApplying = useMemo(() => <StartApplying />, []);
  const memoSupport = useMemo(() => <Support />, []);
  const memoReadBlog = useMemo(() => <ReadBlog />, []);
  const memoCountry = useMemo(() => <Country />, []);
  const memoAwards = useMemo(() => <Awards />, []);
  const memoStartApply = useMemo(() => <StartApply />, []);

  return (
    <>
      <HomeScript />
      {memoLandingHeroSection}
      {memoTrustedBy}
      {memoStartApplying}
      {memoSupport}
      {memoReadBlog}
      {memoCountry}
      {memoAwards}
      <JoinCommunity />
      <Testimonials />
      {memoStartApply}
    </>
  );
};

export default HomePage;
