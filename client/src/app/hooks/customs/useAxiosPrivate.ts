import { useContext, useEffect } from "react";

import http from "@/app/utils/http";
import useRefreshToken from "@/app/actions/refreshToken";
import AuthContext from "@/app/context/AuthProvider";

const useHttp = () => {
  const refresh = useRefreshToken();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const requestIntercept = http.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
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
          const newAccessToken = await refresh(
            localStorage.getItem("refreshToken") as string
          );
          const token = localStorage.getItem("access_token");
          const expiration = localStorage.getItem("access_token_expires_at");
          if (token && expiration) {
            const currentTime = new Date().getTime();
            const timeRemaining = parseInt(expiration) - currentTime;
            setInterval(async () => {
              if (timeRemaining < 60000) {
                await refresh(localStorage.getItem("refresh_token") as string);
              }
            }, 9 * 60 * 1000);
          } // 10 phút
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return http(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      http.interceptors.request.eject(requestIntercept);
      http.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return http;
};

export default useHttp;
