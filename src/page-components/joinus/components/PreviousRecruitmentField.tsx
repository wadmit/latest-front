"use client";
import StyledInputField from "@/components/common/formfields/StyleFormFields";
import { Box, Grid } from "@mui/material";
import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { TextFieldType } from "@/page-components/joinus/types/TextFieldType";

const volume: TextFieldType = {
  label: "What is your expected volume of students?",
  placeholder: "Select your options",
  name: "previous_recruitment",
  type: "select",
  options: [
    {
      key: "1-5",
      value: "1-5",
    },
    {
      key: "6-20",
      value: "6-20",
    },
    {
      key: "21-50",
      value: "21-50",
    },
    {
      key: "50-100",
      value: "50-100",
    },
    {
      key: "100+",
      value: "100+",
    },
  ],
};

const PreviousRecruitmentField = ({
  name,
  label,
  placeholder,
  options,
  type,
}: TextFieldType) => {
  const { values, setFieldValue }: any = useFormikContext();
  useEffect(() => {
    if (values.expected_recruitment === "No") {
      setFieldValue(volume.name, "");
    }
  }, [values.expected_recruitment]);
  return (
    <Grid item xs={12} key={name}>
      <StyledInputField
        name={name}
        label={label}
        type={type}
        placeholder={placeholder}
        options={options}
      />
      {values.expected_recruitment === "Yes" && (
        <Box mt={5.9}>
          <StyledInputField
            name={volume.name}
            label={volume.label}
            type={volume.type}
            placeholder={volume.placeholder}
            options={volume.options}
          />
        </Box>
      )}
    </Grid>
  );
};

export default PreviousRecruitmentField;
