"use client";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarGroup, Image } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import Poster from "@/static/images/Poster.jpg";
import UploadButton from "../../components/UploadButton";
import UploadAvatar from "../../components/UploadAvatar";
import AddFriendButton from "@/components/AddFriendButton";
import SidebarProfile from "@/components/SidebarProfile/SidebarProfile";
import ListPost from "@/components/SatatusPost";
import userData from "../data/UserData";
import Post from "@/components/Post/Post";
import { User } from "../types";
import SidebarImage from "@/components/SidebarProfile/SidebarImage";
import { useAppDispatch } from "../hooks/store";
import { resetLoading } from "../hooks/features/loading.slice";
import Widget from "../widget";
import SatatusPost from "@/components/SatatusPost";

interface LinkProfile {
  name: string;
}

const links: LinkProfile[] = [
  {
    name: "Timeline",
  },
  {
    name: "About",
  },
  {
    name: "Friends",
  },
  {
    name: "Photos",
  },
  {
    name: "Archive",
  },
  {
    name: "More",
  },
  {
    name: "Edit Profile",
  },
];

export default function Profile() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  dispatch(resetLoading());

  return (
    <Widget>
      <nav className="fixed z-40 w-full">
        <Navigation />
      </nav>
      <div className=" h-full dark:bg-[#18191a]">
        <div className="dark:bg-[#242526] bg-[#f0f2f5] ml-15 mr-15 rounded-bl-lg pt-18 rounded-br-lg z-0">
          <div className="flex justify-center">
            <div className="flex items-center relative">
              <Image
                isBlurred
                width={900}
                height={300}
                alt="NextUI hero Image with delay"
                src={Poster.src}
                className="z-0"
              />
              <div className=" absolute bottom-2 right-2 z-10">
                <UploadButton />
              </div>
            </div>
          </div>
          <div className="flex justify-center -mt-14 relative shrink">
            <Avatar
              isBordered
              src="https://i.pravatar.cc/150?u=a04258114e29026708c"
              className="w-30 h-30 text-large"
            />
            <div className="flex justify-center absolute -bottom-5 z-10">
              <UploadAvatar />
            </div>
          </div>
          <h1 className="flex justify-center mt-7 font-bold text-3xl dark:text-white">
            Thái Khắc Dược
          </h1>
          <h2 className="flex justify-center mt-1 text-[#65676b] text-base dark:text-gray-600">
            @thaikhacduoc
          </h2>
          {/* <div className="flex justify-center mt-2 gap-4 pb-2"> */}
          <h2 className="flex justify-center mt-1 text-[#65676b] text-base dark:text-white">
            Bạn bè 1K • Đang theo dõi 0
          </h2>
          <div className="mt-2 pb-5">
            <AvatarGroup isBordered max={6} total={10}>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
            </AvatarGroup>
            {/* </div> */}
          </div>
          <div className="flex justify-center">
            <div className="h-px w-8/12 dark:bg-[#3d3f41] bg-[#ccced2] mx-15" />
          </div>
          <div className="hidden lg:flex justify-center gap-56 shrink mt-2 sticky top-0">
            <div className="flex gap-4">
              {links.map((link, index) => (
                <div
                  className="flex shrink rounded-lg p-3 font-medium dark:text-[#b0b3b8] text-[#606266] hover:bg-gray-50 cursor-pointer dark:hover:bg-slate-700 dark:hover:text-white dark:hover:rounded-lg"
                  key={index}
                >
                  <h3>{link.name}</h3>
                </div>
              ))}
            </div>
            <div>
              <ul className="gap-4">
                <li className="p-1 cursor-pointer">
                  <AddFriendButton />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col mt-5">
            <SidebarProfile />
            <SidebarImage />
          </div>
          <div className="mt-2 h-full">
            <div className="flex flex-col">
              <SatatusPost
                reff={ref}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
              />
              {userData.map((user: User, index: number) => {
                return <Post key={index} userData={user} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </Widget>
  );
}
