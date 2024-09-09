import FormHeaders from "@/components/common/formfields/FormHeaders";
import { Box, Grid, MenuItem, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  educationBackgroundData,
  educationInformationData,
} from "../utils/provider";
import AutoCompleteField from "@/components/common/formfields/autocomplete/AutoCompleteField";
import StyledInputField from "@/components/common/formfields/StyleFormFields";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";
import RadioButtonGroups from "@/components/common/formfields/radio-buttons/RadioButtonGroups";
import DateField from "@/components/common/formfields/date-field/DateField";
import { useQuery } from "@tanstack/react-query";
import { CacheConfigKey } from "@/constants";
import ApiService from "@/services/api.service";
import { useFormikContext } from "formik";
import { initialValuesStudentForm } from "../utils/yup-validation";
import { setOverAllGradeType } from "@/global-states/reducers/wisescore";

const AcademicInformation = () => {
  const {
    values,
    setFieldValue,
    touched,
    errors,
    setFieldError,
    isValidating,
    setTouched,
  } = useFormikContext<typeof initialValuesStudentForm>();

  useEffect(() => {
    if (values.graduated_institution === false) {
      setFieldValue("graduation_date", "");
    }
  }, [values]);
  const [gradeId, setGradeId] = useState("");
  useEffect(() => {
    switch (values.grading_scheme) {
      case "Letter Scale F - A+":
        setGradeId("62f2974c96df6b5132b8b349");

        break;
      case "Percentage Scale 0 - 100":
        setGradeId("62f2974c96df6b5132b8b34d");

        break;
      case "GPA Scale 0 - 4.0":
        setGradeId("62f2974c96df6b5132b8b34b");

        break;
      default:
        setGradeId("62f2974c96df6b5132b8b34b");

        break;
    }
  }, [values.grading_scheme]);

  const { data: overAllGrade, isLoading } = useQuery({
    queryKey: [CacheConfigKey.OVERALL_GRADE_QUERY_KEY, gradeId],
    queryFn: () =>
      ApiService.get({
        url: `/web/grade_scales/${gradeId}`,
        tokenNeeded: true,
      }).then((res) => {
        setFieldValue("max", Number(res.data.data.max));
        setFieldValue("min", Number(res.data.data.min));
        return res.data.data;
      }),
    enabled: gradeId !== "",
  });
  return (
    <Box my={7.5}>
      <FormHeaders title="Education Information" />
      <Grid container columnSpacing={7} rowSpacing={4} mt={0}>
        {educationInformationData.map((each, index) => {
          if (index === 0) {
            return (
              <Grid item md={6} xs={12} key={each.name}>
                <AutoCompleteField fieldName={each.name} />
              </Grid>
            );
          }
          return (
            <Grid item md={6} xs={12} key={each.name}>
              <StyledInputField
                name={each.name}
                label={each.label}
                type={each.type}
                placeholder={each.placeholder}
                options={each.options}
              />
            </Grid>
          );
        })}
        <Grid item lg={6} xs={12}>
          <Stack direction="column" spacing={1}>
            <Typography variant="subtitle2" color="grey.500">
              Grade Average
            </Typography>
            <TextFieldWrapper
              select={overAllGrade?.type === "select"}
              type={overAllGrade?.type === "select" ? "text" : "number"}
              InputProps={{
                inputProps: {
                  min:
                    overAllGrade?.type !== "select" &&
                    Number(overAllGrade?.min),
                  max:
                    overAllGrade?.type !== "select" &&
                    Number(overAllGrade?.max),
                  step: overAllGrade?.type !== "select" && "0.01",
                },
              }}
              value={values.grade_average}
              key={values.grading_scheme}
              onChange={(e) => {
                e.preventDefault();
                setTouched({ ...touched, grade_average: true });
                setFieldValue("grade_average", e.target.value);
              }}
              helperText={touched.grade_average && errors.grade_average}
              error={touched.grade_average && Boolean(errors.grade_average)}
              onWheel={() => (document as any).activeElement.blur()}
            >
              {overAllGrade ? (
                overAllGrade.type === "select" &&
                Object.keys(overAllGrade.grade)?.map((item: any) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>Loading...</MenuItem>
              )}
            </TextFieldWrapper>
          </Stack>
        </Grid>
      </Grid>
      <Box mt={7}>
        <FormHeaders title="Education Background" />
        <Grid container columnSpacing={7} rowSpacing={4} mt={0}>
          {educationBackgroundData.map((each, index: number) => {
            if (each.name === "graduated_institution") {
              return (
                <Grid item xs={12} md={12} key={each.name}>
                  <RadioButtonGroups
                    radioButtons={[
                      { value: true, label: "I have graduated" },
                      {
                        value: false,
                        label: "I am still studying",
                      },
                    ]}
                    fieldName={each.name}
                    defaultValue
                    formLabel="Have you graduated from this institution?"
                  />
                </Grid>
              );
            }
            if (
              each.name === "attended_institution_from" ||
              each.name === "attended_institution_to" 

            ) {
              return (
                <Grid item md={6} xs={12} key={each.name}>
                  <DateField
                    // disableFuture={each.name === "attended_institution_from"}
                    name={each.name}
                    label={each.label}
                  />
                </Grid>
              );
            }
            if (each.name === "graduation_date") {
              return (
                <Grid item md={6} xs={12} key={each.name}>
                  hi
                  <DateField
                    name={each.name}
                    label={each.label}
                    disabled={values.graduated_institution === false}
                  />
                </Grid>
              );
            }

            if (
              each.name === "eighth_start_date" ||
              each.name === "eighth_end_date"
            ) {
              return (
                <Grid item md={6} xs={12} key={each.name}>
                  <DateField name={each.name} label={each.label} />
                </Grid>
              );
            }
            if (
              each.name === "tenth_start_date" ||
              each.name === "tenth_end_date"
            ) {
              return (
                <Grid item md={6} xs={12} key={each.name}>
                  <DateField name={each.name} label={each.label} />
                </Grid>
              );
            }

            return (
              <Grid item md={index !== 4 ? 6 : 12} xs={12} key={each.name}>
                <StyledInputField
                  name={each.name}
                  label={each.label}
                  type={each.type}
                  placeholder={each.placeholder}
                  options={each.options}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default AcademicInformation;
