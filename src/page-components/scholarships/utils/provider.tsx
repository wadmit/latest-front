import type { INavbarMenu } from "@/components/common";
import ImageComponent from "@/components/common/image-component";
import ScholarshipTestimonial1 from "public/images/scholarships/scholarshiptestimonialimg1.png";
import ScholarshipTestimonial2 from "public/images/scholarships/scholarshiptestimonialimg1.png";
import Image from "next/image";

export const testimonialScholarshipData = [
  {
    name: "Ridhi Shrestha",
    position: "NUAA",
    desc: "Thanks to the CSC Scholarship, I was able to pursue my Master’s degree in China without worrying about tuition or living expenses. WiseAdmit made the entire application process so easy, guiding me every step of the way.",
    img: ScholarshipTestimonial1,
  },
  {
    name: "Sambedhana Kafle",
    position: "Tsinghua University",
    desc: "Thanks to the CSC Scholarship, I was able to pursue my Master’s degree in China without worrying about tuition or living expenses. WiseAdmit made the entire application process so easy, guiding me every step of the way.",
    img: ScholarshipTestimonial2,
  },
];

export const scholarshipStyles: {
  [key: string]: { bgColor: string; textColor: string };
} = {
  "FULL SCHOLARSHIP": {
    bgColor: "rgba(222, 245, 236, 1)",
    textColor: "rgba(29, 137, 26, 1)",
  },
  "PARTIAL SCHOLARSHIP": {
    bgColor: "rgba(229, 242, 255, 1)",
    textColor: "rgba(95, 141, 195, 1)",
  },
  "TUITION WAIVE": {
    bgColor: "rgba(245, 242, 212, 1)",
    textColor: "rgba(240, 186, 71, 1)",
  },
  STIPEND: {
    bgColor: "rgba(144, 144, 144, 1)",
    textColor: "rgba(255, 255, 255, 1)",
  },
  NOTHING: {
    bgColor: "rgba(255, 235, 235, 1)",
    textColor: "rgba(220, 38, 38, 1)",
  },
};

export const navScholarshipMenu: INavbarMenu[] = [
  {
    name: "About",
    link: "#about",
  },
  {
    name: "Benefits",
    link: "#scholarshipBenefits",
  },
  {
    name: "Category",
    link: "#scholarshipCategories",
  },
  {
    name: "Criteria",
    link: "#eligibilityCriteria",
  },
  {
    name: "Process",
    link: "#applicationProcess",
  },
  {
    name: "FAQ",
    link: "#faqs",
  },
];
