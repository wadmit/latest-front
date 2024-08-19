"use client"
import React from 'react';
import { Box } from '@mui/material';

type Props = {
    text: string;
    status: boolean;
};

function PaymentStatus({ status, text }: Props) {
    return (
        <Box
            sx={{
                backgroundColor: status
                    ? 'var(--success-100, #D5E8D7)'
                    : 'var(--error-100, #F5D7D7)',
                fontSize: '12px',
                fontStyle: 'normal',
                fontFamily: 'HankenGroteskRegular',
                lineHeight: '140%',
                padding: '4px 8px',
                borderRadius: '42px',
                color: status
                    ? 'var(--success-main,#2D8C37)'
                    : 'var(--error-main, #CF3636 )',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '70px',
            }}
        >
            {text}
        </Box>
    );
}

export default PaymentStatus;
