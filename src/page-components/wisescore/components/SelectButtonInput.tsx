"use client";
import WiseScoreDetailsContext from "@/context/wisescore-context";
import React, { useContext } from "react";
import { INITIAL_WISE_STATE } from "../utils/formik";
import { Box, InputProps } from "@mui/material";
import { useFormikContext } from "formik";
import SelectButtons from "./SelectButtons";
import { StyleInput } from "../utils/provider";

interface Props extends InputProps {
	isActive?: boolean;
	text: string;
}

function SelectButtonInput({ isActive, text, onClick }: Props) {
	const { secondaryColor } = useContext(WiseScoreDetailsContext);
	const { values, handleChange } =
		useFormikContext<typeof INITIAL_WISE_STATE>();
	return (
		<Box
			display="flex"
			flexWrap="wrap"
			width={{ lg: "176px", md: "200px", sm: "42%", xs: "42%" }}
			// position="relative"
		>
			<SelectButtons
				onClick={onClick}
				minWidth={{ lg: "176px", md: "200px", sm: "50%", xs: "50%" }}
				width={{ sm: "100%", xs: "100%" }}
				isActive={isActive}
				justifyContent="center"
				alignItems="center"
				padding={{ sm: "22px 26px", xs: "22px 26px" }}
				text={text}
			/>
			{isActive && (
				<StyleInput
					name="language_overall_score"
					type="number"
					inputProps={{
						style: { appearance: "none" },
					}}
					value={values.language_overall_score}
					onChange={handleChange}
					placeholder="Your overall score"
					secondaryColor={secondaryColor}
				/>
			)}
		</Box>
	);
}

export default SelectButtonInput;
