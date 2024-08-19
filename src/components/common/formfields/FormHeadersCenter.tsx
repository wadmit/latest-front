import { titleType } from "@/types/other";
import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {};

const FormHeadersBig = ({ title }: titleType) => {
  return (
    <Box>
      <Typography textAlign="center" variant="h4" component="h6">
        {title}
      </Typography>
    </Box>
  );
};

export default FormHeadersBig;
