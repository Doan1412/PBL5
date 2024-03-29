"use client";
import React, { useState, useRef } from "react";
import { MdSettings, MdInsertPhoto, MdEmojiEmotions } from "react-icons/md";
import { BsFillCameraVideoFill } from "react-icons/bs";
import Sidebar from "@/components/Sidebar";
import userData from "../data/UserData";
import Post from "@/components/Post";
import Navigation from "@/components/Navigation";

interface User {
  name: string;
  username: string;
  profilePic: string;
  storyImage: string;
  postImg: string;
}

const Home: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  //   useClickOutside(() => setIsFocused(false), ref);

  return (
    <>
      <nav className="fixed z-40 w-full">
        <Navigation />
      </nav>
      <main className="flex justify-between pt-3 bg-gray-100 dark:bg-medium">
        <section className="">
          <Sidebar />
        </section>
        <section className="flex-1 flex flex-col max-w-2xl">
          <div className="mainSection mt-20 ">
            <div
              ref={ref}
              className={`createPostWidget dark:bg-[#353a50] ${
                isFocused ? "active" : ""
              }`}
            >
              <div className="createInput dark:bg-[#353a50] rounded-lg">
                {/* <img src="/assets/image/avatar_default.jpg" alt="" /> */}
                <input
                  type="text"
                  placeholder="What's on your mind, Jhon Doe?"
                  id="createNewPost"
                  onFocus={() => setIsFocused(true)}
                />
                <button className="inBtn">Post</button>
              </div>
              <div className="otherOptions dark:bg-[#353a50] rounded-lg">
                <div className="option">
                  <BsFillCameraVideoFill />
                  <span>Go Live</span>
                </div>
                <div className="option">
                  <MdInsertPhoto />
                  <span>Photo/Video</span>
                </div>
                <div className="option">
                  <MdEmojiEmotions />
                  <span>Feeling/Activity</span>
                </div>
              </div>
            </div>
            {userData.map((user: User, index: number) => {
              return <Post key={index} userData={user} />;
            })}
          </div>
        </section>
        <section className="">
          <div className="rightSection mt-16 ">
            <div className="requestWidget">
              <h1 className="dark:text-white font-semibold">Requests</h1>
              <div className="requestProfile">
                <div className="details">
                  <div className="profileImage">
                    {/* <img src={"/assets/image/avatar_default.jpg"} alt="" /> */}
                  </div>
                  <div className="userDetails">
                    <div className="name">Sophie Alexander</div>
                    <div className="username">@johndoe</div>
                  </div>
                </div>
                <div className="actions">
                  <button className="actionBtn">Accept</button>
                  <button className="actionBtn">Reject</button>
                </div>
              </div>
              <div className="requestProfile">
                <div className="details">
                  <div className="profileImage">
                    {/* <img src={"https://images.unsplash.com/photo-1505695716405-61e75ecc5bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Z2lybCxib3l8fHx8fHwxNjg5NzcxMTE5&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"} alt="" /> */}
                  </div>
                  <div className="userDetails">
                    <div className="name">Phillip Tønder</div>
                    <div className="username">@philipTonder</div>
                  </div>
                </div>
                <div className="actions">
                  <button className="actionBtn">Accept</button>
                  <button className="actionBtn">Reject</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
