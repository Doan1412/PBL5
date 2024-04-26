import { UserType } from "@/app/types";
import React from "react";
import { BsCake } from "react-icons/bs";
import {IoMaleFemaleSharp } from "react-icons/io5";
import { PiPhoneDuotone } from "react-icons/pi";
import { TbMailFast, TbPencilMinus } from "react-icons/tb";

interface PropsAboutProfile {
  data: UserType;

}

export default function AboutProfile({data} : PropsAboutProfile) {
  return (
    <>
      <div className=" bg-[#ffffff] dark:bg-[#242526] rounded-lg mb-4 shrink drop-shadow-2xl dark:text-white w-full ml-48 mr-48 mt-4">
        <h1 className="ml-5 mt-5 font-bold text-xl dark:text-white">
          Thông tin liên hệ
        </h1>
        <div className="flex mt-2 ml-5 justify-between mr-10">
          <div className="flex gap-2">
            <div className="flex items-center">
              <PiPhoneDuotone />
            </div>
            <div>
              <h1 className=" dark:text-white">{data?.data?.phone}</h1>
              <h1 className="text-xs text-gray-600 dark:text-white">Phone</h1>
            </div>
          </div>
          <div className="flex items-center">
            <button className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-200 dark:bg-medium">
              <TbPencilMinus />
            </button>
          </div>
        </div>
        <div className="flex mt-2 ml-5 justify-between mr-10">
          <div className="flex gap-2">
            <div className="flex items-center">
              <TbMailFast size={20} />
            </div>
            <div>
              <h1 className=" dark:text-white">{data?.data?.username}</h1>
              <h1 className="text-xs text-gray-600 dark:text-white">Email</h1>
            </div>
          </div>
          <div className="flex items-center">
            <button className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-200 dark:bg-medium">
              <TbPencilMinus />
            </button>
          </div>
        </div>
        <h1 className="ml-5 mt-5 font-bold text-xl dark:text-white">
          Thông tin cơ bản
        </h1>
        <div className="flex mt-2 ml-5 justify-between mr-10">
          <div className="flex gap-2">
            <div className="flex items-center">
              <IoMaleFemaleSharp />
            </div>
            <div>
              <h1 className=" dark:text-white">{data?.data?.gender}</h1>
              <h1 className="text-xs text-gray-600 dark:text-white">
                Giới tính
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            <button className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-200 dark:bg-medium">
              <TbPencilMinus />
            </button>
          </div>
        </div>
        <div className="flex mt-2 ml-5 mb-7 justify-between mr-10">
          <div className="flex gap-2">
            <div className="flex items-center">
              <BsCake />
            </div>
            <div>
              <h1 className=" dark:text-white">{data?.data?.birth}</h1>
              <h1 className="text-xs text-gray-600 dark:text-white">
                Sinh nhật
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            <button className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-200 dark:bg-medium">
              <TbPencilMinus />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
