import React from "react";
import InputField from "./input-field/InputField";
import { ITextFieldType } from "@/types/other";
import type { IPartnerFormState } from "@/page-components/joinus/types";
import { useFormikContext } from "formik";
import { Stack } from "@mui/material";
import InputFieldPartner from "./input-field/InputFieldPartner";
import SelectField from "./select-field/SelectField";

type Props = {};

function StyledInputField({
	label,
	placeholder,
	type,
	options,
	disabled,
	labelTextColor,
	name,
}: ITextFieldType) {
	const formik = useFormikContext();
	const thisValue = formik.values as IPartnerFormState;
	const otherServiceIndex = thisValue?.service?.findIndex(
		(e) => e === "Others",
	);

	if (type === "select") {
		if (name === "how_do_you_hear" && thisValue.how_do_you_hear === "others") {
			return (
				<Stack
					direction="row"
					gap={2}
					alignItems="center"
					justifyContent="space-between"
				>
					<SelectField
						label={label}
						placeholder={placeholder}
						options={options}
						labelTextColor={labelTextColor}
						name={name}
					/>

					<InputField
						type="input"
						label="Specify Here"
						placeholder={placeholder}
						labelTextColor={labelTextColor}
						name="other_source_of_hearing"
						required
						disabled={disabled}
					/>
				</Stack>
			);
		}
		if (name === "service" && otherServiceIndex !== -1) {
			return (
				<Stack
					direction="row"
					gap={2}
					alignItems="center"
					justifyContent="space-between"
				>
					<SelectField
						label={label}
						placeholder={placeholder}
						options={options}
						labelTextColor={labelTextColor}
						name={name}
					/>

					<InputField
						type="input"
						label="Specify Here"
						placeholder={placeholder}
						labelTextColor={labelTextColor}
						name="other_service"
						required
						disabled={disabled}
					/>
				</Stack>
			);
		}
		return (
			<SelectField
				label={label}
				placeholder={placeholder}
				options={options}
				labelTextColor={labelTextColor}
				name={name}
			/>
		);
	}

	if (name === "experience_with_wiseadmit") {
		return (
			<InputFieldPartner
				type={type}
				label={label}
				multiline={true}
				placeholder={placeholder}
				labelTextColor={labelTextColor}
				name="experience_with_wiseadmit"
			/>
		);
	}
	return (
		<InputField
			type={type}
			label={label}
			placeholder={placeholder}
			labelTextColor={labelTextColor}
			name={name}
			disabled={disabled}
		/>
	);
}

export default StyledInputField;
