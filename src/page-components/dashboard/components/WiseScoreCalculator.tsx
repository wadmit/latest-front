"use client"
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import WiseScoreWelcome from '@/page-components/wisescore/WisescoreWelcome';
import WiseScoreModal from '@/page-components/wisescore/WisescoreModal';
import { WiseAdmitColorFulSvg } from 'public/svg';
import { RootContainer } from '@/components/common';
type WiseScoreCalculatorProps = {
    handleStep: (value: number) => void;
};

function WiseScoreCalculator({ handleStep }: WiseScoreCalculatorProps) {
    const [showModal, setShowModal] = useState(false);

    const handleShowOrHideModel = () => {
        setShowModal((prev) => !prev);
    };
    return (
        <RootContainer>
            <Typography variant="h4">Check Your WiseScore®</Typography>
                <WiseScoreWelcome
                    version="WiseScore"
                    sx={{
                        ml: { lg: 6, md: 4, sm: 3, xs: 0 },
                        // backgroundImage: "url('/wisescore/swatch.svg')",
                        mr: { lg: -25, md: -9, sm: -1, xs: 0 }
                    }}
                    onClick={handleShowOrHideModel}
                    primaryColor="#FF6B26"
                    header={{
                        title: 'WiseScore®',
                        subHeader: ' a tool by WiseAdmit, recommends suitable programs based on your interests and academic history and evaluates your chance of acceptance into universities.'
                    }}
                    // this color is used as background in mobile screen
                    secondaryColor="#FFF0E7"
                />
                {showModal && (
                    <WiseScoreModal
                        //  endPoint=""
                        variant=""
                        secondaryColor="#EFE5DA"
                        primaryColor="rgba(255, 107, 38, 1)"
                        Logo={WiseAdmitColorFulSvg}
                        showModal={showModal}
                        closeModal={handleShowOrHideModel}
                    />
                )}
\        </RootContainer>

    );
}

export default WiseScoreCalculator;
