"use client";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { IApplication } from "@/types/application";
import { Box, Typography } from "@mui/material";
import React, { useCallback } from "react";

type Props = {
  applications: IApplication[];
  status: boolean;
  selectedApplications: string[];
  getConvertedCosts: (
    value: number,
    base_currency: string
  ) => {
    formattedValue: string;
    amount: number;
  };
};

const ApplicationTotalFeeDisplay = ({
  applications,
  status,
  selectedApplications,
  getConvertedCosts,
}: Props) => {
  const to = useAppSelector((state) => state.currency.to);
  const calculateTotalAmountFromSelected = useCallback(
    () =>
      selectedApplications.reduce((acc, curr) => {
        const foundApplication = applications.find(
          (application) => application.id === curr
        );
        if (foundApplication) {
          return (
            acc +
            (foundApplication.university.admission_free
              ? 0
              : getConvertedCosts(
                  foundApplication.university.detail.fees["Application Fee"],
                  foundApplication.university.base_currency
                ).amount)
          );
        }
        return acc;
      }, 0),
    [selectedApplications]
  );

  const calculateTotalAmountFromAll = useCallback(
    () =>
      applications.reduce(
        (acc, curr) =>
          acc +
          (curr.university.admission_free
            ? 0
            : getConvertedCosts(
                curr.university.detail.fees["Application Fee"],
                curr.university.base_currency
              ).amount),
        0
      ),
    [applications]
  );

  return (
    <Box
      width="100%"
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "16px",
        marginTop: "16px",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "var(--greyscale-300, #848484)",
          textAlign: "right",
        }}
      >
        Total fee: {to ? to.toUpperCase() : "USD"}{" "}
        {!status
          ? Math.ceil(calculateTotalAmountFromSelected())
          : Math.ceil(calculateTotalAmountFromAll())}
      </Typography>
    </Box>
  );
};

export default ApplicationTotalFeeDisplay;
