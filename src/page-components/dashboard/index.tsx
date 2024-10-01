"use client";
import { getApplicationsStudent } from "@/api/web/application.action";
import { paymentEsewaFailed } from "@/api/web/payment.action";
import { getStudentUniversities } from "@/api/web/student.action";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import {
  getUserApplications,
  setUserApplications,
} from "@/global-states/reducers/applicationReducer";
import {
  selectTopMatches,
  setTopMatches,
} from "@/global-states/reducers/topMatchesReducer";
import {
  selectDidUserSignedUp,
  SelectShortlistedDetails,
  SelectShortlistedPrograms,
  setDidUserSignedUp,
} from "@/global-states/reducers/userReducer";
import { useShortListSetter } from "@/hooks";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import Alert from "./components/Alert";
import ApplicationInProgress from "./components/ApplicationProgress";
import ExpandBox from "./components/ExpandBox";
import ExpandedInfo from "./components/ExpendedInfo";
import HorizontalLinearStepper from "./components/HorizontalLinearStepper";
import OnBoardingComponent from "./components/OnBoardingComponent";
import { ProgressBar } from "./components/ProgressBar";
import SelectPrograms from "./components/SelectPrograms";
import WiseScoreCalculator from "./components/WiseScoreCalculator";
import WiseScoreCalculated from "./components/WisescoreCalculated";
import { alertTexts } from "./utils/data";
import { AlertButtonProps } from "./utils/type";

