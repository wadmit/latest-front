"use client"
import React, { useMemo, useState } from 'react';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import { Paper } from '@mui/material';
import { AppBar, Main } from './utils/provider';
import SidebarContentComponent from './SidebarContentComponent';
import NavBarHeaderContext from '@/context/navbar-header';
import { AuthNavbar } from './AuthNavbar';

const drawerWidth = 270;





export function PersistentSidebar({ children }: { children: React.ReactNode }) {
  const [openDrawer, setOpenDrawer] = useState(true);
  const [navbarHeader, setNavbarHeader] = useState('');

  const changeNavbarHeader = (header: string) => {
    setNavbarHeader(header);
  };
  const navbarValue = useMemo(
    () => ({
      navbarHeader,
      changeNavbarHeader,
    }),
    [navbarHeader]
  );
  const handleDrawerOpen = () => {
    setOpenDrawer((prev) => !prev);
  };

  const [showFeedbackForm, setShowFeedbackForm] = React.useState(false);
  const [showThankyouForm, setShowThankyouForm] = React.useState(false);

  return (
    <Box
      sx={{ position: 'relative' }}
      display={{
        xs: 'block',
        lg: 'flex',
      }}
    >
      <CssBaseline />
      <Paper
      sx={{
        display: {
          xs: 'block',
          lg: 'none',
        },
        zIndex: 9999999,
      }}
      >
        <AppBar
          position="fixed"
          open={false}
          elevation={0}
          sx={{ bgcolor: 'grey.A100' }}
        >
          <NavBarHeaderContext.Provider value={navbarValue}>
            <AuthNavbar handleDrawerOpen={() => setOpenDrawer(false)} />
          </NavBarHeaderContext.Provider>
        </AppBar>
      </Paper>
      <Paper
        sx={{
            display: {
              xs: 'none',
              lg: 'block',
            },
            zIndex: 9999999,
          }}
      >
        <AppBar
          position="fixed"
          open={openDrawer}
          elevation={0}
          sx={{ bgcolor: 'grey.A100' }}
        >
          <AuthNavbar handleDrawerOpen={handleDrawerOpen} />
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: 'grey.400',
            },
          }}
          variant="persistent"
          anchor="left"
          SlideProps={{ unmountOnExit: true }}
          open={openDrawer}
        >
          <SidebarContentComponent />
        </Drawer>
      </Paper>
      <Main open={openDrawer}>
        {/* <WhatsappButton />
        <FeedbackButton
          color="filled"
          onClick={() => {
            setShowFeedbackForm(!showFeedbackForm);
          }}
        />

        {showFeedbackForm && (
          <FeedbackForm
            setShowFeedbackForm={setShowFeedbackForm}
            setShowThankyouForm={setShowThankyouForm}
          />
        )}
        {showThankyouForm && (
          <Thankyou setShowThankyouForm={setShowThankyouForm} />
        )} */}
        <Box mt={{ xl: 10, xs: 3 }}>{children}</Box>
      </Main>
    </Box>
  );
}
