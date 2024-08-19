import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";

export const submitPartner = async (data: any) => {
  try {
    ("use server");
    const response = await ApiService.post({
      url: `${ApiConfig.partner}`,
      options: data,
      tokenNeeded: false,
    });
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};
