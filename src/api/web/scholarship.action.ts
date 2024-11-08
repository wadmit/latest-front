import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";
import { IScholarshipResponse } from "@/types/utils";

export const getScholarships = async ({
  searchTerm = "",
}: {
  searchTerm?: string;
}) => {
  try {
    const scholarships = await ApiService.get({
      url: `${ApiConfig.scholarships}?page=1&limit=6&searchTerm=${searchTerm}`,
      tokenNeeded: false,
    });
    return scholarships;
  } catch (e) {
    Promise.reject(e);
  }
};

export const getSingleScholarship = async (
  slug: string
): Promise<{
  scholarship: IScholarshipResponse;
}> => {
  try {
    const { data: scholarship } = await ApiService.get({
      url: `${ApiConfig.scholarships}/${slug}`,
      tokenNeeded: false,
    });
    return scholarship?.data;
  } catch (e) {
    throw e;
  }
};
