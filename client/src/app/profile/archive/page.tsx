"use client";
import Navigation from "@/components/Navigation";
import { Avatar, AvatarGroup, Image, Skeleton } from "@nextui-org/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Poster from "@/static/images/Poster.jpg";
import AddFriendButton from "@/components/AddFriendButton";
import SidebarProfile from "@/components/SidebarProfile/SidebarProfile";
import SidebarImage from "@/components/SidebarProfile/SidebarImage";
import SatatusPost from "@/components/SatatusPost";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import SkeletonPost from "@/components/SkeletonPost/SkeletonPost";
import Link from "next/link";

import HeaderProfile from "@/components/Profile/HeaderProfile";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { PostType, SharePostType } from "@/app/types";
import { useAppDispatch } from "@/app/hooks/store";
import { resetLoading } from "@/app/hooks/features/loading.slice";
import { useListPostById } from "@/app/actions/custom/useListPostbyId";
import { useImageProfileById } from "@/app/actions/custom/useImageProfileById";
import Widget from "@/app/widget";
import Post from "@/components/Post/Post";
import { useListPostShareOfUser } from "@/app/actions/custom/useListPostShareOfUser";
import SharePost from "@/components/SharePost/SharePost";

interface UserProfileContextType {
  bio: string;
  linkImageCover: string;
  linkImageAvatar: string;
  setBio: (newBio: string) => void;
  setImageCover: (newImageCover: string) => void;
  setImageAvatar: (newImageAvatar: string) => void;
}

const UserProfileContextTimeline = createContext<UserProfileContextType>({
  bio: "",
  linkImageCover: "",
  linkImageAvatar: "",
  setBio: () => {},
  setImageCover: () => {},
  setImageAvatar: () => {},
});

export const useUserProfileTimeline = () =>
  useContext(UserProfileContextTimeline);

export default function Timeline() {
  const params = useSearchParams();

  const { data, isFetching } = useGetUserInfoQuery(
    params.get("id_user") as string
  );

  // const pathname = usePathname();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<SharePostType[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  dispatch(resetLoading());

  const [linkImageAvatar, setImageAvatar] = useState<string>("");
  const [linkImageCover, setImageCover] = useState<string>("");
  const [bio, setBio] = useState<string>(data?.data?.profile?.bio as string);
  const [originalPosts, setOriginalPosts] = useState<PostType[]>([]);

  useEffect(() => {
    setImageAvatar(data?.data?.profile?.avatar_url as string);
    setImageCover(data?.data?.profile?.cover_url as string);
    setBio(data?.data?.profile?.bio as string);
    // setFirstname(data?.data?.firstname as string);
    // setLastname(data?.data?.lastname as string);
    // setUsername(data?.data?.username as string);
  }, [
    data?.data?.profile?.avatar_url,
    data?.data?.profile?.cover_url,
    data?.data?.profile?.bio,
    // data?.data?.firstname,
    // data?.data?.lastname,
    // data?.data?.username,
    // setFirstname,
    // setLastname,
    // setUsername,
  ]);

  useListPostShareOfUser(
    setPosts,
    setOriginalPosts,
    setLoading,
    params.get("id_user") as string
  );
  useImageProfileById(setImages, setLoading, params.get("id_user") as string);
  // console.log(images);
  return (
    <UserProfileContextTimeline.Provider
      value={{
        bio,
        linkImageCover,
        linkImageAvatar,
        setBio,
        setImageCover,
        setImageAvatar,
      }}
    >
      <Widget>
        <nav className="fixed z-40 w-full">
          <Navigation />
        </nav>
        <div className=" h-full dark:bg-[#18191a]">
          <HeaderProfile data={data!} isFetching={isFetching} />
          {/* {pathname === "/profile"}( */}
          <div className="hidden lg:flex justify-center">
            <div className="flex flex-col mt-5 w-2/5 ml-44">
              <SidebarProfile
                data={data?.data?.profile}
                id_user={data?.data.id}
              />
              <SidebarImage data={images} />
            </div>
            <div className="mt-2 h-full w-3/5">
              <div className="flex flex-col ml-3 mr-56">
                {/* <SatatusPost
                  reff={ref}
                  isFocused={isFocused}
                  setIsFocused={setIsFocused}
                  setPosts={setPosts}
                /> */}
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
                    {posts.map((post: SharePostType, index: number) => {
                      return (
                        <SharePost
                          key={index}
                          dataSharePost={post}
                          dataPostOrigin={originalPosts}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* ) */}
        </div>
      </Widget>
    </UserProfileContextTimeline.Provider>
  );
}
