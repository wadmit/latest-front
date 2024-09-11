import { ITextFieldType } from "@/types/other";
import { EReligion } from "@/types/student";

interface ITextFieldTypeEducation {
	label: string;
	name: string;
	placeholder?: string;
	type: "select" | "input" | "date" | "number";
	options?: {
		value: string;
		key: string;
		id?: string;
	}[];
}

export const firstPageFields = [
	"first_name",
	"middle_name",
	"last_name",
	"date_of_birth",
	"phone",
	"first_language",
	"country",
	"religion",
	"passport_number",
	"passport_expiry_date",
	"marital_status",
	"gender",
	"address",
	"city",
	"country_of_citizenship",
	"province",
	"postal_zip_code",
	"email",
	"father_name",
	"mother_name",
	"father_occupation",
	"mother_occupation",
	"emergency_person",
	"emergency_email",
	"emergency_number",
	"father_company_name",
	"mother_company_name",
	"father_company_address",
	"mother_company_address",
];

export const secondPageFields = [
	"country_of_education",
	"highest_level_of_education",
	"grading_scheme",
	"grade_average",
	"name_of_institution",
	"level_of_institution",
	"attended_institution_from",
	"attended_institution_to",
	"degree_name",
	"graduated_institution",
	"graduation_date",
	"school_address",
	"school_province",
	"eighth_institution_name",
	"eighth_grading",
	"eighth_start_date",
	"eighth_end_date",
	"tenth_institution_name",
	"tenth_grading",
	"tenth_start_date",
	"tenth_end_date",
];

export const thirdPageFields = [
	"country_of_institution",
	"password",
	"photoUrl",

	"school_city",
	"school_postal_zip_code",
	"english_proficiency_test",
	"language_of_proficiency_test",
	"listening",
	"speaking",
	"reading",
	"writing",
	"total_score",
];

export const DATE_FIELDS = [
	"date_of_birth",
	"passport_expiry_date",
	"attended_institution_from",
	"attended_institution_to",
	"graduation_date",
	"eighth_start_date",
	"eighth_end_date",
	"tenth_start_date",
	"tenth_end_date",
];

export const personalInformationData: ITextFieldType[] = [
	{
		label: "First Name",
		placeholder: "Enter your first name",
		type: "input",
		name: "first_name",
	},
	{
		label: "Middle Name",
		placeholder: "Enter your middle name",
		type: "input",
		name: "middle_name",
	},
	{
		label: "Last Name",
		placeholder: "Enter your last name",
		type: "input",
		name: "last_name",
	},
	{
		label: "Date of birth",
		placeholder: "Enter your date of birth",
		type: "date",
		name: "date_of_birth",
	},

	{
		label: "Native Language",
		placeholder: "Enter first language",
		type: "input",
		name: "first_language",
	},

	{
		label: "Country of Birth",
		name: "country",
		placeholder: "Select your country",
		type: "select",
		options: [
			{ key: "China", value: "China" },
			{ key: "Canada", value: "Canada" },
			{ key: "USA", value: "USA" },
		],
	},
	{
		label: "Phone Number",
		placeholder: "Enter emergency contact email",
		type: "input",
		name: "phone",
		disabled: true,
	},
	{
		label: "Religion",
		name: "religion",
		placeholder: "Select your religion",
		type: "select",
		options: Object.keys(EReligion).map((each, index) => ({
			key: each,
			value: Object.values(EReligion)[index],
		})),
	},
	{
		label: "Passport Number",
		placeholder: "Enter passport number",
		type: "input",
		name: "passport_number",
	},
	{
		label: "Passport Expiry Date",
		placeholder: "Enter passport expiry date",
		type: "date",
		name: "passport_expiry_date",
	},
	{
		label: "Marital Status",
		name: "marital_status",
		placeholder: "Select marital status",
		type: "select",
		options: [
			{ key: "Married", value: "Married" },
			{ key: "Unmarried", value: "Unmarried" },
			{ key: "Other", value: "Other" },
		],
	},
	{
		label: "Gender",
		name: "gender",
		placeholder: "Select gender",
		type: "select",
		options: [
			{ key: "Male", value: "Male" },
			{ key: "Female", value: "Female" },
			{ key: "Other", value: "Other" },
		],
	},
];

export const addressDetailData: ITextFieldType[] = [
	{
		label: "Address ",
		placeholder: "Enter your address",
		type: "input",
		name: "address",
	},
	{
		label: "City/town",
		placeholder: "Enter city town",
		type: "input",
		name: "city",
	},
	{
		label: "Country",
		placeholder: "Enter Country",
		type: "input",
		name: "country_of_citizenship",
	},
	{
		label: "Province/State",
		name: "province",
		placeholder: "Select Province",
		type: "input",
	},
	{
		label: "Postal ZIP Code",
		placeholder: "Enter Postal/Zip code",
		type: "input",
		name: "postal_zip_code",
	},
	{
		label: "Email Address",
		placeholder: "Enter Email Address",
		type: "input",
		name: "email",
		disabled: true,
	},
];

