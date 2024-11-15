import { ITextFieldType } from "@/types/other";
import { Stack, Typography } from "@mui/material";
import { useField, useFormikContext } from "formik";
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
}: ITextFieldType) => {
  const [field, meta] = useField(name);

  const configTextField = {
    ...field,
    error: false,
    helperText: "",
  };

  const { errors, touched, values,handleChange } = useFormikContext<any>();
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
        multiline={multiline}
        variant="outlined"
        required={required ?? false}
        placeholder={placeholder}
        name={name}
        value={values[name]}
        disabled={!!disabled}
        onChange={handleChange}
        // error={errors[name] && touched[name]}
        // helperText={errors[name] && touched[name] ? errors[name] : ""}

        // {...configTextField}
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
