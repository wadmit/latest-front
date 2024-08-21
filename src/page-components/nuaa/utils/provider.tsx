import { IUniversityTemplateConfig } from "@/types/utils";
import { TBadgeProps } from "@/page-components/nuaa/types";
import {
  LikeIcon,
  LockIcon,
  RadarIcon,
  RefreshIcon,
  VerifiedIcon,
} from "@/page-components/nuaa/svg";

export const config: IUniversityTemplateConfig = {
  logo: "/images/universities/nuaa-logo.png",
  logoSmall: "/images/universities/Nuaa-small.png",
  navbarBgColor: "white",
  footerBgColor: "secondary.main",
  navbarTextColor: "white",
  title: "NUAA",
  originalSiteUrl: "http://cie.nuaa.edu.cn/",
  homePageUrl: "/nuaa/nuaa-score",
  scorePageUrl: "/nuaa/nuaa-score/result",
  resultImage: "/images/universities/nuaa-banner.webp",
};


export const badgeArray: TBadgeProps[] = [
  {
    number: "03",
    title: (
      <>
        Aeronautical
        <br /> Engineering
      </>
    ),
  },
  {
    number: "83",
    title: (
      <>
        Electrical
        <br /> & Electronic
      </>
    ),
  },
  {
    number: "38",
    title: (
      <>
        Mechanical
        <br /> Engineering
      </>
    ),
  },
  {
    number: "87",
    title: (
      <>
        Artificial
        <br /> Intelligence (AI)
      </>
    ),
  },
];

export const trustUsData = [
  {
    id: 1,
    text: (
      <>
        Official application
        <br /> partner of NUAA
      </>
    ),
    icon: <VerifiedIcon />,
  },
  {
    id: 1,
    text: (
      <>
        Automated
        <br /> application process
      </>
    ),
    icon: <RefreshIcon />,
  },
  {
    id: 1,
    text: (
      <>
        Hassle-free online
        <br /> application fee payment
      </>
    ),
    icon: <LikeIcon />,
  },
  {
    id: 1,
    text: (
      <>
        Real-time application
        <br /> status tracking
      </>
    ),
    icon: <RadarIcon />,
  },
  {
    id: 1,
    text: (
      <>
        Data <br /> safeguarding
      </>
    ),
    icon: <LockIcon />,
  },
];
