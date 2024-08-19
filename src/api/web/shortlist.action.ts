"use client";
import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";

export const addShortList = async (program: string, foundationId: string) => {
  try {
    const shortlist = await ApiService.post({
      url: `${ApiConfig.students}/add-shortlist/${program}`,
      tokenNeeded: true,
      options: {
        programId: program,
        foundationId,
      },
    });
    return shortlist;
  } catch (e) {
    throw e;
  }
};

export const patchSortList = async (data: any) => {
  try {
    const shortlist = await ApiService.patch({
      url: `${ApiConfig.students}/config`,
      options: data,
      tokenNeeded: true,
    });
    return shortlist;
  } catch (e) {
    Promise.reject(e);
  }
};

export const deleteSortlist = async (program: string) => {
  try {
    ("use server");
    const res = await ApiService.post({
      url: `/web/students/remove-shortlist/${program}`,
      tokenNeeded: true,
    });
    return res?.data?.data;
  } catch (error) {
    Promise.reject(error);
  }
};
