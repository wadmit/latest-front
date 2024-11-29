"use client";
import React, { useEffect, useState } from "react";
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
  const [hasWiseScore, setHasWiseScore] = useState(false);
  useEffect(() => {
    const wisescore = localStorage.getItem("wisescore");
    setHasWiseScore(!!wisescore);
  }, []);
  return (
    <>
      <ScholarshipHero />
      {!hasWiseScore && <ScholarshipCuriosity />}
      <AvailableScholarship
        scholarships={scholarships}
        hasWiseScore={hasWiseScore}
      />
      <ScholarshipBlogs blogs={blogs} />
      <ScholarshipVideoTestimonials />
      <ScholarshipTestimonials />
    </>
  );
};

export default ScholarshipHome;
