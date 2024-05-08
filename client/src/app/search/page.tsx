"use client";
import React, { useState, useRef, Fragment, useEffect, useMemo } from "react";
import {
  FaUser,
  FaList,
} from "react-icons/fa";
import SidebarSearch from "@/components/SidebarSearch";
import userData from "../data/UserData";
import Post from "@/components/Post/Post";
import Navigation from "@/components/Navigation";
import ListPost from "@/components/SatatusPost";
import { FriendRequest, PostType, User } from "../types";
import Widget from "../widget";
import { useListPost } from "../actions/custom/useListPost";
import useRefreshToken from "../actions/refreshToken";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { getLocalStorage } from "../actions/localStorage_State";
import SatatusPost from "@/components/SatatusPost";
import SkeletonPost from "@/components/SkeletonPost/SkeletonPost";
import { useListFriendRequests } from "../actions/custom/useListFriendRequest";
import RequestWidget from "@/components/RequestWidget";
import InfiniteScroll from "react-infinite-scroll-component";
import { useAppDispatch } from "../hooks/store";
import { useSearchParams } from "next/navigation";
import useHttp from "../hooks/customs/useAxiosPrivate";
import { failPopUp } from "../hooks/features/popup.slice";
import { useRouter } from "next/navigation";
import UserProfileWidget from "@/components/UserProfileWidget";
import { set } from "date-fns";


const Searching: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  interface LinkItem {
    name: string;
    icon: JSX.Element;
  }
  
  const links: LinkItem[] = [
    {
      name: "Post",
      icon: <FaList />,
    },
    {
      name: "User",
      icon: <FaUser />,
    }
  ];

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("post");
  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );

  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();

  useEffect(() => {
    setQuery(params.get("q") || (params.get("iq") ?? ""));
    if (query == "") {
        router.push("/home");
      }
    console.log(query)
  }, []);

  const lazyPost = async () => {
    const token = getLocalStorage()?.token;
    if (!token) return;
    try {
      const response = await httpPrivate.get(
        `/post/homepage?skip=${offset + 1}&limit=20`

        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      if (response.data.status === 200) {
        const postsData = response.data.data;
        // console.log(postsData);
        setPosts((prev) => [...prev, ...postsData]);
        setLoading(false);
      } else {
        dispatch(failPopUp(response.data.message));
      }
    } catch (error) {
      // console.error("Error:", error);
      setLoading(false);
    }
  };
  // const refresh = useRefreshToken();

  useListPost(setPosts, setLoading, offset);
  useListFriendRequests(setRequests, setLoading);

  console.log(offset);
  return (
    <>
      <nav className="fixed z-40 w-full">
        <Navigation />
      </nav>
      <Widget>
        <main className="flex justify-center pt-3 bg-gray-100 dark:bg-medium h-screen">
          <section className="">
            <div className="leftSection dark:text-white">
              <SidebarSearch />
              <div className="inSidebar dark:bg-[#242526] dark:text-white">
                <div className="link" onClick={() => setSearchType('post')}>
                  <div className="icon">
                    {" "}
                    <FaList />
                  </div>
                  <h3>Post</h3>
                </div>
                <div className="link" onClick={() => setSearchType('user')}>
                  <div className="icon">
                    {" "}
                    <FaUser />
                  </div>
                  <h3>User</h3>
                </div>
              </div>
            </div>
          </section>
          <section
            className="flex-1 flex flex-col max-w-3xl h-full w-screen overflow-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex flex-col mainSection mt-20 ">
              {/* {loading ? (
                <div className="mt-10">
                  <SkeletonPost />
                  <SkeletonPost />
                  <SkeletonPost />
                  <SkeletonPost />
                  <SkeletonPost />
                  <SkeletonPost />
                </div>
              ) : (
                <div
                  id="scrollableDiv"
                  style={{
                    height: 600,
                    overflow: "auto",
                    scrollbarWidth: "none",
                  }}
                >
                  <InfiniteScroll
                    dataLength={posts.length} // Số lượng dữ liệu hiện có
                    next={() => {
                      setOffset((prevOffset) => prevOffset + 1);
                      lazyPost();
                    }} // Tăng offset khi kéo xuống cuối trang
                    hasMore={true} // Bật cờ này nếu còn dữ liệu để tải thêm
                    loader={<SkeletonPost />}
                    endMessage={<p>Yay! You have seen it all</p>}
                    scrollableTarget="scrollableDiv" // Đặt scrollable target cho InfiniteScroll
                  >
                    {posts.map((post: PostType, index: number) => (
                      <Post
                        key={index}
                        postData={post}
                        setPosts={setPosts}
                        hiddenComment={false}
                      />
                    ))}
                  </InfiniteScroll>
                </div>
              )} */}
            <UserProfileWidget avatar_url={data?.data.profile.avatar_url ?? ""} firstname={data?.data.firstname ?? ""} lastname={data?.data.lastname ?? ""} username={data?.data.username ?? ""} id={getLocalStorage()?.user_id ?? ""} ></UserProfileWidget>
            <UserProfileWidget avatar_url={data?.data.profile.avatar_url ?? ""} firstname={data?.data.firstname ?? ""} lastname={data?.data.lastname ?? ""} username={data?.data.username ?? ""} id={getLocalStorage()?.user_id ?? ""} ></UserProfileWidget>
            </div>
          </section>
        </main>
      </Widget>
    </>
  );
};

export default Searching;
