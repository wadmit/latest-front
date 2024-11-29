import type { INavbarMenu } from "@/components/common";
import ImageComponent from "@/components/common/image-component";
import ScholarshipTestimonial1 from "public/images/scholarships/scholarshiptestimonialimg1.png";
import ScholarshipTestimonial2 from "public/images/scholarships/scholarshiptestimonialimg1.png";
import Image from "next/image";
import { IFAQScholarship } from "./types";
import { Typography } from "@mui/material";
import Link from "next/link";
import { StyledLink } from "../styled-components";
import { ITag } from "@/types/tag";

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
  "N/A": {
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

export const ScholarshipFAQData: IFAQScholarship[] = [
  {
    question:
      "What types of scholarships are available for international students in China?",
    answer: (
      <>
        China offers various scholarships such as:
        <p />
        <Typography component="ul">
          <Typography component="li">
            Fully funded scholarships like the China Scholarship Council (CSC).
          </Typography>
          <Typography component="li">
            Partial scholarships like Provincial Scholarships (one-time
            payment).
          </Typography>
          <Typography component="li">
            University Freshman Scholarships, which cover first-year tuition
            only. To explore more, visit our blog on CSC Scholarships or
            calculate your eligibility using{" "}
            <Link
              href="/wisescore"
              style={{
                color: "#FF6B26",
                textDecoration: "underline",
              }}
            >
              WiseScore
            </Link>
            .
          </Typography>
        </Typography>
      </>
    ),
  },
  {
    question: "Who is eligible for the CSC Scholarship?",
    answer: (
      <>
        The CSC Scholarship is open to students with excellent academic records,
        leadership potential, and recommendations. Use{" "}
        <StyledLink href="/wisescore">WiseScore</StyledLink> to assess your
        eligibility instantly.
      </>
    ),
  },
  {
    question:
      "What happens if my academic performance drops during the scholarship period?",
    answer:
      "Scholarships have strict academic requirements. Poor performance can lead to warnings or termination of the scholarship.",
  },
  {
    question: "Are University Freshman Scholarships open to all programs?",
    answer: (
      <>
        Most Freshman Scholarships are limited to specific programs or degrees,
        depending on the university. Use{" "}
        <StyledLink href="/wisescore">WiseScore</StyledLink> to find
        scholarships suitable for your program.
      </>
    ),
  },
  {
    question: "What is the Fly High Scholarship, and how can I apply?",
    answer: (
      <>
        The Fly High Scholarship is designed for academically strong
        international students. It may cover partial or full tuition fees. Learn
        more about this unique opportunity on our{" "}
        <StyledLink href="/blogs/nuaa-fly-high-scholarship-scholarship-with-stipend">
          Fly High Scholarship
        </StyledLink>{" "}
        blog and check your eligibility using{" "}
        <StyledLink href="/wisescore">WiseScore</StyledLink>.
      </>
    ),
  },
  {
    question: "How do I decide which scholarship is best for me?",
    answer: (
      <>
        Consider factors like coverage (full or partial), eligibility criteria,
        and application requirements. Use{" "}
        <StyledLink href="/wisescore">WiseScore</StyledLink> to get tailored
        recommendations based on your profile.
      </>
    ),
  },
  {
    question:
      "Are scholarships transferable if I change universities in China?",
    answer:
      "Scholarships are typically not transferable. If you transfer, you'll need to reapply for scholarships at the new university.",
  },
  {
    question: "What are the key deadlines for scholarships in China?",
    answer: (
      <>
        Application deadlines vary:
        <Typography component="ul">
          <Typography component="li">
            CSC Scholarships: December to April
          </Typography>
          <Typography component="li">
            Provincial Scholarships: University-specific
          </Typography>
          <Typography component="li">
            Freshman Scholarships: Admission deadlines
          </Typography>
        </Typography>
        Stay updated through our scholarship page and calculate your timeline
        with <StyledLink href="/wisescore">WiseScore</StyledLink>.
      </>
    ),
  },
  {
    question: "Why should I apply for scholarships through WiseAdmit?",
    answer: (
      <>
        WiseAdmit simplifies the process with tools like{" "}
        <StyledLink href="/wisescore">WiseScore</StyledLink>, expert blogs, and
        a team ready to assist. Start your scholarship journey with us{" "}
        <StyledLink href="/wisescore">here</StyledLink>.
      </>
    ),
  },
  {
    question: "Do scholarships cover living expenses in China?",
    answer: (
      <>
        Fully funded scholarships like CSC cover living expenses, but partial
        scholarships like Provincial or Freshman Scholarships may not. Get a
        detailed comparison on our scholarship page.
      </>
    ),
  },
  {
    question: "Why should I use WiseScore to check my scholarship eligibility?",
    answer: (
      <>
        WiseScore provides a quick and reliable way to assess your eligibility
        for various scholarships, including CSC, Provincial, and University
        Freshman Scholarships. Start your journey with{" "}
        <StyledLink href="/wisescore">WiseScore</StyledLink> to ensure you don’t
        miss out on valuable opportunities.
      </>
    ),
  },
  {
    question: "What is the China Scholarship Council (CSC) Scholarship?",
    answer: (
      <>
        The CSC Scholarship is a fully funded scholarship covering tuition,
        accommodation, and a monthly stipend. Learn more in detail about the
        application process on our{" "}
        <StyledLink href="/blogs/csc-scholarship-2024-the-guide">
          CSC Scholarships
        </StyledLink>{" "}
        blog. You can also check your eligibility with{" "}
        <StyledLink href="/wisescore">WiseScore</StyledLink>.
      </>
    ),
  },
  {
    question: "What are Provincial Scholarships?",
    answer: (
      <>
        These are partial scholarships funded by provincial governments,
        offering a one-time payment to assist with your expenses. Discover how
        to apply and increase your chances on our scholarship page or check your
        eligibility on <StyledLink href="/wisescore">WiseScore</StyledLink>.
      </>
    ),
  },
];

export const getScholarshipTypeStyle = (tag: ITag) => {
  // if (!type) return scholarshipStyles["NOTHING"];
  const formattedType = tag.name.toUpperCase();
  return scholarshipStyles[formattedType];
};

export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};
