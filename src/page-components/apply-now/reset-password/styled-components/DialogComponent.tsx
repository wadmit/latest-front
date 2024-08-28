import { Dialog, Stack } from '@mui/material';

export function DialogComponent({
  open,
  handleClose,
  children,
}: {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Stack
          sx={{ position: 'relative' }}
          direction="column"
          alignItems="center"
          width={{ md: '25rem', xs: '80vw' }}
          height="auto"
          justifyContent="flex-start"
          py={5}
          px={2}
        >
          {children}
        </Stack>
      </Dialog>
    </div>
  );
}
