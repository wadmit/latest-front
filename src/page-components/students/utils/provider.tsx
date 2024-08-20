import type { IFeatureProps } from "@/types/other";
import {
  BuildingSvg,
  CallSvg,
  DocumentationSvg,
  LanuagePreparationSvg,
  ProfileSvg,
  SettlingDownSvg,
  TeacherSvg,
  VisaAssitanceSvg,
} from "$/svg";
import { Box, IconButton, Typography } from "@mui/material";
import ImageComponent from "@/components/common/image-component";
import MeherImage from "$/images/home/testimonial1.webp";
import SampadaImage from "$/images/home/testimonial2.webp";
import BackedBy1 from "$/images/student/backed_1.webp";
import BackedBy2 from "$/images/student/backed_2.webp";
import BackedBy3 from "$/images/student/backed_3.webp";
import type { ISupportedByCard } from "@/page-components/students/utils/types";
import Image from "next/image";

export const cursorVariants = {
  blinking: {
    opacity: [0, 0, 1, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatDelay: 0,
      ease: "linear",
      times: [0, 0.5, 0.5, 1],
    },
  },
};

export const featureData: IFeatureProps[] = [
  {
    title: "Save on guess work, time, and money spent on applications.",
    svg: (
      <Image
        src="/images/student/hand-watch.webp"
        width={1000}
        height={32}
        style={{ width: 32, height: 32 }}
        alt="save time"
      />
    ),
  },
  {
    title:
      "Easily find the programs that best fits you by answering a few short questions.",
    svg: (
      <Image
        src="/images/student/checklist.webp"
        width={1000}
        height={32}
        style={{ width: 32, height: 32 }}
        alt="checklist"
      />
    ),
  },
  {
    title: "Apply to multiple universities with just ONE application form!",
    svg: (
      <Image
        src="/images/student/stack.webp"
        width={1000}
        height={32}
        style={{ width: 32, height: 32 }}
        alt="stack"
      />
    ),
  },
];

export const universityImages = [
  "/images/institution/uni1.webp",
  "/images/institution/uni2.webp",
  "/images/institution/uni3.webp",
  "/images/institution/uni4.webp",
  "/images/institution/uni5.webp",
  "/images/institution/uni6.webp",
  "/images/institution/uni7.webp",
  "/images/institution/uni8.webp",
  "/images/institution/uni9.webp",
  "/images/institution/uni10.webp",
  "/images/institution/uni11.webp",
  "/images/institution/uni12.webp",
  "/images/institution/uni13.webp",
  "/images/institution/uni14.webp",
  "/images/institution/uni15.webp",
];

export function PillButton({
  item,
  selected,
  onClick,
}: {
  item: number;
  selected: number;
  onClick: any;
}) {
  return (
    <IconButton
      onClick={onClick}
      role="presentation"
      sx={{
        "&.MuiButtonBase-root:hover": {
          bgcolor: "transparent",
        },
        "&.MuiStack-root": {
          border: "none",
        },
        p: 0,
        m: 0,
        borderRadius: 0,
        bgcolor: "transparent",
        maxWidth: { lg: "13.5625rem", md: "11.5rem", sm: "8rem", xs: "9.2rem" },
        width: "100%",
      }}
    >
      <Typography
        fontFamily="HankenGroteskExtraBold"
        fontSize={{ lg: "20px", md: "20px", sm: "20px", xs: "18px" }}
        lineHeight={{ lg: "26px", md: "26px", sm: "24px", xs: "23.4px" }}
        letterSpacing="-2%"
        color="rgba(32, 28, 26, 0.95)"
        // color={item === selected ? 'primary' : 'grey.200'}
      >
        {item === 1 ? " Pre-admission" : "Post-admission"}
      </Typography>
      {item === selected && (
        <Box
          sx={{
            position: "absolute",
            left: 35,
            right: 35,
            bottom: "-0.5rem",
            height: "0.2rem",
            bgcolor: "rgba(255, 107, 38, 1)",
          }}
        />
      )}
    </IconButton>
  );
}

export const preadmission = [
  {
    title: <>University Selection and Application</>,
    icon: <BuildingSvg />,
  },
  {
    title: <>Academic and Career Counselling</>,
    icon: <ProfileSvg />,
  },
  {
    title: <>Scholarship Assistance</>,
    icon: <TeacherSvg />,
  },
];

export const postadmission = [
  {
    title: "Language Preparation Class",
    icon: <LanuagePreparationSvg />,
  },
  {
    title: "Visa Assistance",
    icon: <VisaAssitanceSvg />,
  },
  {
    title: "Documentation",
    icon: <DocumentationSvg />,
  },
  {
    title: "Arrival Assistance",
    icon: <CallSvg />,
  },
  {
    title: "Settling Down",
    icon: <SettlingDownSvg />,
  },
];

export const supportedByData: ISupportedByCard[] = [
  {
    title: "Founder Institute Silicon Valley (US)",
    src: () => (
      <ImageComponent
        style={{
          objectFit: "contain",
        }}
        height="80"
        width="80"
        src={BackedBy1}
        alt="Founder Institute Silicon Valley (US) logo"
      />
    ),
    url: "https://fi.co/",
  },
  {
    title: "NUAA University, (China)",
    src: () => (
      <ImageComponent
        style={{
          objectFit: "contain",
        }}
        height="80"
        width="80"
        src={BackedBy2}
        alt="NUAA University, (China) logo"
      />
    ),
    url: "https://cie.nuaa.edu.cn/",
  },
  {
    title: "Entrepreneurship Lab, UBC (Canada)",
    src: () => (
      <ImageComponent
        src={BackedBy3}
        style={{
          objectFit: "contain",
        }}
        height="80"
        width="80"
        alt="Entrepreneurship Lab, UBC (Canada) logo"
      />
    ),
    url: "https://entrepreneurship.ubc.ca",
  },
];

export const testimonialData = [
  {
    name: "Meher Tasnim",
    position: "Student, NUAA",
    partner: "Nanjing, Jiangsu province",
    desc: "I found WiseAdmit on Facebook. With the help of WiseScore®, I checked my eligibility and decided to apply to Nanjing University of Aeronautics and Astronautics. WiseAdmit helped me throughout the process. I loved how they instantly replied to my queries. They are very responsible with their students, and I guarantee you wont be disappointed if you work with them. They did all my processing without any charge. They have a good website for submitting documents. The team is always there to help. Even after admitting they are always there to listen and help. I highly recommend it. Lastly, thank you, WiseAdmit, for always supporting and helping me",
    img: MeherImage,
  },
  {
    name: "Sambedhana Kafle",
    position: "Masters’ Program , Tsinghua University",
    partner: "Beijing",
    desc: "I came to know about WiseAdmit through a mutual friend. As there were limited resources guiding me to study in China and apply for the scholarship, WiseAdmit and its WiseScore® have been my savior. I am impressed by how easy WiseScore® made my processing. I loved how the process was smooth and hassle-free. I must say that the team is very professional. They provided quick and understandable responses to every query I had. I can say that the team is Wise, as the name suggests. I suggest WiseAdmit to everyone who is planning to study in China.",
    img: SampadaImage,
  },
];
