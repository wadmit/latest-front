"use client"
import { ButtonWrapper } from '@/components/common'
import { DataNotfound } from '@/components/common/not-found/DataNotFound'
import { Box, Stack } from '@mui/material'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {}

const RoadMapHome = (props: Props) => {
  const router = useRouter()
  return (
   <>
      <Stack
                direction="column"
                height="100vh"
                justifyContent="center"
                alignItems="center"
            >
                <DataNotfound title="503-Down for maintenance" />
                <Box maxWidth="400px" width="100%">
                    <ButtonWrapper onClick={() => router.back()}>
                        Go to previous page
                    </ButtonWrapper>
                </Box>
            </Stack>
   </>
  )
}

export default RoadMapHome