"use client";
import useRoutes from "@/app/hooks/customs/useRoutes";
import React, { useState } from "react";
import DesktopItem from "./DesktopItem";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import { UserType } from "@/app/types";
import { useRouter } from "next/navigation";
import { successPopUp } from "@/app/hooks/features/popup.slice";
import { useAppDispatch } from "@/app/hooks/store";

export default function DesktopSidebar() {
  const routers = useRoutes();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );
  const router = useRouter();
  const dispatch = useAppDispatch();


  return (
    <div
      className="
    hidden 
    lg:fixed 
    lg:inset-y-0 
    lg:left-0 
    lg:z-40 
    lg:w-20 
    xl:px-6
    lg:overflow-y-auto 
    lg:bg-white 
    lg:border-r-[1px]
    lg:pb-4
    lg:flex
    lg:flex-col
    justify-between"
    >
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routers.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              // onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center">
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
      </nav>
    </div>
  );
}
