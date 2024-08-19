"use client"
import React from 'react';
import {
    Avatar,
    Box,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import { HorizontalStepperSteps } from '../utils/data';
import { getStepperStyles } from '../utils/provider';




type Props = {
    activeStep: number;
    handleStepperClick: (StepId: number) => void;
};

export default function HorizontalLinearStepper({ activeStep, handleStepperClick }: Props) {
    const hoverEffectClass = {
        cursor: 'pointer',
        '&:hover': {
            color: '#479F76'
        },
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container>
                {HorizontalStepperSteps.map(({ id, name }) => {
                    const { backgroundColor, color, text, border } = getStepperStyles(activeStep, id);
                    return (
                        <Grid
                            // sx={{ ...hoverEffectClass }} 
                            // onClick={() => handleStepperClick(id)} 
                            item xs={4} key={id}>
                            <Stack direction={{ lg: 'row', xs: 'column' }} gap={{ lg: 4, xs: 2 }} alignItems="center"  >
                                <Avatar
                                    variant="circular"
                                    sx={{ width: 32, height: 32, backgroundColor, border, color }}
                                >
                                    <Typography
                                        align='center'
                                        fontSize="14px"

                                        lineHeight="22.4px"
                                        fontFamily="HankenGroteskSemiBold"
                                        color={color}
                                        width="105px"
                                    >
                                        {id}
                                    </Typography>
                                </Avatar>
                                <Typography
                                    fontSize="14px"
                                    lineHeight="22.4px"
                                    fontFamily="HankenGroteskSemiBold"
                                    color={text}
                                    width="105px"
                                    textAlign={{ lg: 'left', xs: 'center' }}
                                >
                                    {name}
                                </Typography>
                            </Stack>
                        </Grid>
                    );
                })}
            </Grid>
        </Box >
    );
}


// 1st style shows this step to do
// 2nd shows this step is completed
// 3rd means muted not even touched

// when 0 state first step has first style and the last two has 3rd style
// when 1 state first step has 2nd styyle, second step has first style and third has 3rd style
// when 2 state first and second has 2nd style and third has first style
// when 3 state all have 2nd style

