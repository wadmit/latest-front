import React from "react";
import ScholarshipHero from "./components/ScholarshipHero";
import ScholarshipCuriosity from "./components/ScholarshipCuriosity";
import ScholarshipVideoTestimonials from "./components/ScholarshipVideoTestimonials";
import ScholarshipTestimonials from "./components/ScholarshipTestimonials";
import ScholarshipBlogs from "./components/ScholarshipBlogs";
import { IBlogResponse, IScholarshipResponse } from "@/types/utils";
import AvailableScholarship from "./components/AvailableScholarship";

type Props = {
  blogs: IBlogResponse;
  scholarships: IScholarshipResponse;
};

const ScholarshipHome = ({ blogs, scholarships }: Props) => {
  return (
    <>
      <ScholarshipHero />
      <ScholarshipCuriosity />
      <AvailableScholarship scholarships={scholarships} />
      <ScholarshipBlogs blogs={blogs} />
      <ScholarshipVideoTestimonials />
      <ScholarshipTestimonials />
    </>
  );
};

export default ScholarshipHome;
