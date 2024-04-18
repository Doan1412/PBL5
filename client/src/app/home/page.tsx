"use client";
import React, { useState, useRef } from "react";
import { MdSettings, MdInsertPhoto, MdEmojiEmotions } from "react-icons/md";
import { BsFillCameraVideoFill } from "react-icons/bs";
import Sidebar from "@/components/Sidebar";
import userData from "../data/UserData";
import Post from "@/components/Post";
import Navigation from "@/components/Navigation";
import ListPost from "@/components/SatatusPost";
import { User } from "../types";
import Widget from "../widget";

const Home: React.FC = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  //   useClickOutside(() => setIsFocused(false), ref);

  

  return (
    <Widget>
      <nav className="fixed z-40 w-full">
        <Navigation />
      </nav>
      <main className="flex justify-center pt-3 bg-gray-100 dark:bg-medium h-screen">
        <section className="">
          <Sidebar />
        </section>
        <section
          className="flex-1 flex flex-col max-w-3xl h-full w-screen overflow-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex flex-col mainSection mt-20 ">
            <ListPost
              reff={ref}
              isFocused={isFocused}
              setIsFocused={setIsFocused}
            />
            <div>
              {userData.map((user: User, index: number) => {
                return <Post key={index} userData={user} />;
              })}
            </div>
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
    </Widget>
  );
};

export default Home;
