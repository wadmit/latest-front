"use client";
import { useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { averageCalculator } from "../utils/averageCalculator";
import {
	Box,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	MenuItem,
	Radio,
	RadioGroup,
	Stack,
} from "@mui/material";
import FormHeaders from "@/components/common/formfields/FormHeaders";
import { TextFieldWrapper } from "@/components/common/formfields/styles/StyledInput";
import Label from "@/components/common/formfields/Label";

interface ITestType {
	label: string;
	name: string;
	placeholder: string;
	changeHandler: any;
	value: any;
}

const LanguageProficiencyStudent = () => {
	const [averageScore, setAverageScore] = useState<number>(0);
	const testNames = ["IELTS", "PTE", "Duolingo", "HSK"];
	const { setFieldValue, resetForm, values, errors, validateForm, setErrors } =
		useFormikContext<any>();
	const [langProfTestTaken, setLangProfTestTaken] = useState("");
	const [profTest, setProfTest] = useState<any>("");

	// onChange
	const [reading, setReading] = useState<number>(0);
	const [listening, setListening] = useState<number>(0);
	const [writing, setWriting] = useState<number>(0);
	const [speaking, setSpeaking] = useState<number>(0);
	const [total, setTotal] = useState<number>(0);
	const [duolingoTotalScore, setDuolingoHskTotalScore] = useState<
		number | string
	>(0);

	const ieltsData: ITestType[] = [
		{
			label: "IELTS Listening Score",
			name: "listening",
			placeholder: "Enter IELTS Listening Score",
			changeHandler: setListening,
			value: listening,
		},
		{
			label: "IELTS Reading Score",
			name: "reading",
			placeholder: "Enter IELTS Reading Score",
			changeHandler: setReading,
			value: reading,
		},
		{
			label: "IELTS Writing Score",
			name: "writing",
			placeholder: "Enter IELTS Writing Score",
			changeHandler: setWriting,
			value: writing,
		},
		{
			label: "IELTS Speaking Score",
			name: "speaking",
			placeholder: "Enter IELTS Speaking Score",
			changeHandler: setSpeaking,
			value: speaking,
		},
		{
			label: "Total Score",
			name: "total_score",
			placeholder: "Enter IELTS Total Score",
			changeHandler: setTotal,
			value: total,
		},
		// {
		//   label: 'Total Score',
		//   name: 'pte_total_score',
		//   plaeholder: 'Enter PTE Total Score',
		// },
	];

	const pteData: ITestType[] = [
		{
			label: "PTE Listening Score",
			name: "listening",
			placeholder: "Enter PTE Listening Score",
			changeHandler: setListening,
			value: listening,
		},
		{
			label: "PTE Reading Score",
			name: "reading",
			placeholder: "Enter PTE Reading Score",
			changeHandler: setReading,
			value: reading,
		},
		{
			label: "PTE Writing Score",
			name: "writing",
			placeholder: "Enter PTE Writing Score",
			changeHandler: setWriting,
			value: writing,
		},
		{
			label: "PTE Speaking Score",
			name: "speaking",
			placeholder: "Enter PTE Speaking Score",
			changeHandler: setSpeaking,
			value: speaking,
		},
		{
			label: "Total Score",
			name: "total_score",
			placeholder: "Enter PTE Total Score",
			changeHandler: setTotal,
			value: total,
		},
	];

	const hskData: ITestType[] = [
		{
			label: "HSK Listening Score",
			name: "listening",
			placeholder: "Enter HSK Listening Score",
			changeHandler: setListening,
			value: listening,
		},
		{
			label: "HSK Reading Score",
			name: "reading",
			placeholder: "Enter HSK Reading Score",
			changeHandler: setReading,
			value: reading,
		},
		{
			label: "HSK Writing Score",
			name: "writing",
			placeholder: "Enter HSK Writing Score",
			changeHandler: setWriting,
			value: writing,
		},
		{
			label: "HSK Speaking Score",
			name: "speaking",
			placeholder: "Enter HSK Speaking Score",
			changeHandler: setSpeaking,
			value: speaking,
		},
		{
			label: "Total Score",
			name: "total_score",
			placeholder: "Enter HSK Total Score",
			changeHandler: setTotal,
			value: total,
		},
	];

	useEffect(() => {
		if (!total) {
			if (reading && listening && writing && speaking) {
				const avg = averageCalculator(reading, listening, writing, speaking);
				setAverageScore(avg);
				setFieldValue("score", avg);
			}
		} else {
			setAverageScore(total);
			setFieldValue("score", total);
		}
		if (duolingoTotalScore) {
			setAverageScore(Number(duolingoTotalScore));
			setFieldValue("score", duolingoTotalScore);
		}
	}, [reading, listening, writing, speaking, total, duolingoTotalScore]);

	return (
		<Box my={5}>
			<FormHeaders title="Language Proficiency" />
			<Grid container columnSpacing={7} rowSpacing={4} mt={0}>
				{/* Have you taken any English proficiency tests? */}
				<Grid item xs={12}>
					<FormControl>
						<FormLabel
							htmlFor="english_proficiency_test"
							id="proficiency_tests"
						>
							Have you taken any English proficiency tests?
						</FormLabel>
						<RadioGroup
							row
							name="english_proficiency_test"
							value={values.english_proficiency_test}
							onChange={(e) => {
								// setProfTest(e.target.value === 'true');
								setFieldValue("listening", "");
								setFieldValue("reading", "");
								setFieldValue("writing", "");
								setFieldValue("speaking", "");
								setFieldValue("total_score", "");
								setFieldValue("language_of_proficiency_test", "");
								setFieldValue(
									"english_proficiency_test",
									e.target.value === "true",
								);
								// setLangProfTestTaken('');

								// clearValue();
							}}
						>
							<FormControlLabel
								value={false}
								control={<Radio />}
								label="No, I have not"
							/>
							<FormControlLabel value control={<Radio />} label="Yes, I have" />
						</RadioGroup>
					</FormControl>
				</Grid>
				{/* select which language prof test you have given */}
				{values.english_proficiency_test && (
					<Grid item md={6} xs={12}>
						<Stack direction="column" spacing={1}>
							<Label htmlFor="prof_test">
								Select which language proficiency test you have taken
							</Label>
							<TextFieldWrapper
								name="language_of_proficiency_test"
								label="Select your option"
								select
								value={values.language_of_proficiency_test}
								fullWidth
								onChange={(e) => {
									setLangProfTestTaken(e.target.value);
									setFieldValue("listening", "");
									setFieldValue("reading", "");
									setFieldValue("writing", "");
									setFieldValue("speaking", "");
									// setFieldValue('language_of_proficiency_test', '');
									setFieldValue("total_score", "");
									setFieldValue("language_of_proficiency_test", e.target.value);
									setErrors({});
									// clearValue();
								}}
							>
								{testNames.map((test: string) => (
									<MenuItem key={test} value={test}>
										{test}
									</MenuItem>
								))}
							</TextFieldWrapper>
						</Stack>
					</Grid>
				)}
			</Grid>

			{/* ---------------------------------------------------------Select which language proficiency test you have taken------------------------- */}
			{/* --------------------------------------------IELTS */}

			{values.language_of_proficiency_test === "IELTS" &&
				values.english_proficiency_test && (
					<Grid container columnSpacing={7} rowSpacing={4} mt={0}>
						{ieltsData.map((item) => (
							<Grid item md={6} xs={12} key={item.name}>
								<Stack direction="column" spacing={1}>
									<Label htmlFor={item.name}>{item.label}</Label>
									<TextFieldWrapper
										name={item.name}
										placeholder={item.placeholder}
										fullWidth
										value={values[item.name]}
										onChange={(e) => {
											// item.changehandler(e.target.value);
											setFieldValue(item.name, e.target.value);
										}}
										error={Boolean(errors[`${item.name}`])}
										helperText={errors[`${item.name}`] as string}
									/>
								</Stack>
							</Grid>
						))}
					</Grid>
				)}
			{/* --------------------------------------------PTE */}
			{values.language_of_proficiency_test === "PTE" &&
				values.english_proficiency_test && (
					<Grid container columnSpacing={7} rowSpacing={4} mt={0}>
						{pteData.map((item) => (
							<Grid item md={6} xs={12} key={item.name}>
								<Stack direction="column" spacing={1}>
									<Label htmlFor={item.name}>{item.label}</Label>
									<TextFieldWrapper
										name={item.name}
										placeholder={item.placeholder}
										value={values[item.name]}
										//   value={item.value}
										onChange={(e) => {
											// item.changehandler(e.target.value);
											setFieldValue(item.name, e.target.value);
										}}
										error={Boolean(errors[`${item.name}`])}
										helperText={errors[`${item.name}`] as string}
									/>
								</Stack>
							</Grid>
						))}
					</Grid>
				)}
			{/* --------------------------------------------Duolingo */}
			{values.language_of_proficiency_test === "Duolingo" &&
				values.english_proficiency_test && (
					<Grid container columnSpacing={7} rowSpacing={4} mt={0}>
						<Grid item md={6} xs={12}>
							<Stack direction="column" spacing={1}>
								<Label htmlFor="duolingo">Total Duolingo Score</Label>
								<TextFieldWrapper
									name="duolingo"
									placeholder="Total Score"
									fullWidth
									value={values.total_score}
									// value={duolingoTotalScore}s
									onChange={(e) => {
										// setDuolingoHskTotalScore(e.target.value);
										setFieldValue("total_score", e.target.value);
									}}
									error={Boolean(errors.total_score)}
									helperText={errors.total_score as string}
								/>
							</Stack>
						</Grid>
					</Grid>
				)}
			{/* --------------------------------------------HSK */}
			{values.language_of_proficiency_test === "HSK" &&
				values.english_proficiency_test && (
					<Grid container columnSpacing={7} rowSpacing={4} mt={0}>
						{hskData.map((item) => (
							<Grid item md={6} xs={12} key={item.name}>
								<Stack direction="column" spacing={1}>
									<Label htmlFor={item.name}>{item.label}</Label>
									<TextFieldWrapper
										name={item.name}
										placeholder={item.placeholder}
										fullWidth
										value={values[item.name]}
										//   value={item.value}
										onChange={(e) => {
											setFieldValue(item.name, e.target.value);
											// item.changehandler(e.target.value);
										}}
										error={Boolean(errors[`${item.name}`])}
										helperText={errors[`${item.name}`] as string}
									/>
								</Stack>
							</Grid>
						))}
					</Grid>
				)}
		</Box>
	);
};

export default LanguageProficiencyStudent;
