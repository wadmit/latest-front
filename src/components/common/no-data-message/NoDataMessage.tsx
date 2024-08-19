import { Alert, AlertTitle, Typography } from "@mui/material";
import React from "react";

type Props = {
  message: string;
};

const NoDataMessage = ({ message }: Props) => {
  return (
    <Alert severity="error">
      <AlertTitle>Error</AlertTitle>
      <Typography variant="subtitle1_sb" component="p">
        {message}
      </Typography>
    </Alert>
  );
};

export default NoDataMessage;
