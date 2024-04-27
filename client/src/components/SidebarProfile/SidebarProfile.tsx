"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import { Profile } from "@/app/types";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import ModalProfile from "../Profile/ModalProfile";
import { useRouter, useSearchParams } from "next/navigation";

interface PropsSidebar {
  data?: Profile;
  id_user?: String;
}

export default function SidebarProfile({ data, id_user }: PropsSidebar) {
  const [userId, setUserId] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useSearchParams();
  const router = useRouter();

  const [linkImageAvatar, setImageAvatar] = useState<string>("");
  const [linkImageCover, setImageCover] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  useEffect(() => {
    setImageAvatar(data?.avatar_url as string);
    setImageCover(data?.cover_url as string);
    setBio(data?.bio as string);
  }, [data?.avatar_url, data?.cover_url, data?.bio]);

  const handleOpen = () => {
    onOpen();
  };

  useEffect(() => {
    setUserId(getLocalStorage()?.user_id as string);
  }, [userId, setUserId]);

  return (
    <>
      <div className="bg-[#ffffff] dark:bg-[#242526] rounded-lg mb-4 shrink drop-shadow-2xl dark:text-white">
        <h1 className="ml-5 mt-5 font-bold text-xl dark:text-white">Intro</h1>
        <h1 className="flex justify-center mt-2 dark:text-white">
          {bio}
        </h1>
        {id_user == userId && (
          <div className="mt-2 flex justify-center w-full">
            <Button
              color="default"
              className="w-5/6"
              onPress={() => handleOpen()}
            >
              Chỉnh sửa tiểu sử
            </Button>
            <ModalProfile
              isOpen={isOpen}
              onClose={onClose}
              setImageCover={setImageCover}
              setImageAvatar={setImageAvatar}
              linkImageCover={linkImageCover}
              linkImageAvatar={linkImageAvatar}
              bio={bio}
              setBio={setBio}
            />
          </div>
        )}
        <div className="mt-5 ml-5 flex">
          <MdBusinessCenter size={25} />
          <h1 className="ml-1">
            Từng học tại{" "}
            <span className="font-medium dark:text-white">
              {data?.study_at}
            </span>
          </h1>
        </div>
        <div className="mt-3 ml-5 flex">
          <FaGraduationCap size={25} />
          <h1 className="ml-1">
            Làm việc tại{" "}
            <span className="font-medium dark:text-white">{data?.work_at}</span>
          </h1>
        </div>
        <div className="mt-3 ml-5 flex">
          <FaLocationDot size={25} />
          <h1 className="ml-1 dark:text-white">
            Đến từ{" "}
            <span className="font-medium dark:text-white">{data?.from}</span>
          </h1>
        </div>
        <div className="mt-3 ml-5 mr-2 flex mb-2">
          <IoHeart size={25} />
          <h1 className="ml-1">
            <span className="ml-1 font-medium dark:text-white">
              {data?.relationship}
            </span>
          </h1>
        </div>
        {id_user == userId && (
          <div className="mt-5 mb-5 flex justify-center w-full">
            <Button color="default" className="w-5/6">
              Chỉnh sửa chi tiết
            </Button>
          </div>
        )}
      </div>
      {/* <div className="bg-[#f0f2f5] dark:bg-gray-800 rounded-lg shrink">
        <div className="flex justify-between mr-5">
          <h1 className="ml-5 mt-5 font-bold text-xl">Image</h1>
          <Link href="#" className="text-sky-500 ml-5 mt-5">
            Xem tất cả ảnh
          </Link>
        </div>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 m-5">
          {list.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => // console.log("item pressed")}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  width={120}
                  alt={item.title}
                  className="w-full object-cover h-[140px]"
                  src={item.img}
                />
              </CardBody>
            </Card>
          ))}
        </div>
      </div> */}
    </>
  );
}
