import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { HotIcon, TickIcon } from "@/page-components/nuaa/svg";
import { NuaaProgramCard } from "@/page-components/nuaa/components";

type Props = {
  programs: any;
  wisescore: number;
  foundation?: any;
};

const NuaaResultWrapper = ({ programs, wisescore, foundation }: Props) => {
  return (
    <Box width="100%">
      <Box
        display="flex"
        gap="10px"
        flexDirection={{ lg: "row", md: "row", sm: "row", xs: "column" }}
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap="10px"
          pr={2}
          borderRight={{
            lg: "2px solid #D3D7D9",
            md: "2px solid #D3D7D9",
            sm: "2px solid #D3D7D9",
            xs: "none",
          }}
        >
          <Typography
            color="#201C1A"
            fontSize="24px"
            fontStyle="normal"
            fontFamily="HankenGroteskExtraBold"
            variant="h4"
            lineHeight="150%"
            letterSpacing="-0.48px"
          >
            Popular Programs
          </Typography>
          <Box
            display={{ lg: "inline-flex", md: "none", sm: "none", xs: "none" }}
          >
            <HotIcon />
          </Box>
        </Box>
        <Box pl={{ lg: 2, md: 2, sm: 2, xs: 0 }}>
          <Box
            borderRadius="32px"
            bgcolor="#E8F3E9"
            p={2}
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap="8px"
            height="30px"
          >
            <TickIcon />
            <Typography
              fontSize="14px"
              fontStyle="normal"
              fontFamily="HankenGroteskRegular"
              lineHeight="160%"
              color="#2D8C37"
            >
              Excellent Match
            </Typography>
          </Box>
        </Box>
      </Box>

      <Stack mt={4} gap={2}>
        {programs && programs.length > 0 ? (
          programs.map((program: any) => (
            <NuaaProgramCard
              foundation={foundation}
              wisescore={wisescore}
              program={program}
            />
          ))
        ) : (
          <Typography>No program found</Typography>
        )}
      </Stack>
    </Box>
  );
};

export default NuaaResultWrapper;
