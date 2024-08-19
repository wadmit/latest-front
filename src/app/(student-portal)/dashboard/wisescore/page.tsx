import DashboardWisescore from '@/page-components/dashboard/DashboardWisescore'
import { Metadata } from 'next'
import React from 'react'

type Props = {}

export const metadata:Metadata = {
    title: "Dashboard-Check Your WiseScore®-WiseAdmit",
    description: "WiseAdmit Dashboard Page"
}
const page = (props: Props) => {
  return (
    <>
    <DashboardWisescore />
    </>
  )
}

export default page