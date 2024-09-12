import {
  AlertProps,
  Slide,
  SlideProps,
  Snackbar,
  Typography,
  Alert,
} from "@mui/material";
import React from "react";

type Props = {
  message: string;
  severity: "warning" | "error" | "success";
  open: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
};

const Alerts = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <Alert elevation={6} ref={ref} variant="filled" {...props} />
));

const SnackBar = ({ message, severity, open, handleClose }: Props) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={6000}
      onClose={handleClose}
      sx={{
        maxWidth: "25rem",
        alignItems: "center",
        minHeight: "6.25rem",
        "&.MuiSnackbar-root": {
          top: "6.25rem",
        },
      }}
      TransitionComponent={(props: SlideProps) => (
        <Slide {...props} direction="down" />
      )}
    >
      <Alerts
        severity={severity}
        onClose={handleClose}
        variant="filled"
        sx={{
          width: "100%",
          height: "100%",
          "& .MuiAlert-message, .MuiAlert-icon": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        }}
      >
        <Typography variant="subtitle1_sb" component="p">
          {message}
        </Typography>
      </Alerts>
    </Snackbar>
  );
};

export default SnackBar;
