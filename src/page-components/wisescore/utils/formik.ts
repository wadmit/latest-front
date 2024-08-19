import { EAnalyticsFieldName } from "@/types/mix-panel-analytic";
import { GlobalYup } from "@/config/formik";
import { addMethod, StringSchema } from "yup";

export interface IWiseScore {
	dream_degree: string;
	discipline: string;
	preferredCountry: string;
	preferredIntake: number;
	nationality: string;
	age: string;
	language: boolean;
	language_proficiency: boolean;
	program_type: string;
	program_type_name: string;
	gapYear: string;
	highest_level_of_education: string;
	grade_id: string;
	grade: string;
	maths: string;
	english: string;
	physics: string;
	biology: string;
	chemistry: string;
	sub_disciplines: string[];
	education_status: string;
	test: string;
	score: string;
	passport: boolean;

	listening: string;
	reading: string;
	speaking: string;
	writing: string;

	work_experience: string;
	conference_presentation: string;
	journal_publication: string;
	awards: string;
	china_study: boolean;
	chinese_language_skill: string;
	language_overall_score: string;
	language_test: string;
}

export const INITIAL_WISE_STATE = {
	dream_degree: "",
	preferredCountry: "",
	preferredIntake: 0,
	discipline: "",

	nationality: "",
	age: "",
	language_proficiency: false,
	passport: false,
	program_type: "",
	gapYear: "",
	highest_level_of_education: "",
	grade_id: "",
	grade: "",
	maths: "",
	english: "",
	physics: "",
	biology: "",
	chemistry: "",
	sub_disciplines: [],

	education_status: "",
	test: "",
	score: "",
	max: 0,
	min: 0,

	listening: "",
	reading: "",
	speaking: "",
	writing: "",

	work_experience: "",
	conference_presentation: "",
	journal_publication: "",
	awards: "",
	china_study: false,
	chinese_language_skill: "",

	language_overall_score: "",
	language_test: "",

	// for mixpanel data
	[EAnalyticsFieldName.PROGRAM]: "",
	[EAnalyticsFieldName.DISCIPLINE]: "",
	[EAnalyticsFieldName.SUBDISCIPLINE]: [],
	[EAnalyticsFieldName.NATIONALITY]: "",
	[EAnalyticsFieldName.HIGHEST_EDUCATION]: "",
	[EAnalyticsFieldName.GRADE_SCHEMA]: "",
};

export const WISESCORE_FORM_VALIDATION = GlobalYup.object().shape({
	// Page 1
	preferredCountry: GlobalYup.string().required(
		"Preferred Country must be specified",
	),
	preferredIntake: GlobalYup.string().required(
		"Preferred Intake must be specified",
	),
	gapYear: GlobalYup.string().required("Gap year is required"),
	program_type: GlobalYup.string().required("Required"),
	discipline: GlobalYup.string().required("Discipline is Required"),
	nationality: GlobalYup.string().required("Country is Required"),
	age: GlobalYup.string()
		.test("age", "age must be greater than 16", (value) => value !== "13-16")
		.required("Required"),
	language_proficiency: GlobalYup.boolean(),
	highest_level_of_education: GlobalYup.string().required("Required"),
	grade_id: GlobalYup.string().required("Required"),
	grade: GlobalYup.string()
		.test("grade", (value, ctx) => {
			const { min, max } = ctx.parent;
			if (!Number.isNaN(max) && !Number.isNaN(min)) {
				if (Number(value) >= min && Number(value) <= max) {
					return true; // Value is valid
				}
				return ctx.createError({
					message: "Grade must be with in range of your scale",
					path: "grade",
				});
			}
			return true;
		})
		.required("Required"),
	maths: GlobalYup.string()
		.test("maths", (value, ctx) => {
			const { min, max } = ctx.parent;
			if (!Number.isNaN(min) && !Number.isNaN(max)) {
				if (Number(value) >= min && Number(value) <= max) {
					return true; // Value is valid
				}
				return ctx.createError({
					message: `Grade must be with in range (${min}-${max})`,
					path: "maths",
				});
			}
			return true;
		})
		.required("Required"),
	english: GlobalYup.string()
		.test("english", (value, ctx) => {
			const { min, max } = ctx.parent;
			if (!Number.isNaN(min) && !Number.isNaN(max)) {
				if (Number(value) >= min && Number(value) <= max) {
					return true; // Value is valid
				}
				return ctx.createError({
					message: `Grade must be with in range (${min}-${max})`,
					path: "english",
				});
			}
			return true;
		})
		.required("Required"),
	physics: GlobalYup.string()
		.test("physics", (value, ctx) => {
			const { min, max } = ctx.parent;
			if (!Number.isNaN(min) && !Number.isNaN(max)) {
				if (Number(value) >= min && Number(value) <= max) {
					return true; // Value is valid
				}
				return ctx.createError({
					message: `Grade must be with in range (${min}-${max})`,
					path: "physics",
				});
			}
			return true;
		})
		.required("Required"),
	biology: GlobalYup.string()
		.test("biology", (value, ctx) => {
			const { min, max } = ctx.parent;
			if (!Number.isNaN(min) && !Number.isNaN(max)) {
				if (Number(value) >= min && Number(value) <= max) {
					return true; // Value is valid
				}
				return ctx.createError({
					message: `Grade must be with in range (${min}-${max})`,
					path: "biology",
				});
			}
			return true;
		})
		.required("Required"),
	chemistry: GlobalYup.string()
		.test("chemistry", (value, ctx) => {
			const { min, max } = ctx.parent;
			if (!Number.isNaN(min) && !Number.isNaN(max)) {
				if (Number(value) >= min && Number(value) <= max) {
					return true; // Value is valid
				}
				return ctx.createError({
					message: `Grade must be with in range (${min}-${max})`,
					path: "chemistry",
				});
			}
			return true;
		})
		.required("Required"),
	// Page 2
	englishSpeaking: GlobalYup.string().isValidTestScoreForEachField(
		"englishSpeaking",
		"Invalid test score",
	),
	englishListening: GlobalYup.string().isValidTestScoreForEachField(
		"englishListening",
		"Invalid test score",
	),
	englishReading: GlobalYup.string().isValidTestScoreForEachField(
		"englishReading",
		"Invalid test score",
	),
	englishWriting: GlobalYup.string().isValidTestScoreForEachField(
		"englishWriting",
		"Invalid test score",
	),
	score: GlobalYup.string().isValidTestScore("score", "Invalid test score"),
	totalYearsOfEducation: GlobalYup.number().required("Required"),
});

export const FORM_VALIDATION_WISESCORE_SUBMIT = GlobalYup.object().shape({
	email: GlobalYup.string()
		.matches(/^[^\s][\s\S]*$/, "Email cannot start with a space")
		.email("Invalid Email")
		.required("Required"),
	fullName: GlobalYup.string()
		.matches(/^[^\s][\s\S]*$/, "Full Name cannot start with a space")
		.required("Required"),
	phone: GlobalYup.string()
		.required("Required")
		.customPhoneSign()
		.label("Phone"),
});
