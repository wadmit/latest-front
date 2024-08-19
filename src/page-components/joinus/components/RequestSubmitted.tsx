import { Box, Typography } from "@mui/material";
import React from "react";

const RequestSubmitted = () => {
	return (
		<Box
			bgcolor="common.white"
			borderRadius={1}
			px={{ xl: "140px", xs: "16px" }}
			width="100%"
		>
			<Typography
				variant="h4"
				textAlign="center"
				display={{ md: "block", xs: "none" }}
			>
				Your request has been submitted
			</Typography>

			<Typography
				variant="h5"
				textAlign="center"
				display={{ md: "none", xs: "block" }}
			>
				Your request has been submitted
			</Typography>

			<Box
				sx={{ width: "100%", height: "320px", maxWidth: "500px" }}
				bgcolor="grey.50"
				mt={5.2}
				mb={6.8}
				mx="auto"
			/>
			<Typography
				variant="subtitle1_sb"
				mb={5.2}
				sx={{ textAlign: "center" }}
				component="h3"
			>
				You are all set! One of our representatives will contact you within
				24-48 hours after assessing your documents! For more information email
				us at info@wiseadmit.io
			</Typography>
		</Box>
	);
};

export default RequestSubmitted;
