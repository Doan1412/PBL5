"use client";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarGroup, Image, Skeleton } from "@nextui-org/react";
import React, { useRef, useState } from "react";
import Poster from "@/static/images/Poster.jpg";
import AddFriendButton from "@/components/AddFriendButton";
import SidebarProfile from "@/components/SidebarProfile/SidebarProfile";
import Post from "@/components/Post/Post";
import SidebarImage from "@/components/SidebarProfile/SidebarImage";
import SatatusPost from "@/components/SatatusPost";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import SkeletonPost from "@/components/SkeletonPost/SkeletonPost";
import Link from "next/link";

import HeaderProfile from "@/components/Profile/HeaderProfile";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { PostType } from "@/app/types";
import { useAppDispatch } from "@/app/hooks/store";
import { resetLoading } from "@/app/hooks/features/loading.slice";
import { useListPostById } from "@/app/actions/custom/useListPostbyId";
import { useImageProfileById } from "@/app/actions/custom/useImageProfileById";
import Widget from "@/app/widget";

export default function Timeline() {
  const params = useSearchParams();

  const { data, isFetching } = useGetUserInfoQuery(
    params.get("id_user") as string
  );

  // const pathname = usePathname();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  dispatch(resetLoading());

  useListPostById(setPosts, setLoading, params.get("id_user") as string);
  useImageProfileById(setImages, setLoading, params.get("id_user") as string);
  console.log(images);
  return (
    <Widget>
      <nav className="fixed z-40 w-full">
        <Navigation />
      </nav>
      <div className=" h-full dark:bg-[#18191a]">
        <HeaderProfile />
        {/* {pathname === "/profile"}( */}
        <div className="flex justify-center">
          <div className="flex flex-col mt-5 w-1/3 ml-44">
            <SidebarProfile data={data?.data?.profile} />
            <SidebarImage data={images} />
          </div>
          <div className="mt-2 h-full w-2/3">
            <div className="flex flex-col ml-3 mr-56">
              <SatatusPost
                reff={ref}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
              />
              {loading ? (
                <div className="mt-10 ml-6">
                  <SkeletonPost />
                  <SkeletonPost />
                  <SkeletonPost />
                  <SkeletonPost />
                  <SkeletonPost />
                  <SkeletonPost />
                </div>
              ) : (
                <div>
                  {posts.map((post: PostType, index: number) => {
                    return <Post key={index} postData={post} />;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* ) */}
      </div>
    </Widget>
  );
}
