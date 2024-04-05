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
} from "@nextui-org/react";

export default function DesktopSidebar() {
  const routers = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

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
              onClick={item.onClick}
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
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
              <span className=" absolute flex h-3 w-3 top-0 right-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="team_settings">Team Settings</DropdownItem>
            <DropdownItem key="analytics">Analytics</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem key="configurations">Configurations</DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </nav>
    </div>
  );
}
