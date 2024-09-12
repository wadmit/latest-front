"use client"
import { WiseSvg } from 'public/svg';
import ScoreGauge from '@/components/common/score-gauge/ScoreGauge';
import useCostConverter from '@/hooks/costConverter';
import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import TopMatches from './TopMatches';


type WiseScoreCalculatedProps = {
    handleStep: (value: number) => void;
    wiseScore: number | undefined;
};

function WiseScoreCalculated({ handleStep, wiseScore }: WiseScoreCalculatedProps) {
    const recheckWiseScore = () => {
        handleStep(0);
    };
    const getConvertedCosts = useCostConverter()
    return (
        <>
            <Grid container mb={6}>
                <Grid item xs={10}>
                    <Stack alignItems="center" justifyContent="center">
                        <Stack
                            direction="row"
                            gap={6}
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                backgroundColor: '#d1e7dd',
                                padding: '45px 45px 45px 24px',
                                width: '580px',
                            }}
                        >
                            <Stack direction="column" gap={2}>
                                <Typography
                                    variant="caption"
                                    fontSize="24px"
                                    lineHeight="33.6px"
                                    fontFamily="HankenGroteskExtraBold"
                                >
                                    Planning to recheck your WiseScore®?
                                </Typography>
                                <Typography
                                    variant="caption"
                                    fontSize="14px"
                                    lineHeight="19.6px"
                                    fontFamily="HankenGroteskSemiBold"
                                >
                                    You can check your WiseScore® anytime, even after you&apos;ve already
                                    checked it.
                                </Typography>
                                <Typography
                                    lineHeight="22.4px"
                                    color="#FF6B26"
                                    fontFamily="HankenGroteskSemiBold"
                                    style={{
                                        cursor: 'pointer',
                                        textDecoration: 'underline',
                                    }}
                                    onClick={recheckWiseScore}
                                >
                                    ReCheck WiseScore®
                                </Typography>
                            </Stack>
                            <Box
                                sx={{
                                    position: 'relative',
                                }}
                            >
                                <Box sx={{ position: 'absolute', top: '29px', left: '32px' }}>
                                    <ScoreGauge
                                        value={Math.round(wiseScore || 0) || 0}
                                        offsetColor="grey"
                                    />
                                </Box>
                                <WiseSvg />
                            </Box>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
            <TopMatches
                handleStep={handleStep} muted wiseScore={wiseScore} />
        </>
    );
}

export default WiseScoreCalculated;
