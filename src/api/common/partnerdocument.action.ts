import { ApiConfig } from "@/constants";
import { request } from "@/services/api.service";

export const uploadPartnerDocument = async (data: any) => {
  try {
    return await request({
      url: `${ApiConfig.partnerdocument}`,
      method: "POST",
      data: data,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};
