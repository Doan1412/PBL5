"use client";

import { useContext } from "react";
import http from "../utils/http";
import AuthContext from "../context/AuthProvider";

export default function useRefreshToken() {
  const { setAuth } = useContext(AuthContext);

  async function refreshToken(refresh_token: String | null) {
    const res = await http.post("auth/refresh-token", refresh_token);
    setAuth((prev: any) => {
      if (!refresh_token) return;
      const access_token = res.data.body.data.access_token;
      localStorage.setItem("access_token", access_token);
      setTimeout(function () {
        localStorage.removeItem("access_token"); // Xóa token khi hết hạn
      }, 10 * 60 * 1000);
      
      return { ...prev, token: access_token };
    });
    return res.data.body.data.access_token;
  }

  const refresh_token = localStorage.getItem("refresh_token");

  // const access_token_expires_at = localStorage.getItem(
  //   "access_token_expires_at"
  // );
  // const now = new Date();
  // const expiresAt = new Date(parseInt(access_token_expires_at as string));
  // if (differenceInMinutes(expiresAt, now) < 130) {
  refreshToken(refresh_token as string);
  // }

  return refreshToken;
}
