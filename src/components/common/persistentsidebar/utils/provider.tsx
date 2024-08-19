import { Box, styled, Typography } from "@mui/material";
import MuiAppBar from '@mui/material/AppBar';
import { AppBarProps } from "./type";
import { ReactElement } from "react";

const drawerWidth = 270;

export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  

export const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor: theme.palette.grey.A100,
  }));


export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
  }>(({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }));
  

export function MenuItems({
    text,
    Icon,
    handleOnClick,
  }: {
    text?: string;
    Icon?: ReactElement;
    handleOnClick?: () => void;
  }) {
    return (
      <Box
        onClick={handleOnClick}
        width="100%"
        mt={0.5}
        p="0.5rem 2.5rem 0.5rem 1rem"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          cursor: 'pointer',
          color: '#5B5B5B',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
            '& svg': {
              color: 'white',
              fill: 'white',
              stroke: 'white',
            },
          },
        }}
        borderRadius="8px"
      >
        <Typography
          fontFamily="HankenGroteskRegular"
          lineHeight="1.25rem"
          variant="body1"
          fontSize="0.875rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={3}
        >
          {Icon} {text}
        </Typography>
      </Box>
    );
  }

// data
export const monthShort = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];