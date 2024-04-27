"use client";
import React, { useState } from "react";
import loginImage from "@/static/images/loginImage.jpg";
import RImage from "@/static/images/RImage.png";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import http from "../utils/http";
import { hasCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Button, Image, Input } from "@nextui-org/react";
import { resetLoading } from "../hooks/features/loading.slice";
import { useAppDispatch } from "../hooks/store";
import { failPopUp, successPopUp } from "../hooks/features/popup.slice";
import Widget from "../widget";

export default function RegisterPage() {
  const router = useRouter();
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isLoading, setLoading_register] = useState(false);

  const dispatch = useAppDispatch();

  const handleRegister = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("Register Oke");
    e.preventDefault();
    // dispatch(setLoading());

    try {
      const response = await http.post(
        "/auth/register",
        {
          email,
          password,
          firstname,
          lastname,
          username,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 200) {
        dispatch(resetLoading());
        dispatch(successPopUp("Đăng ký thành công! 😘"));
        router.push("/login");
      } else {
        dispatch(failPopUp("Lỗi:" + response.data.message));
        dispatch(resetLoading());
      }
    } catch (error) {
      console.error("Error during login:", error);
      dispatch(failPopUp("An error occurred during register."));
      dispatch(resetLoading());
    }
  };

  const responseGoogle = async (response: any) => {
    const res = await http.post(
      `${process.env.BACKEND_URL}/auth/google?google_token=${response.credential}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
    console.log(res);
    if (res.data.status === 200) {
      // dispatch(successPopUp(d.message));
      setCookie("access_token", res.data.data.access_token, {
        maxAge: 60 * 60 * 24 * 7,
      });
      setCookie("refresh_token", res.data.data.refresh_token, {
        maxAge: 60 * 60 * 24 * 7,
      });
      setCookie("user_id", res.data.data.user_id, { maxAge: 60 * 60 * 24 * 7 });
      // if (d.data.role == 2) router.push("/admin");
      router.push("/home");
    } else {
      // dispatch(failPopUp(d.message));
      // dispatch(resetLoading());
    }
    console.log(res);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

  return (
    <Widget>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          <div className="md:w-1/2 px-8 md:px-16">
            <Image
              className="flex mx-auto ml-3 rounded-2xl"
              src={RImage.src}
              alt="Login"
              width={180}
              height={180}
            />
            <p className="text-xs mt-4 text-[#002D74]">
              Sign up to see photos and videos from your friends.
            </p>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  isRequired
                  size="sm"
                  type="text"
                  label="Fistname"
                  onChange={(e) => {
                    setFirstname(handleInputChange(e));
                  }}
                />
                <Input
                  isRequired
                  size="sm"
                  type="text"
                  label="Lastname"
                  onChange={(e) => {
                    setLastname(handleInputChange(e));
                  }}
                />
              </div>
              <Input
                isRequired
                size="sm"
                type="text"
                label="Username"
                onChange={(e) => {
                  setUsername(handleInputChange(e));
                }}
              />
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
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 flex gap-4 mt-4 mx-auto"
              isLoading={isLoading}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                setLoading_register(true);
                if (password.length < 5) {
                  dispatch(
                    failPopUp(
                      "Mật khẩu quá ngắn! 🙈. Mật khẩu phải trên 5 kí tự!"
                    )
                  );
                  setLoading_register(false);
                  console.log(isLoading);
                  return;
                }
                handleRegister(e);
              }}
            >
              Register
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
              <p>Have an account?</p>
              <button
                className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login
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
    </Widget>
  );
}
