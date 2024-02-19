'use client'
import React from "react";
import loginImage from "@/static/images";
import Image from "next/image";
import { GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import http from "../utils/http";

export default function LoginPage() {
  // const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const payload = await AuthService.login(email, password);
  //   if (payload) {
  //     const { access_token, refresh_token, auth_user } = payload;
  //     setCookie("access_token", access_token, {
  //       maxAge: ACCESS_TOKEN_EXPIRE,
  //     });
  //     setCookie("refresh_token", refresh_token, {
  //       maxAge: REFRESH_TOKEN_EXPIRE,
  //     });
  //     setUser(auth_user);
  //     navigate("/courses");
  //   } else {
  //     setLoginFail(true);
  //     return;
  //   }
  // };

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setLoginFail(false);
  //   const value = e.target.value;
  //   return value;
  // };

  const responseGoogle = async (response: any) => {
    const res = await http.post(`${process.env.BACKEND_URL}/api/v1/auth/google?google_token=${response.credential}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
    //Xu ly luu accesstoken, refreshtoken nhu bth
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Login</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            If you are already a member, easily log in
          </p>
          <form action="" className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="p-2 rounded-xl border w-full"
              type="password"
              name="password"
              placeholder="Password"
            />

            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>
          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> {/* chỉnh lại giúp chỗ ni zới éc o éc hong bíc chỉnh className */}
            <GoogleOAuthProvider clientId={process.env.clientId}>
            <GoogleLogin
                onSuccess={responseGoogle}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          </div>
          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
            <a href="#">Forgot your password?</a>
          </div>
          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            {/* eslint-disable-next-line */}
            <p>Don't have an account?</p>
            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
              Register
            </button>
          </div>
        </div>
        <div className="md:block hidden w-1/2">
          <Image
            className="rounded-2xl"
            src={loginImage}
            alt="Login"
            width={1887}
            height={1200}
          />
        </div>
      </div>
    </div>
  );
}
