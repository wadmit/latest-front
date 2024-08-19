import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useField, useFormikContext, FormikContextType } from "formik";
import { useAppDispatch } from "@/global-states/hooks/hooks";
import { getCountries } from "@/api/web/country.action";
import { EAnalyticsFieldName } from "@/types/mix-panel-analytic";
import { getCountry } from "@/global-states/reducers/eligibilityReducer";
import { TextFieldWrapper } from "../styles/StyledInput";

interface Country {
	id: string;
	name: string;
}

interface AutocompleteFieldProps<T extends Record<string, any>> {
	fieldName: keyof T & string;
	resetOtherField?: () => void;
	type?: "dashboard" | "normal" | "nuaa";
	formikContext?: FormikContextType<T>;
}

export function AutoCompleteNationalityContact<T extends Record<string, any>>({
	fieldName,
	resetOtherField,
	type,
	formikContext,
}: AutocompleteFieldProps<T>) {
	const [value, setValue] = useState<Country | null>(null);
	const [inputValue, setInputValue] = useState("");
	const contextFromHook = useFormikContext<T>();
	const { setFieldValue, errors, touched } =
		formikContext || contextFromHook || {};
	const [open, setOpen] = useState(false);
	const [data, setData] = useState<Country[]>([]);
	const [loading, setLoading] = useState(false);
	const [field, meta] = useField(fieldName);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (field.value) {
			const selectedValue = data.find((item) => item.id === field.value);
			if (selectedValue) {
				setValue(selectedValue);
			}
		}
	}, [field.value, data]);

	const handleAPI = async () => {
		const temp = await getCountries();
		setData(temp?.data?.data || []);
		setLoading(false);
	};

	const handleChange = (
		event: React.SyntheticEvent,
		newValue: Country | null,
		reason: string,
	) => {
		if (reason === "selectOption" && newValue) {
			setValue(newValue);
			setFieldValue(fieldName, newValue.id);
			setFieldValue(EAnalyticsFieldName.NATIONALITY, newValue.name);
			setInputValue(newValue.name);

			resetOtherField?.();

			if (newValue.id) {
				dispatch(getCountry(newValue.id));
			}
		}
	};

	return (
		<Autocomplete<Country, false, false, false>
			id={fieldName}
			open={open}
			onOpen={() => {
				setOpen(true);
				setLoading(true);
				handleAPI();
			}}
			onClose={() => setOpen(false)}
			autoHighlight
			value={value}
			onChange={handleChange}
			loading={loading}
			disablePortal
			options={data}
			getOptionLabel={(option: Country) => option.name}
			sx={{
				width: "100%",
				maxHeight: "2.875rem",
				"& .MuiOutlinedInput-root .MuiAutocomplete-input ": {
					py: ".3125rem",
				},
			}}
			renderInput={(params) => (
				<TextFieldWrapper
					className={type}
					sx={{ p: 0, m: 0 }}
					{...params}
					placeholder="Enter your nationality"
					error={touched?.[fieldName] && Boolean(errors?.[fieldName])}
					helperText={touched?.[fieldName] && (errors?.[fieldName] as string)}
					InputProps={{
						...params.InputProps,
						autoComplete: "off",
						endAdornment: (
							<>
								{loading ? (
									<CircularProgress color="primary" size={20} />
								) : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	);
}
