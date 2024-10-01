"use client";
import { theme } from "@/common/muicustomtheme/theme";
import Loader from "@/components/common/circular-loader/Loader";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import useCostConverterMain from "@/hooks/costConverterMain";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { WaitingScreen } from "./components/WaitingScreen";
import { filterStatus } from "@/common/utils/filterEligibilityStatus";
import { StyledContainerWrapper } from "@/components/common";
import ThinScoreGauge from "@/components/common/score-gauge/ThinScoreGauge";
import {
  DownArrowSmallSvg,
  DownArrowSvg,
  Exclaim,
  RedCrossWhiteSvg,
  RobotSvg,
  WhiteTickSvg,
} from "public/svg";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";
import ShortlistProgramContent from "@/context/program-sortlist";
import { Card } from "./components/card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApplications } from "@/api/web/applications.action";
import { CacheConfigKey } from "@/constants";
import { setUserApplications } from "@/global-states/reducers/applicationReducer";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import {
  getSubDisciplines,
  postWiseScoreData,
  submitWiseScore,
} from "@/api/web/wisescore.action";
import { IconWrapper } from "@/components/common/icon-wrapper/IconWrapper";

export default function SortedUniversitiesPageComponent() {
  const UniversityComponentRef = useRef<HTMLDivElement>(null);
  const getConvertedCosts = useCostConverterMain();
  // check if mobile
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isDataResolved, setIsDataResolved] = useState(false);
  const [isMedicalFromNepal, setIsMedicalFromNepal] = useState(false);
  const [scoreData, setScoreData] = useState<number>(0);
  const [filteredPrograms, setFilteredPrograms] = useState<any>([]);
  const [activeCountry, setActiveCountry] = useState("China");

  const [responseEligibility, setResponseEligibility] = useState<any>();
  const [updatedSubDiscipline, setUpdatedSubDiscipline] = useState<string[]>(
    []
  );

  const router = useRouter();

  const dispatch = useAppDispatch();
  const applications = useAppSelector(
    (state) => state.applications.applications
  );

  // Todo: Enable this after implementing login
  const data = useCustomQuery({
    queryKey: [CacheConfigKey.APPLICATION_GET_QUERY_KEY],
    queryFn: () => getApplications(),
    onSuccess: (data) => {
      dispatch(
        setUserApplications({
          data: data,
        })
      );
    },
    refetchOnWindowFocus: false,
    enabled: applications && applications.length < 1,
  });

  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: (email: string) => postWiseScoreData(email),
    onSuccess: (res: any) => {
      if (res.eligibility) {
        setResponseEligibility(res.eligibility);
      }
      if (res.isMedicalFromNepal) {
        setIsMedicalFromNepal(true);
      } else {
        setIsMedicalFromNepal(false);
      }
      setFilteredPrograms(res?.universities ?? []);
      setIsDataResolved(true);
      const score = parseInt(res.score, 10);
      setScoreData(score);

      analytics.trackEvent(EAnalyticsEvents.WISESCORE_RESULT, {
        name: res.data.data.name,
        email: res.data.data.email,
        phone: res.data.data.phone,
        score: res.data.data.score,
      });
      // analytics.trackEvent(EAnalyticsEvents.WISESCORE_RESULT, {
      //   [EFieldName.SCORE]: res.score,
      // });
    },
    onError: (err: any) => {
      // localStorage.removeItem('email');
      setIsDataResolved(true);
    },
  });

  // //   Searches for a university named 'Nanjing University Of Aeronautics & Astronautics'
  // //   from the universities list in the response.If it exists, it removes this university
  // //   from the list, adds it back to the beginning of the list, and updates setFilteredPrograms
  // //    with the new list.If it doesn't exist, it just updates setFilteredPrograms with the universities list from the response.
  // // Sets setIsDataResolved to true, indicating that the data has been processed

  const { mutate: mutateNewEligibility, isPending: calculateAgainLoad } =
    useMutation({
      mutationFn: (data: any) => submitWiseScore(data),
      onSuccess: (res: any) => {
        if (res.eligibility) {
          setResponseEligibility(res.eligibility);
        }
        // setIsDataResolved(false)
        setFilteredPrograms([]);
        mutate(responseEligibility.email);
      },
      onError: (err: any) => {
        alert("Process Failed");
      },
    });
  const {
    data: subDisciplines,
    isLoading: subDisciplinesLoading,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [
      CacheConfigKey.SUBDISCIPLINES_QUERY_KEY,
      responseEligibility?.discipline,
    ],
    queryFn: () => getSubDisciplines(responseEligibility?.discipline),
    enabled: responseEligibility !== undefined,
  });

  const calculateWisescoreAgain = async () => {
    mutateNewEligibility({
      ...responseEligibility,
      discipline: responseEligibility.discipline,
      sub_disciplines: updatedSubDiscipline,
    });
  };

  const pathname = usePathname();

  useEffect(() => {
    // dispatch(setEligibilityFormData(''));
    const email = localStorage.getItem("email");
    if (email) {
      mutate(email);
    } else {
      setIsDataResolved(true);
      setScoreData(0);
      setFilteredPrograms([]);
    }
  }, [pathname]);

  const noEligibilityData = {
    title: "Data Not Available",
    desc: "First check WiseScore® to get the list of sorted universities",
    btnText: " Click To Check Your WiseScore®",
  };
  const noMatchFoundData = {
    title: "No Match Found",
    desc: "",
    btnText: "Try Again Selecting Other Programs",
  };

  if (!isDataResolved) {
    return (
      <Box
        bgcolor="common.white"
        borderRadius={1}
        pt={5}
        pb={9.5}
        minHeight="80vh"
      >
        <Stack direction="row" justifyContent="center">
          <Loader />
          <Typography variant="h6" sx={{ ml: 2 }} color="primary">
            Loading...
          </Typography>
        </Stack>
      </Box>
    );
  }

  if ((!scoreData || scoreData === 0) && filteredPrograms.length === 0) {
    return (
      <Box
        bgcolor="common.white"
        borderRadius={1}
        pt={2}
        pb={9.5}
        minHeight="80vh"
      >
        <WaitingScreen
          title={noEligibilityData.title}
          desc={noEligibilityData.desc}
          btnText={noEligibilityData.btnText}
        />
      </Box>
    );
  }
  const statuses = filterStatus(scoreData);

  function scrollToSection(ref: React.RefObject<HTMLDivElement>) {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const countries = [{ name: "China" }, { name: "Korea" }];

  const currency = useAppSelector((state) => state.currency);

  const handleCountryClick = (name: string) => {
    setActiveCountry(name);
  };

  return (
    <Box
      sx={
        {
          // backgroundImage: "url('/wisescore/swatch.svg')",
        }
      }
      borderRadius={1}
      pt={{ lg: 2, md: 2, sm: "24px", xs: "24px" }}
      pb={9.5}
      minHeight="80vh"
    >
      <StyledContainerWrapper>
        <Box
          mt={{ lg: 4, md: 4, sm: "0", xs: "0" }}
          maxWidth="90rem"
          width="100%"
          mx="auto"
        >
          <Box display="flex">
            <Grid container>
              <Grid xs={12} lg={7} item>
                <Stack
                  alignItems={{ lg: "flex-start", xs: "center" }}
                  ml={{ lg: 8, md: 0, sm: 0, xs: 0 }}
                  py={{ lg: 7, xs: 4 }}
                >
                  <ThinScoreGauge
                    boxSize={isMobile ? 140 : 240}
                    value={scoreData}
                  />
                </Stack>
                <Typography
                  // variant="h4"
                  fontFamily="HankenGroteskExtraBold"
                  fontSize={{ lg: "48px !important", xs: "28px !important" }}
                  component="h4"
                  sx={{
                    color: "#333333",
                  }}
                  textAlign={{ lg: "left", xs: "center" }}
                  my={{ lg: 3, md: 3, sm: "32px", xs: "32px" }}
                >
                  Your WiseScore® is {scoreData}%
                </Typography>
              </Grid>
              <Grid xs={12} lg={5} item>
                <Stack direction="row" gap={1} width="100%">
                  <Stack
                    justifyContent="flex-end"
                    direction="column"
                    flex={0.1}
                  >
                    <RobotSvg />
                  </Stack>
                  <Stack
                    flex={0.9}
                    direction={{ md: "column", xs: "column" }}
                    gap={1}
                  >
                    {statuses &&
                      statuses.map((e, i) => (
                        <Stack
                          bgcolor={
                            e.type === "positive" ? "#1C8846" : "#DB1920"
                          }
                          padding={{ lg: "26px 20px", xs: "18px 14px" }}
                          direction="row"
                          alignItems="center"
                          borderRadius={
                            i === 1
                              ? "12.108px 12.108px 12.108px 0px"
                              : "12.108px"
                          }
                          justifyContent="space-between"
                          gap={1}
                        >
                          <Typography
                            fontFamily="HankenGroteskRegular"
                            fontSize={{ lg: "20px", xs: "14px" }}
                            lineHeight="130%"
                            letterSpacing="-0.22px"
                            sx={{
                              color: "#ffffff",
                            }}
                          >
                            {e.text}
                          </Typography>
                          <IconWrapper>
                            {e.type === "positive" ? (
                              <WhiteTickSvg />
                            ) : (
                              <RedCrossWhiteSvg />
                            )}
                          </IconWrapper>
                        </Stack>
                      ))}
                  </Stack>
                </Stack>

                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  mt="50px"
                  alignItems={{ xs: "center", lg: "center" }}
                  gap={1}
                  bgcolor="#EBEBEB"
                  padding={{
                    lg: "28px 22px",
                    md: "26px 24px",
                    sm: "16px 18px",
                    xs: "16px 18px",
                  }}
                  textAlign={{ lg: "left", xs: "center" }}
                  borderRadius="8px"
                >
                  <Typography
                    fontFamily="HankenGroteskSemiBold"
                    fontSize={{ lg: "22px", xs: "16px" }}
                    component="span"
                    lineHeight="150%"
                    sx={{
                      color: "#333333",
                    }}
                  >
                    We&apos;ve curated a list of universities for you based on
                    your eligibility score.
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => scrollToSection(UniversityComponentRef)}
                  >
                    <Typography
                      fontFamily="HankenGroteskSemiBold"
                      fontWeight={600}
                      fontSize={{
                        lg: "16px",
                        md: "16px",
                        sm: "16px",
                        xs: "16px",
                      }}
                      component="span"
                      color="#FF6B26"
                      display={{ lg: "none", xs: "block" }}
                      lineHeight="19.2px"
                    >
                      Scroll down
                    </Typography>
                    <Box display={{ lg: "block", xs: "none" }}>
                      <DownArrowSvg />
                    </Box>
                    <Stack
                      justifyContent="center"
                      mt={1}
                      display={{ lg: "none", xs: "block" }}
                    >
                      <DownArrowSmallSvg />
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Box>
          {/* Remove once done */}
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt="38px"
            color="white"
            fontSize="16px"
            fontFamily="HankenGroteskSemiBold"
            width="fit-content"
            borderRadius="8px"
            padding="12px 32px"
            bgcolor="primary.main"
            sx={{
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => {
              analytics.websiteButtonInteractions({
                location: {
                  countryName: currency?.currentCountry ?? "",
                  city: currency?.city ?? "",
                },
                buttonName: "Get career pathway",
                source: "User clicked on get career pathway button",
                urlPath: window.location.href,
                event_type: EAnalyticsEvents.GET_ROADMAP,
                status: EAnalyticsStatus.SUCCESS,
                redirectPath: "",
              });
              router.push("/roadmap");
            }}
          >
            Get career pathway
          </Box>
          <Box my={2}>
            <Divider />
          </Box>

          {/* {isMedicalFromNepal && <DoctorsAppointment />} */}
          {isPending && (
            <Box
              bgcolor="common.grey"
              borderRadius={1}
              pt={{ lg: 5, xs: 2 }}
              pb={9.5}
              minHeight="80vh"
            >
              <Stack direction="row" justifyContent="center">
                <Loader />
                <Typography variant="h6" sx={{ ml: 2 }} color="primary">
                  Loading...
                </Typography>
              </Stack>
            </Box>
          )}
          {/* -------------------------------------------------------------universities-list------------------------------------------------------------------------------------ */}
          <Box ref={UniversityComponentRef}>
            <Grid
              // mt="114px"
              mt="72px"
              mb="32px"
              container
              // direction={{ lg: 'row', xs: 'column' }}
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
                lg={6}
                md={6}
                sm={12}
                xs={12}
                mb={{ lg: "0px", md: "0px", sm: "10px", xs: "20px" }}
              >
                <Stack>
                  <Typography
                    color="#333"
                    fontFamily="HankenGroteskExtraBold"
                    fontSize={{
                      lg: "32px",
                      md: "32px",
                      sm: "24px",
                      xs: "24px",
                    }}
                    lineHeight="130%"
                    letterSpacing="-0.64px"
                    component="h6"
                  >
                    Universities shortlisted for you
                  </Typography>
                  {/* <PillUnderlineDiv /> */}
                  {/* <Box py={2}>
                      <Typography variant="inherit">
                        If you can&apos;t find the program you want, <br />
                        try looking for similar ones or change your search
                        terms.
                      </Typography>
                    </Box> */}
                </Stack>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Grid
                  spacing={1}
                  container
                  display="flex"
                  flexDirection={{
                    // xs: 'column',
                    // sm: 'column',
                    lg: "row",
                    md: "row",
                  }}
                  justifyContent="start"
                  alignItems={{
                    lg: "center",
                    md: "center",
                    sm: "flex-start",
                    xs: "flex-start",
                  }}
                >
                  <Grid item lg={8.5} md={8.5} sm={12} xs={12}>
                    {subDisciplines ? (
                      <Autocomplete
                        multiple
                        size="medium"
                        limitTags={3}
                        options={subDisciplines}
                        sx={{
                          borderRadius: "18px",
                        }}
                        getOptionLabel={(option: any) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Change the sub discipline"
                            // placeholder="sub disciplines"
                            variant="outlined"
                          />
                        )}
                        onChange={(e, value) => {
                          setUpdatedSubDiscipline(() => value.map((i) => i.id));
                        }}
                        ChipProps={{
                          sx: {
                            fontSize: ".75rem",
                            color: "black",
                            bgcolor: "primary.25",
                            borderRadius: ".1875rem",
                            "&.MuiChip-root": {
                              maxWidth: "6.25rem",
                            },
                          },
                          onDelete: undefined,
                        }}
                      />
                    ) : (
                      <TextFieldWrapper fullWidth size="small" select />
                    )}
                  </Grid>
                  <Grid item lg={3.5} md={3.5} xs={12} sm={12}>
                    <Button
                      size="medium"
                      sx={{
                        marginTop: {
                          lg: "0px",
                          md: "0px",
                          sm: "18px",
                          xs: "18px",
                        },
                        p: "12px 31px",
                        height: "52px !important",
                        width: "100%",
                        borderRadius: "8px",
                      }}
                      variant="contained"
                      disabled={
                        isPending ||
                        calculateAgainLoad ||
                        updatedSubDiscipline.length === 0
                      }
                      startIcon={
                        calculateAgainLoad ? (
                          <CircularProgress size="small" color="warning" />
                        ) : null
                      }
                      onClick={calculateWisescoreAgain}
                    >
                      {calculateAgainLoad ? "Searching.." : "Find Programs"}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Stack direction="row" gap={2}>
              {countries.map(({ name }) => (
                <Stack alignItems="center" gap={1}>
                  <Stack
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleCountryClick(name)}
                    border={
                      activeCountry === name
                        ? "1px solid #FFB584"
                        : "1px solid rgba(0, 0, 0, 0.60)"
                    }
                    bgcolor="#fff"
                    borderRadius="60px"
                    minWidth="146px"
                    padding="12px 25px"
                    alignItems="center"
                  >
                    <Typography
                      color={
                        activeCountry === name
                          ? "#FF6B26"
                          : "rgba(32, 28, 26, 0.90)"
                      }
                      fontFamily={
                        activeCountry === name
                          ? "HankenGroteskSemiBold"
                          : "HankenGroteskRegular"
                      }
                      fontSize="14px"
                      lineHeight="120%"
                    >
                      {name}
                    </Typography>
                  </Stack>
                  {activeCountry !== name && (
                    <Stack
                      direction="row"
                      gap={1}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Exclaim />
                      <Typography
                        color="#201C1A66"
                        fontFamily="HankenGroteskSemiBold"
                        fontSize="14px"
                        lineHeight="130%"
                      >
                        Also consider
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              ))}
            </Stack>
            {filteredPrograms.length ? (
              filteredPrograms.filter((prog: any) => prog.key === activeCountry)
                .length > 0 ? (
                filteredPrograms
                  .filter((prog: any) => prog.key === activeCountry)
                  .map((item: any, key: number) => (
                    <Box my={{ xl: 4, xs: 2 }} key={item.university.id}>
                      <ShortlistProgramContent.Provider
                        value={{ email: responseEligibility?.email ?? "" }}
                      >
                        <Card
                          getConvertedCosts={getConvertedCosts}
                          wisescore={Math.round(Number(scoreData))}
                          university={item.university}
                          rank={key}
                        />
                      </ShortlistProgramContent.Provider>
                    </Box>
                  ))
              ) : (
                <WaitingScreen
                  title={noMatchFoundData.title}
                  desc={noMatchFoundData.desc}
                  btnText={noMatchFoundData.btnText}
                />
              )
            ) : (
              <WaitingScreen
                title={noMatchFoundData.title}
                desc={noMatchFoundData.desc}
                btnText={noMatchFoundData.btnText}
              />
            )}
          </Box>
        </Box>
      </StyledContainerWrapper>
    </Box>
  );
}
