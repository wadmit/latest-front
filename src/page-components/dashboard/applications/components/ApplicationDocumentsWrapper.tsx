"use client";
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { IApplicationDocument } from "@/types/application";
import { ApplicationDocumentsCard } from "@/page-components/dashboard/applications/components";

type Props = {
  headerText: string;
  fields: (IApplicationDocument | undefined)[];
  applicationId: string;
  disabledButton: boolean;
};

function ApplicationDocumentIdentifier({ text }: { text: string }) {
  return (
    <Box
      mt={2}
      mb={2}
      sx={{
        background: "var(--gray-100, #F0F4F8)",
        color: "var(--gray-700, #486581)",
        width: "fit-content",
        padding: "8px 23px",
        borderRadius: "25px",
      }}
    >
      <Typography variant="button">{text}</Typography>
    </Box>
  );
}

const ApplicationDocumentsWrapper = ({
  headerText,
  fields,
  applicationId,
  disabledButton,
}: Props) => {
  return (
    <Stack flex={1}>
      <ApplicationDocumentIdentifier text={headerText} />
      {fields &&
        fields.map((document) => (
          <ApplicationDocumentsCard
            applicationId={applicationId}
            document={document}
            header={document?.coreDocument?.name}
          />
        ))}
    </Stack>
  );
};

export default ApplicationDocumentsWrapper;
