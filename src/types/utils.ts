import { IBlog } from "./blog";
import { INews } from "./news";
import { IProgram } from "./program";
import { IUniversity } from "./university";

export type ScholarShipRangeType = {
  "60-74": {
    value: number | string;
    type: "amount";
  };
  "40-100": {
    value: number | string;
    type: "percent";
  };
  "75-100": {
    value: number | string;
    type: "percent";
  };
};

export interface ITableOfContent {
  name: string;
  value: string;
  _id: string;
}

export interface IUniversityTemplateConfig {
  title: string;
  logo: string;
  logoSmall: string;
  navbarBgColor: string;
  footerBgColor: string;
  navbarTextColor: string;
  originalSiteUrl: string;
  homePageUrl: string;
  scorePageUrl: string;
  resultImage?: string;
}

export interface IUniversityTemplateImages {
  src: string;
  alt: string;
}

export interface ITopMatches {
  score: number;
  universities: ITopMatch[];
}

export type ITopMatch = {
  id: string;
  university: IUniversity;
};

export interface IBlogResponse {
  featuredBlog: IBlog;
  blogs: IBlog[];
  paginate: {
    total: number;
    hasMore: boolean;
  };
}
export interface INewsResponse {
  featuredNews: INews;
  news: INews[];
  paginate: {
    total: number;
    hasMore: boolean;
  };
}

export interface IScholarshipResponse {
  scholarship: Record<string, any>;
  name: string;
  active: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface IScholarship {
  name: string;
  benefit: string;
  stipend: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface IRecommendation {
  name?: string;
  subName?: string;
  image_key?: string;
  slug?: string;
}

export type TUniversitiesDetail = IUniversity & {
  similarUniversities?: IUniversity[];
  similarPrograms?: IProgram[];
};

export type TRecommendationType = "universities" | "programs";

export interface ISocialMediaType {
  "Email Address": string;
  "Facebook Link": string;
  "Instagram Link": string;
  "Youtube Link": string;
  "Twitter Link": string;
}
