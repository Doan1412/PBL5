"use client";
import React, { useState } from "react";
import {
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
  Skeleton,
} from "@nextui-org/react";
import logoImage from "@/static/images/logoImage.png";
import SearchIcon from "./SearchIcon";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
// import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import { useAppDispatch } from "@/app/hooks/store";
import { resetLoading, setLoading } from "@/app/hooks/features/loading.slice";
import { successPopUp } from "@/app/hooks/features/popup.slice";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import { UserType } from "@/app/types";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";

export default function Navigation() {
  const router = useRouter();
  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );

  const dispatch = useAppDispatch();
  return (
    <div>
      <nav className="hidden lg:flex bg-white p-0 dark:bg-[#242526] justify-between">
        <div className="flex">
          <div>
            <Image
              className="mx-auto mr-3 ml-3 dark:filter dark:invert hover:cursor-pointer"
              src={logoImage.src}
              alt="Login"
              width={50}
              height={50}
              onClick={() => {
                router.push("/home");
              }}
            />
          </div>
          <div className="flex items-center">
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[18rem] h-10 ml-4",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
            />
          </div>
        </div>
        <ul className="hidden lg:flex items-center px-2 justify-evenly">
          <li>
            <div
              id="home"
              className="tooltip active w-24 h-12 flex justify-center items-center hover:bg-gray-300 hover:border rounded-lg dark:hover:bg-medium dark:hover:border-none"
              data-tooltip="Home"
            >
              <button
                className="button dark:text-white hover:translate-y-[-3px]"
                onClick={() => {
                  router.push("/home");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6em"
                  height="1.6em"
                  viewBox="0 0 1024 1024"
                  strokeWidth="0"
                  fill="currentColor"
                  stroke="currentColor"
                  className="icon"
                >
                  <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
                </svg>
              </button>
            </div>
          </li>
          <li>
            <div className="w-24 h-12 flex justify-center items-center hover:bg-gray-300 hover:border rounded-lg shrink dark:hover:bg-medium dark:hover:border-none">
              <button className="button dark:text-white hover:translate-y-[-3px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6em"
                  height="1.6em"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="icon"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>
            </div>
          </li>
          <li>
            <div className="w-24 h-12 flex justify-center items-center hover:bg-gray-300 hover:border rounded-lg dark:hover:bg-medium dark:hover:border-none">
              <button
                className="hover:translate-y-[-3px] dark:text-white"
                onClick={() => {
                  router.push("/share");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6em"
                  height="1.6em"
                  viewBox="0 0 24 24"
                  strokeWidth="0"
                  fill="currentColor"
                  stroke="currentColor"
                  className="icon"
                >
                  <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
                </svg>
              </button>
            </div>
          </li>
        </ul>
        <div className="flex items-center">
          <ul className="flex">
            <li>
              <div className="mr-2 mt-2">
                <ThemeToggle />
              </div>
            </li>
            <li>
              <button className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-200 mr-1 dark:bg-medium">
                <FaUserGroup size={23} className="dark:text-white" />
              </button>
            </li>
            <li>
              <button className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-200 mr-1 dark:bg-medium">
                <FaFacebookMessenger size={23} className="dark:text-white" />
              </button>
            </li>
            <li>
              <button className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-200 dark:bg-medium">
                <FaBell size={23} className="dark:text-white" />
              </button>
            </li>
            <li className="mt-1">
              <Dropdown placement="bottom-end" className="">
                <DropdownTrigger>
                  <div className="flex items-center relative">
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform w-10 h-10 flex justify-center items-center rounded-full mx-2"
                      color="secondary"
                      name="Jason Hughes"
                      size="sm"
                      src={
                        data?.data?.profile?.avatar_url != ""
                          ? `${data?.data?.profile?.avatar_url}`
                          : avatarDefault.src
                      }
                    />
                    <span className=" absolute flex h-3 w-3 top-0 right-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    {isFetching ? (
                      <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          const currentUrl = `/profile/photo?id_user=${
                            data?.data?.id as string
                          }`;
                          router.push(currentUrl);
                        }}
                      >
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">
                          {data?.data?.firstname} {data?.data?.lastname}
                        </p>
                      </div>
                    )}
                  </DropdownItem>
                  <DropdownItem
                    key="help_and_feedback"
                    onClick={() => {
                      dispatch(successPopUp("Tính năng đang phát triển!"));
                    }}
                  >
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={() => {
                      localStorage.clear();
                      router.push("/");
                    }}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
