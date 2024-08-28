"use client"
import { ButtonWrapper } from '@/components/common'
import Loader from '@/components/common/circular-loader/Loader'
import PasswordField from '@/components/common/formfields/password-field/PasswordField'
import { Box, FormHelperText, InputLabel, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DialogComponent } from "@/page-components/apply-now/reset-password/styled-components/DialogComponent"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRouter, useSearchParams } from 'next/navigation'
import { useFormik } from 'formik'
import { FORM_VALIDATION_RESETPASSWORD } from '@/page-components/apply-now/reset-password/utils/formik-validation'
import { errorMessageBox } from '../../utils/provider'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '@/api/web/authentication.action'

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    const handleOpen = () => {
      setOpen(true);
    };

    const {isPending, error: axiosError, mutate, data, isError} = useMutation({
        mutationFn: resetPassword
    })

    const token = searchParams.get('token');

  
    useEffect(() => {
      let timer: any;
      if (data?.data?.message) {
        handleOpen();
        timer = setTimeout(() => {
          router.push('/applynow');
        }, 5000);
      }
      return () => clearTimeout(timer);
    }, [data]);

    const formik = useFormik({
        initialValues: {
          password: '',
          confirmPassword: '',
        },
        validationSchema: FORM_VALIDATION_RESETPASSWORD,
        onSubmit: (values) => {
          try {
            mutate({
              password: values.password,
              token: token || "",
            });
          } catch (err) {
            console.log('ResetPassword-Email-Error');
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
      <Box>
        <InputLabel htmlFor="enter_new_password">
          {/* <Typography variant="h6_sb"> */}
          Enter New Password
          {/* </Typography> */}
        </InputLabel>
        <PasswordField
          placeholder="Enter New password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          type="password"
          error={formik.touched.password && Boolean(formik.errors.password)}
        />
        {formik.touched.password && formik.errors.password && (
          <FormHelperText margin="dense" error>
            {formik.touched.password && formik.errors.password}
          </FormHelperText>
        )}
      </Box>
      <Box>
        <InputLabel htmlFor="enter_new_password">
          {/* <Typography variant="h6_sb"> */}
          Confirm Password
          {/* </Typography> */}
        </InputLabel>
        <PasswordField
          placeholder="Re-enter password"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          type="password"
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <FormHelperText margin="dense" error>
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </FormHelperText>
        )}
      </Box>
      {isError &&
				errorMessageBox((axiosError as any)?.response?.data?.errors[0]?.message || "")}
      <Box mt={2}>
        <ButtonWrapper type="submit" disabled={isPending}>
          {isPending ? <Loader /> : 'Reset Password'}
        </ButtonWrapper>
      </Box>
      <DialogComponent open={open} handleClose={handleClose}>
        <CheckCircleIcon sx={{ fontSize: 100 }} color="success" />
        <Typography variant="subtitle1" component="h3" textAlign="center">
          Password Reset Successfully
        </Typography>
        <Typography variant="h6" component="h2" textAlign="center">
          Redirecting to Apply Now Page...
        </Typography>
      </DialogComponent>
    </Stack>
  )
}

export default ResetPassword