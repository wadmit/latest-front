import PhoneInput from "react-phone-input-2";
import {
	Box,
	FormHelperText,
	Grid,
	InputLabel,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";

export function PhoneField({
	formik,
	name,
	label,
	disabled,
	variant,
}: {
	formik: any;
	name: string;
	label: string;
	disabled?: boolean;
	variant?: "dashboard" | "normal" | "nuaa";
}) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
	const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
	const inputStyle = {
		borderRadius: "12px",
		backgroundColor: "transparent",
	};
	return (
		<Stack direction="column" spacing={1} flex={1} width="100%">
			<InputLabel htmlFor={name}>
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
			<PhoneInput
				copyNumbersOnly={false}
				value={formik.values[name]}
				onChange={(newPhone, code) => {
					formik.setFieldValue(name, "+".concat(newPhone));
				}}
				disabled={formik.values[name] ? (disabled ?? false) : false}
				enableSearch
				prefix="+"
				disableSearchIcon
				inputProps={{
					name: "phone",
					id: "phone",
					required: false,
					autoFocus: false,
					// InputLabelProps: {
					//   shrink: false,
					// },
				}}
				inputStyle={{
					borderColor:
						formik.touched[name] && Boolean(formik.errors[name])
							? "red"
							: "#C4C9D1",
					//Remove this inputStyle for removing borderRadius
					...inputStyle,
				}}
				containerClass="phone-input-container"
				// containerStyle={{
				//   marginTop: "-0.03px"
				// }}
				specialLabel=""
				searchClass="phone-search"
				inputClass={variant === "nuaa" ? "phone-input-nuaa" : "phone-input"}
				dropdownClass="phone-dropdown"
			/>
			<FormHelperText
				error={formik.touched[name] && Boolean(formik.errors[name])}
			>
				{formik.touched[name] && formik.errors[name]}
			</FormHelperText>
		</Stack>
	);
}
