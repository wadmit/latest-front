import { useCallback } from "react";
import {
  AlertIcon,
  CelebrateIcon,
  DownloadIcon,
  ErrorIcon,
  RightIcon,
  SadIcon,
  SentIcon,
  WarningIcon,
} from "../svg";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { AlertProps } from "../utils/type";
import { AlertButtonWrapper } from "@/page-components/dashboard/styled-components/index";

function Alert({
  variant,
  text,
  activeStep,
  buttonProps,
  iconType,
  files,
  reAskedDocuments,
}: AlertProps) {
  let backgroundColor: string | undefined;
  let border: string | undefined;
  let borderColor: string | undefined;
  switch (variant) {
    case "success":
      backgroundColor = "#F1FFF8";
      border = "1px solid #A3CFBB";
      borderColor = "#26AF61";
      break;
    case "warning":
      backgroundColor = "#FFF7E0";
      border = "1px solid #FFEAAE";
      borderColor = "#F7C948";
      break;
    case "pending":
      backgroundColor = "#FFE3E3";
      border = "1px solid #FFBDBD";
      borderColor = "#EF4E4E";
      break;
    case "error":
      backgroundColor = "rgba(255, 229, 208, 1)";
      border = "1px solid #FFBDBD";
      borderColor = "rgba(253, 126, 20, 1)";

      break;

    default:
      break;
  }
  const getIconWithType = useCallback(() => {
    switch (iconType) {
      case "success":
        return <RightIcon />;
      case "warning":
        return <WarningIcon />;
      case "pending":
        return <ErrorIcon />;
      case "error":
        return <ErrorIcon />;
      case "sent":
        return <SentIcon />;
      case "sad":
        return <SadIcon />;
      case "congrats":
        return <CelebrateIcon />;
      case "alert":
        return <AlertIcon />;
      default:
        break;
    }
  }, [iconType]);

  const program = useAppSelector(
    (state) => state?.applications.singleApplication
  );
  const currency = useAppSelector((state) => state.currency);

  return (
    <Box
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems={{
        lg: "center",
        md: "center",
        sm: "flex-start",
        xs: "flex-start",
      }}
      sx={{
        gap: 2,
        marginBottom: "16px",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 16px",
        backgroundColor,
        border,
        borderRadius: "4px",
        borderLeft: `10px solid ${borderColor}`,
      }}
    >
      <Stack
        width={activeStep === 0 ? "calc(100% - 139px)" : "calc(100%)"}
        direction={{ lg: "row", sm: "row", xs: "row" }}
        gap={2}
      >
        {getIconWithType()}
        <Stack>
          <Typography
            variant="caption"
            fontSize="14px"
            lineHeight="22.4px"
            fontWeight={500}
          >
            {text}
          </Typography>
          {reAskedDocuments && (
            <ul>
              {reAskedDocuments.map((doc, index) => (
                <li key={index}>{doc.toUpperCase()}</li>
              ))}
            </ul>
          )}
          {files && (
            <>
              <Typography
                mt={3}
                variant="caption"
                fontSize="14px"
                lineHeight="22.4px"
                fontWeight={500}
              >
                We’ve sent you a letter from our university. Do check it out
                below.
              </Typography>
              <Grid mt={3} container gap={2}>
                {files.map((file, index) => (
                  <AlertButtonWrapper
                    onClick={() => {
                      file.buttonClick();
                      analytics.websiteButtonInteractions({
                        location: {
                          countryName: currency?.currentCountry ?? "",
                          city: currency?.city ?? "",
                        },
                        buttonName: "Download Documents",
                        source: `User has downloaded their ${file.buttonName} for their application for program ${program.program?.name}`,
                        urlPath: window.location.href,
                        event_type: EAnalyticsEvents.DOWNLOAD_DOCUMENT,
                        status: EAnalyticsStatus.SUCCESS,
                        redirectPath: `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/applications/${program.id}`,
                      });
                    }}
                  >
                    {file.buttonName}
                    <DownloadIcon />
                  </AlertButtonWrapper>
                ))}
              </Grid>
            </>
          )}
        </Stack>
      </Stack>

      {buttonProps && (
        <Box>
          <Typography
            color="#FF6B26"
            sx={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={buttonProps.buttonClick}
            variant="h7"
            fontSize="14px"
            lineHeight="22.4px"
            fontWeight={500}
          >
            {buttonProps.buttonName}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Alert;
