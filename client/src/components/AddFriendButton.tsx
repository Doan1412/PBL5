"use client";
import React, { useRef } from "react";
import { IoMdPersonAdd } from "react-icons/io";

export default function AddFriendButton() {
  const fileInputRef = useRef(null);

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   // Xử lý tệp tại đây (ví dụ: tải lên tệp, hiển thị trước tệp, vv.)
  //   console.log("Selected file:", file);
  // };

  return (
    <div>
      <label
        htmlFor="avatarInput"
        className="group flex items-center justify-start w-8 h-8 bg-blue-500 rounded-lg cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
      >
        <div className="flex items-center text-white justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
          <IoMdPersonAdd />
        </div>
        <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-xs font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          Add Friend
        </div>
      </label>
      <input
        id="avatarInput"
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        // onChange={handleFileChange}
      />
    </div>
  );
}
