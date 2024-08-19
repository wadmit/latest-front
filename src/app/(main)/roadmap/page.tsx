import RoadMapHome from '@/page-components/roadmap'
import { Metadata } from 'next'
import React from 'react'

type Props = {}

export const metadata:Metadata = {
    title: '503 | WiseAdmit',
    description: '',
   
}

const page = (props: Props) => {
  return (
    <>
    <RoadMapHome />
    </>
  )
}

export default page