import { useContext, useEffect, useState } from "react";

import http from "@/app/utils/http";
import useRefreshToken from "@/app/actions/refreshToken";
import AuthContext from "@/app/context/AuthProvider";
import { getLocalStorage } from "@/app/actions/localStorage_State";

const useHttp = () => {
  const refresh = useRefreshToken();
  // const { auth } = useContext(AuthContext);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const requestIntercept = http.interceptors.request.use(
      (config) => {
        // const token = localStorage.getItem("access_token");
        // const expiration = localStorage.getItem("access_token_expires_at");
        // if (token == null && expiration) {
        //   async () => {
        //     await refresh(getLocalStorage()?.refresh_token as string);
        //   };
        //   const currentTime = new Date().getTime();
        //   const timeRemaining = parseInt(expiration) - currentTime;
        //   setInterval(async () => {
        //     if (timeRemaining < 60000) {
        //       await refresh(getLocalStorage()?.refresh_token as string);
        //     }
        //   }, 9 * 60 * 1000);
        // } // 10 phút
        console.log(config.headers);
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${
            getLocalStorage()?.token as string
          }`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = http.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          if (isRefreshing == false) {
            // Kiểm tra xem refreshToken có đang được gọi lại không
            setIsRefreshing(true); // Bắt đầu quá trình refresh
            console.log(getLocalStorage()?.refresh_token as string);
            await refresh(getLocalStorage()?.refresh_token as string);
            console.log("1");
            // const token = localStorage.getItem("access_token");
            // const expiration = localStorage.getItem("access_token_expires_at");
            // if (token && expiration) {
            //   const currentTime = new Date().getTime();
            //   const timeRemaining = parseInt(expiration) - currentTime;
            //   setInterval(async () => {
            //     if (timeRemaining < 60000) {
            //       await refresh(getLocalStorage()?.refresh_token as string);
            //     }
            //   }, 9 * 60 * 1000);
            // } // 10 phút
            console.log(getLocalStorage()?.token as string);
            prevRequest.headers["Authorization"] = `Bearer ${
              getLocalStorage()?.token as string
            }`;
            console.log(getLocalStorage()?.token as string);
            setIsRefreshing(false);
            return http(prevRequest);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      http.interceptors.request.eject(requestIntercept);
      http.interceptors.response.eject(responseIntercept);
    };
  }, [isRefreshing, refresh]);

  return http;
};

export default useHttp;
