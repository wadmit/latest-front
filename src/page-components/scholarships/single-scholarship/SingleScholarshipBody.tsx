"use client";
import { RootContainer } from "@/components/common";
import React, { createRef, MutableRefObject } from "react";
import SingleScholarshipNav from "./SingleScholarshipNav";
import { navScholarshipMenu } from "../utils/provider";
import SingleScholarshipAbout from "./SingleScholarshipAbout";
import { IScholarshipResponse } from "@/types/utils";
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

type Props = {
  scholarship: IScholarshipResponse;
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
            details={scholarship?.scholarship?.scholarshipDescription}
            ref={sectionRefs.About}
          />
          <SingleScholarshipBenefits
            benefits={scholarship?.scholarship?.scholarshipBenefits}
            ref={sectionRefs.Benefits}
          />
          <SingleScholarshipCuriosity />
          <SingleScholarshipCategory
            categories={scholarship?.scholarship?.scholarshipCategories}
            ref={sectionRefs.Category}
          />
          <SingleScholarshipEligibilityCriteria
            criteria={scholarship?.scholarship?.eligibilityCriteria}
            language={scholarship?.scholarship?.languageRequirements}
            qualification={scholarship?.scholarship?.eligibility_qualifications}
            ref={sectionRefs.Criteria}
          />
          <SingleScholarshipApplicationProcess
            applicationProcess={scholarship?.scholarship?.applicationProcess}
            ref={sectionRefs.Process}
          />
          <SingleScholarshipUniversity />
          <SingleScholarshipFAQ
            faqs={scholarship?.scholarship?.faqs}
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
