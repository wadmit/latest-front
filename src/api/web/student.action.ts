import { ApiConfig } from "@/constants";
import ApiService, { request } from "@/services/api.service";

export const getProgramsForStudentPage = async () => {
  try {

    const { data: programs } = await ApiService.get({
      url: `${ApiConfig.programs}?page=1&limit=6`,
      tokenNeeded: false,
    });

    return programs?.data ?? [];
  } catch (e) {
    Promise.reject(e);
  }
};

export const getStudentUniversities = async () => {
  try {
    const { data: universities } = await ApiService.get({
      url: `${ApiConfig.students}/universities`,
      tokenNeeded: true,
    });
    return universities?.data?.universities;
  } catch (e) {
    return [];
  }
};
