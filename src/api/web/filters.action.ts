import { ApiConfig } from "@/constants";
import ApiService from "@/services/api.service";
import type { IFilterData } from "@/types/response";
import axios from "axios";
import { cache } from "react";

export const getFilters = cache(
  async ({ signal }: { signal: AbortSignal }): Promise<IFilterData[]> => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    // Set up cancellation
    signal.addEventListener("abort", () => {
      source.cancel("Request was cancelled");
    });

    try {
      const response: { data: { data: IFilterData[] } } = await ApiService.get({
        url: `${ApiConfig.filters}/uni-programs-filters`,
        tokenNeeded: false,
        options: {
          cancelToken: source.token,
        },
      });

      return response.data.data ?? [];
    } catch (e) {
      throw e;
    }
  }
);
