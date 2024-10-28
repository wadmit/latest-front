import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";
import type { IProgram } from "@/types/program";
import { isArray } from "lodash";

export const convertToSearchParams = (
  params: Record<string, string>
): URLSearchParams => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if(isArray(value)) {
      value.forEach((v) => {
        searchParams.append(key, v);
      });
      return;
    }
    searchParams.append(key, value);
  });
  return searchParams;
};

export const getInitialProgramsForProgramPage = async (
  query: URLSearchParams
): Promise<{
  data: IProgram[];
  paginate: { hasNext: boolean; total: number };
}> => {
  try {
    const { data: programsData } = await ApiService.get({
      url: `${ApiConfig.programs}?${query}`,
      tokenNeeded: false,
    });
    return {
      data: programsData?.data ?? [],
      paginate: {
        hasNext: programsData.paginate.hasNext || false,
        total: programsData?.paginate?.total || 0,
      },
    };
  } catch (e) {
    return {
      data: [],
      paginate: { hasNext: false, total: 0 },
    };
  }
};

export const getPrograms = async (
  query: URLSearchParams
): Promise<{
  data: IProgram[];
  paginate: { hasNext: boolean; total: number };
}> => {
  try {
    const response = await ApiService.get({
      url: `${ApiConfig.programs}?${query}`,
      tokenNeeded: false,
    });

    return {
      data: response?.data?.data,
      paginate: {
        hasNext: response?.data?.paginate?.hasNext || false,
        total: response?.data?.paginate?.total || 0,
      },
    };
  } catch (e) {
    console.error("Error fetching more programs:", e);
    return {
      data: [],
      paginate: { hasNext: false, total: 0 },
    };
  }
};

export const getSingleProgram = async (
  slug: string
): Promise<IProgram | null> => {
  try {
    const { data } = await ApiService.get({
      url: `${ApiConfig.programs}/${slug}`,
      tokenNeeded: false,
    });

    return data.data;
  } catch (e) {
    console.error("Error fetching blog");
    return null;
  }
};
