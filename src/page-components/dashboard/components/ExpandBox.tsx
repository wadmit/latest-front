"use client"
import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';

type ExpandBoxProps = {
    activeStep: number;
    setExpandedInfo: (value: boolean) => void;
};

function ExpandBox({ activeStep, setExpandedInfo }: ExpandBoxProps) {
    return (
        <Grid container>
            {activeStep >= 2 && <Grid item xs={4} />}
            {activeStep >= 4 && <Grid item xs={4} />}
            <Grid item xs={4}>
                <Box
                    sx={{
                        width: { lg: '130px', md: '130px', sm: '130px', xs: '90px' },
                        border: '1px solid #F4F4F4',
                        borderRadius: '4px',
                        height: '70px',
                        backgroundColor: '#F7F7F7',
                        position: 'relative',
                    }}
                >
                    <Stack justifyContent="center" height="100%" padding="12px">
                        <Typography
                            fontSize="14px"
                            lineHeight="22.4px"
                            fontFamily="HankenGroteskSemiBold"
                            width="105px"
                        >
                            Need Help ?
                        </Typography>
                        <Typography
                            lineHeight="22.4px"
                            color="#ADADAD"
                            style={{
                                textDecoration: 'underline',
                                cursor: 'pointer',
                            }}
                            width="105px"
                            onClick={() => setExpandedInfo(true)}
                        >
                            Expand
                        </Typography>
                    </Stack>
                    <svg
                        style={{
                            position: 'absolute',
                            top: '-14px',
                            left: '12px',
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="24"
                        viewBox="0 0 27 24"
                        fill="none"
                    >
                        <path
                            id="Polygon 1"
                            d="M10.9019 1.5C12.0566 -0.500003 14.9434 -0.5 16.0981 1.5L26.0574 18.75C27.2121 20.75 25.7687 23.25 23.4593 23.25H3.5407C1.2313 23.25 -0.212068 20.75 0.942632 18.75L10.9019 1.5Z"
                            fill="#F7F7F7"
                        />
                    </svg>
                </Box>
            </Grid>
        </Grid>
    );
}

export default ExpandBox;
