import type { IApplication } from "@/types/application";
import type { IDocument } from "@/types/document";
import type { IProgram } from "@/types/program";
import type { IUniversity } from "@/types/university";
import type { IUserDashboardData } from "@/types/user";
import type { TShowIn } from "@/types/wisescore";

export interface IApplicationResourceRedux {
  applications: IApplication[];
  applicationsWithStatus: {
    paid: IApplication[];
    unpaid: IApplication[];
  };
  singleApplication: IApplication;
}

export interface ICurrencyStateRedux {
  currency: Record<string, any> | null;
  to: string | null;
  currentCountry: string | null;
  city: string | null;
}

export interface IEligibilityRedux {
  value: string;
  highestlevelofeducation: any;
  eligibilitysubjects: any;
  sortedList: any;
  eligibilityformdata: any;
  subjects: string[];
}

export interface IApplicationDocument {
  requiredDocuments: IDocument[];
  optionalDocuments: IDocument[];
  otherDocuments: IDocument[];
}

export interface IUserState {
  didUserSignedUp: boolean;
  shortList: string[];
  shortlistedPrograms: IProgram[];
  shortlistDetails: { program: IProgram; foundation: IProgram }[];
  shortListLoading: boolean;
  activeStepGlobal: number | undefined;
  maxActiveStepGlobal: number;
  universities: IUniversity[] | null;
  dashboardDataGlobal: IUserDashboardData | null;
}

export interface IWisescoreInitialValues {
  programType: TShowIn | "";
  disciplineName: string;
  overallGrade: any;
  submitFormData: any;
  eligibilitySubjects: any;
  preferredCountry: string;
}
