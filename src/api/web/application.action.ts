"use server";
import { ApiConfig } from "@/constants";
import ApiService, { request } from "@/services/api.service";

export const removeApplication = async (id: string) => {
  try {
    const response = await ApiService.delete({
      url: `${ApiConfig.applications}/${id}`,
      tokenNeeded: true,
    });
    return response?.data?.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const createApplication = async (formValues: string[]) => {
  try {
    const res = await ApiService.post({
      url: `${ApiConfig.applications}`,
      options: {
        programs: formValues,
      },
      tokenNeeded: true,
    });
    return res;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getApplicationsStudent = async () => {
  try {
    const response = await ApiService.get({
      url: `${ApiConfig.applications}/student`,
      tokenNeeded: true,
    });
    return response?.data?.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const getSingleApplication = async (id: string) => {
  try {
    const response = await ApiService.get({
      url: `${ApiConfig.applications}/${id}`,
      tokenNeeded: true,
    });
    return response?.data?.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const submitApplication = async (applicationId: string) => {
  try {
    const res = await ApiService.post({
      url: `${ApiConfig.applications}/submit/${applicationId}`,
      tokenNeeded: true,
    });
    return res.data;
  } catch (error) {
    Promise.reject(error);
  }
};

export const uploadStudentApplicationDocument = async ({
  applicationId,
  formValues,
  coreDocumentId,
}: {
  applicationId: string;
  formValues: FormData;
  coreDocumentId: string | undefined;
}) => {
  try {
    const response = await request({
      url: `${ApiConfig.students}/upload-document/${applicationId}/${coreDocumentId}`,
      method: "POST",
      data: formValues,
    });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeStudentApplicationDocument = async ({
  link,
  linkKey,
  coreDocumentId,
  applicationId,
}: {
  link: string;
  linkKey: string;
  coreDocumentId: string | undefined;
  applicationId: string | undefined;
}) => {
  try {
    const response = await request({
      url: `${ApiConfig.students}/remove-document/${applicationId}/${coreDocumentId}`,
      method: "DELETE",
      data: {
        link,
        linkKey,
      },
    });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
