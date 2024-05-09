"use client";
import React, { useState, useRef, Fragment, useEffect, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import userData from "../data/UserData";
import Post from "@/components/Post/Post";
import ListPost from "@/components/SatatusPost";
import { FriendRequest, PostType, User } from "../types";
import Widget from "../widget";
import { useListPost } from "../actions/custom/useListPost";
import useRefreshToken from "../actions/refreshToken";
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
import Navigation from "@/components/Navigation/Navigation";

const Home: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  //   useClickOutside(() => setIsFocused(false), ref);

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);

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
            <Sidebar />
          </section>
          <section
            className="flex-1 flex flex-col max-w-3xl h-full w-screen overflow-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex flex-col mainSection mt-20 ">
              <SatatusPost
                reff={ref}
                isFocused={isFocused}
                setIsFocused={setIsFocused}
                setPosts={setPosts}
              />
              {loading ? (
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
              )}
            </div>
          </section>
          <section className="">
            <div className="rightSection mt-16 ">
              <div className="requestWidget">
                <h1 className="dark:text-white font-semibold overflow-hidden">
                  Requests
                </h1>
                {requests.map((request: FriendRequest, index: number) => {
                  if (request.status === "PENDING") {
                    return (
                      <RequestWidget
                        request={request}
                        key={index}
                      ></RequestWidget>
                    );
                  }
                })}
              </div>
            </div>
          </section>
        </main>
      </Widget>
    </>
  );
};

export default Home;
