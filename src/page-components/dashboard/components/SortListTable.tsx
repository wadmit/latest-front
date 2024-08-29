"use client";
import { mixpanelSubmit } from "@/api/web/mixpanel.action";
import { deleteSortlist } from "@/api/web/shortlist.action";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import { setCreatedApplications } from "@/global-states/reducers/applicationReducer";
import { removeShortlistedProgram } from "@/global-states/reducers/userReducer";
import { analytics } from "@/services/analytics.service";
import { IApplication } from "@/types/application";
import {
  EAnalyticsEvents,
  EAnalyticsFieldName,
  EAnalyticsStatus,
} from "@/types/mix-panel-analytic";
import { Shortlist, TShortListDetails } from "@/types/sortlist";
import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { StyledTableCell } from "../utils/provider";
import { PlusIcon } from "$/svg";
import {
  calculateScholarship,
  getScholarshipInfo,
} from "@/common/utils/getScholarship";
import { Chip } from "./Chip";
import { createApplication } from "@/api/web/application.action";
import { IProgram } from "@/types/program";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}
const columns: readonly Column[] = [
  { id: "id", label: "S.No" },
  { id: "university", label: "University" },
  { id: "program", label: "Program" },
  { id: "start_date", label: "Start Date" },
  { id: "Course Fee", label: "Course Fee", minWidth: 100 },
  { id: "Application Fee", label: "Application Fee" },
];

const monthList = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

