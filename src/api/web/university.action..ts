import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";
import type { IUniversity } from "@/types/university";
import { cache } from "react";

export const convertToSearchParams = (
  params: Record<string, string>
): URLSearchParams => {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      searchParams.append(key, params[key]);
    }
  }
  return searchParams;
};

export const getInitialUniversitiesForUniversityPage = cache(
  async (
    query: URLSearchParams
  ): Promise<{
    data: IUniversity[];
    paginate: { hasNext: boolean; total: number };
  }> => {
    try {
      const { data: universitiesData } = await ApiService.get({
        url: `${ApiConfig.universities}/api/updated?page=1&limit=12&${query}`,
        tokenNeeded: false,
      });

      return {
        data: universitiesData?.data ?? [],
        paginate: {
          hasNext: universitiesData?.results < universitiesData?.total || false,
          total: universitiesData?.total || 0,
        },
      };
    } catch (e) {
      console.error(
        "Error fetching initial universities for university page:",
        e
      );
      return {
        data: [],
        paginate: { hasNext: false, total: 0 },
      };
    }
  }
);

export const getUniversities = async (
  query: URLSearchParams
): Promise<{
  data: IUniversity[];
  paginate: { hasNext: boolean; total: number };
}> => {
  try {
    const response = await ApiService.get({
      url: `${ApiConfig.universities}/api/updated?${query}`,
      tokenNeeded: false,
    });
    return {
      data: response?.data?.data,
      paginate: {
        hasNext: response?.data?.results < response?.data?.total || false,
        total: response?.data?.total || 0,
      },
    };
  } catch (e) {
    return {
      data: [],
      paginate: { hasNext: false, total: 0 },
    };
  }
};

export const getSingleUniversity = async (
  slug: string
): Promise<IUniversity | null> => {
  try {
    const { data } = await ApiService.get({
      url: `${ApiConfig.universities}/${slug}`,
      tokenNeeded: false,
    });

    return data.data;
  } catch (e) {
    return null;
  }
};
