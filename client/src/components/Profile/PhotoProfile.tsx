import Link from "next/link";
import React from "react";
import FriendForm from "../FriendForm";
import PhotoForm from "../PhotoForm";

export default function PhotoProfile() {
  return (
    <>
      <div className="bg-[#ffffff] dark:bg-[#242526] rounded-lg mb-4 shrink drop-shadow-2xl dark:text-white w-full ml-48 mr-48 mt-4">
        <div className="flex justify-between">
          <h1 className="ml-5 mt-5 font-bold text-xl dark:text-white">
            Ảnh
          </h1>
        </div>
        <div className="grid grid-cols-5 justify-items-center shrink mt-5 mb-5">
            <PhotoForm/>
            <PhotoForm/>
            <PhotoForm/>
            <PhotoForm/>
            <PhotoForm/>
            <PhotoForm/>
            <PhotoForm/>
            <PhotoForm/>
            <PhotoForm/>
            <PhotoForm/>
            <PhotoForm/>
        </div>
      </div>
    </>
  );
}
