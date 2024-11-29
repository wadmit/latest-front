import { ITag } from "./tag";
import { EBaseCurrency } from "./university";

export interface ICommonCriteria {
  title: string;
  details: string[];
}

export interface IQualificationCriteria {
  title: string[];
  value: string[][];
}

export interface EligibilityCriteria {
  academic?: string[];
  language?: ICommonCriteria[];
  qualification?: IQualificationCriteria;
  applicationProcess?: ICommonCriteria[];
}

export interface IScholarships {
  name: string;
  slug: string;
  deadline: Date;
  desc: string;
  tags?: ITag[];
  amount: number;
  wisescore: number;
  currency: EBaseCurrency;
  benefits: ICommonCriteria[];
  categories: ICommonCriteria[];
  eligibilityCriteria: EligibilityCriteria;
  coverImage: string;
  // faqs: Faq[];
  active?: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}
