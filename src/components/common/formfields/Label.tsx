import type { ILabelinterface } from "@/types/other";
import { InputLabel, Typography } from "@mui/material";
import React from "react";

const Label = (props: ILabelinterface) => {
	const { children, htmlFor, ...rest } = props;
	return (
		<InputLabel {...props} sx={{ whiteSpace: "normal" }} htmlFor={htmlFor}>
			<Typography variant="subtitle2" color="grey.500">
				{children}
			</Typography>
		</InputLabel>
	);
};

export default Label;
