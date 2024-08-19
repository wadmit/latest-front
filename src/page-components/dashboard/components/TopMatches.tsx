"use client"
import { getStudentUniversities } from '@/api/web/student.action';
import Loader from '@/components/common/circular-loader/Loader';
import { CacheConfigKey } from '@/constants';
import useCostConverterMain from '@/hooks/costConverterMain';
import { useCustomQuery } from '@/hooks/useCustomQuery';
import { Card } from '@/page-components/wisescore/wisescore-thankyou/components/card';
import { WaitingScreen } from '@/page-components/wisescore/wisescore-thankyou/components/WaitingScreen';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

type TopMatchesProps = {
    handleStep: (value: number) => void;
    wiseScore: number | undefined;
    muted: boolean;
    // getConvertedCosts: (value: number, base_currency: string) => string
    // getConvertedCosts: (value: number) => string
    // getConvertedCost: {
    //     getConvertedCosts: (value: number, curr?: string) => Promise<string>,
    //     baseCurrency: string
    // };
};

function TopMatches({ handleStep, wiseScore, muted }: TopMatchesProps) {

    const getConvertedCosts = useCostConverterMain();

    const { data, isLoading, isError } = useCustomQuery({
        queryKey:[CacheConfigKey.USER_UNIVERSITIES_QUERY_KEY,wiseScore],
        queryFn:async()=>await getStudentUniversities(),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    }
    );
    const noMatchFoundData = {
        title: 'No Match Found',
        desc: '',
        btnText: 'Try Again Selecting Other Programs',
    };
    return (
        <Box width="100%">
            <Typography marginBottom={2} variant='h4'> Top Matches</Typography>
            <Typography variant="caption" fontSize="14px" lineHeight="22.4px" fontFamily="HankenGroteskSemiBold" >
                These are the selected universities based on your score. Please click the button below to shortlist your program.
            </Typography>

            {isLoading && (
                <Box
                    bgcolor="common.white"
                    borderRadius={1}
                    pt={5}
                    pb={9.5}
                    minHeight="80vh"
                >
                    <Stack direction="row" justifyContent="center">
                        <Loader />
                        <Typography variant="h6" sx={{ ml: 2 }} color="primary">
                            Loading...
                        </Typography>
                    </Stack>
                </Box>
            )}
            <Box position='relative' height={muted ? '400px' : '100%'} overflow="hidden">
                {data?.length > 0 ? (
                    data.map((item: any, key: number) => (
                        <Box sx={{ pointerEvents: muted ? 'none' : 'all' }} my={{ xl: 4, xs: 2 }} key={item.university.id}>
                            <Card
                                wisescore={Math.round(Number(wiseScore))}
                                university={item.university}
                                rank={key}
                                getConvertedCosts={getConvertedCosts}
                            />
                        </Box>
                    ))) : (
                    <WaitingScreen
                        title={noMatchFoundData.title}
                        desc={noMatchFoundData.desc}
                        btnText={noMatchFoundData.btnText}
                    />
                )}
                {muted &&
                    <>
                        <Box
                            alignItems="center"
                            justifyContent="center"
                            position="absolute"
                            top={0} bottom={0} left={0} right={0}
                            height="400px"
                            sx={{ backgroundColor: 'white', opacity: '90%' }} />
                        <Box alignItems="center"
                            justifyContent="center"
                            position="absolute"
                            top="50%" left="50%" >
                            <Button variant='contained' onClick={() => handleStep(2)}>
                                Start Application
                            </Button>
                        </Box>

                    </>
                }
            </Box>

        </Box >
    );
}

export default TopMatches;
