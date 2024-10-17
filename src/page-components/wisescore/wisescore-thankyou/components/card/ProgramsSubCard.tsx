"use client";
import React, { useContext, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import FlyHighToolTip from "./FlyHighToolTip";
import CSCTooltip from "./CSCToolTip";
import ShortlistProgramContent from "@/context/program-sortlist";
import {
  addShortlistedPrograms,
  selectDashboardDataGlobal,
  SelectShortlistedPrograms,
} from "@/global-states/reducers/userReducer";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { getUserApplications } from "@/global-states/reducers/applicationReducer";
import { useShortListSetter } from "@/hooks";
import { mixpanelSubmit } from "@/api/web/mixpanel.action";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { analytics } from "@/services/analytics.service";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { ButtonWrapper } from "@/components/common";
import Loader from "@/components/common/circular-loader/Loader";
import {
  CalendarSvg,
  ClockIcons,
  GlobeSvg,
  GreenTickSvg,
  UniversitySortedSvg,
} from "public/svg";
import { FRONTEND_URL_CONFIG } from "@/config/config";
import { CourseIcon, GetBookOpenIcon } from "@/page-components/wisescore/svgs";
import { Close } from "@mui/icons-material";
import {
  calculateScholarship,
  getScholarshipInfo,
} from "@/common/utils/getScholarship";
import { useMutation } from "@tanstack/react-query";
import { addShortList } from "@/api/web/shortlist.action";
import { useDispatch } from "react-redux";

const svgBox = {
  // bgcolor: '#FF6B26',
  height: "44px",
  borderRadius: "50%",
  display: "grid",
  placeContent: "center",
  minWidth: "44px",
};

function ProgramsSubCard({
  program,
  wisescore,
  univerisity,
  // getConvertedCost: { getConvertedCosts, baseCurrency }
  getConvertedCosts,
}: {
  program: any;
  wisescore?: number;
  univerisity?: any;
  getConvertedCosts: (
    value: number,
    base_currency: string
  ) => {
    formattedValue: string;
    amount: number;
  };
  // getConvertedCost: {
  //   getConvertedCosts: (value: number, curr?: string) => Promise<string>,
  //   baseCurrency: string
  // };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const programShortlistDetail = useContext(ShortlistProgramContent);

  const leadId = localStorage.getItem("leadId");
  const email = localStorage.getItem("email");
  const dispatch = useDispatch();
  const sortlistedGlobal = useAppSelector(SelectShortlistedPrograms);
  const userApplication = useAppSelector(getUserApplications);
  const userData = useAppSelector(selectDashboardDataGlobal);
  const [activeProgramType, setActiveProgramType] = useState<
    "" | "foundation" | "real"
  >("");
  const { mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: async ({
      programId,
      foundationId,
    }: {
      programId: string;
      foundationId: string;
    }) => await addShortList(programId, foundationId),
    onSuccess: (res: any) => {
      dispatch(addShortlistedPrograms(res.data.data));
    },
    onError: (error) => {},
  });
  const { enqueueSnackbar } = useSnackbar();
  const [showFoundationDialog, setShowFoundationDialog] = useState(false);
  const userApplicationsIds = userApplication.map(
    (eachApplication) => eachApplication?.program?.id
  );
  const country = useAppSelector((state) => state.currency.currentCountry);
  const city = useAppSelector((state) => state.currency.city);

  const handleShortList = async (programId: string, foundationId: string) => {
    try {
      if (!sortlistedGlobal.find((s) => s.id === programId)) {
        ("use server");
        mutate({ programId, foundationId });
        if (userData?.data?.email) {
          mixpanelSubmit({
            email: userData.data.email,
            event_title: EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
            event_type: EAnalyticsEvents.APPLY_NOW,
            status: EAnalyticsStatus.SUCCESS,
            reference: "Lead",
            url_path: window.location.href,
            redirectPath: "",
            location: {
              countryName: country,
              city,
            },
            description: `User has clicked on Apply Now button from the wisescore result page for ${program.name} of ${univerisity.name}. Score: ${wisescore}`,
          });
        }
        analytics.trackEvent(EAnalyticsEvents.APPLY_NOW, {
          buttonName: "Apply Now",
          source: `User has clicked on Apply Now button from the wisescore result page for ${program.name} of ${univerisity.name}. Score: ${wisescore}`,
        });
        // analytics.websiteButtonInteractions({
        //   location: {
        //     countryName: currency?.currentCountry,
        //     city: currency?.city,
        //   },
        //   redirectPath:
        //   buttonName: "Apply Now",
        //   source: `${program.name} of ${univerisity.name} has been applied by ${userData?.data?.first_name}`,
        // });
      } else {
        alert("Already Shortlisted");
      }
    } catch (error) {
      if (leadId && email) {
        mixpanelSubmit({
          email: email,
          event_title: EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
          event_type: EAnalyticsEvents.APPLY_NOW,
          status: EAnalyticsStatus.ERROR,
          reference: "Lead",
          user_id: leadId,
          url_path: window.location.href,
          redirectPath: "",
          location: {
            countryName: country,
            city,
          },
          description: error,
        });
      }
      analytics.trackEvent(EAnalyticsEvents.ERROR, {
        source: "Apply Now in university card in dashboard",
        message: error,
      });
    }
  };

  const [pushToDashboard, setPushToDashboard] = useState(false);
  const handleTooltipClick = () => {
    setOpen(true);
  };

  if (isSuccess) {
    setShowFoundationDialog(false);
    reset();
  }
  const finalDiscountedPrice = (programFee: number, discountPercent: number) =>
    (programFee - (discountPercent / 100) * programFee).toFixed(2);

  // const [convertedCosts, setConvertedCosts] = useState<string[]>([])

  // const [values, setValues] = useState([
  //   {
  //     value: univerisity.foundationProgram?.detail?.fees?.tution_fee,
  //     base_currency: univerisity.base_currency
  //   },
  //   {
  //     value: program?.detail?.fees?.tution_fee,
  //     base_currency: program.detail.base_currency
  //   },
  //   {
  //     value: finalDiscountedPrice(
  //       program?.detail?.fees?.tution_fee ?? 0,
  //       findValueInRanges(
  //         program?.detail?.scholarship_range,
  //         wisescore!
  //       )
  //     ),
  //     base_currency: program.detail.base_currency
  //   }
  // ])
  // useEffect(() => {
  //   (async () => {
  //     const data = values.map(value => getConvertedCosts(value.value, value.base_currency))
  //     const result = await Promise.all(data)
  //     setConvertedCosts(result)
  //   })()
  // }, [program?.detail?.fees, baseCurrency])

  function buttonGroup() {
    return (
      <Stack
        justifyContent="flex-end"
        direction="column"
        alignItems="flex-start"
        columnGap={1}
        width="100%"
      >
        {pathname === "/dashboard" ? (
          <>
            <Box sx={{ minWidth: "7.5rem", minHeight: "3.75rem" }}>
              <ButtonWrapper
                variant="outlined"
                color={
                  sortlistedGlobal
                    ? sortlistedGlobal.includes(program.id)
                      ? "success"
                      : "primary"
                    : "primary"
                }
                onClick={() => {
                  if (userApplicationsIds.includes(program.id)) {
                    router.push("/dashboard/applications");
                  } else if (univerisity.foundationProgram) {
                    setShowFoundationDialog(true);
                    // handleShortList(program.id,univerisity.foundation.id??"");
                  } else {
                    handleShortList(program.id, "");
                  }
                }}
                startIcon={
                  isPending ? (
                    <Loader buttonState color="success" />
                  ) : sortlistedGlobal ? (
                    sortlistedGlobal.find((s) => s.id === program.id) && (
                      <GreenTickSvg />
                    )
                  ) : (
                    <Loader />
                  )
                }
              >
                {/* {program.id} */}
                {userApplicationsIds.includes(program.id)
                  ? "View Application"
                  : sortlistedGlobal.find((s) => s.id === program.id)
                  ? "Shortlisted"
                  : "Shortlist"}
                {/* Shortlist */}
              </ButtonWrapper>
            </Box>
            <a
              href={`${FRONTEND_URL_CONFIG}/programs/${program.slug}`}
              target="_blank"
              rel="noreferrer"
            >
              <ButtonWrapper variant="text">More Details!</ButtonWrapper>
            </a>
          </>
        ) : (
          <div>
            {pathname === "/dashboard/universitiesandprograms" ||
            pathname === "/dashboard/wisescore/sorteduniversities" ? (
              <ButtonWrapper
                startIcon={
                  isPending ? (
                    <Loader buttonState color="success" />
                  ) : sortlistedGlobal ? (
                    sortlistedGlobal.find((s) => s.id === program.id) && (
                      <GreenTickSvg />
                    )
                  ) : (
                    <Loader />
                  )
                }
                onClick={() => {
                  // setPushToDashboard(true)
                  if (userApplicationsIds.includes(program.id)) {
                    router.push("/dashboard/applications");
                  } else if (
                    sortlistedGlobal.find((s) => s.id === program.id)
                  ) {
                    if (univerisity.foundationProgram) {
                      setPushToDashboard(true);
                      setShowFoundationDialog(true);
                    } else {
                      handleShortList(program.id, "");
                    }
                  } else if (univerisity.foundationProgram) {
                    setPushToDashboard(true);
                    setShowFoundationDialog(true);
                    // handleShortList(program.id,univerisity.foundation.id??"");
                  } else {
                    handleShortList(program.id, "");
                    router.replace(`/dashboard?id=${univerisity?.id ?? ""}`);
                  }
                }}
                variant="outlined"
                sx={{
                  padding: "12px 25px",
                  borderRadius: "8px",
                }}
              >
                {userApplicationsIds.includes(program.id)
                  ? "View Application"
                  : sortlistedGlobal.find((s) => s.id === program.id)
                  ? "Shortlisted"
                  : "Apply Now"}
              </ButtonWrapper>
            ) : (
              <Link
                target="_"
                href={{
                  pathname: `${FRONTEND_URL_CONFIG}/programs/${program.slug}`,
                  query: {
                    email: programShortlistDetail.email,
                    wisescore: wisescore ?? 0,
                  },
                }}
                // passHref
              >
                <ButtonWrapper
                  sx={{
                    padding: "12px 25px",
                    borderRadius: "8px",
                  }}
                  variant="outlined"
                >
                  Apply now!
                </ButtonWrapper>
              </Link>
            )}
          </div>
        )}
      </Stack>
    );
  }
  function smallbuttonGroupTwo() {
    return (
      <Stack
        justifyContent="center"
        direction="column"
        alignItems="center"
        columnGap={1}
        width="100%"
      >
        {pathname === "/dashboard" ? (
          <>
            <Box sx={{ minWidth: "7.5rem", minHeight: "3.75rem" }}>
              <ButtonWrapper
                variant="outlined"
                color={
                  sortlistedGlobal
                    ? sortlistedGlobal.includes(program.id)
                      ? "success"
                      : "primary"
                    : "primary"
                }
                onClick={() => {
                  if (userApplicationsIds.includes(program.id)) {
                    router.push("/dashboard/applications");
                  } else if (univerisity.foundationProgram) {
                    setShowFoundationDialog(true);
                    // handleShortList(program.id,univerisity.foundation.id??"");
                  } else {
                    handleShortList(program.id, "");
                  }
                }}
                startIcon={
                  isPending ? (
                    <Loader buttonState color="success" />
                  ) : sortlistedGlobal ? (
                    sortlistedGlobal.find((s) => s.id === program.id) && (
                      <GreenTickSvg />
                    )
                  ) : (
                    <Loader />
                  )
                }
              >
                {/* {program.id} */}
                {userApplicationsIds.includes(program.id)
                  ? "View Application"
                  : sortlistedGlobal.find((s) => s.id === program.id)
                  ? "Shortlisted"
                  : "Shortlist"}
                {/* Shortlist */}
              </ButtonWrapper>
            </Box>
            <a
              href={`${FRONTEND_URL_CONFIG}/programs/${program.slug}`}
              target="_blank"
              rel="noreferrer"
            >
              <ButtonWrapper variant="text">More Details!</ButtonWrapper>
            </a>
          </>
        ) : (
          <div>
            {pathname === "/dashboard/universitiesandprograms" ||
            pathname === "/dashboard/wisescore/sorteduniversities" ? (
              <ButtonWrapper
                startIcon={
                  isPending ? (
                    <Loader buttonState color="success" />
                  ) : sortlistedGlobal ? (
                    sortlistedGlobal.find((s) => s.id === program.id) && (
                      <GreenTickSvg />
                    )
                  ) : (
                    <Loader />
                  )
                }
                onClick={() => {
                  // setPushToDashboard(true)
                  if (userApplicationsIds.includes(program.id)) {
                    router.push("/dashboard/applications");
                  } else if (
                    sortlistedGlobal.find((s) => s.id === program.id)
                  ) {
                    if (univerisity.foundationProgram) {
                      setPushToDashboard(true);
                      setShowFoundationDialog(true);
                    } else {
                      handleShortList(program.id, "");
                    }
                  } else if (univerisity.foundationProgram) {
                    setPushToDashboard(true);
                    setShowFoundationDialog(true);
                    // handleShortList(program.id,univerisity.foundation.id??"");
                  } else {
                    handleShortList(program.id, "");

                    router.replace(`/dashboard?id=${univerisity?.id ?? ""}`);
                  }
                }}
                variant="outlined"
                sx={{
                  padding: "12px 25px",
                  borderRadius: "8px",
                }}
              >
                {userApplicationsIds.includes(program.id)
                  ? "View Application"
                  : sortlistedGlobal.find((s) => s.id === program.id)
                  ? "Shortlisted"
                  : "Apply Now"}
              </ButtonWrapper>
            ) : (
              <Link
                target="_"
                href={{
                  pathname: `${FRONTEND_URL_CONFIG}/programs/${program.slug}`,
                  query: {
                    email: programShortlistDetail.email,
                    wisescore: wisescore ?? 0,
                  },
                }}
                // passHref
              >
                <ButtonWrapper
                  sx={{
                    padding: "12px 25px",
                    borderRadius: "8px",
                    border: "1px solid rgba(131, 134, 139, 1)",
                    textTransform: "none",
                  }}
                  variant="outlined"
                >
                  Apply now
                </ButtonWrapper>
              </Link>
            )}
          </div>
        )}
      </Stack>
    );
  }

  function smallbuttonGroup() {
    return (
      <Button
        fullWidth
        style={{
          backgroundColor: "rgba(255, 211, 182, 1)",
          textTransform: "none",
        }}
      >
        {pathname === "/dashboard" ? (
          <>
            <Box>
              <ButtonWrapper
                variant="outlined"
                color={
                  sortlistedGlobal
                    ? sortlistedGlobal.includes(program.id)
                      ? "success"
                      : "primary"
                    : "primary"
                }
                onClick={() => {
                  if (userApplicationsIds.includes(program.id)) {
                    router.push("/dashboard/applications");
                  } else if (univerisity.foundationProgram) {
                    setShowFoundationDialog(true);
                    // handleShortList(program.id,univerisity.foundation.id??"");
                  } else {
                    handleShortList(program.id, "");
                  }
                }}
                startIcon={
                  isPending ? (
                    <Loader buttonState color="success" />
                  ) : sortlistedGlobal ? (
                    sortlistedGlobal.find((s) => s.id === program.id) && (
                      <GreenTickSvg />
                    )
                  ) : (
                    <Loader />
                  )
                }
              >
                {/* {program.id} */}
                {userApplicationsIds.includes(program.id)
                  ? "View Application"
                  : sortlistedGlobal.find((s) => s.id === program.id)
                  ? "Shortlisted"
                  : "Shortlist"}
                {/* Shortlist */}
              </ButtonWrapper>
            </Box>
            <a
              href={`${FRONTEND_URL_CONFIG}/programs/${program.slug}`}
              target="_blank"
              rel="noreferrer"
            >
              <ButtonWrapper variant="text">More Details!</ButtonWrapper>
            </a>
          </>
        ) : (
          <div>
            {pathname === "/dashboard/universitiesandprograms" ||
            pathname === "/dashboard/wisescore/sorteduniversities" ? (
              <ButtonWrapper
                startIcon={
                  isPending ? (
                    <Loader buttonState color="success" />
                  ) : sortlistedGlobal ? (
                    sortlistedGlobal.find((s) => s.id === program.id) && (
                      <GreenTickSvg />
                    )
                  ) : (
                    <Loader />
                  )
                }
                onClick={() => {
                  // setPushToDashboard(true)
                  if (userApplicationsIds.includes(program.id)) {
                    router.push("/dashboard/applications");
                  } else if (
                    sortlistedGlobal.find((s) => s.id === program.id)
                  ) {
                    if (univerisity.foundationProgram) {
                      setPushToDashboard(true);
                      setShowFoundationDialog(true);
                    } else {
                      handleShortList(program.id, "");
                    }
                  } else if (univerisity.foundationProgram) {
                    setPushToDashboard(true);
                    setShowFoundationDialog(true);
                    // handleShortList(program.id,univerisity.foundation.id??"");
                  } else {
                    handleShortList(program.id, "");

                    router.replace(`/dashboard?id=${univerisity?.id ?? ""}`);
                  }
                }}
                variant="outlined"
                sx={{
                  padding: "12px 25px",
                  borderRadius: "8px",
                }}
              >
                {userApplicationsIds.includes(program.id)
                  ? "View Application"
                  : sortlistedGlobal.find((s) => s.id === program.id)
                  ? "Shortlisted"
                  : "Apply Now"}
              </ButtonWrapper>
            ) : (
              <Link
                target="_"
                href={{
                  pathname: `${FRONTEND_URL_CONFIG}/programs/${program.slug}`,
                  query: {
                    email: programShortlistDetail.email,
                    wisescore: wisescore ?? 0,
                  },
                }}
                // passHref
              >
                Apply now!
              </Link>
            )}
          </div>
        )}
      </Button>
      // <Stack
      //   justifyContent="flex-end"
      //   direction="column"
      //   alignItems="flex-start"
      //   columnGap={1}
      //   width="100%"
      // >
      //   {router.pathname === '/dashboard' ? (
      //     <>
      //       <Box>
      //         <ButtonWrapper
      //           variant="outlined"
      //           color={
      //             sortlistedGlobal
      //               ? sortlistedGlobal.includes(program.id)
      //                 ? 'success'
      //                 : 'primary'
      //               : 'primary'
      //           }
      //           onClick={() => {
      //             if (userApplicationsIds.includes(program.id)) {
      //               router.push('/dashboard/applications');
      //             } else if (univerisity.foundationProgram) {
      //               setShowFoundationDialog(true);
      //               // handleShortList(program.id,univerisity.foundation.id??"");
      //             } else {
      //               handleShortList(program.id, '');
      //             }
      //           }}
      //           startIcon={
      //             isLoading ? (
      //               <Loader buttonState color="success" />
      //             ) : sortlistedGlobal ? (
      //               sortlistedGlobal.find((s) => s.id === program.id) && (
      //                 <GreenTickSvg />
      //               )
      //             ) : (
      //               <Loader />
      //             )
      //           }
      //         >
      //           {/* {program.id} */}
      //           {userApplicationsIds.includes(program.id)
      //             ? 'View Application'
      //             : sortlistedGlobal.find((s) => s.id === program.id)
      //               ? 'Shortlisted'
      //               : 'Shortlist'}
      //           {/* Shortlist */}
      //         </ButtonWrapper>
      //       </Box>
      //       <a
      //         href={`${FRONTEND_URL_CONFIG}/programs/${program.slug}`}
      //         target="_blank"
      //         rel="noreferrer"
      //       >
      //         <ButtonWrapper variant="text">More Details!</ButtonWrapper>
      //       </a>
      //     </>
      //   ) : (
      //     <div>
      //       {router.pathname === '/dashboard/universitiesandprograms' ||
      //         router.pathname === '/dashboard/wisescore/sorteduniversities' ? (
      //         <ButtonWrapper
      //           startIcon={
      //             isLoading ? (
      //               <Loader buttonState color="success" />
      //             ) : sortlistedGlobal ? (
      //               sortlistedGlobal.find((s) => s.id === program.id) && (
      //                 <GreenTickSvg />
      //               )
      //             ) : (
      //               <Loader />
      //             )
      //           }
      //           onClick={() => {
      //             // setPushToDashboard(true)
      //             if (userApplicationsIds.includes(program.id)) {
      //               router.push('/dashboard/applications');
      //             } else if (
      //               sortlistedGlobal.find((s) => s.id === program.id)
      //             ) {
      //               if (univerisity.foundationProgram) {
      //                 setPushToDashboard(true);
      //                 setShowFoundationDialog(true);
      //               } else {
      //                 handleShortList(program.id, '');
      //               }
      //             } else if (univerisity.foundationProgram) {
      //               setPushToDashboard(true);
      //               setShowFoundationDialog(true);
      //               // handleShortList(program.id,univerisity.foundation.id??"");
      //             } else {
      //               handleShortList(program.id, '');

      //               router.replace({
      //                 pathname: '/dashboard',
      //                 query: { id: univerisity?.id ?? '' },
      //               });
      //             }
      //           }}
      //           variant="outlined"
      //           sx={{
      //             padding: '12px 25px',
      //             borderRadius: '8px',
      //           }}
      //         >
      //           {userApplicationsIds.includes(program.id)
      //             ? 'View Application'
      //             : sortlistedGlobal.find((s) => s.id === program.id)
      //               ? 'Shortlisted'
      //               : 'Apply Now'}
      //         </ButtonWrapper>
      //       ) : (
      //         <Link
      //           target="_"
      //           href={{
      //             pathname: `${FRONTEND_URL_CONFIG}/programs/${program.slug}`,
      //             query: {
      //               email: programShortlistDetail.email,
      //               wisescore: wisescore ?? 0,
      //             },
      //           }}
      //         // passHref
      //         >
      //           <a
      //             // href={`${FRONTEND_URL_CONFIG}/programs/${programs.slug}`}
      //             target="_blank"
      //             rel="noopener noreferrer"
      //           // onClick={() => {
      //           //   shortlistToStorage(programs.id);
      //           // }}
      //           >
      //             <ButtonWrapper

      //               sx={{
      //                 width: "100%",
      //                 padding: '12px 25px',
      //                 borderRadius: '8px',
      //               }}
      //               variant="outlined"
      //             >
      //               Apply now!
      //             </ButtonWrapper>
      //           </a>
      //         </Link>
      //       )}
      //     </div>
      //   )}
      // </Stack>
    );
  }

  const handleClose = () => {
    // setPushToDashboard(false)
    setShowFoundationDialog(false);
  };
  const handleProgramSortlist = () => {
    if (activeProgramType === "foundation") {
      handleShortList(program.id, univerisity.foundationProgram.id);
    } else {
      handleShortList(program.id, "");
    }
    router.replace(`/dashboard?id=${univerisity?.id ?? ""}`);
  };

  return (
    <>
      <Stack
        direction={{ lg: "column", md: "column", sm: "column", xs: "column" }}
        gap={2}
        sx={{
          borderRadius: "16px",
          border: {
            lg: "1px solid #B4B4B4",
            md: "1px solid #B4B4B4",
            xs: "0px",
          },
          boxShadow: {
            lg: "0px 0px 0px 0px rgba(0, 0, 0, 0.13)",
            md: "0px 0px 0px 0px rgba(0, 0, 0, 0.13)",
            xs: "0px 2px 45px 0px rgba(0, 0, 0, 0.13)",
          },
          padding: "16px 18px",
        }}
        // flexWrap="wrap"
        bgcolor={{ lg: "transparent", md: "transparent", xs: "#ffffff" }}
        justifyContent="space-between"
        display={{ lg: "flex", md: "flex", sm: "flex", xs: "none" }}
      >
        {/* Topic  */}
        <Stack direction="row" alignItems="center" gap={2}>
          <Box sx={svgBox}>
            <UniversitySortedSvg />
          </Box>
          <Stack>
            <Box
              flexDirection={{
                lg: "row",
                md: "row",
                xs: "column",
                sm: "column",
              }}
              display="flex"
              gap="10px"
            >
              <Typography
                fontSize={{ lg: "18px", xs: "16px" }}
                fontFamily="HankenGroteskBold"
                color="#201C1A"
              >
                {program.name}
              </Typography>
              {/* <Divider orientation='vertical' flexItem />
            <Tooltip
              title="Scholarship Available"
              onClick={handleTooltipClick}
              placement="bottom-start"
            >
              <Stacks
                direction="row"
                alignItems="center"
                columnGap={0.5}
                sx={{ cursor: 'pointer' }}
              >
                <CheckCircle />
                <Typography color="#333" fontSize="14px">Excellent Match</Typography>
              </Stacks>
            </Tooltip> */}
            </Box>
          </Stack>
        </Stack>
        {/* Contents  */}
        <Grid
          pl={{ lg: "48px", md: "48px", xs: "0px" }}
          flexWrap="wrap"
          container
          spacing={2}
        >
          <Grid item lg={5} md={6} sm={6} xs={6}>
            <Stack direction="row" alignItems="flex-start" columnGap={1}>
              <CourseIcon />
              <Box display="flex" gap="5px" flexDirection="column">
                <Typography
                  fontSize="14px"
                  color="#000000"
                  fontFamily="HankenGroteskBold"
                >
                  Course fee
                </Typography>
                <Typography
                  fontSize="14px"
                  color="rgba(32, 28, 26, 0.90))"
                  fontFamily="HankenGroteskBold"
                >
                  {
                    program?.detail?.scholarshipRange &&
                    getScholarshipInfo({
                      scholarShipRange: program?.detail?.scholarshipRange,
                      currency: program?.detail?.base_currency,
                      wisescore: wisescore!,
                    }) ? (
                      <Box
                        justifyContent="center"
                        alignItems="flex-start"
                        display="flex"
                        flexDirection="column"
                      >
                        <span>
                          {/* {values.length > 0 ? convertedCosts[2] : 0} */}
                          {
                            getConvertedCosts(
                              calculateScholarship({
                                scholarShipRange:
                                  program?.detail?.scholarshipRange,
                                tutionFee:
                                  program?.detail?.fees?.tution_fee ?? 0,
                                wisescore: wisescore!,
                              }) ?? 0,
                              program.detail.base_currency
                            ).formattedValue
                          }{" "}
                          &nbsp;/&nbsp;year
                          {/* {finalDiscountedPrice(
                          program?.detail?.fees?.tution_fee ?? 0,
                          findValueInRanges(
                            program?.detail?.scholarshipRange,
                            wisescore!
                          )
                        )} */}
                        </span>
                        <span
                          style={{
                            fontFamily: "HankenGroteskRegular",
                            textDecoration: "line-through",
                            color: "red",
                          }}
                        >
                          {
                            getConvertedCosts(
                              program?.detail?.fees?.tution_fee,
                              program.detail.base_currency
                            ).formattedValue
                          }{" "}
                          &nbsp;/&nbsp;year
                        </span>{" "}
                      </Box>
                    ) : (
                      <>
                        {
                          getConvertedCosts(
                            program?.detail?.fees?.tution_fee ?? 0,
                            program.detail.base_currency
                          ).formattedValue
                        }{" "}
                        &nbsp;/&nbsp;year
                      </>
                    )

                    // values.length > 0 ? convertedCosts[1] : 0
                  }
                </Typography>
                {/* {program.detail.scholarShipRange && getScholarshipInfo({
                  scholarShipRange: program?.detail?.scholarshipRange,
                  currency: program?.detail?.base_currency,
                  wisescore: wisescore!,
                })} */}

                {program?.detail?.scholarshipRange &&
                  getScholarshipInfo({
                    scholarShipRange: program?.detail?.scholarshipRange,
                    currency: program?.detail?.base_currency,
                    wisescore: wisescore!,
                  }) && (
                    <Box
                      display="flex"
                      bgcolor="rgba(245, 242, 212, 1)"
                      borderRadius="8px"
                      padding="12px"
                      flexDirection="column"
                      gap="8px"
                    >
                      <ul style={{ paddingLeft: "20px", margin: "0" }}>
                        <li>
                          {getScholarshipInfo({
                            scholarShipRange: program?.detail?.scholarshipRange,
                            currency: program?.detail?.base_currency,
                            wisescore: wisescore!,
                          })}
                        </li>
                        {program.additionalScholarships && (
                          <>
                            {program.additionalScholarships.flyHigh && (
                              <li>
                                <Typography
                                  fontSize="14px"
                                  color="rgba(70, 49, 4, 1)"
                                  lineHeight="14.4px"
                                  fontWeight={400}
                                  fontFamily="HankenGroteskRegular"
                                >
                                  Eligible for Fly High Scholarship.
                                </Typography>
                                <FlyHighToolTip />
                              </li>
                            )}
                            {program.additionalScholarships.csc && (
                              <li>
                                <Typography
                                  fontSize="14px"
                                  color="rgba(70, 49, 4, 1)"
                                  lineHeight="14.4px"
                                  fontWeight={400}
                                  fontFamily="HankenGroteskRegular"
                                >
                                  Eligible for CSC Scholarship.
                                </Typography>
                                <CSCTooltip />
                              </li>
                            )}
                          </>
                        )}
                      </ul>
                    </Box>
                  )}
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            lg={3}
            md={6}
            sm={6}
            xs={6}
            borderRight={{ lg: "1px solid #D3D7D9", xs: "0px" }}
          >
            <Stack
              direction={{
                lg: "column",
                md: "column",
                sm: "column",
                xs: "row",
              }}
              gap={2}
            >
              <Grid container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Stack direction="row" alignItems="flex-start" columnGap={1}>
                    <CalendarSvg />
                    <Box display="flex" gap="5px" flexDirection="column">
                      <Typography
                        fontSize="14px"
                        color="#000000"
                        fontFamily="HankenGroteskBold"
                      >
                        Application deadlines
                      </Typography>
                      <Typography
                        fontSize="14px"
                        color="rgba(32, 28, 26, 0.90))"
                        fontFamily="HankenGroteskRegular"
                      >
                        {program?.detail?.general_application_deadline1
                          ? moment(
                              program?.detail?.general_application_deadline1 ??
                                ""
                            ).format("MMMM YYYY")
                          : "September 2025"}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Stack direction="row" alignItems="flex-start" columnGap={1}>
                    <GlobeSvg />
                    <Box display="flex" gap="5px" flexDirection="column">
                      <Typography
                        fontSize="14px"
                        color="#000000"
                        fontFamily="HankenGroteskBold"
                      >
                        Language taught
                      </Typography>
                      <Typography
                        fontSize="14px"
                        color="rgba(32, 28, 26, 0.90))"
                        fontFamily="HankenGroteskRegular"
                      >
                        English
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Stack direction="row" alignItems="flex-start" columnGap={1}>
                    <ClockIcons />
                    <Box display="flex" gap="5px" flexDirection="column">
                      <Typography
                        fontSize="14px"
                        color="#000000"
                        fontFamily="HankenGroteskBold"
                      >
                        Duration
                      </Typography>
                      <Typography
                        fontSize="14px"
                        color="rgba(32, 28, 26, 0.90))"
                        fontFamily="HankenGroteskRegular"
                      >
                        {program?.detail?.program_duration
                          ? `${program?.detail?.program_duration} years`
                          : "N/A"}
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
          {/* <Grid item borderRight={{ lg: '1px solid #D3D7D9', xs: '0px' }}
            lg={2.5} md={6} sm={6} xs={6}>
            <Stack direction="column" rowGap={2}>
              <Stack direction="row" alignItems="flex-start" columnGap={1}>
                <ClockIcons />
                <Box display="flex" gap="5px" flexDirection="column">
                  <Typography fontSize="14px" color="#000000" fontFamily="HankenGroteskBold">
                    Duration
                  </Typography>
                  <Typography
                    fontSize="14px"
                    color="rgba(32, 28, 26, 0.90))"
                    fontFamily="HankenGroteskRegular"
                  >
                    {program?.detail?.program_duration ? `${program?.detail?.program_duration} years` : 'N/A'}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid> */}
          <Grid
            display={{ lg: "flex", md: "flex", xs: "flex" }}
            justifyContent={{ lg: "center", xs: "flex-start" }}
            alignItems="center"
            item
            lg={4}
            md={6}
            sm={6}
            xs={12}
          >
            <Stack justifyContent="center">{buttonGroup()}</Stack>
          </Grid>
        </Grid>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle color="primary.main">Scholarship</DialogTitle>
          <DialogContent>
            <DialogContentText>
              USD $1500, deducted from the 1st year original tuition fee
            </DialogContentText>
          </DialogContent>
        </Dialog>
        <Dialog
          fullWidth
          open={showFoundationDialog}
          onClose={() => setShowFoundationDialog(false)}
        >
          <Box padding="25px 36px">
            <Box
              display="flex"
              width="100%"
              alignItems="flex-end"
              justifyContent="flex-end"
              sx={{
                cursor: "pointer",
              }}
            >
              <Close onClick={() => setShowFoundationDialog(false)} />
            </Box>
            <Box
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              display="flex"
            >
              <Box>
                <Typography
                  variant="h4"
                  fontSize="24px"
                  lineHeight="150%"
                  fontFamily="HankenGroteskExtraBold"
                >
                  Choose one program..
                </Typography>
                <Typography fontSize="14px" fontFamily="HankenGroteskRegular">
                  Select one program to proceed further application.
                </Typography>
              </Box>
            </Box>

            <Box
              mt="20px"
              flexDirection="column"
              display="flex"
              alignItems="center"
              width="100%"
            >
              <Box
                marginTop="20px"
                gap="20px"
                justifyContent="center"
                alignItems="center"
                flexDirection={{
                  lg: "row",
                  md: "row",
                  xs: "column",
                  sm: "row",
                }}
                width="100%"
                display="flex"
              >
                <Box
                  sx={{
                    cursor: "pointer",
                  }}
                  borderRadius="8px"
                  border={
                    activeProgramType === "foundation"
                      ? "1px solid #FF6B26"
                      : ""
                  }
                  onClick={() => setActiveProgramType("foundation")}
                  width="50%"
                >
                  <Box
                    padding="18px 14px"
                    borderRadius="8px"
                    boxShadow="0px 4px 16.8px 0px rgba(0, 0, 0, 0.10)"
                  >
                    <Box display="flex" gap="12px">
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        width="26px"
                        height="26px"
                        borderRadius="50%"
                        bgcolor="#003074"
                      >
                        <GetBookOpenIcon />
                      </Grid>
                      <Box display="flex" flexDirection="column">
                        <Typography
                          color="rgba(32, 28, 26, 0.90)"
                          fontSize="16px"
                          fontFamily="HankenGroteskSemiBold"
                        >
                          Foundation Program
                        </Typography>
                        <Typography
                          color="rgba(32, 28, 26, 0.95)"
                          fontSize="14px"
                          fontFamily="HankenGroteskRegular"
                        >
                          {program?.discipline?.name === "Engineering & IT"
                            ? "(Pre-Engineering)"
                            : "(Pre-Business)"}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider
                      sx={{
                        marginTop: "18px",
                        marginBottom: "14px",
                      }}
                    />
                    <Box display="flex" flexDirection="column" gap="7px">
                      <Typography
                        fontSize="14px"
                        color="rgba(0, 0, 0, 0.60)"
                        fontFamily="HankenGroteskSemiBold"
                      >
                        Starts At:{" "}
                        {moment(
                          univerisity.foundationProgram?.detail?.startDate ?? ""
                        ).format("MMMM YYYY")}
                      </Typography>
                      <Typography
                        fontSize="14px"
                        color="rgba(0, 0, 0, 0.60)"
                        fontFamily="HankenGroteskSemiBold"
                      >
                        Cost:{" "}
                        <Typography
                          ml={1}
                          fontFamily="HankenGroteskSemiBold"
                          color="#60B590"
                        >
                          {getConvertedCosts(
                            univerisity.foundationProgram?.detail?.fees
                              ?.tution_fee,
                            univerisity.base_currency
                          ).formattedValue ?? "NA"}
                          {/* `` {values.length > 0 ? convertedCosts[0] : 0} */}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  borderRadius="8px"
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveProgramType("real")}
                  border={
                    activeProgramType === "real" ? "1px solid #FF6B26" : ""
                  }
                  width="50%"
                >
                  <Box
                    padding="18px 14px"
                    borderRadius="8px"
                    boxShadow="0px 4px 16.8px 0px rgba(0, 0, 0, 0.10)"
                  >
                    <Box display="flex" gap="12px">
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        width="26px"
                        height="26px"
                        borderRadius="50%"
                        bgcolor="#003074"
                      >
                        <GetBookOpenIcon />
                      </Grid>
                      <Box display="flex" flexDirection="column">
                        <Typography
                          color="rgba(32, 28, 26, 0.90)"
                          fontSize="16px"
                          fontFamily="HankenGroteskSemiBold"
                        >
                          Bachelor Program
                        </Typography>
                        <Typography
                          color="rgba(32, 28, 26, 0.95)"
                          fontSize="14px"
                          fontFamily="HankenGroteskRegular"
                        >
                          {program?.discipline?.name === "Engineering & IT"
                            ? "(Engineering)"
                            : "(Business)"}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider
                      sx={{
                        marginTop: "18px",
                        marginBottom: "14px",
                      }}
                    />
                    <Box display="flex" flexDirection="column" gap="7px">
                      <Typography
                        fontSize="14px"
                        color="rgba(0, 0, 0, 0.60)"
                        fontFamily="HankenGroteskSemiBold"
                      >
                        Starts At:{" "}
                        {moment(program?.detail?.startDate ?? "").format(
                          "MMM DD, YYYY"
                        )}
                      </Typography>
                      <Typography
                        fontSize="14px"
                        color="rgba(0, 0, 0, 0.60)"
                        fontFamily="HankenGroteskSemiBold"
                      >
                        Cost:{" "}
                        <Typography
                          ml={1}
                          fontFamily="HankenGroteskSemiBold"
                          color="#60B590"
                        >
                          {getConvertedCosts(
                            program?.detail?.fees?.tution_fee,
                            program.detail.base_currency
                          ).formattedValue ?? ""}
                          {/* {values.length > 0 ? convertedCosts[1] : 0} */}
                        </Typography>
                      </Typography>
                    </Box>
                  </Box>
                  {/* <ButtonWrapper
                  sx={{
                    width: '100%',
                    color: 'primary.main',
                    border: '1px solid #FF6B26',
                    bgcolor: 'white',
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#FFE1D4'
                    }
                  }}
                  onClick={() => {
                    handleShortList(program.id, '')

                  }}
                >Normal</ButtonWrapper> */}
                </Box>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt="32px"
              >
                <ButtonWrapper
                  disabled={activeProgramType === ""}
                  size="medium"
                  sx={{
                    width: "160px",
                  }}
                  onClick={handleProgramSortlist}
                >
                  Done
                </ButtonWrapper>
              </Box>
            </Box>
          </Box>
        </Dialog>
      </Stack>

      {/* For Mobile */}
      {/* <Box
        flexDirection={{ lg: 'column', md: 'column', sm: 'column', xs: 'column' }}
        gap={2}
        display={{ lg: "none", md: "none", sm: "none", xs: "flex" }}
        bgcolor={{ lg: 'transparent', md: 'transparent', xs: '#ffffff' }}
        justifyContent="space-between"
        sx={{
          borderRadius: '16px',
          border: { lg: '1px solid #B4B4B4', md: '1px solid #B4B4B4', xs: '0px' },
          boxShadow: { lg: '0px 0px 0px 0px rgba(0, 0, 0, 0.13)', md: '0px 0px 0px 0px rgba(0, 0, 0, 0.13)', xs: '0px 2px 45px 0px rgba(0, 0, 0, 0.13)' },
        }}
      > */}
      <Stack
        flexDirection={{
          lg: "column",
          md: "column",
          sm: "column",
          xs: "column",
        }}
        gap={2}
        display={{ lg: "none", md: "none", sm: "none", xs: "flex" }}
        bgcolor={{ lg: "transparent", md: "transparent", xs: "transparent" }}
        justifyContent="space-between"
        sx={{
          borderRadius: "16px",
          border: {
            lg: "1px solid #B4B4B4",
            md: "1px solid #B4B4B4",
            xs: "1px solid #B4B4B4",
          },
          boxShadow: {
            lg: "0px 0px 0px 0px rgba(0, 0, 0, 0.13)",
            md: "0px 0px 0px 0px rgba(0, 0, 0, 0.13)",
            xs: "1px 1px 1px 1px rgba(13, 24, 41, 0.08)",
          },
          padding: "16px 18px",
        }}
        flexWrap="wrap"
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Box sx={svgBox}>
            <UniversitySortedSvg />
          </Box>
          <Stack>
            <Box
              flexDirection={{
                lg: "row",
                md: "row",
                xs: "column",
                sm: "column",
              }}
              display="flex"
              gap="10px"
            >
              <Typography
                fontSize={{ lg: "18px", xs: "16px" }}
                fontFamily="HankenGroteskBold"
                color="#201C1A"
              >
                {program.name}
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Stack direction="row" alignItems="flex-start" columnGap={1}>
              <CourseIcon />
              <Box display="flex" gap="5px" flexDirection="column">
                <Typography
                  fontSize="14px"
                  color="#000000"
                  fontFamily="HankenGroteskBold"
                >
                  Course fee
                </Typography>
                <Typography
                  fontSize="14px"
                  color="rgba(32, 28, 26, 0.90))"
                  fontFamily="HankenGroteskBold"
                >
                  {
                    program?.detail?.scholarshipRange &&
                    getScholarshipInfo({
                      scholarShipRange: program?.detail?.scholarshipRange,
                      currency: program?.detail?.base_currency,
                      wisescore: wisescore!,
                    }) ? (
                      <Box
                        justifyContent="center"
                        alignItems="flex-start"
                        display="flex"
                        gap="13px"
                      >
                        <span
                          style={{
                            fontFamily: "HankenGroteskRegular",
                            textDecoration: "line-through",
                            color: "red",
                          }}
                        >
                          {
                            getConvertedCosts(
                              program?.detail?.fees?.tution_fee,
                              program.detail.base_currency
                            ).formattedValue
                          }{" "}
                          &nbsp;/&nbsp;year
                        </span>{" "}
                        <span>
                          {/* {values.length > 0 ? convertedCosts[2] : 0} */}
                          {
                            getConvertedCosts(
                              calculateScholarship({
                                scholarShipRange:
                                  program?.detail?.scholarshipRange,
                                tutionFee:
                                  program?.detail?.fees?.tution_fee ?? 0,
                                wisescore: wisescore!,
                              }) ?? 0,
                              program.detail.base_currency
                            ).formattedValue
                          }{" "}
                          &nbsp;/&nbsp;year
                          {/* {finalDiscountedPrice(
                          program?.detail?.fees?.tution_fee ?? 0,
                          findValueInRanges(
                            program?.detail?.scholarshipRange,
                            wisescore!
                          )
                        )} */}
                        </span>
                      </Box>
                    ) : (
                      <>
                        {
                          getConvertedCosts(
                            program?.detail?.fees?.tution_fee ?? 0,
                            program.detail.base_currency
                          ).formattedValue
                        }{" "}
                        &nbsp;/&nbsp;year
                      </>
                    )

                    // values.length > 0 ? convertedCosts[1] : 0
                  }
                </Typography>

                {/* if you got csc and flyhigh and only show csc then uncomment this */}
                {/* {program?.detail?.scholarshipRange && (
                  <Box
                    display="flex"
                    bgcolor="rgba(245, 242, 212, 1)"
                    borderRadius="8px"
                    padding="12px"
                    flexDirection="column"
                    gap="8px"
                  >
                    <ul style={{ paddingLeft: '20px', margin: '0' }}>
                      <li>
                        {getScholarshipInfo({
                          scholarShipRange: program?.detail?.scholarshipRange,
                          currency: program?.detail?.base_currency,
                          wisescore: wisescore!,
                        })}
                      </li>
                      {program.additionalScholarships && (
                        <>
                          {program.additionalScholarships.csc ? (
                            <>
                              <Typography fontWeight={600} sx={{ textDecoration: "underline" }}>CSC Silk Road Scholarship</Typography>
                              <li>
                                <Typography fontSize="14px" color="black" lineHeight="14.4px" fontWeight={400} fontFamily="HankenGroteskRegular">Total Tuition fee waive</Typography>
                              </li>
                              <li>
                                <Typography fontSize="14px" color="black" lineHeight="14.4px" fontWeight={400} fontFamily="HankenGroteskRegular">Earn up to 3000 CNY/mth stipend.</Typography>
                              </li>
                              <li>
                                <Typography fontSize="14px" color="black" lineHeight="14.4px" fontWeight={400} fontFamily="HankenGroteskRegular">Accommodation fee waive.</Typography>
                              </li>
                              <li>
                                <Typography fontSize="14px" color="black" lineHeight="14.4px" fontWeight={400} fontFamily="HankenGroteskRegular">Insurance.</Typography>
                              </li>
                            </>
                          ) : (
                            <>
                              {program.additionalScholarships.flyHigh && (
                                <>
                                  <Typography fontWeight={600} sx={{ textDecoration: "underline" }}>Fly High Scholarship</Typography>
                                  <li>
                                    <Typography fontSize="14px" color="black" lineHeight="14.4px" fontWeight={400} fontFamily="HankenGroteskRegular">Get your full tuition waived for first year</Typography>
                                  </li>
                                  <li>
                                    <Typography fontSize="14px" color="black" lineHeight="14.4px" fontWeight={400} fontFamily="HankenGroteskRegular">Earn up to 1500 CNY/mth stipend (Bachelor).</Typography>
                                  </li>
                                  <li>
                                    <Typography fontSize="14px" color="black" lineHeight="14.4px" fontWeight={400} fontFamily="HankenGroteskRegular">Earn up to 3000 CNY/mth stipend (Master).</Typography>
                                  </li>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </ul>
                  </Box>
                )} */}

                {program?.detail?.scholarshipRange &&
                  getScholarshipInfo({
                    scholarShipRange: program?.detail?.scholarshipRange,
                    currency: program?.detail?.base_currency,
                    wisescore: wisescore!,
                  }) && (
                    <Box
                      display="flex"
                      bgcolor="rgba(245, 242, 212, 1)"
                      borderRadius="8px"
                      padding="12px"
                      flexDirection="column"
                      gap="8px"
                    >
                      <ul style={{ paddingLeft: "20px", margin: "0" }}>
                        <li>
                          {getScholarshipInfo({
                            scholarShipRange: program?.detail?.scholarshipRange,
                            currency: program?.detail?.base_currency,
                            wisescore: wisescore!,
                          })}
                        </li>
                        {program.additionalScholarships && (
                          <>
                            {program.additionalScholarships.flyHigh && (
                              <>
                                <Typography
                                  fontWeight={600}
                                  sx={{ textDecoration: "underline" }}
                                >
                                  Fly High Scholarship
                                </Typography>
                                <li>
                                  <Typography
                                    fontSize="14px"
                                    color="black"
                                    lineHeight="14.4px"
                                    fontWeight={400}
                                    fontFamily="HankenGroteskRegular"
                                  >
                                    Get your full tuition waived for first year
                                  </Typography>
                                </li>
                                <li>
                                  <Typography
                                    fontSize="14px"
                                    color="black"
                                    lineHeight="14.4px"
                                    fontWeight={400}
                                    fontFamily="HankenGroteskRegular"
                                  >
                                    Earn up to 1500 CNY/mth stipend (Bachelor).
                                  </Typography>
                                </li>
                                <li>
                                  <Typography
                                    fontSize="14px"
                                    color="black"
                                    lineHeight="14.4px"
                                    fontWeight={400}
                                    fontFamily="HankenGroteskRegular"
                                  >
                                    Earn up to 3000 CNY/mth stipend (Master).
                                  </Typography>
                                </li>
                              </>
                            )}
                            {program.additionalScholarships.csc && (
                              <>
                                <Typography
                                  fontWeight={600}
                                  sx={{ textDecoration: "underline" }}
                                >
                                  CSC Silk Road Scholarship
                                </Typography>
                                <li>
                                  <Typography
                                    fontSize="14px"
                                    color="black"
                                    lineHeight="14.4px"
                                    fontWeight={400}
                                    fontFamily="HankenGroteskRegular"
                                  >
                                    Total Tuition fee waive
                                  </Typography>
                                </li>
                                <li>
                                  <Typography
                                    fontSize="14px"
                                    color="black"
                                    lineHeight="14.4px"
                                    fontWeight={400}
                                    fontFamily="HankenGroteskRegular"
                                  >
                                    Earn up to 3000 CNY/mth stipend.
                                  </Typography>
                                </li>
                                <li>
                                  <Typography
                                    fontSize="14px"
                                    color="black"
                                    lineHeight="14.4px"
                                    fontWeight={400}
                                    fontFamily="HankenGroteskRegular"
                                  >
                                    Accommodation fee waive.
                                  </Typography>
                                </li>
                                <li>
                                  <Typography
                                    fontSize="14px"
                                    color="black"
                                    lineHeight="14.4px"
                                    fontWeight={400}
                                    fontFamily="HankenGroteskRegular"
                                  >
                                    Insurance.
                                  </Typography>
                                </li>
                              </>
                            )}
                          </>
                        )}
                      </ul>
                    </Box>
                  )}
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Stack direction="row" alignItems="flex-start" columnGap={1}>
              <CalendarSvg />
              <Box display="flex" gap="5px" flexDirection="column">
                <Typography
                  fontSize="14px"
                  color="#000000"
                  fontFamily="HankenGroteskBold"
                >
                  Application deadline
                </Typography>
                <Typography
                  fontSize="14px"
                  color="rgba(32, 28, 26, 0.90))"
                  fontFamily="HankenGroteskRegular"
                >
                  {program?.detail?.general_application_deadline1
                    ? moment(
                        program?.detail?.general_application_deadline1 ?? ""
                      ).format("MMMM YYYY")
                    : "September 2025"}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={5.8} sm={6} md={6} lg={6}>
            <Stack direction="row" alignItems="flex-start" columnGap={1}>
              <ClockIcons />
              <Box display="flex" gap="5px" flexDirection="column">
                <Typography
                  fontSize="14px"
                  color="#000000"
                  fontFamily="HankenGroteskBold"
                >
                  Duration
                </Typography>
                <Typography
                  fontSize="14px"
                  color="rgba(32, 28, 26, 0.90))"
                  fontFamily="HankenGroteskRegular"
                >
                  {program?.detail?.program_duration
                    ? `${program?.detail?.program_duration} years`
                    : "N/A"}
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6.2} sm={6} md={6} lg={6}>
            <Stack direction="row" alignItems="flex-start" columnGap={1}>
              <GlobeSvg />
              <Box display="flex" gap="5px" flexDirection="column">
                <Typography
                  fontSize="14px"
                  color="#000000"
                  fontFamily="HankenGroteskBold"
                >
                  Language taught
                </Typography>
                <Typography
                  fontSize="14px"
                  color="rgba(32, 28, 26, 0.90))"
                  fontFamily="HankenGroteskRegular"
                >
                  English
                </Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>
            <Divider />
            <Box sx={{ marginTop: 2 }} />
            {smallbuttonGroupTwo()}
          </Grid>
        </Grid>
      </Stack>
      {/* <Box>
          <Stack
            direction="row"
            alignItems="flex-start"
            columnGap={1}
            sx={{
              padding: 0,
              '& > *': {
                width: '100%',
              },
            }}
          >
            {smallbuttonGroup()}
          </Stack>
        </Box> */}
      {/* </Box> */}
    </>
  );
}

export default ProgramsSubCard;
