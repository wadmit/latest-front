import React, { forwardRef, useContext, useState } from "react";
import { Divider, Typography, Box } from "@mui/material";
import UniversityDetailContext from "@/context/university-detail-context";
import useCostConverterMain from "@/hooks/costConverterMain";
import type { IUniversity } from "@/types/university";
import type { IProgram } from "@/types/program";
import { UniversityProgramCard } from "@/page-components/universities/components";
import { ButtonWrapper } from "@/components/common";

const UniversityCourses = forwardRef((unknown, ref) => {
  const university = useContext(UniversityDetailContext) as IUniversity & {
    programs: IProgram[];
  };
  const [toShow, setToShow] = useState(2);
  const getConvertedCosts = useCostConverterMain();

  const handleViewMoreOrLess = () => {
    if (toShow === university.programs.length) {
      setToShow(2);
    } else {
      setToShow(university.programs.length);
    }
  };
  return (
    <Box
      ref={ref}
      border="1px solid #E9E9E9"
      borderRadius="8px"
      id="courses"
      bgcolor="white"
      p={3}
      display="flex"
      flexDirection="column"
      gap="25px"
    >
      <Box
        padding="/32px 24px 32px 32px"
        borderRadius="12px"
        // border="1px solid var(--Scrim-Overlay, #E9E9E9)"
        bgcolor="#ffffffff"
        ref={ref}
        id="scholarships"
      >
        <Typography
          fontSize="24px"
          fontFamily="HankenGroteskExtraBold"
          color="#201C1A"
        >
          Courses
        </Typography>
        <Divider />
        {university.programs &&
          university.programs.length > 0 &&
          university.programs
            .slice(0, toShow)
            .map((program) => (
              <UniversityProgramCard
                key={program.name}
                program={program}
                getConvertedCosts={getConvertedCosts}
              />
            ))}

        {university.programs && university.programs.length > 2 && (
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ButtonWrapper
              onClick={handleViewMoreOrLess}
              sx={{
                bgcolor: "white",
                color: "#FF6B26",
                border: "1px solid #A3A3A9",
                borderRadius: "45px",
                boxShadow: "none",
                marginTop: "32px",
                "&:hover": {
                  bgcolor: "white",
                },
              }}
            >
              {toShow === university.programs.length
                ? "View Less"
                : "View All Courses"}
            </ButtonWrapper>
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default UniversityCourses;
