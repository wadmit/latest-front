import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import React, { useState } from "react";

const RadioButtonGroups = ({
  formLabel,
  radioButtons,
  defaultValue,
  fieldName,
}: {
  formLabel: string;
  radioButtons: { value: string | boolean; label: string }[];
  defaultValue: string | boolean;
  fieldName: string;
}) => {
  const [radioValue, setRadioValue] = useState(defaultValue);

  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(fieldName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: any } = event.target;
    setRadioValue(value);
    setFieldValue(
      fieldName,
      value === "true" ? true : value === "false" ? false : value
    );
  };

  const isError = meta.touched && Boolean(meta.error);

  const configSelectField = {
    ...field,
    onChange: handleChange,
    error: false,
    helperText: "",
  };
  if (meta && meta.touched && meta.error) {
    configSelectField.error = true;
    configSelectField.helperText = meta.error;
  }
  return (
    <FormControl>
      <FormLabel id={fieldName} htmlFor={fieldName}>
        <Typography variant="subtitle2">{formLabel}</Typography>
      </FormLabel>

      <RadioGroup
        id={fieldName}
        aria-labelledby="radio-buttons-group"
        name={fieldName}
        value={radioValue}
        onChange={handleChange}
        row
      >
        {radioButtons.map((item) => (
          <FormControlLabel
            value={item.value}
            control={<Radio />}
            label={item.label}
            key={item.label}
          />
        ))}
      </RadioGroup>
      {isError && (
        <FormHelperText sx={{ color: "red" }}>{meta.error}</FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioButtonGroups;