export const parentsDetails: ITextFieldType[] = [
	{
		label: "Father’s Full Name",
		placeholder: "Enter father’s name",
		type: "input",
		name: "father_name",
	},
	{
		label: "Father’s Occupation",
		placeholder: "Enter father’s occupation",
		type: "input",
		name: "father_occupation",
	},
	{
		label: "Father company Name",
		placeholder: "Enter father company name",
		type: "input",
		name: "father_company_name",
	},
	{
		label: "Father company Address",
		placeholder: "Enter father company address",
		type: "input",
		name: "father_company_address",
	},
	{
		label: "Mother’s Full Name",
		placeholder: "Enter mother’s name",
		type: "input",
		name: "mother_name",
	},
	{
		label: "Mother’s Occupation",
		placeholder: "Enter mother’s occupation",
		type: "input",
		name: "mother_occupation",
	},

	{
		label: "Mother company Name",
		placeholder: "Enter mother company name",
		type: "input",
		name: "mother_company_name",
	},

	{
		label: "Mother company Address",
		placeholder: "Enter mother company address",
		type: "input",
		name: "mother_company_address",
	},
	{
		label: "Emergency Contact Person",
		placeholder: "Enter emergency contact email",
		type: "input",
		name: "emergency_person",
	},
	{
		label: "Emergency Contact Email",
		placeholder: "Enter emergency contact email",
		type: "input",
		name: "emergency_email",
	},
	{
		label: "Emergency Contact Number",
		placeholder: "Enter emergency contact number",
		type: "input",
		name: "emergency_number",
	},
];

export const educationInformationData: ITextFieldTypeEducation[] = [
	{
		label: "Country of Education",
		placeholder: "Enter Country",
		type: "input",
		name: "country_of_education",
	},
	{
		label: "Highest level of education",
		name: "highest_level_of_education",
		placeholder: "Select Highest Level of Education",
		type: "select",
		options: [
			{ key: "Grade 11", value: "Grade 11" },
			{ key: "Grade 12/High School", value: "Grade 12/High School" },
			{ key: "3 Years Bachelors Degree", value: "3 years Bachelors Degree" },
			{ key: "4 Years Bachelors Degree", value: "4 years Bachelors Degree" },
			{ key: "A Levels", value: "A Levels" },
		],
	},
	{
		label: "Grading Scheme",
		name: "grading_scheme",
		placeholder: "Select your grading scheme",
		type: "select",
		options: [
			{
				key: "Letter Scale F - A+",
				value: "Letter Scale F - A+",
				id: "62f2974c96df6b5132b8b349",
			},
			{
				key: "Percentage Scale 0 - 100",
				value: "Percentage Scale 0 - 100",
				id: "62f2974c96df6b5132b8b34d",
			},
			{
				key: "GPA Scale 0 - 4.0",
				value: "GPA Scale 0 - 4.0",
				id: "62f2974c96df6b5132b8b34b",
			},
		],
	},
	// {
	//   label: 'Grade Average',
	//   placeholder: 'Enter Grade Average',
	//   type: 'input',
	//   name: 'grade_average',
	// },
];

export const educationBackgroundData: ITextFieldTypeEducation[] = [
	{
		label: "Name of institution",
		placeholder: "Enter name of institution",
		type: "input",
		name: "name_of_institution",
	},
	{
		label: "Level of institution",
		placeholder: "Enter level",
		name: "level_of_institution",
		type: "select",
		options: [
			{ key: "High School", value: "High School" },
			{ key: "College", value: "College" },
			{ key: "University", value: "University" },
		],
	},
	{
		label: "Attended Institution From",
		placeholder: "Enter start date",
		type: "date",
		name: "attended_institution_from",
	},
	{
		label: "Attended Institution To",
		placeholder: "Enter end date",
		type: "date",
		name: "attended_institution_to",
	},
	{
		label: "Degree Name",
		placeholder: "Enter degree name",
		type: "input",
		name: "degree_name",
	},
	{
		label: "Have you graduated from this institution?",
		placeholder: "Enter degree name",
		type: "input",
		name: "graduated_institution",
	},
	{
		label: "Graduation Date",
		placeholder: "Enter graduation date",
		type: "date",
		name: "graduation_date",
	},
	{
		label: "School Address",
		placeholder: "Enter school address",
		type: "input",
		name: "school_address",
	},
	{
		label: "City/Town",
		placeholder: "Enter city/town",
		type: "input",
		name: "school_city",
	},
	{
		label: "Province",
		placeholder: "Enter province",
		type: "input",
		name: "school_province",
	},
	{
		label: "Name of Junior School(Class 10)",
		placeholder: "Enter name of junior school",
		type: "input",
		name: "tenth_institution_name",
	},
	{
		label: "Grade of Junior School(Class 10)",
		placeholder: "Enter grade of junior school",
		type: "input",
		name: "tenth_grading",
	},
	{
		label: "Junior School Start Date(Class 10)",
		placeholder: "Enter start date of junior school",
		type: "date",
		name: "tenth_start_date",
	},
	{
		label: "Junior School End Date(Class 10)",
		placeholder: "Enter end date of junior school",
		type: "date",
		name: "tenth_end_date",
	},
	{
		label: "Name of Junior School(Class 8)",
		placeholder: "Enter name of junior school",
		type: "input",
		name: "eighth_institution_name",
	},
	{
		label: "Grade of Junior School(Class 8)",
		placeholder: "Enter grade of junior school",
		type: "input",
		name: "eighth_grading",
	},
	{
		label: "Junior School Start Date(Class 8)",
		placeholder: "Enter start date of junior school",
		type: "date",
		name: "eighth_start_date",
	},
	{
		label: "Junior School End Date(Class 8)",
		placeholder: "Enter end date of junior school",
		type: "date",
		name: "eighth_end_date",
	},
];
