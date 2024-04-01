import React, { useRef, useState } from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { MdEmojiEmotions, MdInsertPhoto } from "react-icons/md";

interface ListPost {
  reff: any;
  isFocused: boolean;
  setIsFocused: any;
}

export default function ListPost({ reff, isFocused, setIsFocused }: ListPost) {
  //   const [isFocused, setIsFocused] = useState<boolean>(false);
  //   const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={reff}
        className={`createPostWidget dark:bg-[#353a50] shadow-xl ${
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
    </>
  );
}
