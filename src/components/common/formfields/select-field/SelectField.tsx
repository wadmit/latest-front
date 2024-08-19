import { SelectFieldType } from "@/types/other";
import { InputLabel, MenuItem, Stack, Typography } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";

type Props = {};

const SelectField = ({
	label,
	labelTextColor,
	options,
	placeholder,
	name,
}: SelectFieldType) => {
	const { setFieldValue } = useFormikContext();
	const [field, meta] = useField(name);

	const handleChange = (e: { target: { value: any } }) => {
		//   if (configFunction) {
		//     configFunction();
		//   }
		const { value } = e.target;
		setFieldValue(name, value);

		if (name === "grading_scheme") {
			setFieldValue("grade_average", "");
		}
	};

	const configSelectField = {
		...field,
		value: field.value || "",
		onChange: handleChange,
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
			<TextFieldWrapper
				id={name}
				variant="outlined"
				label={placeholder}
				// InputLabelProps={{

				// 	hidden: true,
				// }}
				placeholder={placeholder}
				select
				{...configSelectField}
				sx={{
					"& input::placeholder": {
						fontFamily: "HankenGroteskRegular",
						fontSize: "16px",
						fontWeight: "400",
						lineHeight: "15.6px",
						color: "rgba(32, 28, 26, 0.9)",
					},
				}}
				// IconComponent={KeyboardArrowDownIcon}
			>
				{options?.map((eachItem) => (
					<MenuItem
						key={eachItem.key}
						value={eachItem.value}
						// defaultValue={eachItem.value === "#" ? "true" : "false"}
					>
						{eachItem.key}
					</MenuItem>
				))}
			</TextFieldWrapper>
		</Stack>
	);
};

export default SelectField;
