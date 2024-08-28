"use client"
import { ButtonWrapper } from '@/components/common'
import Loader from '@/components/common/circular-loader/Loader'
import { TextFieldWrapper } from '@/components/common/formfields/styles/StyledInput'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { useFormik } from 'formik'
import { FORM_VALIDATION_FORGOTPASSWORD } from '@/page-components/apply-now/forgot-password/utils/formik-validation'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '@/api/web/authentication.action'
import { errorMessageBox } from '../../utils/provider'

type Props = {}

const ForgotPassword = (props: Props) => {
    const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const router = useRouter();

  const handleCloseSuccessMessage = () => {
    setSuccessMessageOpen(false);
  };

  const handleOpenSuccessMessage = () => {
    setSuccessMessageOpen(true);
  };

  const {isPending, error:axiosError, mutate, data, isError} = useMutation({
    mutationFn: forgotPassword
  })

  useEffect(() => {
    let timer: any;
    if (data?.data?.data) {
      handleOpenSuccessMessage();
      timer = setTimeout(() => {
        router.push('/applynow');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [data, router]);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: FORM_VALIDATION_FORGOTPASSWORD,
    onSubmit: (values) => {
      try {
        mutate({ email: values.email });
      } catch (err) {
        console.log('ForgotPassword-Email-Error');
      }
    },
  });

  return (
    <Stack
      component="form"
      direction="column"
      gap={3}
      onSubmit={formik.handleSubmit}
    >

      {successMessageOpen && (
        <Box
          bgcolor="rgba(222, 245, 236, 1)"
          padding="16px 124px 16px 16px"
          display="flex"
          justifyContent="space-between"
          borderRadius="8px"
        >
          <Typography
            fontFamily="HankenGroteskRegular"
            fontWeight={400}
            fontSize="16px"
            lineHeight="22.4px"
            color="rgba(26, 77, 46, 1)"
          >
            If an account exists with your email address, <Typography fontFamily="HankenGroteskSemiBold" fontWeight={600} fontSize="16px" lineHeight="22.4px" color="rgba(26, 77, 46, 1)">{formik.values.email}</Typography>,
            we just sent you an email with instructions to reset your password.
          </Typography>
        </Box>
      )}
      <Box display="flex" flexDirection="column">
        <Typography
          fontWeight={400}
          fontSize="16px"
          lineHeight="22.4px"
          color="rgba(32, 28, 26, 0.9)"
        >
          Please provide the email address that you used when you signed up
          for your WiseAdmit account.
        </Typography>
        <Typography
          fontWeight={400}
          fontSize="16px"
          lineHeight="22.4px"
          color="rgba(32, 28, 26, 0.9)"
          mt="12px"
        >
          We will send you an email that will allow you to reset your
          password.
        </Typography>
      </Box>

      <Box>
        <TextFieldWrapper
          name="email"
          id="email"
          placeholder="Enter Your Email To Reset Password"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={
            formik.touched.email &&
            Boolean(
              formik.errors.email ||
              axiosError?.message ||
              ''
            )
          }
          helperText={formik.touched.email && formik.errors.email}
          fullWidth
        />
      </Box>
      {isError &&
				errorMessageBox((axiosError as any)?.response?.data?.errors[0]?.message || "")}
      <Box mt={2}>
        <ButtonWrapper type="submit" disabled={isPending}>
          {isPending ? <Loader /> : successMessageOpen ? 'Resend verification email' : 'Send verification email'}
        </ButtonWrapper>
      </Box>
      <Divider sx={{ mt: "22px" }} />
      <Box display="flex" justifyContent="flex-start" mt="12px">
        <Typography
          fontFamily="HankenGroteskSemiBold"
          fontSize="16px"
          lineHeight="16px"
          color="rgba(32, 28, 26, 0.9)"
          style={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
          onClick={() => router.push("/applynow")}
        >
          Go to login page
        </Typography>
      </Box>

    </Stack>
  )
}

export default ForgotPassword