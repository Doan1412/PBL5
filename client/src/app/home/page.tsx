"use client";
import React, { useState, useRef, Fragment, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import userData from "../data/UserData";
import Post from "@/components/Post/Post";
import Navigation from "@/components/Navigation";
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

const Home: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  //   useClickOutside(() => setIsFocused(false), ref);

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);

  // const refresh = useRefreshToken();

  useListPost(setPosts, setLoading);
  useListFriendRequests(setRequests, setLoading); 
  // useRefreshToken()

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
                <div>
                  {posts.map((post: PostType, index: number) => {
                    return <Post key={index} postData={post} />;
                  })}
                </div>
              )}
            </div>
          </section>
          <section className="">
            <div className="rightSection mt-16 ">
              <div className="requestWidget">
                <h1 className="dark:text-white font-semibold">Requests</h1>
                {requests.map((request: FriendRequest, index: number) => {
                  return (
                    <RequestWidget request={request} key={index} ></RequestWidget>
                  );
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
