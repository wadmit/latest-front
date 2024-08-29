import { RootContainer } from '@/components/common'
import { Box, Paper, Typography } from '@mui/material'
import React from 'react'
import ResetPassword from './ResetPassword'

type Props = {}

const ResetPasswordWrapper = (props: Props) => {
  return (
    <RootContainer>
                <Paper sx={{ py: 5, my: 4 }}>
                    <Typography variant="h3" component="h1" textAlign="center">
                        Reset Password
                    </Typography>

                    <Box maxWidth="400px" mx="auto" my={4}>
                        <ResetPassword />
                    </Box>
                </Paper>
            </RootContainer>
  )
}

export default ResetPasswordWrapper