import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FaGraduationCap } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import { Profile } from "@/app/types";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import ModalHandleBio from "../Profile/ModalHandleBio";
import { useRouter, useSearchParams } from "next/navigation";
import ModalHandleDetail from "../Profile/ModalHandleDetail";
import { useUserProfileTimeline } from "@/app/profile/timeline/page";

interface PropsSidebar {
  data?: Profile;
  id_user?: string;
}

export default function SidebarProfile({ data, id_user }: PropsSidebar) {
  const [userId, setUserId] = useState<string>("");
  // const [linkImageAvatar, setImageAvatar] = useState<string>("");
  // const [linkImageCover, setImageCover] = useState<string>("");
  // const [bio, setBio] = useState<string>("");
  const [study, setStudy] = useState<string>("");
  const [work, setWork] = useState<string>("");
  const [from, setFrom] = useState<string>("");
  const [love, setLove] = useState<string>("");

  const {
    bio,
    linkImageAvatar,
    linkImageCover
  } = useUserProfileTimeline();

  const {
    isOpen: isBioModalOpen,
    onOpen: onOpenBioModal,
    onClose: onCloseBioModal,
  } = useDisclosure();
  const {
    isOpen: isDetailModalOpen,
    onOpen: onOpenDetailModal,
    onClose: onCloseDetailModal,
  } = useDisclosure();

  useEffect(() => {
    // setImageAvatar(data?.avatar_url || "");
    // setImageCover(data?.cover_url || "");
    // setBio(data?.bio || "");
    setStudy(data?.study_at || "");
    setWork(data?.work_at || "");
    setFrom(data?.from || "");
    setLove(data?.relationship || "");
  }, [
    // data?.avatar_url,
    // data?.cover_url,
    // data?.bio,
    data?.study_at,
    data?.work_at,
    data?.from,
    data?.relationship,
  ]);

  useEffect(() => {
    setUserId(getLocalStorage()?.user_id || "");
  }, []);

  const handleOpenBioModal = () => {
    onOpenBioModal();
  };

  const handleOpenDetailModal = () => {
    onOpenDetailModal();
  };

  return (
    <>
      <div className="bg-[#ffffff] dark:bg-[#242526] rounded-lg mb-4 shrink drop-shadow-2xl dark:text-white">
        <h1 className="ml-5 mt-5 font-bold text-xl dark:text-white">Intro</h1>
        <h1 className="flex justify-center mt-2 dark:text-white">{bio}</h1>
        {id_user === userId && (
          <div className="mt-2 flex justify-center w-full">
            <Button
              color="default"
              className="w-5/6"
              onPress={handleOpenBioModal}
            >
              Chỉnh sửa tiểu sử
            </Button>
            <ModalHandleBio
              isOpen={isBioModalOpen}
              onClose={onCloseBioModal}  
              love={love}
              study={study}
              work={work}
              from={from}      
            />
          </div>
        )}
        <div className="mt-5 ml-5 flex">
          <MdBusinessCenter size={25} />
          <h1 className="ml-1">
            Từng học tại{" "}
            <span className="font-medium dark:text-white">{study}</span>
          </h1>
        </div>
        <div className="mt-3 ml-5 flex">
          <FaGraduationCap size={25} />
          <h1 className="ml-1">
            Làm việc tại{" "}
            <span className="font-medium dark:text-white">{work}</span>
          </h1>
        </div>
        <div className="mt-3 ml-5 flex">
          <FaLocationDot size={25} />
          <h1 className="ml-1 dark:text-white">
            Đến từ <span className="font-medium dark:text-white">{from}</span>
          </h1>
        </div>
        <div className="mt-3 ml-5 mr-2 flex mb-2">
          <IoHeart size={25} />
          <h1 className="ml-1">
            <span className="ml-1 font-medium dark:text-white">{love}</span>
          </h1>
        </div>
        {id_user === userId && (
          <div className="mt-5 mb-5 flex justify-center w-full">
            <Button
              color="default"
              className="w-5/6"
              onPress={handleOpenDetailModal}
            >
              Chỉnh sửa chi tiết
            </Button>
            <ModalHandleDetail
              isOpen={isDetailModalOpen}
              onClose={onCloseDetailModal}
              setStudy={setStudy}
              setWork={setWork}
              setFrom={setFrom}
              setLove={setLove}
              love={love}
              study={study}
              work={work}
              from={from}
              bio={bio}
              linkImageAvatar = {linkImageAvatar}
              linkImageCover = {linkImageCover}
            />
          </div>
        )}
      </div>
    </>
  );
}
