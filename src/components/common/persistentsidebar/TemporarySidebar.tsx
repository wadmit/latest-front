import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import SidebarContentComponent from './SidebarContentComponent';
import { IconButton } from '@mui/material';
import { HamburgerMenuWhiteSvg } from '$/svg';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export function TemporarySidebar() {
  const [state, setState] = React.useState(false);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState(open);
      };

  return (
    <div>
      <IconButton
        onClick={toggleDrawer('left', true)}
        role="presentation"
        sx={{
          '& svg': {
            width: '1.5rem',
            height: '1.5rem',
          },
        }}
      >
        <HamburgerMenuWhiteSvg />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={state}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
        keepMounted
        // disableBackdropTransition
        // BackdropProps={{ style: { backgroundColor: 'transparent' } }}
        variant="temporary"
      >
        <SidebarContentComponent />
      </SwipeableDrawer>
    </div>
  );
}