interface ShortlistsTableProps {
  shortlistDetails?: TShortListDetails[];
  Shortlists: IProgram[];
  handleStep: (value: number) => void;
  getConvertedCosts: (
    value: number,
    base_currency: string
  ) => {
    formattedValue: string;
    amount: number;
  };
}
function ShortListTable({
  shortlistDetails,
  Shortlists,
  handleStep,
  getConvertedCosts,
}: ShortlistsTableProps) {
  const leadId = localStorage.getItem("leadId");
  const email = localStorage.getItem("email");
  const dispatch = useAppDispatch();
  const wisescore = useAppSelector(
    (state) => state.user.dashboardDataGlobal?.score
  );
  const country = useAppSelector((state) => state.currency.currentCountry);
  const city = useAppSelector((state) => state.currency.city);

  const { mutate: deleteShortlist } = useMutation({
    mutationFn: async (programId: string) => await deleteSortlist(programId),
    onSuccess: (res) => {
      dispatch(removeShortlistedProgram(res));
      analytics.websiteButtonInteractions({
        buttonName: "Delete Shortlist",
        source: `Deleted shortlisted application from shortlist table`,
        urlPath: window.location.href,
        event_type: EAnalyticsEvents.DELETE_SHORTLIST,
        status: EAnalyticsStatus.SUCCESS,
        redirectPath: "/shortlist",
      });
    },
    onError: (err) => {
      if (leadId && email) {
        mixpanelSubmit({
          email: email,
          event_title: EAnalyticsEvents.WEBSITE_BUTTON_INTERACTIONS,
          event_type: EAnalyticsEvents.DELETE_SHORTLIST,
          status: EAnalyticsStatus.ERROR,
          reference: "Lead",
          user_id: leadId,
          url_path: window.location.href,
          redirectPath: "",
          location: {
            countryName: country,
            city,
          },
          description: `Deleted shortlisted application from shortlist table`,
        });
      }
      analytics.trackEvent(EAnalyticsEvents.ERROR, {
        source: "Shortlist Application delete failure",
        message: err,
      });
    },
  });

  const afterStartingApplicationSuccess = (response: IApplication[]) => {
    dispatch(setCreatedApplications(response));
    Shortlists.forEach((s) => {
      dispatch(removeShortlistedProgram(s.id));
    });
    response.forEach((r) => {
      const subDisciplines = r.program?.sub_discipline.map((s) => s.name);
      analytics.trackEvent(EAnalyticsEvents.START_APPLICATION, {
        [EAnalyticsFieldName.PROGRAM_TYPE]:
          r.program?.type.name ?? EAnalyticsFieldName.PROGRAM_TYPE,
        [EAnalyticsFieldName.PROGRAM]:
          r.program?.name ?? EAnalyticsFieldName.PROGRAM,
        [EAnalyticsFieldName.DISCIPLINE]:
          r.program?.discipline.name ?? EAnalyticsFieldName.DISCIPLINE,
        [EAnalyticsFieldName.SUBDISCIPLINE]:
          subDisciplines ?? EAnalyticsFieldName.SUBDISCIPLINE,
        [EAnalyticsFieldName.UNIVERSITY_NAME]:
          r.university.name ?? EAnalyticsFieldName.UNIVERSITY_NAME,
      });
    });
    handleStep(4);
  };

  const { mutate: startApplications, isPending } = useMutation({
    mutationFn: async () => {
      await createApplication(Shortlists.map((s) => s.id));
    },
    onSuccess: (res: any) => {
      console.log(res);
      afterStartingApplicationSuccess(res?.data.data as IApplication[]);
    },
    onError: (err) => {
      analytics.trackEvent(EAnalyticsEvents.ERROR, {
        source: "Start application from student dashboard",
        message: err,
      });
    },
  });

  const handleDeleteShortList = async (id: string) => {
    if (window.confirm("Are you Sure you want to Unlist this program")) {
      deleteShortlist(id);
    }
  };

  return (
    <Stack>
      {/* Displaying Table */}
      <TableContainer
        component={Paper}
        sx={{ overflowX: "auto", width: "100%" }}
      >
        <Table sx={{ minWidth: "700px" }} aria-label="application table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  sortDirection={false}
                  key={column.id}
                  align={column.align}
                  sx={{ padding: "4px 4px" }}
                  style={{
                    minWidth: column.minWidth,
                    background: "#FAFAFA",
                  }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Shortlists.map((row, i) => {
              const foundation =
                shortlistDetails &&
                shortlistDetails.find((s) => s?.program?.id === row.id)
                  ?.foundation;
              const rawDate = foundation
                ? foundation?.detail?.startDate
                : row?.detail?.startDate;

              const date = new Date(rawDate);

              const month = date.getMonth();
              const year = date.getFullYear();

              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                  <StyledTableCell align="left">
                    <Typography
                      variant="caption"
                      fontSize="14px"
                      fontFamily="HankenGroteskSemiBold"
                      lineHeight="19.6px"
                    >
                      {i + 1}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography
                      variant="caption"
                      fontSize="14px"
                      fontFamily="HankenGroteskSemiBold"
                      lineHeight="19.6px"
                    >
                      {row.university.name}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography
                      variant="caption"
                      fontSize="14px"
                      fontFamily="HankenGroteskSemiBold"
                      lineHeight="19.6px"
                      display="flex"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      textAlign="center"
                    >
                      <Typography
                        fontSize="14px"
                        fontStyle="normal"
                        fontFamily="HankenGroteskSemiBold"
                        lineHeight="18px"
                      >
                        {foundation ? <Chip text="Foundation" /> : ""}
                      </Typography>
                      {foundation && (
                        <Box display="flex" mb={2}>
                          {" "}
                          <PlusIcon />
                        </Box>
                      )}
                      {row?.name}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Typography
                      variant="caption"
                      fontSize="14px"
                      fontFamily="HankenGroteskSemiBold"
                      lineHeight="19.6px"
                    >
                      {`${monthList[month]} ${year}`}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Stack
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      <Typography
                        fontSize="14px"
                        color="rgba(32, 28, 26, 0.90)"
                        fontFamily="HankenGroteskExtraBold"
                      >
                        {/* ${' '} */}
                        {
                          wisescore &&
                          row?.detail?.scholarshipRange &&
                          getScholarshipInfo({
                            scholarShipRange: row?.detail?.scholarshipRange,
                            currency: row?.detail?.base_currency,
                            wisescore: wisescore!,
                          }) ? (
                            <Box display="flex" flexDirection="column">
                              <span
                                style={{
                                  fontFamily: "HankenGroteskRegular",
                                  textDecoration: "line-through",
                                  color: "red",
                                }}
                              >
                                {
                                  getConvertedCosts(
                                    row?.detail?.fees?.tution_fee,
                                    row.detail.base_currency ?? "usd"
                                  ).formattedValue
                                }
                              </span>{" "}
                              <span>
                                {/* {values.length > 0 ? convertedCosts[2] : 0} */}
                                {
                                  getConvertedCosts(
                                    calculateScholarship({
                                      scholarShipRange:
                                        row?.detail?.scholarshipRange,
                                      tutionFee:
                                        row?.detail?.fees?.tution_fee ?? 0,
                                      wisescore: wisescore!,
                                    }) ?? 0,
                                    row.detail.base_currency ?? "usd"
                                  ).formattedValue
                                }
                              </span>
                            </Box>
                          ) : (
                            getConvertedCosts(
                              row?.detail?.fees?.tution_fee ?? 0,
                              row.detail.base_currency ?? "usd"
                            ).formattedValue
                          )
                          // values.length > 0 ? convertedCosts[1] : 0
                        }
                      </Typography>
                    </Stack>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Stack
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        flexDirection: "row",
                      }}
                    >
                      {row.university.admission_free && (
                        <Typography
                          sx={{
                            color: "var(--primary-main, #e66022)",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontFamily: "HankenGroteskRegular",
                            lineHeight: "140%",
                            textDecoration: "none",
                            mr: "5px",
                          }}
                        >
                          Free
                        </Typography>
                      )}
                      <Typography
                        variant="subtitle1_sb"
                        fontSize="14px"
                        color=""
                        fontFamily="HankenGroteskExtraBold"
                        sx={{
                          textDecoration: row.university.admission_free
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {
                          getConvertedCosts(
                            row?.university?.detail?.fees["Application Fee"],
                            row.university.base_currency
                          ).formattedValue
                        }
                      </Typography>
                      <Button
                        variant="text"
                        sx={{ backgroundColor: "transparent" }}
                        onClick={() => handleDeleteShortList(row.id)}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="fluent:delete-24-regular">
                            <path
                              id="Vector"
                              d="M10 5H14C14 4.46957 13.7893 3.96086 13.4142 3.58579C13.0391 3.21071 12.5304 3 12 3C11.4696 3 10.9609 3.21071 10.5858 3.58579C10.2107 3.96086 10 4.46957 10 5ZM8.5 5C8.5 4.54037 8.59053 4.08525 8.76642 3.66061C8.94231 3.23597 9.20012 2.85013 9.52513 2.52513C9.85013 2.20012 10.236 1.94231 10.6606 1.76642C11.0852 1.59053 11.5404 1.5 12 1.5C12.4596 1.5 12.9148 1.59053 13.3394 1.76642C13.764 1.94231 14.1499 2.20012 14.4749 2.52513C14.7999 2.85013 15.0577 3.23597 15.2336 3.66061C15.4095 4.08525 15.5 4.54037 15.5 5H21.25C21.4489 5 21.6397 5.07902 21.7803 5.21967C21.921 5.36032 22 5.55109 22 5.75C22 5.94891 21.921 6.13968 21.7803 6.28033C21.6397 6.42098 21.4489 6.5 21.25 6.5H19.93L18.76 18.611C18.6702 19.539 18.238 20.4002 17.5477 21.0268C16.8573 21.6534 15.9583 22.0004 15.026 22H8.974C8.04186 22.0001 7.1431 21.653 6.45295 21.0265C5.7628 20.3999 5.33073 19.5388 5.241 18.611L4.07 6.5H2.75C2.55109 6.5 2.36032 6.42098 2.21967 6.28033C2.07902 6.13968 2 5.94891 2 5.75C2 5.55109 2.07902 5.36032 2.21967 5.21967C2.36032 5.07902 2.55109 5 2.75 5H8.5ZM10.5 9.75C10.5 9.55109 10.421 9.36032 10.2803 9.21967C10.1397 9.07902 9.94891 9 9.75 9C9.55109 9 9.36032 9.07902 9.21967 9.21967C9.07902 9.36032 9 9.55109 9 9.75V17.25C9 17.4489 9.07902 17.6397 9.21967 17.7803C9.36032 17.921 9.55109 18 9.75 18C9.94891 18 10.1397 17.921 10.2803 17.7803C10.421 17.6397 10.5 17.4489 10.5 17.25V9.75ZM14.25 9C14.4489 9 14.6397 9.07902 14.7803 9.21967C14.921 9.36032 15 9.55109 15 9.75V17.25C15 17.4489 14.921 17.6397 14.7803 17.7803C14.6397 17.921 14.4489 18 14.25 18C14.0511 18 13.8603 17.921 13.7197 17.7803C13.579 17.6397 13.5 17.4489 13.5 17.25V9.75C13.5 9.55109 13.579 9.36032 13.7197 9.21967C13.8603 9.07902 14.0511 9 14.25 9ZM6.734 18.467C6.78794 19.0236 7.04724 19.5403 7.46137 19.9161C7.87549 20.292 8.41475 20.5001 8.974 20.5H15.026C15.5853 20.5001 16.1245 20.292 16.5386 19.9161C16.9528 19.5403 17.2121 19.0236 17.266 18.467L18.424 6.5H5.576L6.734 18.467Z"
                              fill="#5B5B5B"
                            />
                          </g>
                        </svg>
                      </Button>
                    </Stack>
                  </StyledTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {Shortlists.length > 0 && (
        <Box mt={2}>
          <Button
            disabled={isPending}
            type="button"
            variant="contained"
            onClick={() => {
              analytics.websiteButtonInteractions({
                buttonName: "Start Applications",
                source: "Student has started an application",
                urlPath: window.location.href,
                event_type: EAnalyticsEvents.START_APPLICATION,
                status: EAnalyticsStatus.SUCCESS,
                redirectPath: window.location.href,
              });
              startApplications();
            }}
          >
            Start Applications
          </Button>
        </Box>
      )}
    </Stack>
  );
}

export default ShortListTable;
