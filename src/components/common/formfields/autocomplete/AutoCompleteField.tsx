"use client";
import { useAppDispatch } from "@/global-states/hooks/hooks";
import { useCountries } from "@/hooks/useCountry";
import { Autocomplete, InputLabel, Stack, Typography } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";

interface IAutocompleteFieldType {
	fieldName: string;
}

const AutoCompleteField = ({ fieldName }: IAutocompleteFieldType) => {
	const { setFieldValue, values }: any = useFormikContext();
	const [value, setValue] = useState<any>(null);
	// Autocomplete field states-----------------
	const [open, setOpen] = useState(false);
	//--------------------------------------------
	const [field, meta] = useField(fieldName);
	const dispatch = useAppDispatch();

	const country = useCountries();
	useEffect(() => {
		if (values && country) {
			const temp = country.find((item: any) => item.id === values[fieldName]);
			setValue(temp);
		}
	}, [values, country]);

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
			<InputLabel htmlFor={fieldName}>
				<Typography variant="subtitle2" color="grey.500">
					Country
				</Typography>
			</InputLabel>

			<Autocomplete
				id={fieldName}
				autoComplete={false}
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				autoHighlight
				value={value}
				onChange={(event: any, newValue: any) => {
					if (newValue) {
						setValue(newValue);
						setFieldValue(fieldName, newValue.id);
					}
				}}
				disablePortal
				options={country}
				getOptionLabel={(option: any) => option.name}
				sx={{
					width: "100%",
					maxHeight: "2.875rem",
					"& .MuiOutlinedInput-root .MuiAutocomplete-input ": {
						py: ".3125rem",
					},
				}}
				renderInput={(params) => (
					<TextFieldWrapper
						sx={{ p: 0, m: 0 }}
						{...params}
						{...configSelectField}
						placeholder="Select a country"
						InputProps={{
							...params.InputProps,
							autoComplete: "new-password",
						}}
					/>
				)}
			/>
		</Stack>
	);
};

export default AutoCompleteField;
