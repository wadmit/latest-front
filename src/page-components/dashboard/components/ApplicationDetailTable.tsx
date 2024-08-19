"use client"
import { EApplicationStatus } from '@/types/application';
import { Stack } from '@mui/material';
import React from 'react';
import ApplicationTable from './ApplicationTable';
import ApplicationPaidTable from './ApplicationPaidTable';

type Props = {
    status: boolean;
    filter: EApplicationStatus[];
};

function ApplicationDetailTable({ status, filter }: Props) {
    return (
        <Stack>
            {/* {filter.includes(EApplicationStatus.initial) ? (
                <ApplicationTable status={status} />
            ) : (
                <ApplicationPaidTable status={status} filter={filter} />
            )} */}
        </Stack>
    );
}

export default ApplicationDetailTable;
