import { generateMetadata } from '@/components/common/head-component/HeadComponent'
import ResetPasswordHome from '@/page-components/apply-now/reset-password'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = generateMetadata({
    title: "ResetPassword | WiseAdmit",
    description: "WiseAdmit ResetPassword Page",
    endPoint: "/reset-password"
})

const page = () => {
  return (
    <ResetPasswordHome />
  )
}

export default page