"use client";

import React, { useContext } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProgramsDetailContext from "@/context/program-detail-context";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import Cookies from "js-cookie";
import applicationConfig from "@/config";
import { WiseAdmitDefault } from "$/svg";
import {
  BookIcon,
  CourseCreditIcon,
  GetDuration,
  RightArrow,
} from "@/page-components/programs/svg";

function ProgramHeader({ isFoundation }: { isFoundation?: boolean }) {
  const program = useContext(ProgramsDetailContext);
  const router = useRouter();
  const imageUrl = applicationConfig.distributionKey;

  return (
    <Box>
      <Box
        height={{ lg: "373px", md: "373px", sm: "200px", xs: "200px" }}
        width="100%"
        position="relative"
      >
        {!program.cover_key ? (
          <WiseAdmitDefault />
        ) : (
          <Image
            width={1000000}
            height={1}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            alt={program.name}
            src={`${imageUrl}/${program.cover_key}`}
          />
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
          zIndex={10}
          position="absolute"
          borderRadius="12px"
          boxShadow="0px 12.2px 30.5px 0px rgba(0, 0, 0, 0.06)"
        >
          {program?.university?.logo_key ? (
            <Image
              style={{
                width: "100%",
                height: "100%",
              }}
              src={
                program?.university?.logo_key
                  ? `${imageUrl}/${program?.university?.logo_key}`
                  : ""
              }
              width={100000}
              height={1}
              alt={`${program?.university} logo`}
            />
          ) : (
            <WiseAdmitDefault />
          )}
        </Box>
        {!isFoundation && (
          <Box
            bottom="32px"
            bgcolor="#FF6B26"
            zIndex={10}
            position="absolute"
            right={{ lg: "32px", xs: "10px" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
            padding="13px 22px"
            height="42px"
            fontSize="14px"
            fontFamily="HankenGroteskSemiBold"
            gap="6px"
            color="white"
            borderRadius="40px"
            sx={{
              cursor: "pointer",
            }}
            onClick={() => {
              try {
                analytics.websiteButtonInteractions({
                  buttonName: "Start Application",
                  source: `Clicked on start application from program header of ${program?.name}`,
                  urlPath: window.location.href,
                  event_type: EAnalyticsEvents.START_APPLICATION_PROGRAM,
                  status: EAnalyticsStatus.SUCCESS,
                  redirectPath: "",
                });
                localStorage.setItem(
                  "Program",
                  JSON.stringify({ programId: program?.id })
                );
                if (Cookies.get("accessToken")) {
                  router.push("/dashboard");
                } else {
                  router.push("/applynow?signUp=true");
                }
              } catch (err) {
                analytics.trackEvent(EAnalyticsEvents.ERROR, {
                  source: "Start application from program header",
                  message: err,
                });
              }
            }}
          >
            Start Application <RightArrow />
          </Box>
        )}
      </Box>
      {/* for image and program information */}
      <Box
        flexDirection={{ lg: "row", md: "column", sm: "column", xs: "column" }}
        justifyContent="space-between"
        display="flex"
        pt="60px"
      >
        <Stack>
          <Typography
            variant="h3"
            color="#201C1A"
            fontSize={{ lg: "32px", md: "32px", sm: "24px", xs: "18px" }}
            fontFamily="HankenGroteskExtraBold"
            lineHeight="160%"
          >
            {program?.name}
          </Typography>
          <Typography
            color="rgba(255,107,38,1)"
            fontSize="18px"
            lineHeight="150%"
          >
            <Link href={`/universities/${program?.university?.slug}`}>
              {program?.university?.name}
            </Link>
          </Typography>
        </Stack>

        {!isFoundation && (
          <Box
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
              <GetDuration />
              <Box display="flex" flexDirection="column">
                <Typography variant="h3" fontSize="clamp(16px , 24px , 28px)">
                  {program?.detail?.program_duration
                    ? `${program?.detail?.program_duration} yrs`
                    : "N/A"}
                </Typography>
                <Typography color="rgba(32, 28, 26, 0.55)" variant="body2">
                  Program Duration
                </Typography>
              </Box>
            </Box>
            <Divider orientation="vertical" />
            <Box display="flex" alignItems="center" gap="12px">
              <BookIcon />
              <Box display="flex" flexDirection="column">
                <Typography variant="h3" fontSize="clamp(16px , 24px , 28px)">
                  {/* {program?.discipline?.name ?? "N/A"} */}
                  Discipline name
                </Typography>
                <Typography color="rgba(32, 28, 26, 0.55)" variant="body2">
                  Program Type
                </Typography>
              </Box>
            </Box>
            <Divider orientation="vertical" />
            <Box display="flex" alignItems="center" gap="12px">
              <CourseCreditIcon />
              <Box display="flex" flexDirection="column">
                <Typography variant="h3" fontSize="clamp(16px , 24px , 28px)">
                  English
                </Typography>
                <Typography color="rgba(32, 28, 26, 0.55)" variant="body2">
                  Language of Instruction
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ProgramHeader;
