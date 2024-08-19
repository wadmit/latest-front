import Loader from '@/components/common/circular-loader/Loader'
import SortedUniPageComponentDashboard from '@/page-components/wisescore/wisescore-thankyou/components/SortedUniPageComponentDashboard'
import React, { Suspense } from 'react'

type Props = {}

const UniversityAndPrograms = (props: Props) => {
  return (
    <Suspense fallback={<Loader center />}>
    <SortedUniPageComponentDashboard />
   </Suspense>
  )
}

export default UniversityAndPrograms