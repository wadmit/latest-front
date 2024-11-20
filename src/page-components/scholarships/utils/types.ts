export type TScholarshipAboutProp = {
  details: string;
};

export type TScholarshipBenefitsProp = {
  benefits: Record<string, any>;
};

export type TScholarshipCategoryProp = {
  categories: Record<string, any>;
};

export type TScholarshipEligibilityCriteriaProp = {
  criteria: Record<string, any>;
  language: Record<string, any>;
  qualification: any;
};

export type TScholarshipProcessProp = {
  applicationProcess: Record<string, string[]>;
};
