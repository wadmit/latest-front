import React, { useContext } from "react";
import { Divider, Typography, Box } from "@mui/material";
import Cookies from "js-cookie";
import moment from "moment";
import { useRouter } from "next/navigation";
import ProgramsDetailContext from "@/context/program-detail-context";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { GetPopUpIcon } from "@/page-components/programs/svg";
import Image from "next/image";

const ProgramAdmissionCard = React.forwardRef(
  (
    {
      getConvertedCosts,
    }: {
      getConvertedCosts: (
        value: number,
        base_currency: string
      ) => {
        formattedValue: string;
        amount: number;
      };
    },
    ref
  ) => {
    const program = useContext(ProgramsDetailContext);
    const router = useRouter();
    return (
      <Box
        id="admissions"
        ref={ref}
        borderRadius="12px"
        padding="35px 32px"
        border="1px solid #E9E9E9"
        bgcolor="white"
      >
        <Typography fontSize="24px" fontFamily="HankenGroteskExtraBold">
          Admissions
        </Typography>
        <Divider />

        <Box mt="24px" display="flex" flexDirection="column">
          <Typography
            fontSize="18px"
            fontFamily="HankenGroteskExtraBold"
            lineHeight="150%"
            color="#201C1A"
          >
            Application Fee
          </Typography>
          <Box mt="8px" display="flex" gap="21px" alignItems="center">
            <Typography
              color="rgba(32, 28, 26, 0.9)"
              fontSize="18px"
              fontFamily="HankenGroteskRegular"
              lineHeight="28.8px"
            >
              {
                getConvertedCosts(
                  program?.university?.detail?.fees["Application Fee"],
                  program.detail.base_currency
                ).formattedValue
              }
            </Typography>
            <Box
              display="flex"
              gap="8px"
              alignItems="center"
              fontSize="14px"
              fontFamily="HankenGroteskSemiBold"
              onClick={() => {
                try {
                  analytics.websiteButtonInteractions({
                    buttonName: "Start Application",
                    source: `Clicked on start application from program admission of ${program?.name}`,
                    urlPath: window.location.href,
                    event_type: EAnalyticsEvents.START_APPLICATION_PROGRAM,
                    status: EAnalyticsStatus.SUCCESS,
                    redirectPath: "",
                  });
                  localStorage.setItem(
                    "Program",
                    JSON.stringify({
                      programId: program.id,
                    })
                  );
                  if (Cookies.get("accessToken")) {
                    router.push("/dashboard");
                  } else {
                    router.push("/applynow?signUp=true");
                  }
                } catch (err) {
                  analytics.trackEvent(EAnalyticsEvents.ERROR, {
                    source: "Start application from program admission",
                    message: err,
                  });
                }
              }}
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
                color: "#FF6B26",
              }}
            >
              Start Application <GetPopUpIcon/>
            </Box>
          </Box>
        </Box>
        <Box mt="18px" display="flex" flexDirection="column">
          <Typography
            fontSize="18px"
            fontFamily="HankenGroteskExtraBold"
            lineHeight="150%"
            color="#201C1A"
          >
            Application Deadline
          </Typography>
          <Typography
            fontSize="16px"
            lineHeight="150%"
            color="rgba(32, 28, 26, 0.9)"
            fontFamily="HankenGroteskRegular"
            mt="8px"
          >
            {moment(program.detail.general_application_deadline1).format(
              "MMMM, DD, yyyy"
            )}{" "}
            standard deadline
          </Typography>
        </Box>
      </Box>
    );
  }
);

export default ProgramAdmissionCard;
