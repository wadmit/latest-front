"use client";
import { PlusIcon } from "public/svg";
import { removeApplication } from "@/api/web/application.action";
import {
  paymentEsewaVerify,
  postEsewaPayment,
  postStripePayment,
} from "@/api/web/payment.action";
import Loader from "@/components/common/circular-loader/Loader";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import {
  setStatusOfAllSelectedApplication,
  setUserApplications,
} from "@/global-states/reducers/applicationReducer";
import useCostConverterMain from "@/hooks/costConverterMain";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { analytics } from "@/services/analytics.service";
import { IApplication } from "@/types/application";
import {
  EAnalyticsEvents,
  EAnalyticsFieldName,
  EAnalyticsStatus,
} from "@/types/mix-panel-analytic";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useState } from "react";
import { CrossIcon, EsewaIcon, SelectedTickIcon, StripeIcon } from "../svg";
import { allMonths } from "../utils/data";
import { StyledTableCell } from "../utils/provider";
import Alert from "./Alert";
import { Chip } from "./Chip";
import PaymentStatus from "./PaymentStatus";
import { filter } from "lodash";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}
const columns: readonly Column[] = [
  { id: "university", label: "University", minWidth: 130 },
  { id: "program", label: "Program", minWidth: 110 },
  { id: "start_date", label: "Start Date", minWidth: 110 },
  { id: "application_fee", label: "Application Fee", minWidth: 140 },
  { id: "payment", label: "Payment", minWidth: 90 },
  {
    id: "actions",
    label: "",
    minWidth: 110,
  },
];

