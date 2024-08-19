"use client";
import { type FormikContextType, useFormikContext } from "formik";
import React from "react";
import type { IPartnerFormState } from "@/page-components/joinus/types";
import { Box, Grid } from "@mui/material";
import FormHeaders from "@/components/common/formfields/FormHeaders";
import { PhoneField } from "@/components/common/formfields/phone-field";
import MultiSelect from "@/components/common/formfields/multiselect-field/MultiSelect";
import InputField from "@/components/common/formfields/input-field/InputField";
import StyledInputField from "@/components/common/formfields/StyleFormFields";
import DateField from "@/components/common/formfields/date-field/DateField";
import {
	contactInformationData,
	imageUploadFields,
} from "@/page-components/joinus/utils/provider";
import Dropzone from "@/components/common/form-components/dropzone/Dropzone";
import { uploadPartnerDocument } from "@/api/common/partnerdocument.action";

const ContactInformation = () => {
	const formik = useFormikContext<IPartnerFormState>();

	const thisFormik = formik as FormikContextType<IPartnerFormState>;

	const thisValue = thisFormik.values;

	const handleChangeDropZone = async (
		name: string,
		file: File[],
		keyName: string,
		type?: "Requried" | "Optional" | "Others" | "Default",
	) => {
		try {
			const fd = new FormData();
			fd.append("file", file[0]);

			const response = await uploadPartnerDocument(fd);

			if (response) {
				formik.setFieldValue(keyName, response.data.key, true);
				formik.setFieldValue(name, response.data.data, true);
				return {
					msg: "File uploaded successfully",
					success: true,
					file: response.data.data,
					key: response.data.key,
				};
			} else {
				console.log("No response received from uploadPartnerDocument");
				return {
					msg: "No response received from uploadPartnerDocument",
					success: false,
					file: "",
				};
			}
		} catch (err: any) {
			console.log("File Upload Error : PartnerForm", err);
			return {
				msg: err?.response?.data?.message || "Something went wrong",
				success: false,
				file: "",
			};
		}
	};

	const otherServiceIndex = thisValue?.service?.findIndex(
		(e) => e === "Others",
	);
	return (
		<Box my="32px" id="contact-information">
			<FormHeaders title="Contact information" />
			<Grid container columnSpacing={7} rowSpacing={4} mt={0}>
				{contactInformationData.map((each) => {
					if (each.name === "phone")
						return (
							<Grid item xs={12} md={6} key={each.name}>
								<PhoneField
									label={each.label}
									name={each.name}
									formik={formik}
								/>
							</Grid>
						);

					if (each.name === "service") {
						if (otherServiceIndex !== -1) {
							return (
								<Grid item xs={12} md={6} key={each.name}>
									<MultiSelect
										name={each.name}
										label={each.label}
										options={each.options!}
										placeholder={each.placeholder}
									/>
									<InputField
										type="input"
										label="Specify Other Service Here"
										placeholder={each.placeholder}
										name="other_service"
										required
									/>
								</Grid>
							);
						}
						return (
							<Grid item xs={12} md={6} key={each.name}>
								<MultiSelect
									name={each.name}
									label={each.label}
									options={each.options!}
									placeholder={each.placeholder}
								/>
							</Grid>
						);
					}
					if (each.name === "started_recruting") {
						return (
							<Grid item xs={12} md={6} key={each.name}>
								<DateField
									name={each.name}
									label={each.label}
									yearOnly
									disableFuture
								/>
							</Grid>
						);
					}
					return (
						<Grid item md={6} xs={12} key={each.name} justifyContent="center">
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
			<Box my={4}>
				<Grid container justifyContent="space-between" spacing={7.5}>
					{imageUploadFields.map((each) => (
						<Grid item md={6} xs={12} key={each.name}>
							<Dropzone
								// variant='small'
								name={each.name}
								handleChange={handleChangeDropZone}
								label={each.label}
								keyName={each.keyName}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default ContactInformation;
