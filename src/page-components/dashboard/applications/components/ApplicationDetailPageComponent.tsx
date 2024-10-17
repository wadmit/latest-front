"use client";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import { useParams, useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React, { useMemo, useState } from "react";
import {
  AlertButtonProps,
  AlertProps,
  IStatus,
} from "@/page-components/dashboard/utils/type";
import { useMutation } from "@tanstack/react-query";
import { postStripePayment } from "@/api/web/payment.action";
import { setStatusWhenPaid } from "@/global-states/reducers/applicationReducer";
import { analytics } from "@/services/analytics.service";
import {
  EAnalyticsEvents,
  EAnalyticsFieldName,
  EAnalyticsStatus,
} from "@/types/mix-panel-analytic";
import mixpanel from "mixpanel-browser";
import { Box, Stack, Typography } from "@mui/material";
import Loader from "@/components/common/circular-loader/Loader";
import Alert from "@/page-components/dashboard/components/Alert";
import Error from "next/error";
import { DocumentContext } from "@/context/document-context";
import {
  MobileApplicationStepper,
  ApplicationUserCard,
  ApplicationDocuments,
  ApplicationRejectDialog,
} from "@/page-components/dashboard/applications/components";
import dynamic from "next/dynamic";
import {
  EApplicationDocumentStatus,
  EApplicationStatus,
} from "@/types/application";
import { PaymentButtonProps } from "@/page-components/dashboard/applications/types";

const ApplicationStepper = dynamic(
  () =>
    import(
      "@/page-components/dashboard/applications/components/ApplicationStepper"
    ),
  {
    ssr: false,
    suspense: false,
  }
);
type Props = {
  isLoading: boolean;
  isError: boolean;
};

const ApplicationDetailPageComponent = ({ isLoading, isError }: Props) => {
  const router = useRouter();
  const params = useParams();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const singleApplication = useAppSelector(
    (state) => state.applications.singleApplication
  );
  const userProfileStatus = useAppSelector(
    (state) => state.user.dashboardDataGlobal?.data?.isProfileComplete
  );
  const currency = useAppSelector((state) => state.currency);

  const [activeStep, setActiveStep] = useState(0);
  const [showDialogBox, setShowDialogBox] = useState(false);
  const [status, setStatus] = useState<IStatus>("pending");
  const [alertPropsData, setAlertPropsData] = useState<AlertProps>({
    variant: "pending",
    text: "",
    iconType: "pending",
  });
  const [displayText, setDisplayText] = useState("");
  const applicationId = params.applicationId;

  const handleIfAllDocumentsUploaded = (): string[] => {
    const localRequiredDocuments: string[] = [];
    singleApplication?.documents?.forEach((doc) => {
      if (
        (doc.type === EApplicationDocumentStatus.REQUIRED ||
          doc.type === EApplicationDocumentStatus.ADDITIONAL) &&
        singleApplication?.status === EApplicationStatus.incomplete_document
      ) {
        if (doc.link.length === 0) {
          localRequiredDocuments.push(doc?.coreDocument?.name || "");
        }
      }
    });

    return localRequiredDocuments;
  };

  useMemo(() => {
    switch (singleApplication?.status) {
      case "incomplete_document":
        setActiveStep(1);
        setStatus("pending");
        setDisplayText("Incomplete Documents");
        setAlertPropsData({
          text: (
            <>
              Please upload the following documents properly as it doesn&apos;t
              provide clear information or seems like the document doesn&apos;t
              match.
              <br />
              <Typography component="span" fontFamily="HankenGroteskBold">
                Note: {singleApplication.incompleteNote}
              </Typography>
            </>
          ),
          variant: "warning",
          iconType: "warning",
          reAskedDocuments: handleIfAllDocumentsUploaded(),
        });

        break;
      case "incomplete":
        setActiveStep(1);
        setStatus("pending");
        setDisplayText("Incomplete Document");
        setAlertPropsData({
          text: "The application will not be handled until all the additional and required documents are uploaded.Please upload the documents before you miss your deadline",
          variant: "pending",
          iconType: "pending",
        });
        // setAlertPropsData({
        //   text: 'Please upload the following documents properly as it doesn’t provide clear information or seems like the document doesn’t match.',
        //   variant: 'warning',
        //   iconType: 'warning',
        //   reAskedDocuments: handleIfAllDocumentsUploaded(),
        // });

        break;
      case "document_complete":
        setActiveStep(2);
        setStatus("pending");
        setDisplayText("Submit the document");
        setAlertPropsData({
          text: "Please submit the document before you miss your deadline",
          variant: "pending",
          iconType: "pending",
        });

        break;
      case "review":
        setActiveStep(2);
        setStatus("inview");
        setDisplayText("In review");
        setAlertPropsData({
          text: "Successfully sent an application for the review. Wait for the decisions",
          variant: "success",
          iconType: "sent",
        });
        break;
      case "submission":
        setActiveStep(3);
        setStatus("inview");
        setDisplayText("In review.");
        setAlertPropsData({
          text: "Successfully sent an application for the review. Wait for the decisions",
          variant: "success",
          iconType: "sent",
        });
        break;
      case "pre_accept":
        setActiveStep(3);
        setStatus("inview");
        setDisplayText("In review.");
        setAlertPropsData({
          text: "Application successfully sent to the university. Wait for the decision",
          variant: "success",
          iconType: "sent",
        });
        break;
      case "decision":
        setActiveStep(3);
        setStatus("success");
        setDisplayText("Submitted");
        setAlertPropsData({
          text: "Application successfully sent to the university. Wait for the decision",
          variant: "success",
          iconType: "sent",
        });
        break;
      case "accepted":
        setActiveStep(6);
        setStatus("success");
        setDisplayText("Accepted");
        setAlertPropsData({
          text: `You got accepted! We're thrilled to welcome you to ${singleApplication?.university.name}. Your hard work has paid off, and we can't wait to see you shine on campus. 🎉          `,
          variant: "success",
          files: [
            {
              buttonName: "Offer Letter",
              buttonClick: () =>
                handleLetterDownload(singleApplication.offer_letter_key),
            },
            {
              buttonName: "Scholarship Letter",
              buttonClick: () =>
                handleLetterDownload(singleApplication.scholarship_letter_key),
            },
          ],
          iconType: "congrats",
        });
        break;
      case "rejected":
        setActiveStep(3);
        setStatus("rejected");
        setDisplayText("Rejected");
        setAlertPropsData({
          text: "Though we can't be your academic home this year, your journey is far from over.Keep reaching for the stars, because you're destined for greatness. 🌟",
          variant: "error",
          iconType: "sad",
          buttonProps: {
            buttonClick: () => handleShowOrCloseDialogBox(),
            buttonName: "See why",
          },
        });
        break;
      case "pre_enrollment":
        setActiveStep(6);
        setStatus("success");
        setDisplayText("Accepted");
        setAlertPropsData({
          text: `You got accepted! We're thrilled to welcome you to ${singleApplication?.university.name}. Your hard work has paid off, and we can't wait to see you shine on campus. 🎉
          `,
          variant: "success",
          files: [
            {
              buttonName: "Offer Letter",
              buttonClick: () =>
                handleLetterDownload(singleApplication.offer_letter_key),
            },
            {
              buttonName: "Scholarship Letter",
              buttonClick: () =>
                handleLetterDownload(singleApplication.scholarship_letter_key),
            },
          ],
          iconType: "congrats",
        });

        break;
      case "enrolled":
        setActiveStep(5);

        break;
      case "initial":
        setActiveStep(0);
        setStatus("pending");
        setDisplayText("Payment Pending");
        setAlertPropsData({
          text: " Your application needs payment before we can move forward. Please make the payment soon to avoid any issues with your deadline.",
          variant: "pending",
          iconType: "pending",
          // buttonProps: {
          //   buttonClick: handlePayment,
          //   buttonName: 'Pay Now',
          // },
        });
        break;
      default:
        setActiveStep(0);
        break;
    }
  }, [singleApplication?.status]);

  const { mutate: paymentMutate, isPending: isPaymentLoading } = useMutation({
    mutationFn: postStripePayment,
    onSuccess: async (data) => {
      if (data.data === "") {
        dispatch(setStatusWhenPaid({}));
        analytics.trackEvent(EAnalyticsEvents.PAY_APPLICATION_FEE, {
          [EAnalyticsFieldName.APPLICATION_ID]: applicationId as string,
          [EAnalyticsFieldName.STATUS]: true,
        });
      } else {
        window.location.assign(data.data);
      }
    },
    onError: () => {
      enqueueSnackbar("Failed to proceed to payment", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    },
  });

  const handlePayment = async () => {
    try {
      paymentMutate({ formValues: [applicationId as string], type: "single" });
      analytics.websiteButtonInteractions({
        location: {
          countryName: currency?.currentCountry ?? "",
          city: currency?.city ?? "",
        },
        buttonName: "Pay",
        source: `User has clicked on Pay Now button and started the application payment process for program: ${singleApplication?.program?.name}`,
        urlPath: window.location.href,
        status: EAnalyticsStatus.SUCCESS,
        event_type: EAnalyticsEvents.PAY_APPLICATION_FEE,
        redirectPath: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/applications/${applicationId}`,
      });
    } catch (err) {
      enqueueSnackbar("Failed to proceed to payment", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      if (err instanceof Error) {
        mixpanel.track("Error", {
          message: "Failed to proceed to payment",
          error: err,
        });
      }
    }
  };

  const handleLetterDownload = (key: string) => {
    window.open(
      `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${key}`,
      "_blank"
    );
  };

  const buttonProps: PaymentButtonProps = {
    buttonClick: handlePayment,
    buttonName: "Pay Now",
  };

  const handleShowOrCloseDialogBox = () => {
    setShowDialogBox((prev) => !prev);
  };

  const activeStepMemoized = useMemo(
    () => ({ activeStep, reaskedDocuments: handleIfAllDocumentsUploaded() }),
    [activeStep]
  );

  // Alert button props for completing profile
  const completeProfileAlertProps: AlertButtonProps = {
    buttonName: "Complete Profile",
    buttonClick: () => router.push("/dashboard/profile/edit-profile"),
  };

  return (
    <Stack>
      {isLoading ? (
        <Loader />
      ) : !isError ? (
        <Stack>
          <MobileApplicationStepper activeStep={activeStep} />
          <ApplicationStepper activeStep={activeStep} />
          <Stack
            display="flex"
            direction={{ lg: "row", md: "row", xs: "column" }}
            gap={3}
            mt={{ lg: 8, md: 6, xs: 3 }}
          >
            <ApplicationUserCard
              isPaymentLoading={isPaymentLoading}
              status={status}
              displayText={displayText}
              activeStep={activeStep}
              buttonProps={buttonProps}
            />
            <Stack>
              <Box>
                {!userProfileStatus ? (
                  <Alert
                    text="You won’t be able to submit your application until you complete the profile"
                    variant="pending"
                    iconType="pending"
                    buttonProps={completeProfileAlertProps}
                  />
                ) : (
                  <Alert {...alertPropsData} />
                )}
              </Box>
              <DocumentContext.Provider value={activeStepMemoized}>
                <ApplicationDocuments status={status} activeStep={activeStep} />
              </DocumentContext.Provider>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Error statusCode={404} />
      )}
      {showDialogBox && (
        <ApplicationRejectDialog
          singleApplication={singleApplication}
          handleShowOrCloseDialogBox={handleShowOrCloseDialogBox}
        />
      )}
    </Stack>
  );
};

export default ApplicationDetailPageComponent;
