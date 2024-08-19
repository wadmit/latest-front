"use client"
import { useAppDispatch } from '@/global-states/hooks/hooks';
import { setEligibilityFormData } from '@/global-states/reducers/eligibilityReducer';
import useScrollPosition from '@/hooks/usePosition';
import { analytics } from '@/services/analytics.service';
import { EAnalyticsEvents } from '@/types/mix-panel-analytic';
import { Box } from '@mui/material'
import dynamic from 'next/dynamic';
import React, { Suspense, useEffect, useState } from 'react'

type Props = {}

const SortedUniversitiesPageComponent =dynamic(()=>import("@/page-components/wisescore/wisescore-thankyou/SortedUniPageComponent"),{
    ssr:false,

})
const WisescoreThankyouHome = (props: Props) => {
    const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setEligibilityFormData(''));
  }, []);

  const scrollPosition = useScrollPosition();
  const [ranOnce, setRanOnce] = useState(false);
  useEffect(() => {
    if (scrollPosition > 80) {
      if (!ranOnce) {
        setRanOnce(true);
        analytics.trackEvent(EAnalyticsEvents.UNIVERSITY_SCROLL_BOTTOM, {
          source: 'WiseScore Thankyou',
          info: 'User scrolled to bottom of the page',
        });
      }
    }
  }, [scrollPosition]);
  return (
    <Box
        // pt={16.875}
        // pb={16}
        sx={{ position: 'relative' }}
        height="100%"
        overflow="hidden"
      >
    <Suspense fallback={<div>Loading...</div>}>
     <SortedUniversitiesPageComponent />
     </Suspense>
    </Box>
  )
}

export default WisescoreThankyouHome