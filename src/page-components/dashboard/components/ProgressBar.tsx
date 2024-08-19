"use client"
import { Box, Grid } from '@mui/material';

type progressBarProps = {
    divisions: number | undefined;
}
export function ProgressBar({ divisions }: progressBarProps) {
    return (
        <Box height={4} width="100%" sx={{ backgroundColor: '#F0F0F0' }}>
            <Grid item xs={divisions}>
                {divisions !== 0 &&
                    <Box height={4} width="100%" sx={{ backgroundColor: '#479F76' }} />}
            </Grid>
        </Box>
    )
}

