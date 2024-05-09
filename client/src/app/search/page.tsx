"use client";
import React, { useState, Fragment } from "react";
import Sidebar from "@/components/Sidebar";
import Post from "@/components/Post/Post";
import { FriendRequest, ListFriendType, PostType } from "../types";
import Widget from "../widget";
import SkeletonPost from "@/components/SkeletonPost/SkeletonPost";
import RequestWidget from "@/components/RequestWidget";
import Navigation from "@/components/Navigation/Navigation";
import FriendForm from "@/components/FriendForm";
import { useSearchFunctions, useSearchValue } from "../context/SearchProvider ";

export default function Search() {
  // const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const { searchPost, searchUser } = useSearchFunctions();
  const { friends, posts, setFriends, setPosts, loading } = useSearchValue();

  console.log(posts);
  console.log(friends);

  return (
    <>
      <nav className="fixed z-40 w-full">
        <Navigation
          searchPost={searchPost}
          searchUser={searchUser}
          setPosts={setPosts}
          setFriends={setFriends}
        />
      </nav>
      <Widget>
        <main className="flex justify-center pt-3 bg-gray-100 dark:bg-medium h-screen">
          <section>
            <Sidebar />
          </section>
          <section
            className="flex-1 flex flex-col max-w-3xl h-full w-screen overflow-auto"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="flex flex-col mainSection mt-20 ">
              {loading ? (
                <div className="mt-10">
                  {/* Hiển thị SkeletonPost nếu đang loading */}
                  {[...Array(6)].map((_, index) => (
                    <SkeletonPost key={index} />
                  ))}
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
                  {/* Hiển thị danh sách bạn bè nếu mảng posts rỗng */}
                  {posts.length === 0
                    ? friends?.map((friend: ListFriendType, index: number) => (
                        <FriendForm key={index} data={friend} />
                      ))
                    : // Hiển thị danh sách bài đăng nếu mảng posts có dữ liệu
                      posts?.map((post: PostType, index: number) => (
                        <Post
                          key={index}
                          postData={post}
                          setPosts={setPosts}
                          hiddenComment={false}
                        />
                      ))}
                </div>
              )}
            </div>
          </section>
          <section>
            <div className="rightSection mt-16">
              <div className="requestWidget">
                <h1 className="dark:text-white font-semibold overflow-hidden">
                  Requests
                </h1>
                {/* Hiển thị danh sách yêu cầu bạn bè */}
                {requests.map((request: FriendRequest, index: number) => {
                  if (request.status === "PENDING") {
                    return <RequestWidget request={request} key={index} />;
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
