"use client";
import { useFormikContext } from "formik";
import React from "react";
import type { IPartnerFormState } from "@/page-components/joinus/types";
import { Box, Grid } from "@mui/material";
import FormHeaders from "@/components/common/formfields/FormHeaders";
import {
	CountryVolumeFields,
	PreviousRecruitmentField,
} from "@/page-components/joinus/components";
import MultiSelect from "@/components/common/formfields/multiselect-field/MultiSelect";
import InputField from "@/components/common/formfields/input-field/InputField";
import StyledInputField from "@/components/common/formfields/StyleFormFields";
import { recruitmentInformationData } from "@/page-components/joinus/utils/provider";

const RecruitmentInformation = () => {
	const { values, setFieldValue }: any = useFormikContext();
	const thisValue = values as IPartnerFormState;
	const otherMarketingIndex = thisValue.marketing_method.findIndex(
		(e) => e === "Others",
	);
	return (
		<Box my="32px" id="recruitment-information">
			<FormHeaders title="Recruitment Information" />
			<CountryVolumeFields />
			<Grid container columnSpacing={7} rowSpacing={4} mt={0}>
				{recruitmentInformationData.map((each) => {
					if (each.name === "marketing_method") {
						if (otherMarketingIndex !== -1) {
							return (
								<Grid item xs={12} md={6} key={each.name}>
									<MultiSelect
										name={each.name}
										label={each.label}
										options={each.options!}
										placeholder={each.placeholder}
									/>
									<Box mt={5}>
										<InputField
											type="input"
											label="Specify other marketing methods here"
											placeholder={each.placeholder}
											name="other_marketing"
											required
										/>
									</Box>
								</Grid>
							);
						}
						return (
							<Grid item md={6} xs={12} key={each.name}>
								<MultiSelect
									name={each.name}
									label={each.label}
									options={each.options!}
									placeholder={each.placeholder}
								/>
							</Grid>
						);
					}
					if (each.name === "expected_recruitment")
						return (
							<Grid item md={6} xs={12} key={each.name}>
								<PreviousRecruitmentField
									label={each.label}
									name={each.name}
									options={each.options!}
									placeholder={each.placeholder}
									type={each.type}
								/>
							</Grid>
						);
					return (
						<Grid item lg={12} md={12} sm={12} xs={12} key={each.name}>
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
	);
};

export default RecruitmentInformation;
