"use client";
import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { RootContainer } from "@/components/common";
import { theme } from "@/common/muicustomtheme/theme";
import ServiceSectionCard from "@/page-components/students/components/ServiceSectionCard";
import {
  PillButton,
  postadmission,
  preadmission,
} from "@/page-components/students/utils/provider";

function ServiceSection() {
  const [selected, setSelected] = useState(1);
  const handleClick = (index: number) => {
    setSelected(index);
  };
  return (
    <RootContainer mt="7.5rem" bgcolor="rgba(246, 241, 238, 1)" py="3.125rem">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography
          component={"h3"}
          fontFamily="HankenGroteskExtraBold"
          fontSize={{ lg: "32px", md: "32px", sm: "30px", xs: "24px" }}
          lineHeight={{ lg: "41.6px", md: "41.6px", sm: "38px", xs: "31.2px" }}
          letterSpacing="-2%"
          color="rgba(32, 28, 26, 1)"
        >
          Our services
        </Typography>
      </Box>
      <Stack
        direction={{ lg: "row", xs: "row", md: "row", sm: "row" }}
        alignItems="center"
        justifyContent="center"
        sx={{
          [theme.breakpoints.up("md")]: {
            // border: 1,
            borderColor: "primary.main",
            borderRadius: "9.375rem",
          },
          width: "100%",
          maxWidth: "28.125rem",
          mx: "auto",
          p: ".4375rem",
          mt: "1.25rem",
          mb: "3.125rem",
        }}
      >
        <PillButton
          item={1}
          selected={selected}
          onClick={() => handleClick(1)}
        />

        <PillButton
          item={2}
          selected={selected}
          onClick={() => handleClick(2)}
        />
      </Stack>
      <Box
        sx={{
          opacity: selected === 1 ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      >
        <Stack
          direction="row"
          gap="40px"
          justifyContent="center"
          flexWrap={{ xs: "wrap", md: "nowrap" }}
          width="100%"
          display={selected === 1 ? "flex" : "none"}
        >
          {preadmission.map((item) => (
            <ServiceSectionCard
              key={`_${item.title}`}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </Stack>
      </Box>
      <Box
        sx={{
          opacity: selected === 2 ? 1 : 0,
          transition: "opacity 0.6s ease-in-out",
        }}
      >
        <Stack
          direction="row"
          gap="20px"
          mt="2.875rem"
          justifyContent="center"
          flexWrap={{ xs: "wrap", sm: "wrap", md: "nowrap", lg: "nowrap" }}
          display={selected === 2 ? "flex" : "none"}
        >
          {postadmission.map((item) => (
            <ServiceSectionCard
              title={item.title}
              icon={item.icon}
              key={`_${item.title}`}
            />
          ))}
        </Stack>
      </Box>
    </RootContainer>
  );
}

export default ServiceSection;
