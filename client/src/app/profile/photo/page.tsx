"use client";
import Navigation from "@/components/Navigation";
import React, { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeaderProfile from "@/components/Profile/HeaderProfile";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { PostType } from "@/app/types";
import { useAppDispatch } from "@/app/hooks/store";
import { resetLoading } from "@/app/hooks/features/loading.slice";
import { useListPostById } from "@/app/actions/custom/useListPostbyId";
import { useImageProfileById } from "@/app/actions/custom/useImageProfileById";
import Widget from "@/app/widget";
import FriendProfile from "@/components/Profile/FriendProfile";
import PhotoProfile from "@/components/Profile/PhotoProfile";

export default function Photo() {
  const params = useSearchParams();

  const { data, isFetching } = useGetUserInfoQuery(
    params.get("id_user") as string
  );

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
        <div className="hidden md:flex justify-center">
          <PhotoProfile />
        </div>
      </div>
    </Widget>
  );
}
