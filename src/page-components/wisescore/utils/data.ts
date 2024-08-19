import { IWisescoreForm } from "@/types/wisescore";
import PresentationAndOther from "../screens/masters/PresentationAndOther";
import ProgramSelectNUAA from "../screens/common/ProgramSelectNUAA";
import ProgramSelect from "../screens/common/ProgramSelect";
import { EAnalyticsEvents } from "@/types/mix-panel-analytic";
import StreamSelect from "../screens/common/StreamSelect";
import SubDisciplinesSelect from "../screens/common/SubDisciplinesSelect";
import NationalitySelect from "../screens/common/NationalitySelect";
import AgeGroupSelect from "../screens/common/AgeGroupSelect";
import HighestEducation from "../screens/common/HighestEducation";
import EducationStatus from "../screens/common/EducationStatus";
import GradeScale from "../screens/common/GradeScale";
import OverAllGradeSelect from "../screens/common/OverAllGradeSelect";
import LanguageScore from "../screens/common/LanguageScore";
import { Doctors } from "./type";

export const masterFields: IWisescoreForm[] = [
  {
    screenHeader: "How many years of work experience do you have?",
    screenSubHeader: "You’re almost at the end of this step.",
    Screen: PresentationAndOther,
    value: "work_experience",
    showIn: "masters",
    isEnd: false,
    skipStep: 1,
  },
  {
    screenHeader: "How many conference presentations have you done?",
    screenSubHeader: "You’re almost at the end of this step.",
    Screen: PresentationAndOther,
    value: "conference_presentation",
    showIn: "masters",
    isEnd: false,
    skipStep: 1,
  },
  {
    screenHeader: "How many original articles have you published?",
    screenSubHeader: "You’re almost at the end of this step.",
    Screen: PresentationAndOther,
    value: "journal_publication",
    showIn: "masters",
    isEnd: false,
    skipStep: 1,
  },
  {
    screenHeader: "How many academic awards have you been awarded?",
    screenSubHeader: "You’re almost at the end of this step.",
    Screen: PresentationAndOther,
    value: "awards",
    showIn: "masters",
    isEnd: false,
    skipStep: 1,
  },
];
export const getMainFields = (
  version: string,
  overAllGrade: any
): IWisescoreForm[] => {
  return [
    {
      screenHeader: "Which program are you looking for?",
      screenSubHeader:
        "Let us help you in your academic journey. To do this, I'll need some basic information about you and your study aspirations.",
      Screen: version === "NuaaScore" ? ProgramSelectNUAA : ProgramSelect,
      value: "program_type",
      showIn: "both",
      isEnd: false,
      skipStep: 1,
      showValidation: true,
      eventName: EAnalyticsEvents.WISESCORE_PROGRAM_SELECTION,
      multiple: version !== "NuaaScore",
    },
    {
      screenHeader: "What stream do you want to pursue?",
      screenSubHeader:
        "Nice one. I would love to know a little more about you.",
      Screen: StreamSelect,
      value: "discipline",
      showIn: "both",
      isEnd: false,
      eventName: EAnalyticsEvents.WISESCORE_STREAM_SELECTION,
      skipStep: 1,
      showValidation: false,
    },
    {
      screenHeader: "What sub discipline do you want to pursue?",
      screenSubHeader:
        "Please help me learn more. You can choose multiple selections.",
      Screen: SubDisciplinesSelect,
      value: "sub_disciplines",
      eventName: EAnalyticsEvents.WISESCORE_SUBDISCIPLINE_SELECTION,
      hasNext: true,
      showIn: "both",
      isEnd: false,
      skipStep: 1,
      showValidation: false,
    },
    {
      screenHeader: "What is your nationality?",
      screenSubHeader: "Please help me learn more about you.",
      Screen: NationalitySelect,
      value: "nationality",
      eventName: EAnalyticsEvents.WISESCORE_COUNTRY_SELECTION,
      showIn: "both",
      isEnd: false,
      hasNext: true,
      skipStep: 1,
    },
    {
      screenHeader: "What is your age group?",
      screenSubHeader: "You’re almost at the end of this step.",
      Screen: AgeGroupSelect,
      eventName: EAnalyticsEvents.WISESCORE_AGE_SELECTION,
      value: "age",
      showIn: "both",
      isEnd: false,
      showValidation: false,
      skipStep: 1,
    },
    {
      screenHeader: "What is your highest level of education?",
      screenSubHeader: "You’re almost at the end of this step.",
      Screen: HighestEducation,
      eventName: EAnalyticsEvents.WISESCORE_HIGHEST_EDUCATION_SELECTION,
      value: "highest_level_of_education",
      showIn: "both",
      isEnd: false,
      skipStep: 1,
    },
    {
      screenHeader: "What is your education status?",
      screenSubHeader: "You’re almost at the end of this step.",
      Screen: EducationStatus,
      eventName: EAnalyticsEvents.WISESCORE_EDUCATION_STATUS,
      value: "education_status",
      showIn: "both",
      isEnd: false,
      skipStep: 1,
      multiple: true,
    },
    {
      screenHeader: "Grading scheme of your degree?",
      screenSubHeader: "You’re almost at the end of this step.",
      Screen: GradeScale,
      eventName: EAnalyticsEvents.WISESCORE_GRADING_SCHEME_SELECTION,
      value: "grade_id",
      showIn: "both",
      isEnd: false,
      skipStep: 1,
    },
    {
      screenHeader: "What is your overall grade?",
      screenSubHeader: "You’re almost at the end of this step.",
      Screen: OverAllGradeSelect,
      eventName: EAnalyticsEvents.WISESCORE_OVERALL_GRADE_SELECTION,
      value: "grade",
      showIn: "both",
      hasNext: overAllGrade && overAllGrade.type !== "select",
      isEnd: false,
      skipStep: 1,
    },
  ];
};
export const getRemainingFields = (programType: string): IWisescoreForm[] => {
  return [
    {
      screenHeader: "Have you taken any language proficiency tests?",
      screenSubHeader: "You’re almost at the end of this step.",
      Screen: LanguageScore,
      value: "language_overall_score",
      eventName: EAnalyticsEvents.WISESCORE_LANGUAGE,
      showIn: "both",
      isEnd: false,
      hasNext: true,
      skipStep: 1,
    },
    {
      screenHeader: "Do you have passport?",
      screenSubHeader: "You’re almost at the end of this step.",
      Screen: PresentationAndOther,
      eventName: EAnalyticsEvents.WISESCORE_OTHER_INFORMATION,
      value: "passport",
      showIn: "both",
      isEnd: programType === "bachelors",
      skipStep: 1,
    },
    {
      screenHeader: "Did you study in China before?",
      screenSubHeader: "You’re almost at the end of this step.",
      Screen: PresentationAndOther,
      eventName: EAnalyticsEvents.WISESCORE_OTHER_INFORMATION,
      value: "china_study",
      showIn: "masters",
      isEnd: false,
      skipStep: 1,
    },
    {
      screenHeader: "How is your chinese language skills?",
      screenSubHeader: "You’re almost at the end of this step.",
      Screen: PresentationAndOther,
      eventName: EAnalyticsEvents.WISESCORE_OTHER_INFORMATION,
      value: "chinese_language_skill",
      showIn: "masters",
      isEnd: true,
      skipStep: 0,
    },
  ];
};

