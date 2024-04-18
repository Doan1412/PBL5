"use client";
import React, { FormEvent, useEffect, useState } from "react";
import loginImage from "@/static/images/loginImage.jpg";
import RImage from "@/static/images/RImage.png";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import http from "../utils/http";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button, Image, Input } from "@nextui-org/react";
import Widget from "../widget";
import { useAppDispatch, useAppSelector } from "../hooks/store";
import {
  failPopUp,
  resetPopUp,
  successPopUp,
} from "../hooks/features/popup.slice";
import { resetLoading, setLoading } from "../hooks/features/loading.slice";
import LandingPage from "../landing";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsLoggedIn(true);
      return;
    }
  }, [router]);

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("hello");
    e.preventDefault();
    // dispatch(setLoading());

    try {
      const response = await http.post(
        "/auth/authenticate",
        {
          email,
          password,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 200) {
        // dispatch(resetLoading());
        // dispatch(successPopUp(response.data.message));
        const now = new Date();
        // const expirationTime = now.getTime() + 144 * 60 * 1000;
        const expirationTime = now.getTime() + 20 * 1000;
        localStorage.setItem(
          "access_token_expires_at",
          expirationTime.toString()
        );
        localStorage.setItem("access_token", response.data.data.access_token);
        setTimeout(function () {
          localStorage.removeItem("access_token"); // Xóa token khi hết hạn
        }, 10 * 60 * 1000);
        localStorage.setItem("refresh_token", response.data.data.refresh_token);
        localStorage.setItem("user_id", response.data.data.user_id);
        if (response.data.user_id === "") router.push("/admin");
        else {
          setTimeout(() => {
            dispatch(resetPopUp());
            setIsLoggedIn(true);
          }, 2000);
        }
      } else {
        dispatch(failPopUp(response.data.message));
        dispatch(resetLoading());
      }
    } catch (error) {
      console.error("Error during login:", error);
      dispatch(failPopUp("An error occurred during login."));
      dispatch(resetLoading());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

  const responseGoogle = async (response: any) => {
    dispatch(setLoading());
    try {
      const res = await http.post(
        `${process.env.BACKEND_URL}/auth/google?google_token=${response.credential}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      if (res.data.status === 200) {
        dispatch(resetLoading());
        dispatch(successPopUp(res.data.message));
        localStorage.setItem("access_token", res.data.data.access_token);
        localStorage.setItem("refresh_token", res.data.data.refresh_token);
        localStorage.setItem("user_id", res.data.data.user_id);
        // if (d.data.role == 2) router.push("/admin");
        setTimeout(() => {
          dispatch(resetPopUp());
          setIsLoggedIn(true);
        }, 2000);
      } else {
        dispatch(failPopUp(res.data.message));
        dispatch(resetLoading());
      }
      console.log(res);
    } catch (error) {
      console.error("Error during Google login:", error);
      dispatch(failPopUp("An error occurred during Google login."));
      dispatch(resetLoading());
    }
  };

  return (
    <Widget>
      {!isLoggedIn ? (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center">
          <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
            <div className="md:w-1/2 px-8 md:px-16">
              <Image
                className="flex mx-auto ml-3 rounded-2xl"
                src={RImage.src}
                alt="Login"
                width={200}
                height={200}
              />
              <p className="text-xs mt-4 text-[#002D74]">
                If you are already a member, easily log in
              </p>
              <div className="flex flex-col gap-4 mt-4">
                <Input
                  isRequired
                  size="sm"
                  type="email"
                  label="Email"
                  onChange={(e) => {
                    setEmail(handleInputChange(e));
                  }}
                />
                <Input
                  isRequired
                  size="sm"
                  type="password"
                  label="Password"
                  onChange={(e) => {
                    setPassword(handleInputChange(e));
                  }}
                />
              </div>
              <Button
                className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 flex flex-col gap-4 mt-4 mx-auto"
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleLogin(e)
                }
              >
                Login
              </Button>
              <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                <hr className="border-gray-400" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-400" />
              </div>
              <div className="flex justify-center items-center mt-3">
                <GoogleOAuthProvider clientId={process.env.clientId as string}>
                  <GoogleLogin
                    onSuccess={responseGoogle}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </GoogleOAuthProvider>
              </div>

              <div className=" text-xs border-b border-[#002D74] py-4 text-[#002D74]">
                <a href="#">Forgot your password?</a>
              </div>
              <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                {/* eslint-disable-next-line */}
                <p>Don't have an account?</p>
                <button
                  className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                  onClick={() => {
                    router.push("/register");
                  }}
                >
                  Register
                </button>
              </div>
            </div>
            <div className="md:block hidden w-1/2">
              <Image
                className="rounded-2xl"
                src={loginImage.src}
                alt="Login"
                width={1887}
                height={1200}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <LandingPage />
        </>
      )}
    </Widget>
  );
}
