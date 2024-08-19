"use client"
import { Avatar, Box, Dialog, Paper, Skeleton, Stack, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { GetArrowDown, GetHelpIcon, GetLogoutCrossIcon, GetLogoutIcon } from './svgs'
import { MenuItems } from './utils/provider'
import { ButtonWrapper } from '../buttons/ButtonWrapper'
import { useCustomQuery } from '@/hooks/useCustomQuery'
import { CacheConfigKey } from '@/constants'
import { getUserInformation } from '@/api/web/user.action'
import { signOut, useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '@/global-states/hooks/hooks'
import { SelectShortlistedPrograms, selectShortListPrograms, setActiveStepGlobal, setDashboardDataGlobal, setMaxActiveStepGlobal, setShortListedDetails, setShortListedPrograms } from '@/global-states/reducers/userReducer'
import { analytics } from '@/services/analytics.service'
import { EAnalyticsEvents, EAnalyticsFieldName } from '@/types/mix-panel-analytic'
import { useQuery } from '@tanstack/react-query'
import { redirect, usePathname } from 'next/navigation'
import { logout } from '@/api/web/logout.action'

type Props = {}

const UserBox = (props: Props) => {
  const [showMenu, setShowMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const refButton = useRef<HTMLDivElement | null>(null);
  const refBox = useRef<HTMLDivElement | null>(null);
  const session = useSession({
    required:true,
  });
  const dispatch = useAppDispatch()
  const shortlistedPrograms = useAppSelector(SelectShortlistedPrograms);
  const pathname = usePathname()

  const sortlistedGlobal = useAppSelector(selectShortListPrograms);
  const handleClose = () => setOpen(false);

  const { data, error, isLoading ,status,isSuccess} = useQuery({
    queryKey: [CacheConfigKey.USER_PROFILE_QUERY_KEY,sortlistedGlobal,shortlistedPrograms,pathname],
    queryFn: getUserInformation,
    enabled: session.status === 'authenticated',
    refetchOnWindowFocus: false,
    refetchOnMount: false,

    // onSuccess: (res) => {
   
  });
  if(data && isSuccess && status === 'success'){
   if (data.data) {
        dispatch(
          setActiveStepGlobal(
            data.data?.detail.additional_configuration.activeStep
          )
        );
        dispatch(
          setMaxActiveStepGlobal(
            data.data?.detail.additional_configuration.maxStep
          )
        );
        localStorage.setItem('email', data.data?.email);
        localStorage.setItem('phone', JSON.stringify(data.data?.phone));

        dispatch(setDashboardDataGlobal(data));

        dispatch(setShortListedPrograms(data.data.shortlists));
        dispatch(setShortListedDetails(data.data.shortlistDetails));
        if (
          data.data.isProfileComplete &&
          !data.data.mixPanel.isProfileCompleteEventTriggered
        ) {
          analytics.trackEvent(EAnalyticsEvents.COMPLETE_PROFILE, {
            [EAnalyticsFieldName.PROFILE_COMPLETED]: true,
            [EAnalyticsFieldName.ID]: data.data.id,
          });
        }
      }
    }
  
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (refButton.current && refButton.current.contains(e.target)) {
        setShowMenu((prev) => !prev);
      } else if (
        showMenu &&
        refBox.current &&
        !refBox.current.contains(e.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [showMenu]);

  const handleLogout = () => {
      logout()
  };

  const clickOnLogout = () => {
    setOpen(true);
  };

  return (
    <Stack position="relative">
      <Box
        component="div"
        ref={refButton}
        sx={{
          minWidth: 'auto',
          cursor: 'pointer',
        }}
      >
        {session.status === "loading"? (
          <Stack
            direction="row"
            height="100%"
            width="100%"
            alignItems="center"
            columnGap={1}
          >
            <Paper sx={{
              display: {
                xs: 'none',
                sm: 'block'
              }
            }}>
              <Skeleton variant="circular" width={40} height={40} />
            </Paper>
            <Skeleton variant="rounded" width={100} height={40} />
          </Stack>):session.status === "authenticated" && (
          <Stack
            direction="row"
            height="100%"
            width="100%"
            alignItems="center"
            columnGap={1}
            sx={{
              '@media (max-width: 600px)': {
                display: 'flex',
                justifyContent: 'flex-end',
              },
            }}
          >
            <Avatar
              src={
                session?.data?.user?.imageUrl
                  ? `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${session?.data?.user?.imageUrl}`
                  : ''
              }
            />
            <Typography
              sx={{
                '@media (max-width: 600px)': {
                  display: 'none',
                },
              }}
              variant="subtitle2"
              color="#5B5B5B"
            >
              {session?.data?.user?.name}
            </Typography>
            {GetArrowDown()}
          </Stack>)}
      </Box>
      {showMenu && (
        <Box
          ref={refBox}
          borderRadius="8px"
          border="0.8px solid black"
          position="absolute"
          top="40px"
          right={0}
          width="200px"
          bgcolor={'#fff'}
          padding="12px 8px"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <MenuItems text="Help" Icon={<GetHelpIcon />} />
          <MenuItems
            text="Logout"
            Icon={<GetLogoutIcon />}
            handleOnClick={clickOnLogout}
          />
        </Box>
      )}

      <Dialog
        open={open}
        sx={{
          padding: 0,
          margin: 0,
          '& .MuiDialog-paper': {
            borderRadius: '8px',
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="flex-start"
          flexDirection="column"
          sx={{ m: '24px' }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography sx={{ fontWeight: 800, fontSize: '20px' }}>
              Confirm logout
            </Typography>
            <Box onClick={handleClose} sx={{ cursor: 'pointer' }}>
              <GetLogoutCrossIcon />
            </Box>
          </Box>
          <Typography
            sx={{ fontWeight: 400, maxWidth: 220, my: 1, fontSize: '14px' }}
          >
            You are attempting to log out from wiseadmit. Are you sure?
          </Typography>
          <Stack
            mt={3}
            direction="row"
            justifyContent="space-between"
            width="100%"
            gap={3}
          >
            <ButtonWrapper
              sx={{
                width: '144px',
                height: '42px',
                borderRadius: '8px',
                border: '1px solid #83868B',
              }}
              onClick={handleClose}
              variant="outlined"
            >
              Cancel
            </ButtonWrapper>
            <ButtonWrapper
              sx={{
                width: '144px',
                height: '42px',
                borderRadius: '8px',
              }}
              onClick={handleLogout}
            >
              Logout
            </ButtonWrapper>
          </Stack>
        </Box>
      </Dialog>
    </Stack>
  )
}

export default UserBox
