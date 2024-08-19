"use server";
import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";

export const getFutureStream = async () => {
  try {
    const res = await ApiService.get({
      url: `${ApiConfig.documents}`,
      tokenNeeded: false,
    });
    return res?.data?.data;
  } catch (e) {
    console.log("Error", e);
    Promise.reject(e);
  }
};

export const getSubDisciplines = async (
  discipline: string,
  variant?: string
) => {
  try {
    const res = await ApiService.get({
      url: `${ApiConfig.subDisciplines}/discipline/${discipline}${
        variant === "nuaa" ? "?university=nuaa" : ""
      }`,
      tokenNeeded: false,
    });
    return res?.data?.data;
  } catch (e) {
    Promise.reject(e);
  }
};

export const getDisciplines = async (disciplines: string) => {
  try {
    const res = await ApiService.get({
      url: `${ApiConfig.disciplines}/${disciplines}`,
      tokenNeeded: false,
    });
    return res?.data?.data;
  } catch (e) {
    throw e;
  }
};

export const getDisciplinesDocuments = async (
  document: string,
  variant?: string
) => {
  try {
    const res = await ApiService.get({
      url: `${ApiConfig.disciplines}/document/${document}${
        variant === "nuaa" ? "?university=nuaa" : ""
      }`,
      tokenNeeded: false,
    });
    return res?.data?.data;
  } catch (e) {
    throw e;
  }
};

export const getCountry = async () => {
  try {
    const res = await ApiService.get({
      url: `${ApiConfig.common}/countries`,
      tokenNeeded: false,
    });
    return res?.data?.data;
  } catch (e) {
    throw e;
  }
};

export const submitWiseScore = async (formvalues: any) => {
  try {
    const res = await ApiService.post({
      url: `${ApiConfig.eligibility}/save_eligibility${
        formvalues?.university === "nuaa" ? "?university=nuaa" : ""
      }`,
      options: formvalues,
      tokenNeeded: false,
    });
    return res?.data;
  } catch (e) {
    throw e;
  }
};

export const postWiseScoreData = async (email: string) => {
  try {
    const res = await ApiService.post({
      url: `${ApiConfig.grade_scales}/eligibility_score`,
      tokenNeeded: false,
      options: { email },
    });
    return res?.data?.data;
  } catch (e) {
    throw e;
  }
};

export const postWisescoreDataForNuaa = async (email: string) => {
  try {
    const res = await ApiService.post({
      url: `${ApiConfig.grade_scales}/eligibility_score/nuaa`,
      tokenNeeded: false,
      options: { email },
    });
    return res?.data?.data;
  } catch (error) {
    throw error;
  }
};
