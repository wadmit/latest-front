"use client"
import React from 'react';
import { Box, Stack } from '@mui/material';
import { ButtonWrapper } from '@/components/common';
import { usePathname, useRouter } from 'next/navigation';
import { DataNotfound } from '@/components/common/not-found/DataNotFound';


export function WaitingScreen({
  title,
  desc,
  btnText,
}: {
  title: string;
  desc: string;
  btnText: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      alignSelf="center"
      height="80vh"
    >
      <Box>
        <DataNotfound title={title} desc={desc} />
        <ButtonWrapper 
          onClick={() => {
            if (!pathname.startsWith('/dashboard')) {
              router.push('/wisescore');
            } else {
              router.replace('/dashboard/wisescore');
            }
          }}
        >
          {btnText}
        </ButtonWrapper>
      </Box>
    </Stack>
  );
}
