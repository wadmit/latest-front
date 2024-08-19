export type IPartnerFormState = {
	name: string;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	prefered_contact: string;
	how_do_you_hear: string;
	other_source_of_hearing: string;
	started_recruting: string;
	// main_source_country: string,
	business_certificate: string;
	business_certificate_helper: string;
	business_logo: string;
	service: string[];
	other_service: string;

	business_name: string;
	business_country: string;
	street: string;
	city: string;
	state: string;
	website: string;

	facebook: string;
	instagram: string;
	linkedin: string;
	tiktok: string;
	business_certificate_key: string;
	business_logo_key: string;
	twitter: string;

	country: string;
	expected_recruitment: string;
	marketing_method: string[];
	other_marketing: string;
	previous_recruitment: string;
	grow_business_method: string;
	experience_with_wiseadmit: string;
	countryvolume: {
		country: string;
		volume: string;
	}[];
};
