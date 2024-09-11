import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";
import type { IBlog } from "@/types/blog";
import type { IBlogResponse } from "@/types/utils";

export const getBlogs = async ({
  page,
  limit = 10,
  searchTerm = "",
}: {
  page: number;
  limit?: number;
  searchTerm?: string;
}): Promise<{
  data: {
    data: IBlogResponse;
  };
}> => {
  try {
    const blogs = await ApiService.get({
      url: `${ApiConfig.blog}?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
      tokenNeeded: false,
    });
    return blogs;
  } catch (e) {
    throw e;
  }
};

export const getSingleBlog = async ({
  slug,
}: {
  slug: string;
}): Promise<{
  blog: IBlog;
  suggestedBlog: IBlog[];
}> => {
  try {
    const { data: blog } = await ApiService.get({
      url: `${ApiConfig.blog}/${slug}`,
      tokenNeeded: false,
    });
    return { blog: blog.data, suggestedBlog: blog.suggestedBlog };
  } catch (e) {
    throw e;
  }
};
