"use client";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import { useAppDispatch } from "@/global-states/hooks/hooks";
import type { IScreenProps } from "@/types/wisescore";
import React, { useContext, useEffect, useRef } from "react";
import { INITIAL_WISE_STATE } from "../../utils/formik";
import { useFormikContext } from "formik";
import { useQuery } from "@tanstack/react-query";
import { CacheConfigKey } from "@/constants";
import { getFutureStream } from "@/api/web/wisescore.action";
import {
  GetBachelors,
  GetCanada,
  GetChina,
  GetKorea,
  GetMasters,
} from "../../svgs";
import { analytics } from "@/services/analytics.service";
import {
  setPreferredCountry,
  setProgramType,
} from "@/global-states/reducers/wisescore";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";
import moment from "moment";
import { Box, Stack, Typography } from "@mui/material";
import Loader from "@/components/common/circular-loader/Loader";
import { motion } from "framer-motion";
import SelectButtons from "../../components/SelectButtons";
import GoBackButton from "../GoBackButton";

function ProgramSelect({ value, handleNext, handleGoBack }: IScreenProps) {
  const dispatch = useAppDispatch();
  const { primaryColor, secondaryColor } = useContext(WiseScoreDetailsContext);

  const intakeContainerRef = useRef<HTMLDivElement>(null);
  const programContainerRef = useRef<HTMLDivElement>(null);

  const scrollToIntakeDiv = () => {
    if (intakeContainerRef.current) {
      intakeContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToProgramDiv = () => {
    if (programContainerRef.current) {
      programContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const { setFieldValue, values, resetForm } =
    useFormikContext<typeof INITIAL_WISE_STATE>();
  // const [option, setOption] = React.useState<string>('');
  const { data: futureStream, isLoading } = useQuery({
    queryKey: [CacheConfigKey.FUTURE_STREAMS_QUERY_KEY],
    queryFn: async () => await getFutureStream(),
  });

  useEffect(() => {
    scrollToIntakeDiv();
  }, [values.preferredCountry]);
  useEffect(() => {
    scrollToProgramDiv();
  }, [values.preferredIntake]);

  const bachelorsId =
    futureStream &&
    futureStream.filter(
      (stream: any) => stream.name === "Bachelor Degree (4 years)"
    )[0].id;
  const mastersId =
    futureStream &&
    futureStream.filter(
      (stream: any) => stream.name === "Master Degree (2.5 years)"
    )[0].id;

  const intakes = [
    { name: "Feb 2025", dateValue: 1738347300000, recommended: true },
    { name: "Sept 2025", dateValue: 1756664100000, recommended: false },
  ];
  const countries = [
    { name: "China", disabled: false, icon: GetChina },
    { name: "Korea", disabled: false, icon: GetKorea },
    { name: "Canada", disabled: true, icon: GetCanada },
  ];

  const handleOptionClick = async (programType: string, disabled?: boolean) => {
    if (!disabled) {
      if (programType === "Masters") {
        if (values.program_type === mastersId) {
          handleNext();
          return;
        }
        setFieldValue(value, mastersId);
        dispatch(setProgramType("masters"));
        analytics.trackEvent(EAnalyticsEvents.WISESCORE_PROGRAM_SELECTION, {
          programType: "masters",
          preferredCountry: values.preferredCountry,
          preferredIntake: values.preferredIntake,
        });
      } else {
        if (values.program_type === bachelorsId) {
          handleNext();
          return;
        }
        setFieldValue(value, bachelorsId);
        dispatch(setProgramType("bachelors"));
        analytics.trackEvent(EAnalyticsEvents.WISESCORE_PROGRAM_SELECTION, {
          programType: "masters",
          preferredCountry: values.preferredCountry,
          preferredIntake: moment(values.preferredIntake).format("MMM YYYY"),
        });
      }

      handleNext();
    }
  };
  const handleCountryClick = async (countryName: string, disabled: boolean) => {
    if (!disabled) {
      scrollToIntakeDiv();
      if (values.preferredCountry === countryName) {
        setFieldValue("preferredCountry", countryName);
        dispatch(setPreferredCountry(countryName));
      } else {
        resetForm();
        setFieldValue("preferredCountry", countryName);
        dispatch(setPreferredCountry(countryName));
      }
    }
  };
  const handleIntakeClick = async (dateValue: number) => {
    scrollToProgramDiv();
    if (values.preferredIntake === dateValue) {
      setFieldValue("preferredIntake", dateValue);
    } else {
      setFieldValue("preferredIntake", dateValue);
    }
  };

  if (isLoading) {
    return (
      <Stack mt={30} alignItems="center">
        <Loader />
      </Stack>
    );
  }
  return (
    <>
      <Box
        padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
        display="flex"
        flexDirection="column"
        justifyContent={{
          lg: "center",
          md: "center",
          sm: "flex-start",
          xs: "flex-start",
        }}
        alignItems={{
          lg: "center",
          md: "center",
          sm: "flex-start",
          xs: "flex-start",
        }}
      >
        <Typography
          mt={{ lg: "24px", md: "24px", sm: "24px", xs: "24px" }}
          lineHeight="26px"
          letterSpacing="-2%"
          fontFamily="HankenGroteskExtraBold"
          fontSize={{
            lg: "20px",
            xs: "18px",
          }}
          component="h1"
        >
          Select your preferred country.
        </Typography>
        <Stack width="100%" justifyContent="center" alignItems="center">
          <Box
            width="100%"
            gap={{ lg: "25px", md: "25px", sm: "32px", xs: "32px" }}
            alignItems="center"
            justifyContent="center"
            mt={{ lg: "24px", md: "24px", sm: "24px", xs: "24px" }}
            display="flex"
            padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 0px 0px 0px" }}
            flexDirection={{ xs: "column", sm: "column", lg: "row", md: "row" }}
          >
            {countries.map(({ disabled, name, icon }) => (
              <SelectButtons
                isActive={values.preferredCountry === name}
                onClick={() => handleCountryClick(name, disabled)}
                text={name}
                Icon={icon}
                disabled={disabled}
              />
            ))}
          </Box>
        </Stack>
      </Box>
      <Box ref={intakeContainerRef}>
        {values.preferredCountry ? (
          <motion.div
            key="intake"
            initial={{ opacity: 0, scale: 0.5, x: "100%" }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
          >
            <Box
              padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
              display="flex"
              flexDirection="column"
              justifyContent={{
                lg: "center",
                md: "center",
                sm: "flex-start",
                xs: "flex-start",
              }}
              alignItems={{
                lg: "center",
                md: "center",
                sm: "flex-start",
                xs: "flex-start",
              }}
            >
              <Typography
                mt={{ lg: "48px", md: "48px", sm: "24px", xs: "24px" }}
                lineHeight="26px"
                letterSpacing="-2%"
                fontFamily="HankenGroteskExtraBold"
                fontSize={{
                  lg: "20px",
                  xs: "18px",
                }}
                component="h1"
              >
                What&apos;s your preferred intake?{" "}
              </Typography>
              <Stack width="100%" justifyContent="center" alignItems="center">
                <Box
                  width="100%"
                  gap={{ lg: "25px", md: "25px", sm: "32px", xs: "32px" }}
                  alignItems="center"
                  justifyContent="center"
                  mt={{ lg: "24px", md: "24px", sm: "46px", xs: "32px" }}
                  display="flex"
                  padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 0px 0px 0px" }}
                  flexDirection={{
                    xs: "column",
                    sm: "column",
                    lg: "row",
                    md: "row",
                  }}
                >
                  {intakes.map(({ name, dateValue, recommended }) => (
                    <SelectButtons
                      isActive={values.preferredIntake === dateValue}
                      onClick={() => handleIntakeClick(dateValue)}
                      text={name}
                      variant="small"
                      recommended={recommended}
                    />
                  ))}
                </Box>
              </Stack>
            </Box>
          </motion.div>
        ) : null}
      </Box>
      <Box ref={programContainerRef}>
        {values.preferredIntake ? (
          <motion.div
            key="intake"
            initial={{ opacity: 0, scale: 0.5, x: "100%" }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ ease: "easeOut", duration: 0.5 }}
          >
            <Box
              padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
              display="flex"
              flexDirection="column"
              justifyContent={{
                lg: "center",
                md: "center",
                sm: "flex-start",
                xs: "flex-start",
              }}
              alignItems={{
                lg: "center",
                md: "center",
                sm: "flex-start",
                xs: "flex-start",
              }}
            >
              <Typography
                mt={{ lg: "48px", md: "48px", sm: "24px", xs: "24px" }}
                lineHeight="26px"
                letterSpacing="-2%"
                fontFamily="HankenGroteskExtraBold"
                fontSize={{
                  lg: "20px",
                  xs: "18px",
                }}
                component="h1"
              >
                Which degree are you looking for?
              </Typography>
              <Stack width="100%" justifyContent="center" alignItems="center">
                <Box
                  width="100%"
                  gap={{ lg: "25px", md: "25px", sm: "32px", xs: "32px" }}
                  alignItems="center"
                  justifyContent="center"
                  mt={{ lg: "24px", md: "24px", sm: "46px", xs: "32px" }}
                  display="flex"
                  padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 0px 0px 0px" }}
                  flexDirection={{
                    xs: "column",
                    sm: "column",
                    lg: "row",
                    md: "row",
                  }}
                >
                  <SelectButtons
                    variant="big"
                    isActive={values.program_type === bachelorsId}
                    onClick={() => handleOptionClick("Bachelors")}
                    text="Bachelor's"
                    Icon={GetMasters}
                  />
                  <SelectButtons
                    variant="big"
                    onClick={() =>
                      handleOptionClick(
                        "Masters",
                        values.preferredCountry === "Korea"
                      )
                    }
                    text="Master's"
                    isActive={values.program_type === mastersId}
                    disabled={values.preferredCountry === "Korea"}
                    Icon={GetBachelors}
                  />
                </Box>
              </Stack>
            </Box>
          </motion.div>
        ) : null}
      </Box>

      <Box
        padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
        display={{ lg: "flex", md: "flex", sm: "flex", xs: "none" }}
        flexDirection="row"
        gap={2}
        justifyContent={{
          lg: "center",
          md: "center",
          sm: "flex-start",
          xs: "flex-start",
        }}
        alignItems={{
          lg: "center",
          md: "center",
          sm: "flex-start",
          xs: "flex-start",
        }}
      >
        <GoBackButton handleGoBack={handleGoBack} />
        <Box
          disabled={values.program_type === ""}
          // onClick={onClick}
          onClick={() => handleNext()}
          borderRadius="8px"
          bgcolor={primaryColor}
          padding="16px 42px"
          border="none"
          sx={{
            cursor: "pointer",
            "&:disabled": {
              bgcolor: secondaryColor,
              color: "#fff",
            },
          }}
          color="#fff"
          fontFamily="HankenGroteskSemiBold"
          minWidth="161px"
          width={{
            lg: "fit-content",
            md: "fit-content",
            sm: "100%",
            xs: "100%",
          }}
          mt={{ lg: "60px", md: "60px", sm: "30px", xs: "30px" }}
          component="button"
        >
          Next
        </Box>
      </Box>

      {/* for mobile */}
    </>
  );
}

export default ProgramSelect;
