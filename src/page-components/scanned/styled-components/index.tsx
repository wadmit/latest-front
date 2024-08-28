import { CircularProgress, styled } from "@mui/material";

export const RootContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
});

export const Loader = styled(CircularProgress)({
    marginBottom: '16px',
});