import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";

export const getCostScale = async () => {
  try {
    const { data: costScale } = await ApiService.get({
      url: `${ApiConfig.costScale}`,
      tokenNeeded: false,
    });
    return costScale?.data ?? [];
  } catch (e) {
    Promise.reject(e);
  }
};

export const postCostSubmission = async (data: any) => {
  try {
    ("use server");
    const response = await ApiService.post({
      url: `${ApiConfig.costScale}/sendmail`,
      options: data,
      tokenNeeded: false,
    });
    return response;
  } catch (e) {
    Promise.reject(e);
  }
};
