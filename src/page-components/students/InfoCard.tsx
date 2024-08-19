"use client";

import { RootContainer } from "@/components/common";
import { Stack } from "@mui/material";
import { featureData } from "@/page-components/students/utils/provider";
import Cards from "@/page-components/students/components/Card";

function InfoCard() {
  return (
    <RootContainer bgcolor="white" position="relative" zIndex={100}>
      <Stack
        direction={{ md: "row", xs: "column" }}
        justifyContent="space-between"
        alignItems={{ md: "center", xs: "flex-start" }}
        rowGap="20px"
        py={{ lg: "96px", md: "96px", sm: "48px", xs: "48px" }}
        component="ul"
        my="0"
        pl="0"
        sx={{
          listStyle: "none",
        }}
      >
        {featureData.map((item) => (
          <Cards item={item} key={`_${item.title}`} />
        ))}
      </Stack>
    </RootContainer>
  );
}

export default InfoCard;
