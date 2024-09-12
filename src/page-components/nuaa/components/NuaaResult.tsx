"use client";
import { GreenTickSvg, RedCrossSvg } from "public/svg";
import { postWisescoreDataForNuaa } from "@/api/web/wisescore.action";
import { theme } from "@/common/muicustomtheme/theme";
import { filterStatus } from "@/common/utils/filterEligibilityStatus";
import Loader from "@/components/common/circular-loader/Loader";
import { IconWrapper } from "@/components/common/icon-wrapper/IconWrapper";
import ThinScoreGauge from "@/components/common/score-gauge/ThinScoreGauge";
import { useAppDispatch } from "@/global-states/hooks/hooks";
import { setEligibilityFormData } from "@/global-states/reducers/eligibilityReducer";
import useCostConverterMain from "@/hooks/costConverterMain";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ButtonWrapperNuaa } from "@/page-components/nuaa/styled-components/index";
import {
  NuaaResultWrapper,
  WhyTrustUs,
} from "@/page-components/nuaa/components";

type Props = {
  title: string;
  url: string;
  resultImage: string;
  color?: string;
};

const NuaaResult = ({ title, url, resultImage, color }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const getConvertedCosts = useCostConverterMain();
  const [university, setUniversity] = useState<any>({});
  const [score, setScore] = useState<number>(0);
  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => postWisescoreDataForNuaa(email),
    onSuccess: (data: any) => {
      setUniversity(data?.university ?? {});
      setScore(data?.score ?? 0);
    },
    onError: (err: any) => {
      localStorage.removeItem("email");
    },
  });
  useEffect(() => {
    dispatch(setEligibilityFormData(""));
    mutate(localStorage.getItem("email") || "");
  }, []);
  // const score = data.score ?? 0;

  if (isPending)
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        width="100%"
        height="100vh"
      >
        <Loader />
      </Stack>
    );

  const statuses = filterStatus(score);

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        // mt: -20,
        zIndex: 100,
        overflow: 'hidden'
      }}
    >
      <Box sx={{ backgroundImage: `url(${resultImage})` }}>
        {/* <Grid container>
          <Grid bgcolor="red" mt={8} xs={12} lg={12} item> */}
        <Stack
          pt={8}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Stack pt={10} pb={7} mb="32px">
            <ThinScoreGauge
              boxSize={isMobile ? 140 : 200}
              color="#ffffff"
              type="orange"
              value={score}
              method="nuaa"
            />
          </Stack>
          <Typography
            mb={{ xs: 2, lg: 4 }}
            // variant="h3"
            fontFamily="HankenGroteskExtraBold"
            fontSize={{ xs: "22px", lg: "40px" }}
            sx={{
              color: "#ffffff",
            }}
            textAlign={{ xs: "center", sm: "center", lg: "center" }}
          >
            Your NUAA Score is {Math.ceil(score)}%
          </Typography>
          <Stack
            // bgcolor="green"
            direction={{ md: "row", xs: "column" }}
            alignItems={{ md: "center" }}
            justifyContent={{
              lg: "flex-start",
              md: "flex-start",
              sm: "flex-start",
              xs: "flex-start",
            }}
            spacing={{ lg: 4, md: 2, sm: 1 }}
            mb={6.2}
          >
            {statuses &&
              statuses.map((e, i) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  gap={1}
                >
                  <IconWrapper>
                    {e.type === "positive" ? <GreenTickSvg /> : <RedCrossSvg />}
                  </IconWrapper>

                  <Typography
                    fontFamily="HankenGroteskRegular"
                    fontSize="20px"
                    lineHeight="40px"
                    letterSpacing="-0.22px"
                    sx={{
                      color: "#E5F2FF",
                    }}
                  >
                    {e.text}
                  </Typography>
                </Stack>
              ))}
          </Stack>
        </Stack>

        {/* </Grid>
        </Grid> */}
      </Box>
      <Box component={Container}>
        <Stack
          sx={{
            mt: "48px",
            mb: "32px",
          }}
          width="100%"
          height={{ lg: "365px", md: "365px", sm: "300px", xs: "200px" }}
          gap="24px"
          direction={{ lg: "row", md: "row", sm: "column", xs: "column" }}
          position="relative"
        >
          <Box
            // position="absolute"
            height="100%"
            width="70%"
            borderRadius="12px"
            display={{ lg: "flex", md: "flex", sm: "none", xs: "none" }}
            sx={{
              // opacity: '0.8',
              background: `linear-gradient(91deg, rgba(0, 0, 0, 0.20) 61.3%, rgba(0, 0, 0, 0.00) 89.57%), linear-gradient(0deg, rgba(0, 0, 0, 0.61) -12.47%, rgba(0, 0, 0, 0.61) -12.46%, rgba(0, 0, 0, 0.61) 10.12%, rgba(0, 0, 0, 0.61) 30.17%, rgba(0, 0, 0, 0.61) 53.56%, rgba(0, 0, 0, 0.21) 100%), url(${
                process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY
              }/${
                university?.cover_key ?? ""
              }), lightgray 0px -111.445px / 100% 191.751% no-repeat`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100%",
            }}
          />
          <Box
            position="absolute"
            zIndex={1111}
            bottom="0"
            display={{ lg: "flex", md: "flex", sm: "none", xs: "none" }}
            p={{ lg: "48px", md: "48px", sm: "30px", xs: "20px" }}
            color="white"
            flexDirection="column"
          >
            <Typography
              fontSize="32px"
              fontFamily="HankenGroteskExtraBold"
              lineHeight="150%" /* 48px */
              letter-spacing="-0.64px"
            >
              NUAA programs shortlisted for you
            </Typography>
            <Typography
              fontSize="16px"
              fontFamily="HankenGroteskRegular"
              color="rgba(255, 255, 255, 0.75)"
            >
              Please check your best fitted programs based on your NUAA score
              below.
            </Typography>
          </Box>
          <Box
            height="100%"
            width={{ lg: "30%", md: "30%", xs: "100%", sm: "100%" }}
            borderRadius="8px"
            bgcolor="var(--Complimentary-50, #EAF3FF)"
            display="flex"
            flexDirection="column"
            gap="32px"
            justifyContent="center"
            alignItems="center"
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Typography
                color="var(--text-day-heading, #201C1A)"
                textAlign="center"
                fontSize={{ lg: "28px", md: "24px", sm: "18px", xs: "18px" }}
                fontStyle="normal"
                fontFamily="HankenGroteskExtraBold"
                lineHeight="150%"
                letterSpacing="-0.56px"
              >
                Do you want to re-check NUAA Score?
              </Typography>
            </Box>
            <Box>
              <ButtonWrapperNuaa
                fontSize="14px"
                color="#00509F"
                border="1px solid #A0A0A0;"
                padding="12px 32px"
                onClick={() => router.push("/nuaa/nuaa-score")}
              >
                <Typography fontSize="14px" fontFamily="HankenGroteskSemiBold">
                  Recheck here
                </Typography>
              </ButtonWrapperNuaa>
            </Box>
          </Box>
        </Stack>
        <Box
          mb="20px"
          display="flex"
          justifyContent="space-between"
          alignItems={{
            lg: "center",
            md: "row",
            sm: "flex-start",
            xs: "flex-start",
          }}
          flexDirection={{ lg: "row", sm: "column", xs: "column", md: "row" }}
          mt={2}
        >
          <Typography
            color="#201C1A"
            fontStyle="normal"
            fontSize="18px"
            fontFamily="HankenGroteskExtraBold"
            lineHeight="27px"
            // letterSpacing="-0.64px"
            // mb="12px"
          >
            Nanjing University of Aeronautics and Astronautics
          </Typography>
          <Typography
            fontSize="18px"
            color={{
              lg: "rgba(32, 28, 26, 0.90)",
              xs: "rgba(32, 28, 26, 0.90)",
            }}
            fontStyle="normal"
            fontFamily="HankenGroteskExtraBold"
            lineHeight="25.6px"
          >
            Application fee:{" "}
            <Typography
              fontSize="18px"
              color="#1A4D2E"
              // fontStyle="normal"
              fontFamily="HankenGroteskExtraBold"
              lineHeight="25.6px"
              letterSpacing="-0.36px"
            >
              {/* ${(university?.detail?.fees['Application Fee'])} */}
              {
                getConvertedCosts(
                  university?.detail?.fees["Application Fee"],
                  university.base_currency
                ).formattedValue
              }
            </Typography>
          </Typography>
        </Box>
        <NuaaResultWrapper
          programs={university.programs ?? []}
          wisescore={Math.floor(score)}
          foundation={university?.foundation}
        />
        <Box my="60px">
          <WhyTrustUs />
        </Box>
        <Grid xs={12} lg={4} item position="relative">
          <Stack
            padding="78px 64px"
            sx={{
              backgroundColor: "#ECEBF3",
              // padding: '32px 34px',
              borderRadius: "8px",
            }}
          >
            <Typography
              fontStyle="normal"
              fontSize="32px"
              fontFamily="HankenGroteskExtraBold"
              color="#1A1B20"
              variant="h3"
            >
              Want to proceed with <br /> the application?
            </Typography>
            <Box
              gap="16px"
              mt="45px"
              display="flex"
              flexDirection={{
                lg: "row",
                xs: "column",
              }}
            >
              <ButtonWrapperNuaa
                fontSize="14px"
                color="#00509F"
                border="1px solid #00509F"
                padding="12px 32px"
                onClick={() => window.open("https:cie.nuaa.edu.cn/")}
              >
                <Typography fontSize="14px" fontFamily="HankenGroteskSemiBold">
                  Go back to Nuaa
                </Typography>
              </ButtonWrapperNuaa>
              <ButtonWrapperNuaa
                onClick={() => router.push("/applynow?signUp=true")}
                fontSize="14px"
                bgcolor="#00509F"
                color="#ffff"
              >
                Apply with WiseAdmit
              </ButtonWrapperNuaa>
            </Box>
          </Stack>
          <Box display={{ lg: "flex", xs: "none",  }}>
            <img
              style={{
                width: 285,
                height: 328,
                borderRadius: "12px",
                position: "absolute",
                top: 25,
                right: 30,
              }}
              alt="Nuaa University"
              src="/images/universities/nuaa-result-celebration.webp"
            />
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default NuaaResult;
