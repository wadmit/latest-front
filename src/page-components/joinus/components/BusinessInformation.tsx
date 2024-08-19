"use client";
import FormHeaders from "@/components/common/formfields/FormHeaders";
import StyledInputField from "@/components/common/formfields/StyleFormFields";
import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import {
	businessDataInformation,
	businessSocialData,
} from "@/page-components/joinus/utils/provider";
import { useCountries } from "@/hooks/useCountry";

const BusinessInformation = () => {
	const countries = useCountries();

	return (
		<Box my="32px" id="business-information">
			<FormHeaders title="Business Information" />
			<Grid container columnSpacing={7} rowSpacing={4} mt={0}>
				{businessDataInformation.map((each, index) => {
					if (each.name === "business_country") {
						return (
							<Grid item md={6} xs={12} key={each.name}>
								<StyledInputField
									name={each.name}
									label={each.label}
									type={each.type}
									placeholder={each.placeholder}
									options={countries.map((each) => ({
										key: each.name,
										value: each.id,
									}))}
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
			{/* <Box mt={1}> */}
			{/* <FormHeaders title="Business Socials (optional)" /> */}
			<Grid container columnSpacing={7} rowSpacing={4} mt={0}>
				{businessSocialData.map((each) => (
					<Grid item md={6} xs={12} key={each.name}>
						<StyledInputField
							name={each.name}
							label={each.label}
							type={each.type}
							placeholder={each.placeholder}
							options={each.options}
						/>
					</Grid>
				))}
			</Grid>
			{/* </Box> */}
		</Box>
	);
};

export default BusinessInformation;
