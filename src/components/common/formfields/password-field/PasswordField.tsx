import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment, OutlinedInputProps } from "@mui/material";
import React, { useState } from "react";
import { OutlinedInputWrapper } from "@/components/common/formfields/styles/StyledInput";

const PasswordField = (props: OutlinedInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <OutlinedInputWrapper
      {...props}
      type={showPassword ? "text" : "password"}
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default PasswordField;
