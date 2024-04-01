"use client";
import React, { useRef } from "react";
import { FaCameraRetro } from "react-icons/fa";

export default function UploadAvatar() {
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
        className="group flex items-center justify-start w-8 h-8 bg-gray-500 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
      >
        <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
          <FaCameraRetro />
        </div>
        <div className="absolute right-3 transform translate-x-full opacity-0 text-white text-xs font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          Update Avatar
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
