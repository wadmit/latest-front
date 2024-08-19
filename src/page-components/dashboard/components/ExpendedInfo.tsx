"use client"
import React from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { activeSteps } from '../utils/data';
import { ClipBoardIcon, StepIcon } from '../svg';

type ExpandedInfoProps = {
    activeStep: number;
    setExpandedInfo: (value: boolean) => void;
};

// 0 - wiseScore Not Checked
// 1 - WiseScore Checked
// 2 - select Program
// 3 - select Program complete
// 4 - Profile
// 5 - Profile Complete

function findStep(activeStep: number) {
    const stepName = activeSteps.find((step) => step.number === activeStep);
    return stepName ?? { number: 0, name: '', title: '', desc: '', todos: [] };
}

function ExpandedInfo({ activeStep, setExpandedInfo }: ExpandedInfoProps) {
    const completedStages: number[] = [1, 3, 5];
    const stepStatus = completedStages.includes(activeStep)
        ? 'Completed'
        : 'In Progress';
    const { name, title, desc, todos } = findStep(activeStep);
    return (
        <Grid container>
            <Grid container>
                {activeStep >= 2 && <Grid item xs={4} />}
                {activeStep >= 4 && <Grid item xs={4} />}
                <Grid item xs={4} position="relative">
                    <StepIcon />
                </Grid>
            </Grid>
            <Grid item xs={12} md={10}>
                <Box
                    sx={{
                        border: '1px solid #F4F4F4',
                        borderRadius: '4px',
                        boxShadow: '0px 0px 9px -90px rgba(0, 0, 0, 0.26)',
                        backgroundColor: '#F7F7F7',
                        position: 'relative',
                    }}
                >
                    <Stack
                        direction="row"
                        gap={2}
                        sx={{
                            padding: '16px 45px 16px 16px',
                        }}
                    >
                        <svg
                            className="material-symbols-readiness-score-outline"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.83366 28.0333C9.03366 28.0111 8.27233 27.8058 7.54966 27.4173C6.82699 27.0289 6.14388 26.4564 5.50033 25.7C4.61144 24.6333 3.91677 23.3613 3.41633 21.884C2.91588 20.4067 2.66611 18.8898 2.66699 17.3333C2.66699 15.4889 3.01722 13.7556 3.71766 12.1333C4.41811 10.5111 5.36788 9.1 6.56699 7.9C7.76699 6.7 9.17811 5.75022 10.8003 5.05067C12.4226 4.35111 14.1559 4.00089 16.0003 4C17.8448 4 19.5781 4.35556 21.2003 5.06667C22.8225 5.77778 24.2337 6.74444 25.4337 7.96667C26.6337 9.18889 27.5839 10.6222 28.2843 12.2667C28.9848 13.9111 29.3346 15.6778 29.3337 17.5667C29.3337 19.2778 29.0559 20.8778 28.5003 22.3667C27.9448 23.8556 27.1559 25.1111 26.1337 26.1333C25.5114 26.7556 24.8559 27.228 24.167 27.5507C23.4781 27.8733 22.7781 28.0342 22.067 28.0333C21.667 28.0333 21.267 27.9836 20.867 27.884C20.467 27.7844 20.067 27.6342 19.667 27.4333L17.8003 26.5C17.5337 26.3667 17.2501 26.2667 16.9497 26.2C16.6492 26.1333 16.3328 26.1 16.0003 26.1C15.667 26.1 15.3501 26.1333 15.0497 26.2C14.7492 26.2667 14.4661 26.3667 14.2003 26.5L12.3337 27.4333C11.9114 27.6556 11.4946 27.8169 11.083 27.9173C10.6714 28.0178 10.255 28.0564 9.83366 28.0333ZM9.90033 25.3667C10.1003 25.3667 10.3061 25.3444 10.5177 25.3C10.7292 25.2556 10.9346 25.1778 11.1337 25.0667L13.0003 24.1333C13.467 23.8889 13.9506 23.7111 14.451 23.6C14.9514 23.4889 15.4568 23.4333 15.967 23.4333C16.4781 23.4333 16.9892 23.4889 17.5003 23.6C18.0114 23.7111 18.5003 23.8889 18.967 24.1333L20.867 25.0667C21.067 25.1778 21.267 25.2556 21.467 25.3C21.667 25.3444 21.867 25.3667 22.067 25.3667C22.4892 25.3667 22.8892 25.2556 23.267 25.0333C23.6448 24.8111 24.0226 24.4778 24.4003 24.0333C25.1114 23.1889 25.667 22.1778 26.067 21C26.467 19.8222 26.667 18.6111 26.667 17.3667C26.667 14.3889 25.6337 11.8613 23.567 9.784C21.5003 7.70667 18.9781 6.66756 16.0003 6.66667C13.0226 6.66667 10.5003 7.71111 8.43366 9.8C6.36699 11.8889 5.33366 14.4222 5.33366 17.4C5.33366 18.6667 5.53899 19.9 5.94966 21.1C6.36033 22.3 6.93277 23.3111 7.66699 24.1333C8.04477 24.5778 8.41144 24.8947 8.76699 25.084C9.12255 25.2733 9.50033 25.3676 9.90033 25.3667ZM16.0003 20C16.7337 20 17.3617 19.7391 17.8843 19.2173C18.407 18.6956 18.6679 18.0676 18.667 17.3333C18.667 17.1556 18.6501 16.9778 18.6163 16.8C18.5826 16.6222 18.5328 16.4444 18.467 16.2667L20.1337 14.0333C20.3559 14.3222 20.5506 14.6276 20.7177 14.9493C20.8848 15.2711 21.0234 15.6213 21.1337 16H23.867C23.5337 14.0444 22.6283 12.4444 21.151 11.2C19.6737 9.95556 17.9568 9.33333 16.0003 9.33333C14.0448 9.33333 12.3226 9.96133 10.8337 11.2173C9.34477 12.4733 8.44477 14.0676 8.13366 16H10.867C11.1781 14.8 11.8114 13.8333 12.767 13.1C13.7226 12.3667 14.8003 12 16.0003 12C16.3781 12 16.7337 12.0333 17.067 12.1C17.4003 12.1667 17.7226 12.2667 18.0337 12.4L16.3337 14.7C16.2892 14.7 16.2337 14.6942 16.167 14.6827C16.1003 14.6711 16.0448 14.6658 16.0003 14.6667C15.267 14.6667 14.6394 14.928 14.1177 15.4507C13.5959 15.9733 13.3346 16.6009 13.3337 17.3333C13.3337 18.0667 13.595 18.6947 14.1177 19.2173C14.6403 19.74 15.2679 20.0009 16.0003 20Z"
                                fill="#26AF61"
                            />
                        </svg>
                        <Stack direction="column" gap={1} width="100%">
                            <Grid container alignItems="center">
                                <Grid item lg={9} xs={3} >
                                    <Typography
                                        fontSize="14px"
                                        lineHeight="22.4px"
                                        fontFamily="HankenGroteskSemiBold"
                                        width="105px"
                                    >
                                        {name}
                                    </Typography>
                                </Grid>
                                <Grid item lg={1} xs={3}>
                                    <Typography
                                        lineHeight="22.4px"
                                        color="#ADADAD"
                                        fontFamily="HankenGroteskSemiBold"
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                        width="105px"
                                        onClick={() => setExpandedInfo(false)}
                                    >
                                        Hide
                                    </Typography>
                                </Grid>
                                <Grid item lg={2} xs={6}>
                                    <Stack
                                        alignItems="center"
                                        sx={{
                                            background:
                                                stepStatus === 'In Progress'
                                                    ? 'rgba(220, 185, 0, 0.2)'
                                                    : '#e9f4ee',
                                            borderRadius: '2px',
                                            padding: '7px 15px 7px 15px',
                                        }}
                                    >
                                        <Typography
                                            color={
                                                stepStatus === 'In Progress' ? '#C3A300' : '#26AF61'
                                            }
                                            textAlign="center"
                                        >
                                            {stepStatus}
                                        </Typography>
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Typography fontSize="16px" lineHeight="22.4px" fontFamily="HankenGroteskSemiBold">
                                {title}
                            </Typography>
                            <Typography
                                fontSize="14px"
                                mb={2}
                                lineHeight="19.6px"
                                fontFamily="HankenGroteskRegular"
                                color="rgba(0, 0, 0, 0.85)"
                            >
                                {desc}
                            </Typography>
                            <Typography fontSize="16px" lineHeight="22.4px" fontFamily="HankenGroteskSemiBold">
                                Your To-do&apos;s
                            </Typography>
                            {todos.length > 0 && todos.map((todo) => (
                                <Stack mb={2} direction="row" alignItems="center" gap={2}>
                                    <ClipBoardIcon />
                                    <Typography
                                        fontSize="14px"
                                        lineHeight="19.6px"
                                        fontFamily="HankenGroteskRegular"
                                        color="rgba(0, 0, 0, 0.85)"
                                    >
                                        {todo}
                                    </Typography>
                                </Stack>
                            ))}

                        </Stack>
                    </Stack>
                </Box>
            </Grid>
        </Grid>
    );
}

export default ExpandedInfo;
