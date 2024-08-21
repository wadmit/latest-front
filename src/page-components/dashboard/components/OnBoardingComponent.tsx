"use client"
import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
    Box,
    Checkbox,
    Dialog,
    Divider,
    FormControlLabel,
    Stack,
    Typography,
    useTheme,
} from '@mui/material';
import { useAppSelector } from '@/global-states/hooks/hooks';
import { OnBoardingImage } from '../utils/data';
import { Close } from '@mui/icons-material';
import { postConsent } from '@/api/web/user.action';


function OnBoardingComponent({
    open,
    handleClose,
}: {
    open: boolean;
    handleClose: () => void;
}) {
    const theme = useTheme();

    const userName = useAppSelector((state) => state.user.dashboardDataGlobal?.data?.first_name)

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const [view, setView] = useState<'first' | 'second'>('first');

    const maxSteps = OnBoardingImage.length;

    const isStepSkipped = (step: number) => skipped.has(step);
    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
    const displayStep = (step: number) => {
        const currentImage = OnBoardingImage[step];
        if (currentImage?.label === 'Dashboard') {
            return 1;
        }
        return step + 1;
    };
    return (
        <Dialog open={open} PaperProps={{ sx: { borderRadius: "11px" } }}>
            {view === 'first' ? (
                <Box display="flex" flexDirection="column" bgcolor="rgba(0, 34, 82, 1)" padding="22px 20px" gap="20px">
                    <Box display="flex" justifyContent="flex-end" onClick={handleClose} style={{ cursor: 'pointer' }}>
                        <Close />
                    </Box>
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" gap="8px">
                        <img src='/images/onboarding/onb.webp' />
                        <Typography fontFamily="HankenGroteskExtraBold" fontWeight={800} fontSize={{ lg: "18px", md: "18px", sm: "16px", xs: "16px" }} lineHeight="23.4px" letterSpacing="-2%" color="rgba(255, 255, 255, 1)" mt="24px" textAlign="center" padding={{ lg: "0px", md: "0px", sm: "0px", xs: "0px 40px" }}>
                            Welcome to WiseAdmit Student Portal, {userName} !
                        </Typography>
                        <Typography fontFamily="HankenGroteskRegular" fontWeight={400} fontSize={{ lg: "14px", md: "14px", sm: "12px", xs: "12px" }} lineHeight="19.6px" textAlign="center" color="rgba(255, 255, 255, 1)">
                            Getting started with Student Portal couldn’t be easier. We are glad to have you onboard. Let's get started with a quick tour to get you started.
                        </Typography>
                        <Box
                            fontFamily="HankenGroteskSemiBold"
                            fontSize="14px"
                            height="36px"
                            width="123px"
                            mt={{ lg: '36px', md: '36px', sm: '24px', xs: '14px' }}
                            color="white"
                            borderRadius="8px"
                            lineHeight="19.2px"
                            padding={{
                                lg: '7px 45px',
                                md: '7px 45px',
                                sm: '12px 24px',
                                xs: '7px 45px',
                            }}
                            sx={{ cursor: 'pointer' }}
                            onClick={() => setView('second')}
                            bgcolor="rgba(255, 107, 38, 1)"
                        >
                            Start
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box sx={{ maxWidth: 457, flexGrow: 1 }}>

                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                        autoPlay={false}
                    >
                        {OnBoardingImage.map((step, index) => (
                            <div key={step.label}>
                                {Math.abs(activeStep - index) <= 2 ? (
                                    <Box>

                                        {step.imgPath ? (
                                            <Box position={"relative"}>
                                                <img
                                                    src={step.imgPath}
                                                    alt={step.label}
                                                    style={{ width: '100%', objectFit: 'contain' }}
                                                />
                                                <Box sx={{ cursor: "pointer" }} position="absolute" right={10} top={15} onClick={handleClose}><Close /></Box>
                                            </Box>
                                        ) : (
                                            <Stack paddingX={6} gap={2} paddingY={20} direction="column" justifyContent="center" alignItems="center">
                                                <Typography alignSelf="center" variant='h7'>
                                                    Do you want us to send you WhatsApp messages? If yes, please click on the checkbox.
                                                </Typography>
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            onChange={(event) => postConsent(event.target.checked)}
                                                        />
                                                    }
                                                    label="I agree to receive WhatsApp messages from WiseAdmit."
                                                />
                                            </Stack>
                                        )}
                                    </Box>
                                ) : null}
                            </div>
                        ))}
                    </SwipeableViews>
                    <Box display="flex" flexDirection="column" gap="8px" padding={{ lg: "24px", md: "24px", sm: "18px", xs: '18px' }} >
                        <Typography fontFamily="HankenGroteskExtraBold" fontWeight={800} fontSize={{ lg: "24px", md: "24px", sm: '20px', xs: "20px" }} lineHeight="31.2px" letterSpacing="-2%" color="rgba(32, 28, 26, 1)">{OnBoardingImage[activeStep]?.label}</Typography>
                        <Typography fontFamily="HankenGroteskRegular" fontWeight={400} fontSize={{ lg: "14px", md: "14px", sm: "12px", xs: "12px" }} lineHeight={{ lg: "19.6px", md: '19.6px', sm: "16.8px", xs: "16.8px" }} color="rgba(32, 28, 26, 0.9)">{OnBoardingImage[activeStep]?.desc}</Typography>
                        {/* <Typography fontWeight={400} fontSize="14px" lineHeight="19.6px" color="rgba(32, 28, 26, 0.9)">Step {displayStep(activeStep)}/{maxSteps}</Typography> */}
                        <Typography fontFamily="HankenGroteskRegular" fontWeight={400} fontSize={{ lg: "14px", md: "14px", sm: "12px", xs: "12px" }} lineHeight={{ lg: "19.6px", md: '19.6px', sm: "16.8px", xs: "16.8px" }} color="rgba(32, 28, 26, 0.9)" mt="16px">Step {activeStep + 1}/{maxSteps}</Typography>

                    </Box>

                    <Divider />

                    <Box display="flex" justifyContent="space-between" padding="24px">
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            color="rgba(255, 107, 38, 1)"
                            fontSize="16px"
                            fontFamily="HankenGroteskSemiBold"
                            width="100px"
                            border="1px solid rgba(131, 134, 139, 1)"
                            borderRadius="8px"
                            padding="4px 8px"
                            bgcolor="#FFFFFF"
                            sx={{
                                cursor: activeStep === 0 ? 'default' : 'pointer',
                                transition: 'all 0.3s ease',
                                transform: activeStep === 0 ? 'none' : 'scale(1)',
                                opacity: activeStep === 0 ? 0.5 : 1,
                                '&:hover': {
                                    transform: activeStep === 0 ? 'none' : 'scale(1.05)',
                                },
                                pointerEvents: activeStep === 0 ? 'none' : 'auto',
                            }}
                            onClick={handleBack}
                            
                        >
                            Back
                        </Box>

                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            color="white"
                            fontSize="16px"
                            fontFamily="HankenGroteskSemiBold"
                            width="100px"
                            borderRadius="8px"
                            padding="4px 8px"
                            bgcolor="primary.main"
                            sx={{
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                            onClick={activeStep === maxSteps - 1 ? handleClose : handleNext}
                        >
                            {activeStep === maxSteps - 1 ? 'Close' : 'Next'}
                        </Box>
                    </Box>

                </Box>
            )
            }
        </Dialog >
    );
}

export default OnBoardingComponent;
