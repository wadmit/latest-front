import ScannedHome from '@/page-components/scanned'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense>
      <ScannedHome />
    </Suspense>
  )
}

export default page