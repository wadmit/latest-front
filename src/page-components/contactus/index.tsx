"use client";
import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { ResponsiveBox } from "@/page-components/contactus/styled-components";
import ContactUsForm from "@/page-components/contactus/components/ContactUsForm";

const ContactUsHome = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<ResponsiveBox
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="100vh"
			width="100vw"
			position="relative"
		>
			<Box
				position={"absolute"}
				bottom={"-600px"}
				top={isMobile ? "300px" : "400px"}
				borderRadius="102px"
			>
				<ContactUsForm />
			</Box>
		</ResponsiveBox>
	);
};

export default ContactUsHome;
