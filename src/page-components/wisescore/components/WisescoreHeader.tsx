"use client"
import { Box, styled, Typography } from '@mui/material';
import React from 'react';

type Props = {
    screenHeader: string;
    step: number;
    noheader?: boolean;
    maxStep?: number;
};
const StyledTypography = styled(Typography)(({ theme }) => ({
    fontSize: 'clamp(28px, 36px, 36px)',
    fontWeight: 800,
    lineHeight: '120%',

    [theme.breakpoints.down('sm')]: {
        fontSize: '32px',
    },

    [theme.breakpoints.down('xs')]: {
        fontSize: '32px',
    },
}));

function WisescoreHeader({ screenHeader, step, maxStep, noheader }: Props) {
    return !noheader ? (
        <Box
            padding={{ lg: 0, md: 0, sm: '0 16px', xs: '0 16px 50px 16px' }}
            mt={{ lg: '56px', md: '56px', sm: '24px', xs: '24px' }}
            display="flex"
            flexDirection="column"
            justifyContent={{
                lg: 'center',
                md: 'center',
                sm: 'flex-start',
                xs: 'flex-start',
            }}
            alignItems={{
                lg: 'center',
                md: 'center',
                sm: 'flex-start',
                xs: 'flex-start',
            }}
        >
            <Typography
                color="rgba(0, 0, 0, 0.85)"
                fontSize="14px"
                fontFamily="HankenGroteskExtraBold"
            >
                Step {step} of {step !== 1 ? maxStep! : '..'}
            </Typography>
            <StyledTypography
                mt={{ lg: '8px', md: '8px', sm: '24px', xs: '24px' }}
                lineHeight="150%"
                fontFamily="HankenGroteskExtraBold"
                fontSize="48px"
            >
                {screenHeader}
            </StyledTypography>
        </Box>
    ) : (
        <Box
            padding={{ lg: 0, md: 0, sm: '0 16px', xs: '0 16px 0px 16px' }}
            mt={{ lg: '56px', md: '56px', sm: '24px', xs: '24px' }}
            display="flex"
            flexDirection="column"
            justifyContent={{
                lg: 'center',
                md: 'center',
                sm: 'flex-start',
                xs: 'flex-start',
            }}
            alignItems={{
                lg: 'center',
                md: 'center',
                sm: 'flex-start',
                xs: 'flex-start',
            }}
        >
            <Typography
                color="rgba(0, 0, 0, 0.85)"
                fontSize="14px"
                fontFamily="HankenGroteskExtraBold"
            >
                Step {step} of {step !== 1 ? maxStep! : '..'}
            </Typography>


            {/* <Typography
                color="rgba(0, 0, 0, 0.85)"
                width={{ lg: '35%', md: '50%', sm: '100%', xs: '100%' }}
                fontSize="14px"
                lineHeight="130%"
                textAlign={{ lg: 'center', md: 'center', sm: 'left', xs: 'left' }}
                mt={{ lg: '24px', md: '24px', sm: '16px', xs: '16px' }}
                component="h3"
            >
                {screenSubHeader}
            </Typography> */}
        </Box>
    );
}

export default WisescoreHeader;
