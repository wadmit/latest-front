import { auth } from "@/auth/auth";
import { AppConfig } from "@/constants";
import axios from "axios";
import type { CancelToken } from "axios";
import { getSession, signOut } from "next-auth/react";

const URL = `${process.env.NEXT_PUBLIC_BASE_URL}/${AppConfig.API_VERSION}`;

export interface ApiServiceArgs<T extends Record<string, any>> {
  url: string;
  tokenNeeded: boolean;
  options?: T & {
    cancelToken?: CancelToken;
  };
}

const instance = axios.create({
  baseURL: URL,
  withCredentials: true,
  headers: {
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL!,
    "Access-Control-Allow-Origin": "*",
  },
});

// For document upload use this service from axios
export const request = async ({ ...options }) => {
  let isLoggedIn = false;
  let session;

  if (typeof window === "undefined") {
    session = await auth();
  } else {
    session = await getSession();
  }

  if (session?.accessToken) {
    isLoggedIn = true;
  }

  options.headers = {
    ...options.headers,
    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY ?? "",
    "Access-Control-Allow-Origin": "*",
  };

  // Add Authorization header if user is logged in
  if (isLoggedIn) {
    options.headers.Authorization = `Bearer ${session!.accessToken}`;
  }

  return instance(options)
    .then((response) => response)
    .catch((error) => Promise.reject(error));
};

// For HTTP request use this service
instance.interceptors.request.use(
  async (conf) => {
    const axiosHeader = conf.headers as any;
    axiosHeader["X-API-KEY"] = process.env.NEXT_PUBLIC_API_KEY ?? "";
    if (axiosHeader?.tokenNeeded) {
      let session;
      if (typeof window === "undefined") {
        session = await auth();
      } else {
        session = await getSession();
      }

      if (session?.accessToken) {
        axiosHeader.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return conf;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response && (response.status === 401 || response.status === 403)) { 
      if (error?.config?.headers?.tokenNeeded) {
        // Logout here function please
        // await signOut();
      }
    }
    return Promise.reject(error);
  }
);

const ApiService = {
  async get<T = any, R extends Record<string, any> = Record<string, any>>({
    url,
    tokenNeeded,
    options,
  }: ApiServiceArgs<R>) {
    const { ...rest } = options || {};
    return instance.get<T>(url, {
      ...rest,
      headers: {
        tokenNeeded,
      },
    });
  },
  
  async post<T = any, R extends Record<string, any> = Record<string, any>>({
    url,
    tokenNeeded,
    options,
  }: ApiServiceArgs<R>) {
    const { cancelToken, ...rest } = options || {};
    return instance.post<T>(
      url,
      {
        cancelToken,
        ...rest,
      },
      {
        headers: {
          tokenNeeded,
        },
      }
    );
  },
  async put<T = any, R extends Record<string, any> = Record<string, any>>({
    url,
    tokenNeeded,
    options,
  }: ApiServiceArgs<R>) {
    const { ...rest } = options || {};
    return instance.put<T>(
      url,
      {
        ...rest,
      },
      {
        headers: {
          ["tokenNeeded"]: tokenNeeded,
        },
      }
    );
  },
  async delete<T = any, R extends Record<string, any> = Record<string, any>>({
    url,
    tokenNeeded,
    options,
  }: ApiServiceArgs<R>) {
    const { ...rest } = options || {};
    return instance.delete<T>(url, {
      ...rest,
      headers: {
        tokenNeeded,
      },
    });
  },
  async patch<T = any, R extends Record<string, any> = any>({
    url,
    tokenNeeded,
    options,
  }: ApiServiceArgs<R>) {
    const { ...rest } = options || {};
    return instance.patch<T>(
      url,
      { ...rest },
      {
        headers: {
          tokenNeeded,
        },
      }
    );
  },
};

export default ApiService;
