"use client";
import { RootContainer } from "@/components/common";
import React, { createRef, MutableRefObject } from "react";
import SingleScholarshipNav from "./SingleScholarshipNav";
import { navScholarshipMenu, ScholarshipFAQData } from "../utils/provider";
import SingleScholarshipAbout from "./SingleScholarshipAbout";
import {
  SingleScholarshipChildrenWrapper,
  SingleScholarshipStickWrapper,
} from "../styled-components";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import SingleScholarshipEligibility from "./SingleScholarshipEligibility";
import SingleScholarshipApplySooner from "./SingleScholarshipApplySooner";
import SingleScholarshipBenefits from "./SingleScholarshipBenefits";
import SingleScholarshipCuriosity from "./SingleScholarshipCuriosity";
import SingleScholarshipUniversity from "./SingleScholarshipUniversity";
import SingleScholarshipCategory from "./SingleScholarshipCategory";
import SingleScholarshipEligibilityCriteria from "./SingleScholarshipEligibilityCriteria";
import SingleScholarshipApplicationProcess from "./SingleScholarshipApplicationProcess";
import SingleScholarshipFAQ from "./SingleScholarshipFAQ";
import { IScholarships } from "@/types/scholarship";

type Props = {
  scholarship: IScholarships;
};

const SingleScholarshipBody = ({ scholarship }: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const sectionRefs: Record<
    string,
    React.MutableRefObject<HTMLElement>
  > = navScholarshipMenu.reduce((acc, { name }) => {
    acc[name] = createRef() as MutableRefObject<HTMLElement>;
    return acc;
  }, {} as Record<string, React.MutableRefObject<HTMLElement>>);

  const Container = isMobile ? Box : RootContainer;

  const hasAcademicCriteria =
    Array.isArray(scholarship?.eligibilityCriteria?.academic) &&
    scholarship.eligibilityCriteria.academic.length > 0;

  const hasLanguageCriteria =
    Array.isArray(scholarship?.eligibilityCriteria?.language) &&
    scholarship.eligibilityCriteria.language.length > 0;

  const hasQualificationCriteria =
    Array.isArray(scholarship?.eligibilityCriteria?.qualification) &&
    scholarship.eligibilityCriteria.qualification.length > 0;

  const hasEligibilityCriteria =
    hasAcademicCriteria || hasLanguageCriteria || hasQualificationCriteria;

  return (
    <Container>
      <SingleScholarshipNav navMenu={navScholarshipMenu} />
      <SingleScholarshipChildrenWrapper>
        <Box
          display="flex"
          flexDirection="column"
          gap={{ lg: "40px", md: "40px", sm: "10px", xs: "10px" }}
          flex={{ lg: 0.7, md: 1 }}
          width={{ lg: "65%", md: "65%", sm: "100%", xs: "100%" }}
        >
          <SingleScholarshipAbout
            details={scholarship?.desc}
            ref={sectionRefs.About}
          />
          <SingleScholarshipBenefits
            benefits={scholarship?.benefits}
            ref={sectionRefs.Benefits}
          />
          <SingleScholarshipCuriosity />
          {scholarship?.categories && scholarship?.categories.length > 0 && (
            <SingleScholarshipCategory
              categories={scholarship.categories}
              ref={sectionRefs.Category}
            />
          )}
          {hasEligibilityCriteria && (
            <SingleScholarshipEligibilityCriteria
              criteria={scholarship?.eligibilityCriteria?.academic}
              language={scholarship?.eligibilityCriteria?.language}
              qualification={scholarship?.eligibilityCriteria?.qualification}
              ref={sectionRefs.Criteria}
            />
          )}
          <SingleScholarshipApplicationProcess
            applicationProcess={
              scholarship?.eligibilityCriteria?.applicationProcess
            }
            ref={sectionRefs.Process}
          />
          <SingleScholarshipUniversity />
          <SingleScholarshipFAQ
            faqs={ScholarshipFAQData}
            ref={sectionRefs.FAQ}
          />
        </Box>
        <SingleScholarshipStickWrapper>
          <SingleScholarshipEligibility />
          <SingleScholarshipApplySooner />
        </SingleScholarshipStickWrapper>
      </SingleScholarshipChildrenWrapper>
    </Container>
  );
};

export default SingleScholarshipBody;
