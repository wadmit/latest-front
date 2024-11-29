import { ICommonCriteria, IQualificationCriteria } from "@/types/scholarship";

export type TScholarshipAboutProp = {
  details: string;
};

export type TScholarshipBenefitsProp = {
  benefits: ICommonCriteria[];
};

export type TScholarshipCategoryProp = {
  categories: ICommonCriteria[];
};

export type TScholarshipEligibilityCriteriaProp = {
  criteria: string[] | undefined;
  language: ICommonCriteria[] | undefined;
  qualification: IQualificationCriteria | undefined;
};

export type TScholarshipProcessProp = {
  applicationProcess: ICommonCriteria[] | undefined;
};

export interface IFAQScholarship {
  question: string;
  answer: string | React.ReactElement;
}
