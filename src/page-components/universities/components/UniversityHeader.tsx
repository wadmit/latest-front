import React, { useContext } from "react";
import { Divider, Typography, Box, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WiseAdmitDefault } from "$/svg";
import UniversityDetailContext from "@/context/university-detail-context";
import applicationConfig from "@/config";
import type { IUniversity } from "@/types/university";
import type { IProgram, IProgramRanking } from "@/types/program";
import {
  ProgramOffered,
  RankingIcon,
  UniversityIcon,
} from "@/page-components/universities/svg";

function UniversityHeader() {
  const router = useRouter();
  const university = useContext(UniversityDetailContext) as IUniversity & {
    programs: IProgram[];
  };
  const imageUrl = applicationConfig.distributionKey;

  const extractRankings = (uni: IUniversity, key: keyof IProgramRanking) => {
    const rankings = uni?.detail?.rankings;

    if (!rankings || !key) {
      return "";
    }

    const extractedRankings = rankings.reduce((acc, rank) => {
      if (rank.hasOwnProperty(key)) {
        return { ...acc, [key]: rank[key] };
      }
      return acc;
    }, {});

    if (Object.keys(extractedRankings).length > 0) {
      return extractedRankings[key];
    }
    return "";
  };

  return (
    <Box>
      <Box
        height={{ lg: "373px", md: "373px", sm: "200px", xs: "200px" }}
        width="100%"
        position="relative"
      >
        {university.cover_key ? (
          <Image
            width={1000000}
            height={1}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt={university.name}
            src={`${imageUrl}/${university.cover_key}`}
          />
        ) : (
          <WiseAdmitDefault />
        )}

        <Box
          sx={{
            padding: "10px",

            backgroundColor: "white",
          }}
          width={{ lg: "118px", md: "118px", sm: "118px", xs: "90px" }}
          height={{ lg: "118px", md: "118px", sm: "118px", xs: "90px" }}
          bottom="-50px"
          left="10px"
          zIndex={100}
          position="absolute"
          borderRadius="12px"
          boxShadow="0px 12.2px 30.5px 0px rgba(0, 0, 0, 0.06)"
        >
          {university.logo_key ? (
            <Image
              src={`${imageUrl}/${university?.logo_key}`}
              width={100000}
              height={1}
              style={{
                width: "100%",
                height: "100%",
              }}
              alt={`${university.name} logo`}
            />
          ) : (
            <WiseAdmitDefault />
          )}
        </Box>
      </Box>
      {/* for image and program information */}
      <Box
        flexDirection={{ lg: "row", md: "column", sm: "column", xs: "column" }}
        justifyContent="space-between"
        display="flex"
        pt="60px"
      >
        <Stack flex={0.5}>
          <Typography
            variant="h3"
            color="#201C1A"
            fontSize={{ lg: "32px", md: "32px", sm: "24px", xs: "18px" }}
            fontFamily="HankenGroteskExtraBold"
            lineHeight="160%"
          >
            {university?.name}
          </Typography>
          <Typography
            color="rgba(32, 28, 26, 0.90)"
            fontSize="18px"
            lineHeight="150%"
          >
            {university?.location}
          </Typography>
        </Stack>

        <Box
          flex={0.5}
          display="flex"
          flexDirection={{
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          }}
          justifyContent="space-between"
          alignItems={{
            lg: "center",
            md: "center",
            sm: "flex-start",
            xs: "flex-start",
          }}
          padding="24px"
          mt={{ lg: 0, md: "20px", xs: "20px", sm: "20px" }}
          gap={{ lg: "24px", md: "24px", sm: "12px", xs: "12px" }}
          borderRadius="8px"
          bgcolor="var(--States-Info-light, #E5F2FF)"
        >
          <Box display="flex" alignItems="center" gap="12px">
            <RankingIcon />
            <Box display="flex" flexDirection="column">
              <Typography variant="h3" fontSize="clamp(16px , 28px , 28px)">
                {extractRankings(university, "US NEWS Rankings")}
                {/* {university?.detail.rankings. ?? 'NA'} */}
              </Typography>
              <Typography color="rgba(32, 28, 26, 0.55)" variant="body2">
                US Ranking
              </Typography>
            </Box>
          </Box>
          <Divider orientation="vertical" />
          <Box display="flex" alignItems="center" gap="12px">
            <ProgramOffered />
            <Box display="flex" flexDirection="column">
              <Typography variant="h3" fontSize="clamp(16px , 28px , 28px)">
                {university.programs.length}
              </Typography>
              <Typography color="rgba(32, 28, 26, 0.55)" variant="body2">
                Programs Offered
              </Typography>
            </Box>
          </Box>
          <Divider orientation="vertical" />
          <Box display="flex" alignItems="center" gap="12px">
            <UniversityIcon />
            <Box display="flex" flexDirection="column">
              <Typography variant="h3" fontSize="clamp(16px , 28px , 28px)">
                {university.detail.total_international_stds}
              </Typography>
              <Typography color="rgba(32, 28, 26, 0.55)" variant="body2">
                International students
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default UniversityHeader;
