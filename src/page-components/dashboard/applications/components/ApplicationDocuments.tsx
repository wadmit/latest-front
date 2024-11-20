import React, { useRef, useState } from "react";
import { IStatus } from "@/page-components/dashboard/utils/type";
import { Box, Button, Stack } from "@mui/material";
import { EApplicationStatus } from "@/types/application";
import {
  ApplicationDocumentsHeader,
  ApplicationDocumentsWrapper,
} from "@/page-components/dashboard/applications/components";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import { useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { setNewStatus } from "@/global-states/reducers/applicationReducer";
import { useMutation } from "@tanstack/react-query";
import { submitApplication } from "@/api/web/application.action";

type Props = {
  status: IStatus;
  activeStep: number;
};

const ApplicationDocuments = ({ status, activeStep }: Props) => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const boxRef = useRef<HTMLDivElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const applicationId = params.applicationId ?? "";

  const applications = useAppSelector(
    (state) => state.applications.singleApplication
  );
  const currency = useAppSelector((state) => state.currency);

  // logic to implement that select all the documents from applications and distributed them in the documents wrapper component according to number of type of documents
  const documents = applications?.documents;
  const documentsType = documents?.map((document) => document.type);
  const documentsTypeSet = new Set(documentsType);
  const documentsTypeArray = Array.from(documentsTypeSet);

  // distributing the type of documents in the array of objects
  const documentsObject = documentsTypeArray.map((type) => ({
    type,
    documents: (documents || []).filter((document) => document.type === type),
  }));

  // const studentDocument = applications?.student?.document.documents;

  const { mutate } = useMutation({
    mutationFn: submitApplication,
    onMutate: () => {
      setIsSubmitting(true);
    },
    onError: (err) => {
      setIsSubmitting(false);
      analytics.trackEvent(EAnalyticsEvents.ERROR, {
        source: "Application Submit Failure",
        message: err,
      });
      enqueueSnackbar("Failed to submit Application", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      boxRef?.current?.scrollIntoView(true);
      document.getElementById("box_container")?.scrollIntoView(true);
    },
    onSuccess: (data) => {
      setIsSubmitting(false);
      dispatch(setNewStatus({ status: "review" }));
      enqueueSnackbar("Successfully Submitted Application", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      boxRef?.current?.scrollIntoView(true);
      document.getElementById("box_container")?.scrollIntoView(true);
      analytics.websiteButtonInteractions({
        location: {
          countryName: currency?.currentCountry ?? "",
          city: currency?.city ?? "",
        },
        buttonName: "Submit",
        source: `User has submitted their application for Program: ${applications.program?.name} of University: ${applications.university.name}`,
        urlPath: `${process.env.NEXT_PUBLIC_PARTNER_URL}/${applications.id}`,
        event_type: EAnalyticsEvents.APPLICATION_SUBMIT,
        status: EAnalyticsStatus.SUCCESS,
        redirectPath: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/applications/${applicationId}`,
      });
    },
  });

  const handleSubmit = () => {
    if (!isSubmitting) {
      mutate(applicationId as string);
    }
  };

  const isSubmitDisabled = !(activeStep === 2 && status === "pending");

  return (
    <Box id="box_container" ref={boxRef} flex={0.6}>
      <ApplicationDocumentsHeader />

      {documentsObject.map((document) => (
        <Box>
          <ApplicationDocumentsWrapper
            applicationId={applicationId as string}
            fields={document.documents?.map((doc) => doc)}
            headerText={`${document.type} Document`}
            disabledButton={isSubmitDisabled}
          />
        </Box>
      ))}

      <Stack
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          marginTop: "20px",
          // justifyContent: 'flex-start',
          // alignItems: 'center',
          gap: "16px",
        }}
      >
        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          sx={{
            minWidth: "152px",
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
        >
          {applications.status >= EApplicationStatus.review || activeStep > 2
            ? "Submitted"
            : "Submit"}
        </Button>
      </Stack>
    </Box>
  );
};

export default ApplicationDocuments;
