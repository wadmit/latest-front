import { useRouter } from "next/navigation";
import { monthShort } from "./utils/provider";
import React from "react";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { selectDashboardDataGlobal } from "@/global-states/reducers/userReducer";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import ScoreGauge from "../score-gauge/ScoreGauge";

function ScoreComponent() {
  const router = useRouter();

  const dashboardData = useAppSelector(selectDashboardDataGlobal);
  const score = React.useMemo(
    () => dashboardData?.score ?? 0,
    [dashboardData?.score]
  );

  const currency = useAppSelector((state) => state.currency);

  const getDateFromDate = React.useCallback(
    (date: Date | undefined): string => {
      if (date) {
        const localDate = new Date(date);

        return `${localDate.getDate()} ${
          monthShort[localDate.getMonth()]
        },${localDate.getFullYear()}`;
      }
      return "";
    },
    [dashboardData]
  );
  return (
    <Stack
      bgcolor="var(--blue-100, #313841)"
      minHeight="176px"
      borderRadius={1}
      padding="10px 5px"
      alignItems="center"
      direction="column"
      width="95%"
      px={{
        xl: 2,
        xs: 1,
      }}
      maxWidth="302px"
      mx="auto"
    >
      {score || score === 0 ? (
        <Stack
          justifyContent="center"
          display="flex"
          alignItems="center"
          flexDirection="column"
          gap={1}
        >
          <Stack textAlign="center" color="#ffffff">
            <Typography
              variant="body1"
              sx={{
                fontSize: "18px",
                fontStyle: "normal",
                fontFamily: "HankenGroteskRegular",
              }}
            >
              Your WiseScore®
            </Typography>
            <Typography
              mt={1}
              color="var(--gray-600, #627D98)"
              variant="subtitle2"
            >
              Checked on:{" "}
              {getDateFromDate(dashboardData?.latestWisescoreCheckDate)}
            </Typography>
          </Stack>
          <Stack
            direction="column"
            width="100%"
            mt={1}
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            <ScoreGauge
              value={score || 0 || 0}
              offsetColor="primary"
              type="blue"
              size={99}
            />
            <Box
              mt={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderRadius: "4px",
                border: "1px solid #83868B",
                padding: "4px 8px 0px 8px",
                width: "150px",
                height: "36px",
                cursor: "pointer",
              }}
              onClick={() => {
                router.push("/dashboard/wisescore");
                analytics.websiteButtonInteractions({
                  location: {
                    countryName: currency.currentCountry,
                    city: currency.city,
                  },
                  buttonName: `${score > 0} ? Recheck : Check WiseScore® `,
                  source: `User has clicked on ${
                    score > 0 ? "Recheck" : "Check WiseScore®"
                  } from Student dashboard sidebar`,
                  urlPath: window.location.href,
                  event_type: EAnalyticsEvents.FIND_SCHOLARSHIP_NOW,
                  status: EAnalyticsStatus.SUCCESS,
                  redirectPath: "",
                });
              }}
            >
              {score > 0 ? "Recheck" : "Check WiseScore®"}
            </Box>
          </Stack>
        </Stack>
      ) : (
        <CircularProgress />
      )}
    </Stack>
  );
}

export default React.memo(ScoreComponent);