export function DashboardHome() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const query = useSearchParams();

  const currency = useAppSelector((state) => state.currency);

  const [expandedInfo, setExpandedInfo] = useState(true);
  const [programMatched, setProgramMatched] = useState<"YES" | "NO" | "NA">(
    "NA"
  );
  const [activeStep, setActiveStep] = useState(5);
  // Dont Remove Comment !!!! This Gives What Each Step Means
  // 0 - wiseScore Not Checked
  // 1 - WiseScore Checked
  // 2 - select Program
  // 3 - select Program complete
  // 4 - Complete the profile and applications Viewer
  // 5 - Profile Complete

  // Redux States for Hot Rerendering
  const didUserSignedUp = useAppSelector(selectDidUserSignedUp);
  const wiseScore = useAppSelector(
    (state) => state.user.dashboardDataGlobal?.score
  );
  const isProfileComplete = useAppSelector(
    (state) => state.user.dashboardDataGlobal?.data?.isProfileComplete
  );
  const userName = useAppSelector(
    (state) => state.user.dashboardDataGlobal?.data?.first_name
  );
  const { enqueueSnackbar } = useSnackbar();
  const topMatches = useAppSelector(selectTopMatches);
  const userApplication = useAppSelector(getUserApplications);
  const userApplicationProgramIds = userApplication.map((eachApplication) =>
    eachApplication.program?.id?.toString()
  );
  const shortlistedPrograms = useAppSelector(SelectShortlistedPrograms);
  const shortlistedDetails = useAppSelector(SelectShortlistedDetails);

  // get applications already processed
  const { data: applications, isLoading: applicationsLoading } = useCustomQuery(
    {
      queryKey: [
        "Applications/GET",
        String(wiseScore),
        activeStep,
        shortlistedPrograms,
      ],
      queryFn: () => getApplicationsStudent(),
      onSuccess: (res) => {
        dispatch(setUserApplications({ data: res }));
      },
      onError: (error) => {
        console.error("Failed To Fetch Applications", error);
      },
      refetchOnWindowFocus: false,
    }
  );
  // get matched programs acc to the wiseScore & fetch every time the wiseScore Changes
  const { data: topMatch, isLoading: topMatchLoading } = useCustomQuery({
    queryKey: ["Universities/GET", wiseScore, activeStep],
    queryFn: () => getStudentUniversities(),
    onSuccess: (res) => {
      dispatch(setTopMatches(res?.data?.data));
    },
    refetchOnWindowFocus: false,
  });

  // Handle shortlist post request
  const { mutate } = useShortListSetter();

  // Get Programs From LocalStorage that is listied for shortlisting
  let programSelected = "";
  let foundationProgramId = "";
  if (typeof window !== "undefined") {
    try {
      const programData = JSON.parse(localStorage.getItem("Program") ?? "{}");
      programSelected = programData?.programId ?? "";
      foundationProgramId = programData?.foundationId ?? "";
    } catch (error) {
      programSelected = "";
      foundationProgramId = "";
    }
  }

  // close the onboarding Component
  const handleClose = () => {
    dispatch(setDidUserSignedUp(false));
  };

  // We can add new loading dependencies if required later
  const loading = () => {
    if (applicationsLoading) {
      return true;
    }
    if (topMatchLoading) {
      return true;
    }
    return false;
  };

  // Handle Step from Other Components
  const handleStep = (value: number) => {
    setActiveStep(value);
  };

  // Core Function of the page as we are not using tab we are rendering the steps conditionally
  const getActiveStep = () => {
    let step = 0; // Default step

    if (isProfileComplete && userApplicationProgramIds.length > 0) {
      if (shortlistedPrograms.length === 0 || !shortlistedPrograms) {
        step = 5;
      } else {
        step = 3;
      }
    } else if (userApplication.length > 0) {
      if (shortlistedPrograms.length < 1 || !shortlistedPrograms) {
        step = 4;
      } else {
        step = 3;
      }
    } else if (shortlistedPrograms.length > 0) {
      step = 3;
    } else if (!programSelected && wiseScore && wiseScore > 0) {
      if (!shortlistedPrograms || shortlistedPrograms.length === 0) {
        step = 2;
      } else {
        step = 1;
      }
    } else if (programSelected && wiseScore && wiseScore > 0) {
      step = 1;
    }

    setActiveStep(step); // Set the active step
  };
  // Re-Call the heart function when these dependencies changes
  useMemo(() => {
    getActiveStep();
  }, [
    dispatch,
    userApplicationProgramIds.length,
    wiseScore,
    shortlistedPrograms,
  ]);

  // Function to define weather the program from the localstorage matches with programs
  // comming through the top matches and are sanitized through the sanitize function
  const shortlistProgramsFromProgramPage = async () => {
    // Sanitize the TopMatches Array to only get the Program Ids to match with the selected program
    const sanitizePrograms = () => {
      let returnable = [] as string[];
      const universitiesData = topMatches?.universities ?? [];
      universitiesData?.map((universityData) =>
        universityData?.university.programs.map((p) => {
          returnable = [...returnable, p.id];
          return p.id;
        })
      );
      return returnable;
    };

    if (programSelected && wiseScore && programMatched === "NA") {
      if (sanitizePrograms().length > 0) {
        const hasProgramMatched = sanitizePrograms().includes(programSelected);
        if (hasProgramMatched) {
          setProgramMatched("YES");
          mutate({
            programId: programSelected,
            foundationId: foundationProgramId,
          });
          localStorage.removeItem("Program");
        } else {
          setProgramMatched("NO");
          localStorage.removeItem("Program");
        }
      }
    }
  };
  // call this every time the dependency changes
  useEffect(() => {
    shortlistProgramsFromProgramPage();
  }, [topMatches, activeStep]);

  // Function to get division for progress bar
  const getDivision = () => {
    switch (activeStep) {
      case 0:
        return 0;
      case 1:
      case 2:
        return 4;
      case 3:
      case 4:
        return 8;
      case 5:
        return 12;
      default:
        return 0;
    }
  };
  // Future Function non implemented
  const handleStepperClick = (StepId: number) => {};
  // Alert button props for completing profile
  const completeProfileAlertProps: AlertButtonProps = {
    buttonName: "Complete Profile",
    buttonClick: () => {
      analytics.websiteButtonInteractions({
        location: {
          countryName: currency?.currentCountry ?? "",
          city: currency?.city ?? "",
        },
        buttonName: "Complete Profile",
        source: "Clicked on complete profile button in dashboard page",
        urlPath: "/dashboard/profile/edit-profile",
        event_type: EAnalyticsEvents.EDIT_PROFILE,
        status: EAnalyticsStatus.SUCCESS,
        redirectPath: "/dashboard/profile/edit-profile",
      });
      router.push("/dashboard/profile/edit-profile");
    },
  };

  const { data: esewaData, isLoading: esewaVerificationLoading } =
    useCustomQuery({
      queryKey: ["esewaFailed"],
      queryFn: () =>
        paymentEsewaFailed((query.get("signature") as string) ?? ""),
      onSuccess: (data) => {
        router.replace("/dashboard");
      },
      onError: (error) => {
        enqueueSnackbar("Payment verification failed", { variant: "error" });
        router.replace("/dashboard");
      },
      enabled: !!query.get("signature"),
    });

  return (
    <>
      <Box mt={{ lg: 3, xs: 4 }} maxWidth="auto" width="100%">
        {/* survey component */}
        {/* tsrafce */}
        {/* Comment out this for removing OnBoard Component */}
        <OnBoardingComponent open={didUserSignedUp} handleClose={handleClose} />
        {loading() ? (
          // Skeleton
          <Stack gap={3}>
            <Skeleton width="10%" height="20px" variant="text" />
            <Skeleton width="30%" height="50px" variant="text" />
            <Skeleton width="40%" height="20px" variant="text" />
            <Skeleton height="70px" variant="rectangular" />
            <Skeleton width="77%" height="140px" variant="rectangular" />
          </Stack>
        ) : (
          <Box mb={2}>
            <Typography
              mb={6}
              variant="caption"
              fontSize="20px"
              lineHeight="28px"
              fontFamily="HankenGroteskExtraBold"
              color="#5B5B5B"
            >
              Welcome, {userName}.
            </Typography>
            <Stack gap={1} my={3}>
              <Typography
                variant="caption"
                fontSize={{ lg: "48px", md: "48px", sm: "48px", xs: "32px" }}
                lineHeight="67.2px"
                fontFamily="HankenGroteskExtraBold"
              >
                Before applying
              </Typography>
              <Typography
                variant="caption"
                fontSize="14px"
                lineHeight="22.4px"
                fontFamily="HankenGroteskSemiBold"
                color="#5B5B5B"
              >
                Please consider completing these steps to move into the next
                step.
              </Typography>
            </Stack>
            {/* Alerts  */}
            <Box mb={2}>
              {/* Alert Bar Section */}
              {/* application has Started But No WiseScore Found */}
              {activeStep === 0 && programSelected && !wiseScore && (
                <Alert
                  iconType="warning"
                  variant="warning"
                  text={alertTexts.applicationStartedButNoWiseScore}
                />
              )}
              {/* Selected Program Does Not Matches With WiseScore */}
              {programMatched === "NO" && (
                <Alert
                  iconType="error"
                  variant="error"
                  text={alertTexts.programNotMatchWithWiseScore}
                />
              )}
              {activeStep === 3 && programMatched === "YES" && (
                <Alert
                  iconType="congrats"
                  variant="success"
                  text={alertTexts.programMatchWithWiseScore}
                />
              )}
            </Box>
            {/* Steps */}
            <Grid container mx={{ lg: 3, xs: 0 }} my={{ lg: 3, xs: 3 }}>
              <Grid item xs={12} md={10}>
                <HorizontalLinearStepper
                  handleStepperClick={handleStepperClick}
                  activeStep={activeStep}
                />
              </Grid>
            </Grid>
            {/* Progress Bar */}
            <Grid container mb={3}>
              <Grid item xs={12} md={10}>
                <ProgressBar divisions={getDivision()} />
              </Grid>
            </Grid>
            {/* Step Information Helper Popop */}
            <Grid container mb={6}>
              <Grid item xs={12} md={10}>
                {expandedInfo ? (
                  <ExpandedInfo
                    activeStep={activeStep}
                    setExpandedInfo={setExpandedInfo}
                  />
                ) : (
                  <ExpandBox
                    activeStep={activeStep}
                    setExpandedInfo={setExpandedInfo}
                  />
                )}
              </Grid>
            </Grid>
            {/* Profile Information InComplete  */}
            {activeStep === 4 && !isProfileComplete && (
              <Grid container mb={6}>
                <Grid container xs={12} md={10}>
                  <Grid item xs={12} md={10}>
                    <Alert
                      iconType="pending"
                      buttonProps={completeProfileAlertProps}
                      variant="error"
                      text={alertTexts.inCompleteProfile}
                    />
                  </Grid>
                </Grid>
              </Grid>
            )}
            {/* Step Childrens and Components according to the steps */}
            <Grid container>
              <Grid item xs={12} md={10}>
                {activeStep === 0 && (
                  <WiseScoreCalculator handleStep={handleStep} />
                )}
                {activeStep === 1 && (
                  <WiseScoreCalculated
                    handleStep={handleStep}
                    wiseScore={wiseScore}
                  />
                )}
                {activeStep === 4 && (
                  <ApplicationInProgress handleStep={handleStep} />
                )}
                {activeStep === 5 && (
                  <ApplicationInProgress handleStep={handleStep} />
                )}
              </Grid>
            </Grid>
          </Box>
        )}
        {activeStep === 2 && (
          <SelectPrograms handleStep={handleStep} wiseScore={wiseScore} />
        )}
        {activeStep === 3 && (
          <SelectPrograms
            data={{
              shortlistedPrograms,
              shortlistedDetails,
            }}
            handleStep={handleStep}
            wiseScore={wiseScore}
          />
        )}
      </Box>
    </>
  );
}
