"use client";
import { ApiConfig } from "@/constants";
import {
  setActiveStepGlobal,
  setMaxActiveStepGlobal,
} from "@/global-states/reducers/userReducer";
import ApiService, { request } from "@/services/api.service";

export const getUserInformation = async () => {
  try {
    const res = await ApiService.get({
      url: `${ApiConfig.students}/profile`,
      tokenNeeded: true,
    });
    return res.data;
  } catch (err) {
    Promise.reject(err);
  }
};

export const setEventTriggred = async () => {
  try {
    const res = await ApiService.post({
      url: `${ApiConfig.students}/mixpanel-events`,
      tokenNeeded: true,
    });
    return res.data;
  } catch (err) {
    Promise.reject(err);
  }
};

export const postConsent = async (value: boolean) => {
  try {
    const res = await ApiService.post({
      url: `/web/consents`,
      tokenNeeded: true,
      options: { value },
    });
    return res.data;
  } catch (err) {
    Promise.reject(err);
  }
};

export const submitStudentData = async (data: any) => {
  try {
    const response = await ApiService.patch({
      url: `${ApiConfig.students}`,
      tokenNeeded: true,
      options: data,
    });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteStudentAccount = async () => {
  try {
    const { data: data } = await ApiService.delete({
      url: `${ApiConfig.students}`,
      tokenNeeded: true,
    });
    return data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const uploadStudentProfile = async (formData: FormData) => {
  try {
    return await request({
      url: `${ApiConfig.students}/profile-image`,
      method: "POST",
      data: formData,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteStudentProfile = async () => {
  try {
    const { data: data } = await ApiService.delete({
      url: `${ApiConfig.students}/profile-image`,
      tokenNeeded: true,
    });
    return data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const dashboardTabSetter = {
  tabs: {
    firsttab: {
      activeStep: 0,
      maxStep: 0,
    },
    secondtab: {
      activeStep: 1,
      maxStep: 1,
    },
    thirdtab: {
      activeStep: 2,
      maxStep: 2,
    },
    fourthtab: {
      activeStep: 3,
      maxStep: 3,
    },
  },
  submit(
    tab: "firsttab" | "secondtab" | "thirdtab" | "fourthtab",
    dispatch: any
  ) {
    dispatch(setActiveStepGlobal(this.tabs[tab].activeStep));
    dispatch(setMaxActiveStepGlobal(this.tabs[tab].maxStep));

    const response = ApiService.patch({
      url: `${ApiConfig.students}`,
      tokenNeeded: true,
      options: { additional_configuration: this.tabs[tab] },
    });

    return response;

    // return request({
    //   url: "/web/students",
    //   method: "PATCH",
    //   data: {
    //     additional_configuration: this.tabs[tab],
    //   },
    // });
  },
};

export const getAllDocuments = async () => {
  try {
    const res = await ApiService.get({
      url: `${ApiConfig.students}/documents`,
      tokenNeeded: true,
    });
    return res.data.data;
  } catch (err) {
    Promise.reject(err);
  }
};

export const uploadStudentDocument = async ({
  formData,
  coreDocumentId,
}: {
  formData: FormData;
  coreDocumentId: string | undefined;
}) => {
  try {
    const response = await request({
      url: `${ApiConfig.students}/upload-student-document/${coreDocumentId}`,
      method: "POST",
      data: formData,
    });

    return response.data;
  } catch (error) {
    console.log("Error In api call", error);
    return Promise.reject(error);
  }
};

export const removeStudentDocument = async (data: any) => {
  try {
    return await request({
      url: `${ApiConfig.students}/remove-student-document`,
      method: "DELETE",
      data: data,
    });
  } catch (error) {
    Promise.reject(error);
  }
};