export const workExperienceOptions = [
  { key: "None", value: "0" },
  { key: "1-2", value: "1-2" },
  { key: "3", value: "3" },
  { key: "4", value: "4" },
  { key: "5", value: "5" },
  { key: "6+", value: "6+" },
];

export const presentationsOptions = [
  { key: "None", value: "0" },
  { key: "1-3", value: "1-3" },
  { key: "4-5", value: "4-5" },
  { key: "6+", value: "6+" },
];

export const journalPublicationOptions = [
  { key: "None", value: "0" },
  { key: "1-3", value: "1-3" },
  { key: "4-5", value: "4-5" },
  { key: "6+", value: "6+" },
];
export const awards = [
  { key: "None", value: "0" },
  { key: "1-3", value: "1-3" },
  { key: "4-5", value: "4-5" },
  { key: "6+", value: "6+" },
];

export const educationStatus = [
  { key: "I have graduated", value: "true" },
  { key: "I am still studying", value: "false" },
];

export const chinaStudy = [
  { key: "Yes, I did", value: "true" },
  { key: "No, I didn't", value: "false" },
];

export const passport = [
  { key: "Yes, I do", value: true },
  { key: "No, I don't", value: false },
];

export const chineseLangauge = [
  { key: "None", value: "None" },
  { key: "Survival Chinese ", value: "Survival Chinese " },
  { key: "Basic Communication", value: "Basic Communication" },
  { key: "Fluent", value: "Fluent " },
  { key: "Native like", value: "Native like" },
];

export const doctorsArray: Doctors[] = [
  {
    name: "Dr. Subash Bhattarai",
    designation: "MBBS, MD Paediatrics (IOM , TUTH)",
    experience: 3,
    imageUrl: "@/public/Blogs/blogs1.jpg",
    appointmentUrl: "https://facebook.com",
  },
  {
    name: "Dr. Ashirbad Acharya",
    designation: "Medical Officer, Central Jail Hospital",
    experience: 3,
    imageUrl: "@/public/Blogs/blogs1.jpg",
    appointmentUrl: "https://facebook.com",
  },
  // {
  //     name: 'Dr. Sanju Dangol',
  //     designation: 'Consultant Oncologist',
  //     experience: 3,
  //     imageUrl: '@/public/Blogs/blogs1.jpg',
  //     appointmentUrl: 'https://facebook.com',
  // },
];
