import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";

export const getCountries = async () => {
  try {
    const response = await ApiService.get({
      url: `${ApiConfig.country}`,
      tokenNeeded: false,
    });
    return response;
  } catch (error) {
    Promise.reject(error);
  }
};
