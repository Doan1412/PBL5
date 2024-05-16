"use client";

import { useContext, useMemo } from "react";
import http from "../utils/http";
// import AuthContext from "../context/AuthProvider";

export default function useRefreshToken() {
  // const { setAuth } = useContext(AuthContext);
  // const controller = useMemo(() => new AbortController(), []);
  const controller = new AbortController();

  async function refreshToken(refresh_token: String) {
    // const res = fetch(`{process.env.BACKEND_URL}auth/refresh-token`)
    const res = await http.post("auth/refresh-token", null, {
      headers: {
        Authorization: `Bearer ` + refresh_token,
      },
      // signal: controller.signal,
    });
    // // controller.abort();
    // // console.log(res.data);
    // setAuth((prev: any) => {
    if (!refresh_token) return;
    const access_token = res.data.body.data.access_token;
    localStorage.setItem("access_token", access_token);
    setTimeout(function () {
      localStorage.removeItem("access_token"); // Xóa token khi hết hạn
    }, 10 * 60 * 1000);

    //   return { ...prev};
    // });
    // // console.log(res.data.body.data.access_token);
    return res.data.body.data.access_token;
  }

  // const refresh_token = localStorage.getItem("refresh_token");

  // const access_token_expires_at = localStorage.getItem(
  //   "access_token_expires_at"
  // );
  // const now = new Date();
  // const expiresAt = new Date(parseInt(access_token_expires_at as string));
  // if (differenceInMinutes(expiresAt, now) < 130) {
  // refreshToken(refresh_token as string);
  // }

  return refreshToken;
}
