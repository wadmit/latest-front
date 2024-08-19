import {
  ProgramUniBodyWrapper,
  ProgramUniChildrenWrapper,
  StickWrapper,
} from "@/components/common";
import CalculateProbability from "@/components/common/program-university-components/CalculateProbability";
import FAQ from "@/components/common/program-university-components/FAQ";
import HelpMeDecide from "@/components/common/program-university-components/HelpMeDecide";
import ProgramUniAbout from "@/components/common/program-university-components/ProgramUniAbout";
import ProgramUniImgVideos from "@/components/common/program-university-components/ProgramUniImgVideos";
import ProgramUniNav from "@/components/common/program-university-components/ProgramUniMenu";
import SimilarRecommendation from "@/components/common/program-university-components/SimilarRecommendation";
import UniversityDetailContext from "@/context/university-detail-context";
import useCostConverterMain from "@/hooks/costConverterMain";
import {
  UniversityContact,
  UniversityAdmissionCard,
  UniversityCost,
  UniversityScholarships,
  UniversityCourses,
} from "@/page-components/universities/components";
import type { IRecommendation } from "@/types/utils";
import { sanitizeRecommendation } from "@/utils/sanitize-recommendation";
import { Box } from "@mui/material";
import React, { createRef, MutableRefObject, useContext } from "react";
import { navUniversityMenu } from "@/page-components/universities/utils/provider";

function UniversityBody() {
  const sectionRefs: Record<
    string,
    React.MutableRefObject<HTMLElement>
  > = navUniversityMenu.reduce((acc, { name }) => {
    acc[name] = createRef() as MutableRefObject<HTMLElement>;
    return acc;
  }, {} as Record<string, React.MutableRefObject<HTMLElement>>);
  const getConvertedCosts = useCostConverterMain();
  const university = useContext(UniversityDetailContext);
  const recommendation: IRecommendation[] = sanitizeRecommendation(
    university,
    "universities"
  );

  return (
    <ProgramUniBodyWrapper>
      <ProgramUniNav navMenu={navUniversityMenu} />

      <ProgramUniChildrenWrapper>
        <Box
          display="flex"
          flexDirection="column"
          gap="40px"
          flex={{ lg: 0.7, md: 1 }}
          width={{ lg: "65%", md: "65%", sm: "100%", xs: "100%" }}
        >
          <ProgramUniAbout
            details={university.desc}
            reasons={university?.detail?.reasons}
            type="university"
            ref={sectionRefs.About}
          />
          <CalculateProbability />
          <UniversityAdmissionCard getConvertedCosts={getConvertedCosts} />
          <UniversityCost />
          <UniversityScholarships
            scholarships={university.detail.scholarships}
            ref={sectionRefs.Scholarships}
          />
          <UniversityCourses />
          <FAQ country={university?.country?.name ?? ""} />
        </Box>
        <StickWrapper>
          <ProgramUniImgVideos images={university?.detail?.images_key ?? []} />
          <HelpMeDecide />
          <UniversityContact />
          <SimilarRecommendation
            type="universities"
            recommendation={recommendation}
          />
        </StickWrapper>
      </ProgramUniChildrenWrapper>
    </ProgramUniBodyWrapper>
  );
}

export default UniversityBody;
