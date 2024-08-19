import { TextFieldType } from "@/types/other";
import { Stack, Typography } from "@mui/material";
import { useField } from "formik";
import React from "react";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";

const InputField = ({
  label,
  required,
  type,
  labelTextColor,
  options,
  disabled,
  placeholder,
  name,
  multiline,
}: TextFieldType) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    error: false,
    helperText: "",
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }
  return (
    <Stack direction="column" spacing={1}>
      <Typography
        fontFamily="HankenGroteskRegular"
        fontWeight={400}
        fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
        lineHeight={{ lg: "22.4px", md: "22.4px", sm: "19.6px", xs: "19.6px" }}
        color="rgba(32, 28, 26, 0.9)"
      >
        {label}
      </Typography>

      <TextFieldWrapper
        id={name}
        multiline
        variant="outlined"
        required={required ?? false}
        placeholder={placeholder}
        disabled={!!disabled}
        {...configTextField}
        type={type}
        sx={{
          "& input::placeholder": {
            fontFamily: "HankenGroteskRegular",
            fontSize: "15px",
            fontWeight: "400",
            lineHeight: "15.6px",
            color: "black",
          },
        }}
      />
    </Stack>
  );
};

export default InputField;
