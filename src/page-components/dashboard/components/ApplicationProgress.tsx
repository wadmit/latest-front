"use client";
import { useAppSelector } from "@/global-states/hooks/hooks";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { AccordionComp } from "./AccordionComp";
import ApplicationDetailTable from "./ApplicationDetailTable";
import { EApplicationStatus } from "@/types/application";

type ApplicationInProgressProps = {
  handleStep: (value: number) => void;
};

function ApplicationInProgress({ handleStep }: ApplicationInProgressProps) {
  return (
    <>
      <Box>
        <Typography variant="h4">Applying</Typography>
        <Stack mt={2} gap={2}>
          <Box>
            <AccordionComp
              title="Pay application fees"
              expanded
              details={
                <ApplicationDetailTable
                  status={false}
                  filter={[EApplicationStatus.initial]}
                />
              }
            />
          </Box>
          <Box>
            <AccordionComp
              title="Upload documents"
              expanded
              details={
                <ApplicationDetailTable
                  status
                  filter={[
                    EApplicationStatus.incomplete,
                    EApplicationStatus.incomplete_document,
                    EApplicationStatus.document_complete,
                  ]}
                />
              }
            />
          </Box>
          <Box>
            <AccordionComp
              title="Submission"
              expanded
              details={
                <ApplicationDetailTable
                  status
                  filter={[
                    EApplicationStatus.submission,
                    EApplicationStatus.review,
                  ]}
                />
              }
            />
          </Box>
        </Stack>
      </Box>
      <Box marginY={6} border="1px solid #D6D6D6" />
      <Box>
        <Typography variant="h4">After applying</Typography>
        <Stack mt={2} gap={2}>
          <Box>
            <AccordionComp
              title="Decisions"
              expanded
              details={
                <ApplicationDetailTable
                  status
                  filter={[
                    EApplicationStatus.decision,
                    EApplicationStatus.submitted,
                  ]}
                />
              }
            />
          </Box>
          <Box>
            <AccordionComp
              title="Pre Enrollment"
              expanded
              details={
                <ApplicationDetailTable
                  status
                  filter={[EApplicationStatus.pre_accept]}
                />
              }
            />
          </Box>
          <Box>
            <AccordionComp
              title="Enrolled"
              expanded
              details={
                <ApplicationDetailTable
                  status
                  filter={[
                    EApplicationStatus.enrolled,
                    EApplicationStatus.accepted,
                    EApplicationStatus.rejected,
                  ]}
                />
              }
            />
          </Box>
        </Stack>
      </Box>
    </>
  );
}

export default ApplicationInProgress;
