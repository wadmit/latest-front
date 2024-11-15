import AutoCompleteField from "@/components/common/formfields/autocomplete/AutoCompleteField";
import DateField from "@/components/common/formfields/date-field/DateField";
import FormHeaders from "@/components/common/formfields/FormHeaders";
import { PhoneField } from "@/components/common/formfields/phone-field";
import RadioButtonGroups from "@/components/common/formfields/radio-buttons/RadioButtonGroups";
import StyledInputField from "@/components/common/formfields/StyleFormFields";
import { Box, Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import {
	addressDetailData,
	parentsDetails,
	personalInformationData,
} from "@/page-components/dashboard/profile/edit-profile/utils/provider";

const GeneralInformation = () => {
	const formik = useFormikContext();

	const values = formik.values as any;

	return (
		<Box my={7.5}>
			<FormHeaders title="Personal Information" />
			<Grid
				id="personal_info"
				container
				columnSpacing={7}
				rowSpacing={4}
				mt={0}
			>
				{/* <Grid> */}
				{personalInformationData.map((each, index) => {
					if (each.name === "country") {
						return (
							<Grid item md={6} xs={12} key={each.name}>
								<AutoCompleteField fieldName={each.name} />
							</Grid>
						);
					}

          if (each.name === "phone")
            return (
              <Grid item md={6} xs={12} key={each.name}>
                <PhoneField
                  formik={formik}
                  name={each.name}
                  label={each.label as string}
                  disabled={each.disabled}
                />
              </Grid>
            );
          if (
            each.name === "date_of_birth" ||
            each.name === "passport_expiry_date"
          ) {
            return (
              <Grid item md={6} xs={12} key={each.name}>
                <DateField
                  name={each.name}
                  label={each.label as string}
                  disablePast={each.name === "passport_expiry_date"}
                  disableFuture={each.name === "date_of_birth"}
                />
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
      </Grid>
      <Box mt={7}>
        <FormHeaders title="Address Detail" />
        <Grid container columnSpacing={7} rowSpacing={4} mt={0}>
          {addressDetailData.map((each, index) => {
            if (index === 2) {
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
                  disabled={each.disabled}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>
      <Box mt={7}>
        <FormHeaders title="Parents/Guardians Details" />
        <Grid container columnSpacing={7} rowSpacing={4} mt={0}>
          {parentsDetails.map((each, index: number) => {
            if (index === 8) {
              return (
                <Grid item xs={12} key={each.name}>
                  <RadioButtonGroups
                    radioButtons={[
                      { value: "father", label: "Father" },
                      {
                        value: "mother",
                        label: "Mother",
                      },
                    ]}
                    defaultValue={values?.emergency_person ?? "father"}
                    formLabel="Emergency Contact Person"
                    fieldName={each.name}
                  />
                </Grid>
              );
            }

            if (each.name === "emergency_number")
              return (
                <Grid item md={6} xs={12} key={each.name}>
                  <PhoneField
                    formik={formik}
                    name={each.name}
                    label={each.label as string}
                  />
                </Grid>
              );
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
        </Grid>
      </Box>
    </Box>
  );
};

export default GeneralInformation;
