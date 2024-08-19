"use client";
import { IApplicationDocument } from "@/types/application";
import { Box, Grid, Stack, Tooltip, Typography } from "@mui/material";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ViewSampleIcon } from "@/page-components/dashboard/applications/svg";
import {
  ApplicationDocumentsProgressBar,
  ApplicationImageDisplay,
  ApplicationUploadButton,
} from "@/page-components/dashboard/applications/components";
import { useAppDispatch } from "@/global-states/hooks/hooks";
import { useSnackbar } from "notistack";
import { DocumentContext } from "@/context/document-context";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import {
  setAddImageToApplication,
  setRemoveImageFromApplication,
} from "@/global-states/reducers/applicationReducer";
import { useMutation } from "@tanstack/react-query";
import {
  removeStudentApplicationDocument,
  uploadStudentApplicationDocument,
} from "@/api/web/application.action";

type Props = {
  header: string | undefined;
  document: IApplicationDocument | undefined;
  applicationId: string;
};

const ApplicationDocumentsCard = ({
  header,
  document,
  applicationId,
}: Props) => {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { activeStep, reaskedDocuments } = useContext(DocumentContext);

  const uploadImagePreviewUrl = process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY;

  const [error, setError] = useState<{
    isError: boolean;
    errorMessage: string;
  }>({
    isError: false,
    errorMessage: "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [userSelectFiles, setUserSelectFiles] = useState<File[]>([]);
  const [linkKey, setLinkKey] = useState<string>();
  const [link, setLink] = useState<string>();
  const [documentUrl, setDocumentUrl] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: uploadStudentApplicationDocument,
    onSuccess: (data) => {
      enqueueSnackbar("File Uploaded Successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      if (data.data.status === "review") {
        enqueueSnackbar("Application Submitted Successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
      }
      setIsUploading(false);
      dispatch(setAddImageToApplication(data.data));
    },
    onError: (err) => {
      analytics.trackEvent(EAnalyticsEvents.ERROR, {
        source: "Upload Document Failure",
        message: err,
      });
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { files } = e.target;
    const formData = new FormData();

    setError({
      isError: false,
      errorMessage: "",
    });

    if (files) {
      setIsUploading(true);
      const filesArray = Array.from(files);
      const isLessThen2Mb = filesArray
        .map((file) => Number((file.size / (1024 * 1024)).toFixed(3)))
        .every((file) => file <= 2);
      if (isLessThen2Mb) {
        filesArray.forEach((file) => {
          formData.append("file", file);
        });

        mutate({
          applicationId: applicationId,
          formValues: formData,
          coreDocumentId: document?.coreDocument?.id,
        });
      } else {
        setIsUploading(false);

        setError({
          isError: true,
          errorMessage: "File size should be less then 2MB",
        });
      }
    } else {
      setIsUploading(false);

      setError({
        isError: true,
        errorMessage: "Please select a file",
      });
    }
  };

  useEffect(() => {
    if (document?.coreDocument?.sample) {
      setDocumentUrl(
        `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${document.coreDocument?.sample_key}`
      );
    }
  }, [document]);

  const {
    data: removeData,
    mutate: removeFileMutate,
    isError,
    isPending: removeLoding,
  } = useMutation({
    mutationFn: removeStudentApplicationDocument,
    onSuccess: (data) => {
      enqueueSnackbar("File Removed Successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
    },
    onError: (err) => {
      analytics.trackEvent(EAnalyticsEvents.ERROR, {
        source: "Document Remove Failure",
        message: err,
      });
    },
  });

  const handleRemove = ({
    link: defaultLink,
    linkKey: defaultLinkKey,
  }: {
    link: string;
    linkKey: string;
  }) => {
    setLinkKey(defaultLinkKey);
    setLink(defaultLink);
    removeFileMutate({
      applicationId: applicationId as string,
      coreDocumentId: document?.coreDocument?.id,
      linkKey: defaultLinkKey,
      link: defaultLink,
    });
  };

  // inside the document field we have link and link key and also user can select files write a logic such that we display all the link present in the document field and also the files selected by the user
  useMemo(() => {
    if (!isError && !removeLoding && removeData) {
      dispatch(
        setRemoveImageFromApplication({
          linkKey,
          link,
          coredocumentId: document?.coreDocument?.id,
        })
      );
    }
  }, [removeData]);

  const isDisabled =
    reaskedDocuments.length > 0 && !reaskedDocuments.includes(header as string);

  const viewSample = (url: string) => {
    analytics.websiteButtonInteractions({
      buttonName: "View Sample Document",
      source: "Student clicked on view sample document icon",
      urlPath: window.location.href,
      event_type: EAnalyticsEvents.DOCUMENT_UPLOAD_CLICK,
      status: EAnalyticsStatus.SUCCESS,
      redirectPath: "",
    });
    window.open(`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${url}`);
  };

  return (
    <>
      {header && (
        <Stack
          mt={2}
          sx={{
            border: "1px solid",
            padding: "24px 16px",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "space-between",
            borderColor: `${error.isError ? "red" : "#E0E0E0"}`,
          }}
          display="flex"
          flexDirection="column"
        >
          <Grid
            container
            display="flex"
            flexDirection={{ lg: "row", md: "row", xs: "column" }}
            justifyContent="space-between"
            spacing={1}
          >
            <Grid item xs={12} md={8}>
              <Stack gap={1} flexDirection="column">
                <Typography variant="subtitle1_sb">{header}</Typography>
                <Typography width={{ lg: "80%", md: "80%", xs: "100%" }}>
                  Upload a clear color copy of {header.toLowerCase()} in pdf or
                  jpeg file format with size not more tha 2MB.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid
                container
                justifyContent={{
                  lg: "flex-end",
                  md: "flex-end",
                  sm: "flex-start",
                  xs: "flex-start",
                }}
                spacing="20px"
              >
                <Grid item>
                  {document?.coreDocument &&
                    document?.coreDocument.sample_key && (
                      <Tooltip
                        title="View sample document"
                        onClick={() =>
                          viewSample(document.coreDocument!.sample_key!)
                        }
                      >
                        <Box
                          // onClick={handleClick}
                          // variant="button"
                          display="flex"
                          flex={1}
                          justifyContent="center"
                          alignItems="center"
                          bgcolor="var(--primary-500, #FFE5D0)"
                          sx={{
                            borderRadius: "50%",
                            width: "48px",
                            cursor: "pointer !important",
                            height: "48px",
                          }}
                        >
                          <ViewSampleIcon />
                        </Box>
                      </Tooltip>
                    )}
                </Grid>
                <Grid item>
                  {!isUploading ? (
                    <ApplicationUploadButton
                      activeStep={activeStep}
                      handleFileChange={handleFileChange}
                      isDisabled={isDisabled}
                    />
                  ) : (
                    <ApplicationDocumentsProgressBar />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {error.isError && (
            <Typography
              sx={{
                color: "red",
                fontSize: "12px",
                marginTop: "8px",
              }}
            >
              {error.errorMessage}
            </Typography>
          )}
          <Stack display="flex" gap={2} flexDirection="row" flexWrap="wrap">
            {document?.linkKey.length! > 0 &&
              document?.linkKey.map((link, idx) => (
                <ApplicationImageDisplay
                  name={`${uploadImagePreviewUrl}/${link}`}
                  key={`${uploadImagePreviewUrl}/${link}`}
                  handleRemove={() =>
                    handleRemove({ link: document.link[idx], linkKey: link })
                  }
                  imageUrl={`${uploadImagePreviewUrl}/${link}`}
                  previewUrl={`${uploadImagePreviewUrl}/${link}`}
                  isDisabled={isDisabled}
                />
              ))}
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default ApplicationDocumentsCard;
