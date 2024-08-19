import { TextFieldType } from "@/page-components/joinus/types/TextFieldType";

export const contactInformationData: TextFieldType[] = [
  {
    label: "Owner’s first name",
    placeholder: "Enter owner’s first name",
    type: "input",
    name: "first_name",
  },
  {
    label: "Owner’s last name",
    placeholder: "Enter owner’s last name",
    type: "input",
    name: "last_name",
  },
  {
    label: "Email address",
    placeholder: "Enter email address",
    type: "input",
    name: "email",
  },
  {
    label: "Phone number",
    placeholder: "Enter phone number",
    type: "input",
    name: "phone",
  },
  {
    label: "Preferred contact method",
    placeholder: "Select your preferred method of contact",
    name: "prefered_contact",
    type: "select",
    options: [
      { key: "Call", value: "Call" },
      { key: "SMS", value: "SMS" },
      { key: "Email", value: "Email" },
    ],
  },
  {
    label: "How do you hear about WiseAdmit?",
    placeholder: "Select your preferred option",
    name: "how_do_you_hear",
    type: "select",
    options: [
      { key: "Social Media", value: "Social Media" },
      { key: "Google", value: "Google" },
      { key: "Word of Mouth", value: "Word of Mouth" },
      { key: "Student", value: "Student" },
      { key: "Linkedin", value: "Linkedin" },
      { key: "others (specify)", value: "others" },
    ],
  },
  {
    label: "In which year did you start recruiting students?",
    placeholder: "Enter a year",
    name: "started_recruting",
    type: "input",
  },
  {
    label: "What services do you provide?",
    placeholder: "Select your preferred option",
    name: "service",
    type: "select",
    options: [
      {
        key: "Counselling and application processing",
        value: "Counselling and application processing",
      },
      {
        key: "IELTS/TOEFL or other coaching services",
        value: "IELTS/TOEFL or other coaching services",
      },
      {
        key: "Independent agent (Teacher, Coach, etc)",
        value: "Independent agent (Teacher, Coach, etc)",
      },
      { key: "Others", value: "Others" },
    ],
  },
];

export const imageUploadFields: {
  label: string;
  name: string;
  keyName: string;
}[] = [
  {
    label: "Upload business certificate",
    name: "business_certificate",
    keyName: "business_certificate_key",
  },
  {
    label: "Upload business logo (optional)",
    name: "business_logo",
    keyName: "business_logo_key",
  },
];

export const recruitmentInformationData: TextFieldType[] = [
  {
    label: "What types of marketing methods do you choose?",
    placeholder: "Select your options",
    name: "marketing_method",
    type: "select",
    options: [
      {
        key: "Education Fairs, Workshops and Seminars",
        value: "Education Fairs, Workshops and Seminars",
      },
      {
        key: "Social Media Marketing and Google",
        value: "Social Media Marketing and Google",
      },
      {
        key: "Newspapers, Magazines, and Posters",
        value: "Newspapers, Magazines, and Posters",
      },
      {
        key: "B2B, Agents Network and Partnerships",
        value: "B2B, Agents Network and Partnerships",
      },
      { key: "Others", value: "Others" },
    ],
  },
  {
    label: <>Have you recruited students to China before?</>,
    placeholder: "Enter your remarks",
    name: "expected_recruitment",
    type: "select",
    options: [
      { key: "Yes", value: "Yes" },
      { key: "No", value: "No" },
    ],
  },
  {
    label: "How can we help you grow your business?",
    placeholder: "Select your options",
    name: "grow_business_method",
    type: "select",
    options: [
      { key: "Digital Marketing", value: "Digital Marketing" },
      { key: "Guidelines", value: "Guidelines" },
      { key: "Sales Management", value: "Sales Management" },
    ],
  },
  {
    label:
      "What will make your experience working with WiseAdmit delightful? (optional)",
    placeholder: "Enter your remarks",
    type: "input",
    name: "experience_with_wiseadmit",
  },
];

export const businessDataInformation: TextFieldType[] = [
  {
    label: "Business name",
    placeholder: "Enter business name",
    type: "input",
    name: "business_name",
  },
  {
    label: "Country",
    name: "business_country",
    placeholder: "Select your country",
    type: "select",
    options: [
      { key: "China", value: "China" },
      { key: "Canada", value: "Canada" },
      { key: "USA", value: "USA" },
    ],
  },
  {
    label: "Street address",
    name: "street",
    placeholder: "Enter street address",
    type: "input",
  },
  {
    label: "City",
    name: "city",
    placeholder: "Enter city name",
    type: "input",
  },
  {
    label: "State/ Province",
    placeholder: "Enter state of province name",
    type: "input",
    name: "state",
  },
  {
    label: "Website URL (optional)",
    placeholder: "Enter company website URL",
    type: "input",
    name: "website",
  },
];

export const businessSocialData: TextFieldType[] = [
  {
    label: "Facebook (optional)",
    placeholder: "Enter Facebook URL",
    type: "input",
    name: "facebook",
  },
  {
    label: "Instagram (optional)",
    placeholder: "Enter Instagram URL",
    type: "input",
    name: "instagram",
  },
  {
    label: "Linkedin (optional)",
    placeholder: "Enter LinkedIn URL",
    type: "input",
    name: "linkedin",
  },
  {
    label: "Tiktok (optional)",
    placeholder: "Enter TikTok URL",
    type: "input",
    name: "tiktok",
  },
  {
    label: "Twitter (optional)",
    placeholder: "Enter Twitter URL",
    type: "input",
    name: "twitter",
  },
];
