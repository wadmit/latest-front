"use client";
import { theme } from "@/common/muicustomtheme/theme";
import { RootContainer } from "@/components/common";
import TitleComponent from "@/components/common/shareble/TitleComponent";
import { Box, Stack, useMediaQuery } from "@mui/material";
import Image from "next/image";

function CostCalculatorHero() {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <RootContainer mt={{ xl: "6.8125rem", xs: 6 }} mb="6.8125rem">
      <Stack
        direction="row"
        alignItems={{ lg: "center", xs: "flex-start" }}
        position="relative"
        justifyContent="space-between"
        minHeight="26.25rem"
		sx={{
			display:"flex",
			flexDirection: isMobile ? "column" : "row",
			alignItems: isMobile ? "center" : "flex-start",
		}}
      >
        {/* title section */}

        <Box maxWidth={{ md: "37.5rem", xl: "51.8125rem" }}>
          <TitleComponent
            title={
              <>
                Annual Cost
                <br />
                Calculator - For Students
              </>
            }
            desc={
              <>
                Our Annual Cost Calculator is a tool that simplifies the
                budgeting
                <br />
                process for students. Provide the required information to
                receive <br /> an estimate of the annual cost to study in China.
              </>
            }
          />
        </Box>
        <Image
          src="/images/costcalculator/hero.webp"
          alt="img-Homepage"
          width={1000}
          height={362}
          style={{
            width: isMobile ? 380 : 480,
            height: isMobile ? 300 : 362,
			marginTop: isMobile ? 20 : 0
          }}
        />
      </Stack>
    </RootContainer>
  );
}

export default CostCalculatorHero;
