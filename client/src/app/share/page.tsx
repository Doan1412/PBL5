"use client";
import React, { useState, useRef, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import { FriendRequest, SharePostType, User } from "../types";
import SkeletonPost from "@/components/SkeletonPost/SkeletonPost";
import { useListFriendRequests } from "../actions/custom/useListFriendRequest";
import Widget from "@/app/widget";
import { PostType } from "@/app/types";
import "slick-carousel/slick/slick.css";
import { useListPostShare } from "../actions/custom/useListPostShare";
import { useAppDispatch } from "../hooks/store";
import SharePost from "@/components/SharePost/SharePost";
import RequestWidget from "@/components/RequestWidget";

export default function Share() {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<SharePostType[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [originalPosts, setOriginalPosts] = useState<PostType[]>([]);
  const dispatch = useAppDispatch();


  useListPostShare(setPosts, setOriginalPosts, setLoading);
  useListFriendRequests(setRequests, setLoading);

 

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
                  {posts.map((post: SharePostType, index: number) => {
                    return (
                      <SharePost  key={index} dataSharePost = {post} dataPostOrigin = {originalPosts}/>
                    );
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
}
