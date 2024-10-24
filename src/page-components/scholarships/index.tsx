import React from "react";
import ScholarshipHero from "./components/ScholarshipHero";
import ScholarshipCuriosity from "./components/ScholarshipCuriosity";
import ScholarshipVideoTestimonials from "./components/ScholarshipVideoTestimonials";
import ScholarshipTestimonials from "./components/ScholarshipTestimonials";
import ScholarshipBlogs from "./components/ScholarshipBlogs";
import { IBlogResponse } from "@/types/utils";
import AvailableScholarship from "./components/AvailableScholarship";

type Props = {
  blogs: IBlogResponse;
};

const ScholarshipHome = ({ blogs }: Props) => {
  return (
    <>
      <ScholarshipHero />
      <ScholarshipCuriosity />
      <AvailableScholarship />
      <ScholarshipBlogs blogs={blogs} />
      <ScholarshipVideoTestimonials />
      <ScholarshipTestimonials />
    </>
  );
};

export default ScholarshipHome;
