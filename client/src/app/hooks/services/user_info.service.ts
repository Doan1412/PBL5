import { getLocalStorage } from "@/app/actions/localStorage_State";
import { User, UserType } from "@/app/types";
import http from "@/app/utils/http";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userInfoApi = createApi({
  reducerPath: "useInfoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: http.defaults.baseURL,
    prepareHeaders: async (headers) => {
      const authResult = await getLocalStorage();
      if (authResult) {
        headers.set(
          "Authorization",
          `Bearer ${getLocalStorage()?.token as string}`
        );
      }
      console.log(headers);
      console.log(getLocalStorage()?.token as string);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUserInfo: build.query<UserType, string>({
      query: (id_user) => `/user/${id_user}`,
    }),
  }),
});

export const { useGetUserInfoQuery } = userInfoApi;
