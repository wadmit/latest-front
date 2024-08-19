import ProgramsDetailContext from "@/context/program-detail-context";
import useCostConverterMain from "@/hooks/costConverterMain";
import { Box } from "@mui/material";
import { createRef, MutableRefObject, useContext } from "react";

import {
  ProgramAdmissionCard,
  PreRequties,
  AvailableScholarship,
  ProgramRanking,
  ProgramCost,
} from "@/page-components/programs/components";

import { navProgramMenu } from "@/page-components/programs/utils/provider";
import type { IRecommendation } from "@/types/utils";
import { sanitizeRecommendation } from "@/utils/sanitize-recommendation";
import {
  ProgramUniBodyWrapper,
  ProgramUniChildrenWrapper,
  StickWrapper,
} from "@/components/common";
import ProgramUniNav from "@/components/common/program-university-components/ProgramUniMenu";
import ProgramUniAbout from "@/components/common/program-university-components/ProgramUniAbout";
import HelpMeDecide from "@/components/common/program-university-components/HelpMeDecide";
import SimilarRecommendation from "@/components/common/program-university-components/SimilarRecommendation";
import CalculateProbability from "@/components/common/program-university-components/CalculateProbability";
import FAQ from "@/components/common/program-university-components/FAQ";

function ProgramBody() {
  const sectionRefs: Record<
    string,
    React.MutableRefObject<HTMLElement>
  > = navProgramMenu.reduce((acc, { name }) => {
    acc[name] = createRef() as MutableRefObject<HTMLElement>;
    return acc;
  }, {} as Record<string, React.MutableRefObject<HTMLElement>>);

  const getConvertedCosts = useCostConverterMain();
  const programs = useContext(ProgramsDetailContext);
  const recommendation: IRecommendation[] = sanitizeRecommendation(
    programs,
    "programs"
  );

  return (
    <ProgramUniBodyWrapper>
      <ProgramUniNav navMenu={navProgramMenu} />
      <ProgramUniChildrenWrapper>
        <Box
          display="flex"
          flexDirection="column"
          gap="40px"
          flex={{ lg: 0.6, md: 1 }}
          width={{ lg: "65%", md: "65%", sm: "100%", xs: "100%" }}
        >
          <ProgramUniAbout
            type="program"
            details={programs.desc}
            reasons={programs.detail?.reasons ?? []}
            ref={sectionRefs.About}
          />
          <CalculateProbability />

          <ProgramCost
            ref={sectionRefs.Costs}
            getConvertedCosts={getConvertedCosts}
          />
          <ProgramRanking />
          <AvailableScholarship
            scholarships={programs?.detail?.scholarships as any}
            ref={sectionRefs.Scholarships}
          />
          <PreRequties key={"pre"} ref={sectionRefs["Pre requisties"]} />
          <FAQ country={(programs as any)?.university?.country?.name ?? ""} />
        </Box>
        <StickWrapper>
          <HelpMeDecide />
          <ProgramAdmissionCard
            ref={sectionRefs.Admissions}
            getConvertedCosts={getConvertedCosts}
          />
          <SimilarRecommendation
            type="programs"
            recommendation={recommendation}
          />
        </StickWrapper>
      </ProgramUniChildrenWrapper>
    </ProgramUniBodyWrapper>
  );
}

export default ProgramBody;
