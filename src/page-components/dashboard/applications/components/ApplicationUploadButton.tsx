import { useAppSelector } from "@/global-states/hooks/hooks";
import { analytics } from "@/services/analytics.service";
import { EApplicationStatus } from "@/types/application";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { Box, Tooltip } from "@mui/material";
import React, { ChangeEvent, useMemo, useRef, useState } from "react";

type Props = {
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  activeStep: number;
  isDisabled: boolean;
};

const ApplicationUploadButton = ({
  handleFileChange,
  activeStep,
  isDisabled,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [backgroundColor, setBackgroundColor] = useState(
    "var(--primary-500, #FFE5D0)"
  );
  const [color, setColor] = useState("#FF6B26");

  const application = useAppSelector(
    (state) => state.applications.singleApplication
  );

  const handleClick = () => {
    analytics.websiteButtonInteractions({
      buttonName: "Upload Document",
      source: "Student clicked on upload document icon",
      urlPath: window.location.href,
      event_type: EAnalyticsEvents.DOCUMENT_UPLOAD_CLICK,
      status: EAnalyticsStatus.SUCCESS,
      redirectPath: "",
    });
    if (inputRef.current) inputRef.current.click();
  };

  useMemo(() => {
    if (
      application.status >= EApplicationStatus.review ||
      activeStep > 2 ||
      isDisabled
    ) {
      setBackgroundColor("var(--gray-100, #ffffff)");
      setColor("#5B5B5B");
    } else {
      setBackgroundColor("var(--primary-500, #FFE5D0)");
      setColor("#FF6B26");
    }
  }, [application.status]);

  return (
    <Box width="48px" height="48px">
      <input
        onChange={(e) => handleFileChange(e)}
        ref={inputRef}
        type="file"
        disabled={
          application.status >= EApplicationStatus.review ||
          activeStep > 2 ||
          isDisabled
        }
        style={{ display: "none" }}
        multiple
        accept=".jpg,.jpeg,.pdf,application/pdf"
      />
      <Tooltip title="Upload document">
        <Box
          onClick={handleClick}
          // variant="button"
          display="flex"
          flex={1}
          justifyContent="center"
          alignItems="center"
          sx={{
            borderRadius: "50%",
            width: "48px",
            cursor: "pointer !important",
            height: "48px",
            backgroundColor,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 15.75H18.5625C21.1406 15.75 23.25 14.7558 23.25 12.2062C23.25 9.65672 20.7656 8.76234 18.75 8.6625C18.3333 4.67531 15.4219 2.25 12 2.25C8.76562 2.25 6.6825 4.39641 6 6.525C3.1875 6.79219 0.75 8.20688 0.75 11.1375C0.75 14.0681 3.28125 15.75 6.375 15.75H9M9 18.7547L12 21.75L15 18.7547M12 10.5V21.0014"
              stroke={color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default ApplicationUploadButton;
