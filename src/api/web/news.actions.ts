import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";
import type { INews } from "@/types/news";
import type { INewsResponse } from "@/types/utils";

export const getNews = async ({
  page,
  limit = 10,
  searchTerm = "",
}: {
  page: number;
  limit?: number;
  searchTerm?: string;
}): Promise<{
  data: {
    data: INewsResponse;
  };
}> => {
  try {
    const blogs = await ApiService.get({
      url: `${ApiConfig.news}?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
      tokenNeeded: false,
    });
    return blogs;
  } catch (e) {
    throw e;
  }
};

export const getSingleNews = async ({
  slug,
}: {
  slug: string;
}): Promise<{
  news: INews;
  suggestedNews: INews[];
}> => {
  try {
    const { data: news } = await ApiService.get({
      url: `${ApiConfig.news}/${slug}`,
      tokenNeeded: false,
    });
    return { news: news.data, suggestedNews: news.suggestedBlog };
  } catch (e) {
    throw e;
  }
};
