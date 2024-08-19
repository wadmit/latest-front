import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import wiseAdmitLogoLarge from '$/images/partners/wiseadmit_logo_large.png';

export function DataNotfound({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Image
      alt='WiseAdmit Logo'
      src={wiseAdmitLogoLarge} />
      <Box my={2}>
        <Typography
          variant="h3"
          component="h3"
          textAlign="center"
          color="grey.300"
        >
          {title}
        </Typography>
        <Typography
          variant="subtitle1_sb"
          component="p"
          textAlign="center"
          color="grey.300"
        >
          {desc}
        </Typography>
      </Box>
    </Stack>
  );
}

DataNotfound.defaultProps = {
  desc: '',
};
