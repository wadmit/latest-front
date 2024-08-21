"use client";
import { DocumentContext } from "@/context/document-context";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { Stack } from "@mui/material";
import React, { useContext } from "react";
import { DisplayImageView } from "@/page-components/dashboard/applications/components";

type Props = {
  name: string;
  imageUrl: string;
  handleRemove: () => void;
  previewUrl?: string;
  isDisabled: boolean;
};

const ApplicationImageDisplay = ({
  name,
  imageUrl,
  handleRemove,
  previewUrl,
  isDisabled,
}: Props) => {
  const { activeStep } = useContext(DocumentContext);
  const status = useAppSelector(
    (state) => state.applications.singleApplication.status
  );
  return (
    <Stack mt={3}>
      {name.split(".").pop() === "pdf" ? (
        <DisplayImageView
          handleRemove={handleRemove}
          name={name}
          imageUrl="/images/dashboard/pdf.webp"
          previewUrl={previewUrl}
          status={status}
          activeStep={activeStep}
          isDisabled={isDisabled}
        />
      ) : (
        <DisplayImageView
          handleRemove={handleRemove}
          name={name}
          imageUrl={imageUrl}
          status={status}
          activeStep={activeStep}
          isDisabled={isDisabled}
        />
      )}
    </Stack>
  );
};

export default ApplicationImageDisplay;
