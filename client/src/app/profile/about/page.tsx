"use client";
import Navigation from "@/components/Navigation";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SidebarProfile from "@/components/SidebarProfile/SidebarProfile";
import Post from "@/components/Post/Post";
import SidebarImage from "@/components/SidebarProfile/SidebarImage";
import SatatusPost from "@/components/SatatusPost";
import { useSearchParams } from "next/navigation";
import SkeletonPost from "@/components/SkeletonPost/SkeletonPost";
import HeaderProfile from "@/components/Profile/HeaderProfile";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { PostType } from "@/app/types";
import { useAppDispatch } from "@/app/hooks/store";
import { resetLoading } from "@/app/hooks/features/loading.slice";
import { useListPostById } from "@/app/actions/custom/useListPostbyId";
import { useImageProfileById } from "@/app/actions/custom/useImageProfileById";
import Widget from "@/app/widget";
import AboutProfile from "@/components/Profile/AboutProfile";

interface UserProfileContextType {
  firstname: string;
  lastname: string;
  username: string;
  setFirstname: (newFirstname: string) => void;
  setLastname: (newLastname: string) => void;
  setUsername: (newUsername: string) => void;
}

const UserProfileContext = createContext<UserProfileContextType>({
  firstname: "",
  lastname: "",
  username: "",
  setFirstname: () => {},
  setLastname: () => {},
  setUsername: () => {},
});

export const useUserProfile = () => useContext(UserProfileContext);

export default function About() {
  const params = useSearchParams();

  const { data, isFetching } = useGetUserInfoQuery(
    params.get("id_user") as string
  );

  console.log(data);
  // const pathname = usePathname();
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    setFirstname(data?.data?.firstname as string);
    setLastname(data?.data?.lastname as string);
    setUsername(data?.data?.username as string);
  }, [data?.data?.firstname, data?.data?.lastname, data?.data?.username]);

  const dispatch = useAppDispatch();
  dispatch(resetLoading());

  useListPostById(setPosts, setLoading, params.get("id_user") as string);
  useImageProfileById(setImages, setLoading, params.get("id_user") as string);
  return (
    <UserProfileContext.Provider
      value={{
        firstname,
        lastname,
        username,
        setFirstname,
        setLastname,
        setUsername,
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
            <AboutProfile data={data!} id_user={data?.data.id} />
          </div>
        </div>
      </Widget>
    </UserProfileContext.Provider>
  );
}
