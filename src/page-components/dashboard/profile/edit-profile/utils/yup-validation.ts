import { GlobalYup } from "@/config/formik";

export const initialValuesStudentForm = {
  first_name: "",
  middle_name: "",
  last_name: "",
  // status: Status;
  date_of_birth: "",
  first_language: "",
  country: "",
  passport_number: "",
  passport_expiry_date: "",
  marital_status: "",
  gender: "",
  // ---------------
  address: "",
  city: "",
  country_of_citizenship: "",
  province: "",
  postal_zip_code: "",
  email: "",
  // -----------------
  religion: "",
  father_name: "",
  mother_name: "",
  father_occupation: "",
  mother_occupation: "",
  emergency_person: "",
  emergency_email: "",
  emergency_number: "",
  // ------------------------------------------------------------------Education Info---------------
  country_of_education: "",
  highest_level_of_education: "",
  grading_scheme: "",
  grade_average: "",

  // ---------------------
  name_of_institution: "",
  level_of_institution: "",
  attended_institution_from: "",
  attended_institution_to: "",
  degree_name: "",
  graduated_institution: true,
  graduation_date: "",
  school_address: "",
  school_province: "",
  // -----------------------------------------------------------------Test score------------------------------------
  country_of_institution: "",

  phone: "",
  school_city: "",
  school_postal_zip_code: "",
  english_proficiency_test: false,
  language_of_proficiency_test: "",
  listening: "",
  reading: "",
  speaking: "",
  writing: "",
  total_score: "",

  father_company_name: "",
  mother_company_name: "",
  father_company_address: "",
  mother_company_address: "",

  eighth_institution_name: "",
  eighth_grading: "",
  eighth_start_date: "",
  eighth_end_date: "",

  tenth_institution_name: "",
  tenth_grading: "",
  tenth_start_date: "",
  tenth_end_date: "",
};

export const FORM_VALIDATION_STUDENT = GlobalYup.object().shape({
  email: GlobalYup.string().lowercase(),
  first_name: GlobalYup.string().required("Required"),
  middle_name: GlobalYup.string(),
  phone: GlobalYup.string(),

  date_of_birth: GlobalYup.string().required("Required"),
  first_language: GlobalYup.string().required("Required"),
  country: GlobalYup.string().required("Required"),
  passport_number: GlobalYup.string(),
  passport_expiry_date: GlobalYup.string(),
  marital_status: GlobalYup.string().required("Required"),
  gender: GlobalYup.string().required("Required"),
  address: GlobalYup.string().required("Required"),
  city: GlobalYup.string().required("Required"),
  country_of_citizenship: GlobalYup.string().required("Required"),
  province: GlobalYup.string().required("Required"),
  postal_zip_code: GlobalYup.string().required("Required"),
  father_name: GlobalYup.string().required("Required"),
  mother_name: GlobalYup.string().required("Required"),
  father_occupation: GlobalYup.string(),
  mother_occupation: GlobalYup.string(),
  emergency_person: GlobalYup.string().required("Please choose a field"),
  emergency_email: GlobalYup.string()
    .lowercase()
    .email("Invalid Email")
    .required("Required"),
  emergency_number: GlobalYup.string()
    .phone()
    .required("Required")
    .label("Emergency Contact Number"),
  country_of_education: GlobalYup.string().required("Required"),
  highest_level_of_education: GlobalYup.string().required("Required"),
  grading_scheme: GlobalYup.string().required("Required"),
  grade_average: GlobalYup.string().required("Required"),
  name_of_institution: GlobalYup.string().required("Required"),
  level_of_institution: GlobalYup.string(),
  attended_institution_from: GlobalYup.string().required("Required"),
  attended_institution_to: GlobalYup.string().required("Required"),
  degree_name: GlobalYup.string().required("Required"),
  graduated_institution: GlobalYup.boolean().required("Required"),
  graduation_date: GlobalYup.string().when("graduated_institution", {
    is: true,
    then: (schema) => schema.required("Required"),
  }),

  school_address: GlobalYup.string().required("Required"),
  school_province: GlobalYup.string().required("Required"),
  country_of_institution: GlobalYup.string(),
  school_city: GlobalYup.string(),
  school_postal_zip_code: GlobalYup.string(),
  english_proficiency_test: GlobalYup.boolean(),
  total_score: GlobalYup.string().isValidTestScore(
    "total_score",
    "score must be with in range"
  ),
  language_of_proficiency_test: GlobalYup.string().when(
    "english_proficiency_test",
    {
      is: true,
      then: (schema) => schema.min(1).required("Required"),
    }
  ),
  listening: GlobalYup.string()
    .isValidTestScoreForEachField(
      "listening",
      "listening must be with in range"
    )
    .when("language_of_proficiency_test", {
      is: "Duolingo",
      then: GlobalYup.string(),
      // otherwise: GlobalYup.string().required('Required'),
    } as any),

  reading: GlobalYup.string()
    .isValidTestScoreForEachField("reading", "reading must be with in range")
    .when("language_of_proficiency_test", {
      is: "Duolingo",
      then: GlobalYup.string(),
      // otherwise: GlobalYup.string().required('Required'),
    } as any),
  speaking: GlobalYup.string()
    .isValidTestScoreForEachField("speaking", "speaking must be with in range")
    .when("language_of_proficiency_test", {
      is: "Duolingo",

      then: GlobalYup.string(),
      // otherwise: Yup.string().required('Required'),
    } as any),
  father_company_name: GlobalYup.string(),
  mother_company_name: GlobalYup.string(),
  father_company_address: GlobalYup.string(),
  mother_company_address: GlobalYup.string(),

  eighth_institution_name: GlobalYup.string(),
  eighth_grading: GlobalYup.string(),
  eighth_start_date: GlobalYup.string(),
  eighth_end_date: GlobalYup.string(),

  tenth_institution_name: GlobalYup.string(),
  tenth_grading: GlobalYup.string(),
  tenth_start_date: GlobalYup.string(),
  tenth_end_date: GlobalYup.string(),
});

export const pageValidation = [
  "email",
  "first_name",
  "date_of_birth",
  "first_language",
  "country",
  "marital_status",

  "gender",
  "address",
  "city",
  "country_of_citizenship",
  "province",
  "postal_zip_code",
  "father_name",
  "mother_name",
  "emergency_email",
  "country_of_education",

  "highest_level_of_education",
  "grading_scheme",
  "grade_average",
  "name_of_institution",
  "attended_institution_from",
  "attended_institution_to",
  "degree_name",
  "graduated_institution",
  "school_address",
  "school_province",
];

export const firstPageValidationFields: any = {
  first_name: false,
  last_name: false,
  email: false,
  phone: false,
};

export const secondPageValidationFields: any = {
  business_name: false,
  business_country: false,
  street: false,
  city: false,
  state: false,
};

export const thirdPageValidationFields: any = {
  previous_recruitment: false,
  marketing_method: false,
};
