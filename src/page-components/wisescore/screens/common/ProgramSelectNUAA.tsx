"use client";
import { useAppDispatch } from "@/global-states/hooks/hooks";
import { useFormikContext } from "formik";
import React from "react";
import { INITIAL_WISE_STATE } from "../../utils/formik";
import { useQuery } from "@tanstack/react-query";
import { CacheConfigKey } from "@/constants";
import { getFutureStream } from "@/api/web/wisescore.action";
import { setProgramType } from "@/global-states/reducers/wisescore";
import { Box, Stack } from "@mui/material";
import Loader from "@/components/common/circular-loader/Loader";
import SelectButtons from "../../components/SelectButtons";
import { GetBachelors, GetMasters } from "../../svgs";
import GoBackButton from "../GoBackButton";
import type { IScreenProps } from "@/types/wisescore";

function ProgramSelectNUAA({ value, handleNext, handleGoBack }: IScreenProps) {
  const dispatch = useAppDispatch();
  const { setFieldValue, values, resetForm } =
    useFormikContext<typeof INITIAL_WISE_STATE>();
  // const [option, setOption] = React.useState<string>('');
  const { data: futureStream, isLoading } = useQuery({
    queryKey: [CacheConfigKey.NUAA_FUTURE_STREAMS_QUERY_KEY],
    queryFn: async () => await getFutureStream(),
  });

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
  const handleOptionClick = async (programType: string) => {
    if (programType === "Masters") {
      if (values.program_type === mastersId) {
        handleNext();
        return;
      }
      resetForm();
      setFieldValue(value, mastersId);
      dispatch(setProgramType("masters"));
    } else {
      if (values.program_type === bachelorsId) {
        handleNext();
        return;
      }
      resetForm();
      setFieldValue(value, bachelorsId);
      dispatch(setProgramType("bachelors"));
    }
    handleNext();
  };
  if (isLoading) {
    return (
      <Stack mt={30} alignItems="center">
        <Loader />
      </Stack>
    );
  }
  return (
    <Stack justifyContent="center" alignItems="center">
      <Box
        gap={{ lg: "25px", md: "25px", sm: "32px", xs: "32px" }}
        alignItems="center"
        justifyContent="center"
        mt={{ lg: "64px", md: "64px", sm: "46px", xs: "32px" }}
        display="flex"
        padding={{ lg: 0, md: 0, sm: "0 16px", xs: "0 16px 50px 16px" }}
        flexDirection={{ xs: "column", sm: "column", lg: "row", md: "row" }}
      >
        <SelectButtons
          onClick={() => handleOptionClick("Masters")}
          text="Master's"
          isActive={values.program_type === mastersId}
          Icon={GetMasters}
        />
        <SelectButtons
          isActive={values.program_type === bachelorsId}
          onClick={() => handleOptionClick("Bachelors")}
          text="Bachelor's"
          Icon={GetBachelors}
        />
      </Box>
      <GoBackButton handleGoBack={handleGoBack} />
    </Stack>
  );
}
export default ProgramSelectNUAA;
