"use client"
import React from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import useCostConverterMain from '@/hooks/costConverterMain';
import { Shortlist, TShortListDetails } from '@/types/sortlist';
import { Chip } from './Chip';
import TopMatches from './TopMatches';
import ShortListTable from './SortListTable';
import ShortListNullState from './SortListNullState';
import { IProgram } from '@/types/program';


type SelectProgramsProps = {
    data?: { shortlistedPrograms: IProgram[], shortlistedDetails: TShortListDetails[] };
    handleStep: (value: number) => void;
    wiseScore: number | undefined;
};

function SelectPrograms({ data, handleStep, wiseScore }: SelectProgramsProps) {
    const getConvertedCosts = useCostConverterMain()
    return (
        <>
            {/* <Grid></Grid> */}
            <Grid mb={9} container>
                <Grid item xs={10}>
                    <Stack direction="column" justifyContent="center">
                        <Stack marginBottom={2} direction="row" alignItems="center" gap={2}>
                            <Typography variant='h4'>Shortlisted Program</Typography>
                            <Chip text={`${data?.shortlistedPrograms.length ?? 0} Programs Shortlisted`} />
                        </Stack>

                        {data && data.shortlistedPrograms.length > 0 ? <ShortListTable
                            getConvertedCosts={getConvertedCosts}
                            shortlistDetails={data?.shortlistedDetails}
                            handleStep={handleStep} Shortlists={data.shortlistedPrograms ?? []} /> : <ShortListNullState />}
                    </Stack>
                </Grid>
            </Grid>
            <TopMatches
                handleStep={handleStep} muted={false} wiseScore={wiseScore} />
        </>
    );
}

export default SelectPrograms;