interface IProps {
  status: boolean;
  // applications: IApplication[];
  // getConvertedCosts: (
  //   value: number,
  //   base_currency: string
  // ) => {
  //   formattedValue: string;
  //   amount: number;
  // };
}
function ApplicationTable({ status }: IProps) {
  const [selectedApplications, setIsSelectedApplications] = useState<string[]>(
    []
  );
  const [showPaymentOptions, setShowPaymentOptions] = useState<boolean>(false);
  const currentCountry = useAppSelector(
    (state) => state.currency.currentCountry
  );
  const [activePaymentType, setActivePaymentType] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const userApplications = useAppSelector(
    (state) => state.applications.applications
  );
  const [applications, setApplications] = useState<IApplication[]>([]);

  // const to = useAppSelector((state) => state.currency.to);
  // const params = useParams();
  // const dispatch = useAppDispatch();
  // const router = useRouter();

  const to = useAppSelector((state) => state.currency.to);
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getConvertedCosts = useCostConverterMain();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (id: string) => await removeApplication(id),
    onSuccess: (data, variables) => {
      const newApplications = userApplications.filter(
        (application) => application.id !== variables
      );
      //This is hack not a good approach to reload a page
      window.location.reload();

      dispatch(setUserApplications({ data: newApplications }));
    },
  });
  const {
    mutate: paymentMutate,
    data: paymentData,
    isPending: isPaymentLoading,
  } = useMutation({
    mutationFn: postStripePayment,
    onSuccess: async (data) => {
      if (data.data === "") {
        dispatch(
          setStatusOfAllSelectedApplication({
            application: selectedApplications,
          })
        );
        const admissionFreeApplications = userApplications.filter(
          (f) => f.university.admission_free
        );
        const applicationPayable = admissionFreeApplications.filter((app) =>
          selectedApplications.includes(app.id)
        );
        applicationPayable.map((a) =>
          analytics.trackEvent(EAnalyticsEvents.PAY_APPLICATION_FEE, {
            [EAnalyticsFieldName.APPLICATION_ID]: a.id,
            [EAnalyticsFieldName.STATUS]: true,
          })
        );

        setIsSelectedApplications([]);
      } else {
        const admissionFreeApplications = userApplications.filter(
          (f) => f.university.admission_free
        );
        const applicationPayable = admissionFreeApplications.filter((app) =>
          selectedApplications.includes(app.id)
        );
        applicationPayable.map((a) =>
          analytics.trackEvent(EAnalyticsEvents.PAY_APPLICATION_FEE, {
            [EAnalyticsFieldName.APPLICATION_ID]: a.id,
            [EAnalyticsFieldName.STATUS]: true,
          })
        );

        window.location.assign(data.data);
      }
    },
  });

  const {
    mutate: paymentEsewa,
    data: paymentEsewaData,
    isPending: isPaymentEsewaLoading,
  } = useMutation({
    mutationFn: postEsewaPayment,
    onSuccess: async (data) => {
      if (data.data) {
        const path = process.env.NEXT_PUBLIC_ESEWA_PATH!;
        const formData = data.data;
        const form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);
        for (const key in formData) {
          const hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", formData[key]);
          form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        form.submit();
      }
    },
  });

  // const { data: esewaData, isLoading: esewaVerificationLoading } =
  //   useCustomQuery({
  //     queryKey: ["esewaVerifty"],
  //     queryFn: () => paymentEsewaVerify((params.data as string) ?? ""),
  //     onSuccess: (data) => {
  //       router.replace("/dashboard");
  //       // window.location.reload();
  //       // router.reload()
  //     },
  //     onError: (error) => {
  //       enqueueSnackbar("Payment verification failed", { variant: "error" });
  //       router.replace("/dashboard");

  //       // window.location.reload();
  //     },
  //     enabled: params && !!params.data,
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //   });
  // const handlePopUpPayment = () => {
  //   if (activePaymentType === "stripe") {
  //     paymentMutate({ formValues: selectedApplications, type: "multiple" });
  //   }
  //   if (activePaymentType === "esewa") {
  //     // esewa payment
  //     paymentEsewa({ formValues: selectedApplications, type: "multiple" });
  //   }
  // };

  const { data: esewaData, isLoading: esewaVerificationLoading } =
    useCustomQuery({
      queryKey: ["esewaVerifty"],
      queryFn: () => paymentEsewaVerify(params.get("data") ?? ""),
      onSuccess: (data) => {
        router.replace("/dashboard");
        // window.location.reload();
        // router.reload()
      },
      onError: (error) => {
        enqueueSnackbar("Payment verification failed", { variant: "error" });
        router.replace("/dashboard");

        // window.location.reload();
      },
      enabled: params && !!params.get("data"),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });
  const handlePopUpPayment = () => {
    if (activePaymentType === "stripe") {
      paymentMutate({ formValues: selectedApplications, type: "multiple" });
    }
    if (activePaymentType === "esewa") {
      // esewa payment
      paymentEsewa({ formValues: selectedApplications, type: "multiple" });
    }
  };

  const togglePaymentModal = () => {
    setShowPaymentOptions((prev) => !prev);
  };
  const toggleApplication = (id: string) => {
    if (selectedApplications.includes(id)) {
      const newSelectedApplications = selectedApplications.filter(
        (application) => application !== id
      );
      setIsSelectedApplications(newSelectedApplications);
    } else {
      const newSelectedApplications = [...selectedApplications, id];
      setIsSelectedApplications(newSelectedApplications);
    }
  };

  // for all application either select or remove
  const toggleApplicationAll = () => {
    if (selectedApplications.length === applications.length) {
      setIsSelectedApplications([]);
    } else {
      const newSelectedApplications = applications.map(
        (application) => application.id
      );
      setIsSelectedApplications(newSelectedApplications);
    }
  };

  const calculateTotalAmountFromSelected = useCallback(
    () =>
      selectedApplications.reduce((acc, curr) => {
        const foundApplication = applications.find(
          (application) => application.id === curr
        );
        if (foundApplication) {
          return (
            acc +
            (foundApplication.university.admission_free
              ? 0
              : getConvertedCosts(
                  foundApplication.university.detail.fees["Application Fee"],
                  foundApplication.university.base_currency
                ).amount)
          );
        }
        return acc;
      }, 0),
    [selectedApplications]
  );

  const calculateTotalAmountFromAll = useCallback(
    () =>
      applications.reduce(
        (acc, curr) =>
          acc +
          (curr.university.admission_free
            ? 0
            : getConvertedCosts(
                curr.university.detail.fees["Application Fee"],
                curr.university.base_currency
              ).amount),
        0
      ),
    [applications]
  );

  // helps to get date

  const getMonthAndYear = (date?: Date | number | string): string => {
    if (date) {
      const dateInReal = new Date(date);
      return `${allMonths[dateInReal.getMonth()]} ${dateInReal.getFullYear()}`;
    }
    return "N/A";
  };

  const removeApplicationFromStack = async (id: string) => {
    if (!isPending) {
      // get deleted application
      const deletedApplication = userApplications.find(
        (application) => application.id === id
      );

      await mutate(id);
      analytics.websiteButtonInteractions({
        buttonName: "Remove Application",
        source: `User has deleted an shortlisted application for program: ${deletedApplication?.program?.name} after application has been started`,
        urlPath: window.location.href,
        event_type: EAnalyticsEvents.APPLICATION_DELETE,
        status: EAnalyticsStatus.SUCCESS,
        redirectPath: "",
      });
    }
  };

  useEffect(() => {
    // select only paid applications
    const filterApplications = userApplications.filter(
      (application) => application.paid === status
    );
    setApplications(filterApplications);
  }, [userApplications]);

  // handle the payment when user clicks on handle click
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Create a Checkout Session
    if (currentCountry === "Nepal") {
      setShowPaymentOptions(true);
      return;
    }
    paymentMutate({ formValues: selectedApplications, type: "multiple" });
    analytics.websiteButtonInteractions({
      buttonName: "Pay",
      source:
        "User has clicked on Continue To Payment button and started the application payment process for programs",
      urlPath: window.location.href,
      status: EAnalyticsStatus.SUCCESS,
      event_type: EAnalyticsEvents.PAY_APPLICATION_FEE,
      redirectPath: "",
    });
  };

  const userProfileStatus = useAppSelector(
    (state) => state.user.dashboardDataGlobal?.data?.isProfileComplete
  );

  const filterApplications = applications.filter(
    (application) => application.paid === status
  );

  return (
    <>
      {filterApplications.length > 0 && (
        <Stack>
          {/* Displaying Table */}
          <TableContainer
            component={Paper}
            sx={{ overflowX: "auto", width: "100%", marginTop: "8px" }}
          >
            <Table sx={{ minWidth: "700px" }} aria-label="application table">
              <TableHead
                sx={{
                  padding: "0px",
                  border: "0px",
                }}
              >
                <TableRow>
                  {!status && (
                    <TableCell
                      sx={{
                        paddingY: "4px",
                        border: "0px",
                        background: "#FAFAFA",
                      }}
                      padding="checkbox"
                    >
                      <Checkbox
                        color="primary"
                        sx={{ borderRadius: "8px" }}
                        checked={
                          selectedApplications.length === applications.length &&
                          selectedApplications.length > 0
                        }
                        onChange={toggleApplicationAll}
                        // indeterminate={numSelected > 0 && numSelected < rowCount}
                        // checked={rowCount > 0 && numSelected === rowCount}
                        // onChange={onSelectAllClick}
                        inputProps={{
                          "aria-label": "select all",
                        }}
                      />
                    </TableCell>
                  )}

                  {/* <StyledTableCell>Application ID</StyledTableCell> */}
                  {columns.map((column) => (
                    <TableCell
                      sortDirection={false}
                      key={column.id}
                      align={column.align}
                      sx={{ paddingY: "4px", border: "0px" }}
                      style={{
                        minWidth: column.minWidth,
                        background: "#FAFAFA",
                      }}
                    >
                      <Typography
                        variant="subtitle1_sb"
                        fontSize="14px"
                        color="#848484"
                        fontFamily="HankenGroteskExtraBold"
                      >
                        {column.label}
                      </Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filterApplications.map((row, i) => (
                  <TableRow role="checkbox" tabIndex={-1} key={row.id}>
                    {!status && (
                      <StyledTableCell
                        sx={{
                          borderBottom:
                            filterApplications.length === i + 1
                              ? "0px "
                              : "1px solid #EAEAEA",
                        }}
                        padding="checkbox"
                      >
                        <Checkbox
                          color="primary"
                          onChange={() => toggleApplication(row.id)}
                          checked={selectedApplications.includes(row.id)}
                          // inputProps={{
                          //     'aria-labelledby': labelId,
                          // }}
                        />
                      </StyledTableCell>
                    )}

                    <StyledTableCell
                      sx={{
                        borderBottom:
                          filterApplications.length === i + 1
                            ? "0px "
                            : "1px solid #EAEAEA",
                      }}
                      align="left"
                    >
                      <Typography
                        variant="subtitle1_sb"
                        fontSize="14px"
                        color=""
                        fontFamily="HankenGroteskExtraBold"
                      >
                        {row.university?.name}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        borderBottom:
                          filterApplications.length === i + 1
                            ? "0px "
                            : "1px solid #EAEAEA",
                      }}
                      align="left"
                    >
                      <Typography
                        variant="subtitle1_sb"
                        fontSize="14px"
                        color=""
                        fontFamily="HankenGroteskExtraBold"
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
                          {row?.foundation?.name ? (
                            <Chip text="Foundation" />
                          ) : (
                            ""
                          )}
                        </Typography>
                        <Box display="flex" mb={2}>
                          {row?.foundation?.name && <PlusIcon />}
                        </Box>

                        {row.program?.name}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        borderBottom:
                          filterApplications.length === i + 1
                            ? "0px "
                            : "1px solid #EAEAEA",
                      }}
                      align="left"
                    >
                      <Typography
                        variant="subtitle1_sb"
                        fontSize="14px"
                        color=""
                        fontFamily="HankenGroteskExtraBold"
                      >
                        {getMonthAndYear(
                          row?.foundation?.detail?.startDate ||
                            row?.program?.detail?.startDate
                        )}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{
                        borderBottom:
                          filterApplications.length === i + 1
                            ? "0px "
                            : "1px solid #EAEAEA",
                      }}
                      align="left"
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
                    </StyledTableCell>

                    <StyledTableCell
                      sx={{
                        borderBottom:
                          filterApplications.length === i + 1
                            ? "0px "
                            : "1px solid #EAEAEA",
                      }}
                      align="left"
                    >
                      <PaymentStatus
                        text={status ? "Paid" : "Unpaid"}
                        status={status}
                      />
                    </StyledTableCell>
                    <TableCell
                      sx={{
                        borderBottom:
                          filterApplications.length === i + 1
                            ? "0px "
                            : "1px solid #EAEAEA",
                      }}
                    >
                      <Stack
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          flexDirection: "row",
                        }}
                        gap={2}
                      >
                        <Button
                          onClick={() =>
                            router.push(`/dashboard/applications/${row.id}`)
                          }
                          sx={{
                            color: "var(--primary-main, #e66022)",
                            fontFamily: "HankenGroteskSemibold",
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontHeight: "400",
                            lineHeight: "140%",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            padding: "7px 12px",
                            width: "100px",
                            height: "28px",
                            border: "1px solid var(--primary-main, #e66022)",
                            borderRadius: "4px",
                            backgroundColor: "transparent",
                          }}
                        >
                          View
                        </Button>
                        {!status && (
                          <Button
                            sx={{ backgroundColor: "transparent" }}
                            onClick={() => removeApplicationFromStack(row.id)}
                          >
                            <img
                              src="/images/dashboard/delete.svg"
                              alt="delete"
                            />
                          </Button>
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Box for displaying total items */}
          <Box
            width="100%"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "16px",
              background: "#FAFAFA",
              paddingY: "4px",
              paddingX: "24px",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "var(--greyscale-300, #848484)",
                textAlign: "right",
              }}
            >
              Total fee: {to ? to.toUpperCase() : "USD"}{" "}
              {!status
                ? Math.ceil(calculateTotalAmountFromSelected())
                : Math.ceil(calculateTotalAmountFromAll())}
            </Typography>
          </Box>
          {/* Free Application Information Component */}
          {applications.find((s) => s.university.admission_free) && (
            <Grid container mt={2}>
              <Grid item xs={10}>
                <Alert
                  variant="warning"
                  iconType="alert"
                  text={
                    <>
                      Application fees that are marked as{" "}
                      <Typography color="">Free</Typography> do not require
                      payment, even if you proceed to the payment section. Thank
                      you for your understanding
                    </>
                  }
                />
              </Grid>
            </Grid>
          )}
          {/* Findmore or payment button */}

          {!status && (
            <Stack
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                marginTop: "8px",
                gap: "16px",
              }}
            >
              <Button
                sx={{
                  width: "fit-content",
                  border: "1px solid var(--grey-400, #83868B)",
                  padding: "4px 8px",
                }}
                onClick={() =>
                  router.push("/dashboard/universitiesandprograms")
                }
              >
                Find More Programs
              </Button>
              <Button
                disabled={
                  !userProfileStatus ||
                  selectedApplications.length === 0 ||
                  isPaymentLoading
                }
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "fit-content",
                  padding: "4px 8px",
                  color: "var(--default-white, #ffffff)",
                  backgroundColor: "var(--primary-main, #FF6B26)",
                  "&:disabled": {
                    opacity: 0.35,
                    color: "var(--default-white, #ffffff)",
                  },
                }}
                onClick={handleSubmit}
                endIcon={<ArrowForwardIosRounded />}
              >
                {isPaymentLoading && <Loader color="info" />}
                Continue to Payment
              </Button>
            </Stack>
          )}

          <Dialog open={showPaymentOptions}>
            <Box sx={{ maxWidth: "444px", padding: "16px 24px 0px 24px" }}>
              <Box>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    sx={{
                      fontSize: {
                        md: "24px",
                        xs: "20px",
                      },
                      fontWeight: 800,
                      pb: "4px",
                    }}
                  >
                    Select payment method
                  </Typography>
                  <Box sx={{ cursor: "pointer" }} onClick={togglePaymentModal}>
                    <CrossIcon />
                  </Box>
                </Box>
                <Typography
                  sx={{
                    fontSize: {
                      md: "14px",
                      xs: "10px",
                    },
                    fontWeight: "400",
                  }}
                >
                  Preferred method with secure transactions.
                </Typography>

                <Box
                  mt={4}
                  mb={5}
                  width={{
                    md: "388px",
                  }}
                >
                  <Stack spacing="24px">
                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => setActivePaymentType("esewa")}
                    >
                      <Box
                        sx={{
                          borderRadius: "8px",
                          height: "74px",
                          border: `1px solid ${
                            activePaymentType === "esewa"
                              ? "#FF6B26"
                              : "rgba(0, 0, 0, 0.20)"
                          }`,
                          padding: "15px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "#FCFAF8",
                        }}
                      >
                        <Box>
                          <Button
                            disabled
                            sx={{
                              border: "1px solid #E9E9E9",
                              borderRadius: "8px",
                              width: "112px",
                            }}
                            variant="outlined"
                          >
                            <EsewaIcon />
                          </Button>
                          <Typography
                            variant="body2"
                            px="16px"
                            color="rgba(32, 28, 26, 0.90)"
                            sx={{ fontWeight: 400 }}
                          >
                            Pay with Esewa
                          </Typography>
                        </Box>
                        {activePaymentType === "esewa" && <SelectedTickIcon />}
                      </Box>
                    </Box>
                    <Box
                      sx={{ cursor: "pointer" }}
                      onClick={() => setActivePaymentType("stripe")}
                    >
                      <Box
                        sx={{
                          borderRadius: "8px",
                          height: "74px",
                          border: `1px solid ${
                            activePaymentType === "stripe"
                              ? "#FF6B26"
                              : "rgba(0, 0, 0, 0.20)"
                          }`,
                          padding: "15px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "#FCFAF8",
                        }}
                      >
                        <Box>
                          <Button
                            disabled
                            sx={{
                              border: "1px solid #E9E9E9",
                              borderRadius: "8px",
                              width: "112px",
                            }}
                            variant="outlined"
                          >
                            <StripeIcon />
                          </Button>
                          <Typography
                            variant="body2"
                            px="16px"
                            color="rgba(32, 28, 26, 0.90)"
                            sx={{ fontWeight: 400 }}
                          >
                            Pay with Stripe
                          </Typography>
                        </Box>
                        {activePaymentType === "stripe" && <SelectedTickIcon />}
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>
            <Divider />

            <Box sx={{ maxWidth: "444px", padding: "14px 24px" }}>
              <Box mt="4px" display="flex" justifyContent="flex-end">
                <Button
                  disabled={!!(isPaymentLoading || isPaymentEsewaLoading)}
                  variant="outlined"
                  sx={{
                    minWidth: "95px",
                    height: "32px",
                    p: "8px 20px",
                    borderRadius: "8px",
                    border: "1px solid rgba(32, 28, 26, 0.40)",
                  }}
                  onClick={togglePaymentModal}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handlePopUpPayment()}
                  disabled={!!(isPaymentLoading || isPaymentEsewaLoading)}
                  sx={{
                    minWidth: "95px",
                    height: "32px",
                    p: "8px 20px",
                    borderRadius: "8px",
                    ml: "16px",
                    textTransform: "none",
                  }}
                >
                  {isPaymentEsewaLoading || isPaymentLoading
                    ? "Loading..."
                    : "Pay now"}
                </Button>
              </Box>
            </Box>
          </Dialog>
        </Stack>
      )}{" "}
    </>
  );
}

export default ApplicationTable;

// Admission_free , application_fee Needed From Backend

// NUAA - Application fee - $75 if free cut $75 and show 0

// if the selected applications are free dont go to the the stripe directly send a free application api and then update status to upload Document
