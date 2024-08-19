import { Box, styled } from "@mui/material";
import React from "react";

const FooterContact = () => {
	return (
		<>
			<Box height={{ lg: "750px", md: "700px", sm: "700px", xs: "600px" }} />

			<Box width="100vw" bottom={0}>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2682.1752643534023!2d85.31102167199526!3d27.685644032562937!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb184b3a3f79a9%3A0x80dbad3c0fe9c0da!2sKupondole%20Hts%20Rd%2C%20Lalitpur%2044600!5e0!3m2!1sen!2snp!4v1707901878362!5m2!1sen!2snp"
					style={{
						border: "0",
						width: "100%",
						height: "60vh",
					}}
					loading="lazy"
				></iframe>
			</Box>
		</>
	);
};

export default FooterContact;
