"use client"
import useCostConverterMain from "@/hooks/costConverterMain";
import { IApplication } from "@/types/application";
import { Stack } from "@mui/material";
import React from "react";
import {
  ApplicationTableHeader,
  ApplicationTable,
} from "@/page-components/dashboard/applications/components";
import Loader from "@/components/common/circular-loader/Loader";

type Props = {
  statusHeader: string;
  status: boolean;
  isLoading: boolean;
  // applications: IApplication[];
};

const ApplicationDynamicTable = ({
  statusHeader,
  status,
  isLoading,
  // applications,
}: Props) => {
  const getConvertedCosts = useCostConverterMain();
  return (
    <Stack>
      <ApplicationTableHeader value={statusHeader} />
      {isLoading ? (
        <Loader />
      ) : (
        <ApplicationTable
          // applications={applications}
          status={status}
          getConvertedCosts={getConvertedCosts}
        />
      )}
    </Stack>
  );
};

export default ApplicationDynamicTable;
