import {
	Box,
	Chip,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	SelectProps,
	Stack,
	Typography,
} from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import { OutlinedInputWrapper } from "@/components/common/formfields/styles/StyledInput";

type Props = {};

interface IMultiSelect extends Omit<SelectProps, "multiple" | "value"> {
	label: any;
	name: string;
	options: { key: string; value: string }[];
}

const MultiSelect = ({ label, name, options, ...props }: IMultiSelect) => {
	const { setFieldValue, resetForm, values, errors, touched }: any =
		useFormikContext();
	const ITEM_HEIGHT = 48;
	const ITEM_PADDING_TOP = 8;
	const MenuProps = {
		PaperProps: {
			style: {
				maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
				width: 250,
			},
		},
	};

	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Stack direction="column" spacing={1}>
			{/* <Label htmlFor={name}>{label}</Label> */}
			<Typography
				fontFamily="HankenGroteskRegular"
				fontWeight={400}
				fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
				lineHeight={{ lg: "22.4px", md: "22.4px", sm: "19.6px", xs: "19.6px" }}
				color="rgba(32, 28, 26, 0.9)"
			>
				{label}
			</Typography>
			<FormControl>
				<InputLabel
					sx={{
						color: "grey.200",
					}}
					id={name}
				>
					{props.placeholder}
				</InputLabel>
				<Select
					name={name}
					multiple
					labelId={name}
					value={values[name]}
					open={open}
					onOpen={() => setOpen(true)}
					onClose={handleClose}
					input={
						<OutlinedInputWrapper
							id={name}
							label={props.placeholder}
							error={touched[name] && Boolean(errors[name])}
							sx={{
								color: "grey.100",
							}}
						/>
					}
					onChange={(e) => {
						const {
							target: { value },
						} = e;
						setFieldValue(
							name,
							typeof value === "string" ? value.split(",") : value,
						);
						setOpen(false); // Close the dropdown after selecting an option
					}}
					renderValue={(selected: Array<string>) => {
						const nameList: Array<any> = [];
						selected.forEach((item: string) => {
							const temp = options.filter((i: any) => i.key === item);
							nameList.push(temp[0]);
						});

						return (
							<Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
								{nameList.map((item) => (
									<Chip
										key={item?.key}
										label={item?.key}
										sx={{
											py: 0,
											my: 0,
											borderRadius: "3px",
											bgcolor: "primary.25",
										}}
									/>
								))}
							</Box>
						);
					}}
					MenuProps={MenuProps}
					{...props}
				>
					{options.map((item: any) => {
						const { key, value } = item;
						return (
							<MenuItem key={key} value={key}>
								{key}
							</MenuItem>
						);
					})}
				</Select>
				<FormHelperText error={touched[name] && Boolean(errors[name])}>
					{touched[name] && errors[name]}
				</FormHelperText>
			</FormControl>
		</Stack>
	);
};

export default MultiSelect;
