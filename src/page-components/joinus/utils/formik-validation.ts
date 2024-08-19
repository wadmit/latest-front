import { GlobalYup } from "@/config/formik";
import type { IPartnerFormState } from "@/page-components/joinus/types";
import {
	debouncedEmailValidation,
	debouncedPhoneValidation,
	PartnerYup,
} from "@/page-components/joinus/utils/yup-validation";

export const initialValuesPartnerForm: IPartnerFormState = {
	name: "wiseadmit",
	first_name: "",
	last_name: "",
	email: "",
	phone: "+86",
	prefered_contact: "",
	how_do_you_hear: "",
	other_source_of_hearing: "",
	started_recruting: "",
	// main_source_country: '',
	business_certificate: "",
	business_certificate_helper: "",
	business_logo: "",
	service: [],
	other_service: "",

	business_name: "",
	business_country: "",
	street: "",
	city: "",
	state: "",
	website: "",

	facebook: "",
	instagram: "",
	linkedin: "",
	tiktok: "",
	twitter: "",

	country: "",
	business_certificate_key: "",
	business_logo_key: "",
	expected_recruitment: "",
	marketing_method: [],
	other_marketing: "",
	previous_recruitment: "",
	grow_business_method: "",
	experience_with_wiseadmit: "",
	countryvolume: [
		{
			country: "",
			volume: "",
		},
	],
};

export const FORM_VALIDATION_PARTNER = PartnerYup.object().shape({
	// page1
	name: PartnerYup.string(),
	first_name: PartnerYup.string().required("This field is required").max(64),
	last_name: PartnerYup.string().required("This field is required").max(64),
	email: PartnerYup.string()
		.email("Please enter a valid email")
		.required("This field is required")
		.test("emailExists", "Email is already in use", function (value) {
			return new Promise((resolve) => {
				if (!value) {
					resolve(true);
					return;
				}

				debouncedEmailValidation(value, resolve);
			});
		}),
	phone: GlobalYup.string()
		.customPhoneSign()
		.required("This field is required")
		.label("Phone")
		.test("phoneExists", "Phone number is already in use", function (value) {
			return new Promise((resolve) => {
				if (!value) {
					resolve(true);
					return;
				}
				debouncedPhoneValidation(value, resolve);
			});
		}),
	prefered_contact: PartnerYup.string().required("This field is required"),
	how_do_you_hear: PartnerYup.string().required("This field is required"),
	other_source_of_hearing: PartnerYup.string().when("how_do_you_hear", {
		is: (val: string) => val === "others",
		then: (schema) => schema.required("This field is required"),
		otherwise: (schema) => schema,
	}),
	started_recruting: PartnerYup.string().required("This field is required"),
	// main_source_country: Yup.string().required('Required'),
	service: PartnerYup.array().of(PartnerYup.string()).min(1),
	other_service: PartnerYup.string().when("service", {
		is: (service: string[]) => service && service.includes("Others"),
		then: (schema) => schema.required("This field is required"),
		otherwise: (schema) => schema,
	}),
	business_certificate: PartnerYup.string().required("This field is required"),
	// business_certificate_helper: Yup.string().required('Required'),
	business_logo: PartnerYup.string(),
	// page2
	business_name: PartnerYup.string().required("This field is required"),
	business_country: PartnerYup.string().required("This field is required"),
	street: PartnerYup.string().required("This field is required"),
	city: PartnerYup.string().required("This field is required"),
	state: PartnerYup.string().required("This field is required"),
	website: PartnerYup.string(),

	facebook: PartnerYup.string(),
	instagram: PartnerYup.string(),
	linkedin: PartnerYup.string(),
	tiktok: PartnerYup.string(),
	twitter: PartnerYup.string(),
	// page3
	// country: Yup.string().required('Required'),
	// volume: Yup.string().required('Required'),
	expected_recruitment: PartnerYup.string().required("This field is required"),
	previous_recruitment: PartnerYup.string().when("expected_recruitment", {
		is: (val: string) => val === "Yes",
		then: (schema) => schema.required("This field is required"),
		otherwise: (schema) => schema,
	}),
	marketing_method: PartnerYup.array().of(PartnerYup.string()).min(1),
	other_marketing: PartnerYup.string().when("marketing_method", {
		is: (marketing_method: string[]) =>
			marketing_method && marketing_method.includes("Others"),
		then: (schema) => schema.required("This field is required"),
		otherwise: (schema) => schema,
	}),
	grow_business_method: PartnerYup.string().required("This field is required"),
	experience_with_wiseadmit: PartnerYup.string(),
	countryvolume: PartnerYup.array()
		.of(
			PartnerYup.object().shape({
				country: PartnerYup.string().required("This field is required"),
				volume: PartnerYup.string().required("This field is required"),
			}),
		)
		.required("This field is required"),
});

const firstPage = [
	"first_name",
	"last_name",
	"email",
	"phone",
	"prefered_contact",
	"how_do_you_hear",
	"other_source_of_hearing",
	"started_recruting",
	"service",
	"other_service",
	"business_certificate",
	"business_certificate_helper",
];
const secondPage = [
	"business_name",
	"business_country",
	"street",
	"city",
	"state",
];
const thirdPage = [
	"countryvolume",
	"expected_recruitment",
	"marketing_method",
	"other_marketing",
	"grow_business_method",
	"previous_recruitment",
];

export const validationArray = [firstPage, secondPage, thirdPage];
