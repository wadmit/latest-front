"use client";
import { removeApplication } from "@/api/web/application.action";
import {
  paymentEsewaVerify,
  postEsewaPayment,
  postStripePayment,
} from "@/api/web/payment.action";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import {
  setStatusOfAllSelectedApplication,
  setUserApplications,
} from "@/global-states/reducers/applicationReducer";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { analytics } from "@/services/analytics.service";
import { IApplication } from "@/types/application";
import {
  EAnalyticsEvents,
  EAnalyticsFieldName,
  EAnalyticsStatus,
} from "@/types/mix-panel-analytic";
import {
  Box,
  Button,
  Checkbox,
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
import { useParams, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import {
  columns,
  getMonthAndYear,
} from "@/page-components/dashboard/applications/utils/provider";
import Loader from "@/components/common/circular-loader/Loader";
import { StyledTableCell } from "@/page-components/dashboard/applications/styled-components";
import { PlusIcon } from "public/svg";
import { Chip } from "@/page-components/dashboard/components/Chip";
import PaymentStatus from "@/page-components/dashboard/components/PaymentStatus";
import Alert from "@/page-components/dashboard/components/Alert";
import { ArrowForwardIosRounded } from "@mui/icons-material";
import {
  ApplicationPaymentDialogOptions,
  ApplicationTotalFeeDisplay,
} from "@/page-components/dashboard/applications/components";
import { filter } from "lodash";

type Props = {
  status: boolean;
  applications: IApplication[];
  getConvertedCosts: (
    value: number,
    base_currency: string
  ) => {
    formattedValue: string;
    amount: number;
  };
};

const ApplicationTable = ({ status, getConvertedCosts }: Props) => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [selectedApplications, setIsSelectedApplications] = useState<string[]>(
    []
  );

  const [showPaymentOptions, setShowPaymentOptions] = useState<boolean>(false);
  const currentCountry = useAppSelector(
    (state) => state.currency.currentCountry
  );
  const userApplications = useAppSelector(
    (state) => state.applications.applications
  );
  const [applications, setApplications] = useState<IApplication[]>([]);
  const [activePaymentType, setActivePaymentType] = useState<string>("");

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["removeApplication"],
    mutationFn: async (id: string) => await removeApplication(id),
    onSuccess: (data, variables) => {
      const newApplications = applications.filter(
        (application) => application.id !== variables
      );
      setApplications(newApplications);
      dispatch(setUserApplications({ data: newApplications }));
      enqueueSnackbar("Application deleted successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
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

  const { data: esewaData, isLoading: esewaVerificationLoading } =
    useCustomQuery({
      queryKey: ["esewaVerifty"],
      queryFn: () => paymentEsewaVerify((params.data as string) ?? ""),
      onSuccess: (data) => {
        router.replace("/dashboard");
      },
      onError: (error) => {
        enqueueSnackbar("Payment verification failed", { variant: "error" });
        router.replace("/dashboard");
      },
      enabled: params && !!params.data,
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

  const removeApplicationFromStack = (id: string) => {
    if (!isPending) {
      // get deleted application
      const deletedApplication = userApplications.find(
        (application) => application.id === id
      );
      mutate(id);
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
  }, []);

  // handle the payment when user clicks on handle click
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Create a Checkout Session.
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

  const filteredApplications = applications.filter(
    (application) => application.paid === status
  );

  return (
    <>
      {filteredApplications.length === 0 ? (
        <Box width="100%" display="flex" justifyContent="center">
          <Typography fontWeight="bold">No Application Found</Typography>
        </Box>
      ) : (
        <Stack>
          {esewaVerificationLoading && (
            <Box
              padding="10px 14px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRadius={4}
              width="fit-content"
              gap="4px"
              border="1px solid orange"
            >
              <Loader variant="indeterminate" /> Verifying your payment
            </Box>
          )}
          {/* Displaying Table */}
          <TableContainer
            component={Paper}
            sx={{ overflowX: "auto", width: "100%" }}
          >
            <Table sx={{ minWidth: "700px" }} aria-label="application table">
              <TableHead>
                <TableRow>
                  {!status && (
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={
                          selectedApplications.length === applications.length &&
                          selectedApplications.length > 0
                        }
                        onChange={toggleApplicationAll}
                        inputProps={{
                          "aria-label": "select all",
                        }}
                      />
                    </TableCell>
                  )}

                  {columns.map((column) => (
                    <StyledTableCell
                      sortDirection={false}
                      key={column.id}
                      align={column.align}
                      style={{
                        minWidth: column.minWidth,
                        background: "transparent",
                      }}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredApplications.map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {!status && (
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onChange={() => toggleApplication(row.id)}
                          checked={selectedApplications.includes(row.id)}
                        />
                      </StyledTableCell>
                    )}

                    <StyledTableCell align="left">
                      {row.university?.name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography
                        variant="subtitle1_sb"
                        fontSize="14px"
                        color=""
                        fontFamily="HankenGroteskExtraBold"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Typography
                          fontSize="14px"
                          fontStyle="normal"
                          fontFamily="HankenGroteskSemiBold"
                          lineHeight="18px"
                        >
                          {row?.foundation?.name ? (
                            <Chip text="Foundation Program" />
                          ) : (
                            ""
                          )}
                        </Typography>
                        <Box display="flex">
                          {row?.foundation?.name && <PlusIcon />}
                        </Box>

                        {row.program?.name}
                        <br />
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {getMonthAndYear(row.createdAt)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
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
                        sx={{
                          textDecoration: row.university.admission_free
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {
                          getConvertedCosts(
                            row.university.detail.fees["Application Fee"],
                            row.university.base_currency
                          ).formattedValue
                        }
                      </Typography>
                    </StyledTableCell>

                    <StyledTableCell align="left">
                      <PaymentStatus
                        text={status ? "Paid" : "Unpaid"}
                        status={status}
                      />
                    </StyledTableCell>
                    <TableCell>
                      <Stack
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: "100%",
                          flexDirection: "row",
                        }}
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
                          }}
                        >
                          View
                        </Button>
                        {!status && (
                          <Button
                            onClick={() => removeApplicationFromStack(row.id)}
                            startIcon={
                              <img src="/images/dashboard/delete.svg" alt="" />
                            }
                          />
                        )}
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Box for displaying total items */}
          <ApplicationTotalFeeDisplay
            applications={filteredApplications}
            status={status}
            selectedApplications={selectedApplications}
            getConvertedCosts={getConvertedCosts}
          />
          {/* Free Application Information Component */}
          {filteredApplications.find((s) => s.university.admission_free) && (
            <Grid container mt={2}>
              <Grid item xs={10}>
                <Alert
                  variant="warning"
                  iconType="alert"
                  text={
                    <>
                      Application fees that are marked as{" "}
                      <Typography color="#DB1920">Free</Typography> do not
                      require payment, even if you proceed to the payment
                      section. Thank you for your understanding
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
                Find More Programss
              </Button>
              <Button
                disabled={
                  !userProfileStatus || selectedApplications.length === 0
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
          <ApplicationPaymentDialogOptions
            showPaymentOptions={showPaymentOptions}
            togglePaymentModal={togglePaymentModal}
            handlePopUpPayment={handlePopUpPayment}
            activePaymentType={activePaymentType}
            setActivePaymentType={setActivePaymentType}
            isPaymentLoading={isPaymentLoading}
            isPaymentEsewaLoading={isPaymentEsewaLoading}
          />
        </Stack>
      )}
    </>
  );
};

export default ApplicationTable;
