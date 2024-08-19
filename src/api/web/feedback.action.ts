import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";

export const feedBack = async (submitValues: any, photoData: any) => {
  try {
    const response = await ApiService.post({
      url: `${ApiConfig.feedbacks}`,
      tokenNeeded: false,
      options: {
        ...submitValues,
        image_key: photoData.key,
        image: photoData.url,
      },
    });

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
