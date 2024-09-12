import { DashboardSvg, DashboardSvgFilled, MyApplicationFilled, MyApplicationSvg, MyDocumentFilled, MyDocumentSvg, MyProfileFilled, MyProfileSvg, MyUniversities, MyUniversitiesFilled, WiseAdmitColorFulSvg } from 'public/svg';
import { analytics } from '@/services/analytics.service';
import { EAnalyticsEvents, EAnalyticsStatus } from '@/types/mix-panel-analytic';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import * as React from 'react';
import ScoreComponent from './ScoreComponent';


function SidebarContentComponent() {
  const router = useRouter();
  const pathname = usePathname()
  const [active, setActive] = React.useState('Dashboard');

  React.useEffect(() => {
    if (
      pathname === '/dashboard' ||
      pathname.startsWith('/dashboard/wisescore')
    ) {
      setActive('Dashboard');
    } else if (
      pathname === '/dashboard/profile' ||
      pathname === '/dashboard/profile/edit-profile'
    ) {
      setActive('My Profile');
    } else if (pathname === '/dashboard/documents') {
      setActive('Documents');
    } else if (pathname.startsWith('/dashboard/applications')) {
      setActive('Applications');
    } else {
      setActive('Universities & Programs');
    }
  }, [pathname]);

  const handleSideBarButtonClick = (path: string) => {
    switch (path) {
      case 'Dashboard':
        router.push('/dashboard');
        break;
      case 'My Profile':
        router.push('/dashboard/profile');
        break;
      case 'Documents':
        router.push('/dashboard/documents');
        break;
      case 'Applications':
        router.push('/dashboard/applications');
        break;
      case 'Universities & Programs':
        router.push('/dashboard/universitiesandprograms');
        break;
      default:
        router.push('/dashboard');
        break;
    }
  };

  return (
    <Stack
      role="presentation"
      width="100%"
      // pb={3}
      bgcolor="common.black"
      height="100%"
      color="common.white"
      direction="column"
      justifyContent="space-between"
    >
      <List>
        <ListItem sx={{ mt: 3, mb: 2 }}>
          <WiseAdmitColorFulSvg color="white" />
        </ListItem>
        <Stack
          sx={{
            marginTop: '48px',
          }}
        >
          {[
            'Dashboard',
            'My Profile',
            'Documents',
            'Applications',
            'Universities & Programs',
          ].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{
                marginBottom: '12px',
                height: '56px',
                borderLeft:
                  text === active
                    ? '4px solid #ffffff'
                    : '4px solid transparent',
                '&:hover': {
                  backgroundColor: 'grey.500',
                },
              }}
            >
              <ListItemButton
                onClick={() => {
                  analytics.navigationSelect(
                    text,
                    window.location.href,
                    EAnalyticsEvents.NAVIGATION_CLICK,
                    EAnalyticsStatus.SUCCESS,
                    ''
                  );
                  handleSideBarButtonClick(text);
                }}
              >
                <ListItemIcon>
                  {index === 0 && (
                    <>
                      {active === text ? (
                        <DashboardSvgFilled />
                      ) : (
                        <DashboardSvg />
                      )}
                    </>
                  )}

                  {index === 1 && (
                    <>
                      {active === text ? <MyProfileFilled /> : <MyProfileSvg />}
                    </>
                  )}
                  {index === 2 && (
                    <>
                      {active === text ? (
                        <MyDocumentFilled />
                      ) : (
                        <MyDocumentSvg />
                      )}
                    </>
                  )}
                  {index === 3 && (
                    <>
                      {active === text ? (
                        <MyApplicationFilled />
                      ) : (
                        <MyApplicationSvg />
                      )}
                    </>
                  )}
                  {index === 4 && (
                    <>
                      {active === text ? (
                        <MyUniversitiesFilled />
                      ) : (
                        <MyUniversities />
                      )}
                    </>
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body1">{text}</Typography>}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </Stack>
      </List>
      <List>
        {/* <ProfileDropDown /> */}
        <ScoreComponent />
      </List>
    </Stack>
  );
}

export default React.memo(SidebarContentComponent);
