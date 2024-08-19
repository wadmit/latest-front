import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";
import { AxiosError, AxiosResponse } from "axios";

export const contactUs = async (
  data: any
): Promise<AxiosResponse | AxiosError> => {
  try {
    ("use server");
    const response = await ApiService.post({
      url: `${ApiConfig.contactUs}`,
      options: data,
      tokenNeeded: false,
    });
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};
