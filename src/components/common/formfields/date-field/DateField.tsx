"use client";
import { InputLabel, Stack, Typography } from "@mui/material";
import { useField, useFormikContext } from "formik";
import moment from "moment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useState } from "react";
import { TextFieldWrapper } from "../styles/StyledInput";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const DateField = ({
  name,
  label,
  disabled = false,
  disablePast = false,
  disableFuture = false,
  yearOnly = false,
}: {
  name: string;
  label: string;
  disabled?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  yearOnly?: boolean;
}) => {
  const { setFieldValue, values }: any = useFormikContext();
  const [open, setOpen] = useState(false);
  const [field, meta] = useField(name);

  const configSelectField = {
    ...field,
    error: false,
    helperText: "",
  };
  if (meta && meta.touched && meta.error) {
    configSelectField.error = true;
    configSelectField.helperText = meta.error;
  }
  return (
    <Stack direction="column" spacing={1}>
      <InputLabel
        htmlFor={name}
        sx={{
          color: "grey.500",
        }}
        disabled={disabled}
      >
        <Typography
          fontFamily="HankenGroteskRegular"
          fontWeight={400}
          fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
          lineHeight={{
            lg: "22.4px",
            md: "22.4px",
            sm: "19.6px",
            xs: "19.6px",
          }}
          color="rgba(32, 28, 26, 0.9)"
        >
          {label}
        </Typography>
      </InputLabel>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {yearOnly ? (
          <DatePicker
            views={["year"]}
            value={values[name]}
            disabled={disabled}
            onChange={(newValue) => {
              setFieldValue(name, moment(newValue).format("YYYY"));
            }}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            slots={{
              textField: (params: any) => (
                <TextFieldWrapper
                  id={name}
                  {...params}
                  {...configSelectField}
                  fullWidth
                  onClick={() => setOpen(true)}
                  inputProps={{ ...params.inputProps, readOnly: true }}
                />
              ),
            }}
            disablePast={disablePast}
            disableFuture={disableFuture}
          />
        ) : (
          <DatePicker
            value={values[name]}
            disabled={disabled}
            onChange={(newValue) => {
              setFieldValue(name, moment(newValue).format("YYYY-MM-DD"));
            }}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            format="dd-MM-yyyy"
            slots={{
              textField: (params: any) => (
                <TextFieldWrapper
                  id={name}
                  {...params}
                  {...configSelectField}
                  fullWidth
                  onClick={() => setOpen(true)}
                  inputProps={{ ...params.inputProps, readOnly: true }}
                />
              ),
            }}
            disablePast={disablePast}
            disableFuture={disableFuture}
          />
        )}
      </LocalizationProvider>
    </Stack>
  );
};

export default DateField;
