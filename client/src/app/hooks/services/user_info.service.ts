import http from "@/app/utils/http";
import { createApi } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { UserType } from "@/app/types";
import axios from "axios";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import useRefreshToken from "@/app/actions/refreshToken";

const axiosInstance = axios.create({
  baseURL: http.defaults.baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${
        getLocalStorage()?.token as string
      }`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const refresh = useRefreshToken();
    const prevRequest = error?.config;
    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;
      // if (!isRefreshing) {
      //   setIsRefreshing(true); // Bắt đầu quá trình refresh
      try {
        // console.log(getLocalStorage()?.refresh_token as string);
        const newToken = await refresh(
          getLocalStorage()?.refresh_token as string
        );
        // console.log(getLocalStorage()?.token as string);
        prevRequest.headers["Authorization"] = `Bearer ${newToken}`;
        // setIsRefreshing(false);
        return http(prevRequest);
      } catch (refreshError) {
        // Xử lý lỗi khi refresh token
        // console.error("Lỗi khi refresh token:", refreshError);
        // setIsRefreshing(false);
        return Promise.reject(refreshError); // Ném lỗi để interceptor response có thể xử lý tiếp
      }
    }
    // }
    return Promise.reject(error);
  }
);

const axiosBaseQuery = (
  { baseUrl }: { baseUrl: string } = {
    baseUrl: http.defaults.baseURL as string,
  }
): BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig["method"];
    data?: AxiosRequestConfig["data"];
    params?: AxiosRequestConfig["params"];
    headers?: AxiosRequestConfig["headers"];
  },
  unknown,
  unknown
> => {
  return async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};

export const userInfoApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: http.defaults.baseURL as string,
  }),
  endpoints(build) {
    return {
      getUserInfo: build.query<UserType, string>({
        query: (id_user) => ({ url: `/user/${id_user}`, method: "get" }),
      }),
      // mutation: build.mutation({
      //   query: () => ({ url: "/mutation", method: "post" }),
      // }),
    };
  },
});

export const { useGetUserInfoQuery } = userInfoApi;

// import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
// import { getLocalStorage } from "@/app/actions/localStorage_State";
// import { User, UserType } from "@/app/types";
// import http from "@/app/utils/http";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const userInfoApi = createApi({
//   reducerPath: "useInfoApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: http.defaults.baseURL,
//     prepareHeaders: async (headers) => {
//       const authResult = await getLocalStorage();
//       if (authResult) {
//         headers.set(
//           "Authorization",
//           `Bearer ${getLocalStorage()?.token as string}`
//         );
//       }
//       // console.log(headers);
//       // console.log(getLocalStorage()?.token as string);
//       return headers;
//     },
//   }),
//   endpoints: (build) => ({
//     getUserInfo: build.query<UserType, string>({
//       query: (id_user) => `/user/${id_user}`,
//     }),
//   }),
// });

// export const { useGetUserInfoQuery } = userInfoApi;
