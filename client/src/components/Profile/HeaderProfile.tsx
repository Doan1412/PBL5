"use client";
import {
  Avatar,
  AvatarGroup,
  Image,
  Skeleton,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import Poster from "@/static/images/Poster.jpg";
import UploadButton from "../../components/UploadButton";
import UploadAvatar from "../../components/UploadAvatar";
import AddFriendButton from "@/components/AddFriendButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import { useListFriend } from "@/app/actions/custom/useListFriend";
import { ListFriendType, UserType } from "@/app/types";
import ModalHandleBio from "./ModalHandleBio";
import { useUserProfile } from "@/app/profile/about/page";

interface LinkProfile {
  // name: string;
  // link: string;
  data: UserType;
  isFetching: boolean;
}

export default function HeaderProfile({ data, isFetching }: LinkProfile) {
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    username,
    setUsername,
  } = useUserProfile();

  const [friends, setFiends] = useState<ListFriendType[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();

  // const { data, isFetching } = useGetUserInfoQuery(
  //   params.get("id_user") as string
  // );
  // console.log(data);
  // console.log(data?.data?.profile?.avatar_url);

  const [linkImageAvatar, setImageAvatar] = useState<string>("");
  const [linkImageCover, setImageCover] = useState<string>("");
  const [bio, setBio] = useState<string>(data?.data?.profile?.bio as string);

  const url = usePathname();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  useListFriend(setFiends, setLoading, params.get("id_user") as string);

  useEffect(() => {
    setImageAvatar(data?.data?.profile?.avatar_url as string);
    setImageCover(data?.data?.profile?.cover_url as string);
    setBio(data?.data?.profile?.bio as string);
    // setFirstname(data?.data?.firstname as string);
    // setLastname(data?.data?.lastname as string);
    // setUsername(data?.data?.username as string);
  }, [
    data?.data?.profile?.avatar_url,
    data?.data?.profile?.cover_url,
    data?.data?.profile?.bio,
    // data?.data?.firstname,
    // data?.data?.lastname,
    // data?.data?.username,
    // setFirstname,
    // setLastname,
    // setUsername,
  ]);

  return (
    <>
      <div className="dark:bg-[#242526] bg-[#f0f2f5] ml-15 mr-15 rounded-bl-lg pt-18 z-0">
        <div className="flex justify-center">
          <div className="flex items-center relative">
            <Image
              isBlurred
              width={900}
              height={300}
              alt="NextUI hero Image with delay"
              src={linkImageCover != "" ? linkImageCover : Poster.src}
              // src={Poster.src}
              className="z-0"
            />
            <div className="absolute bottom-2 right-2 z-10">
              <button
                color="default"
                className="w-5/6"
                onClick={() => handleOpen()}
              >
                <UploadButton />
              </button>
              <ModalHandleBio
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
          </div>
        </div>
        <div className="flex justify-center -mt-14 relative shrink">
          <Avatar
            isBordered
            src={linkImageAvatar != "" ? linkImageAvatar : avatarDefault.src}
            className="w-40 h-40 text-large"
          />
          <div className="flex justify-center absolute -bottom-5 z-10">
            <button
              color="default"
              className="w-5/6"
              onClick={() => handleOpen()}
            >
              <UploadAvatar />
            </button>
            <ModalHandleBio
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
        </div>
        {isFetching ? (
          <div className="mt-8 flex-col">
            <div className="flex justify-center ">
              <Skeleton className="h-3 w-7 rounded-lg" />
            </div>
            <div className="flex justify-center mt-2 ">
              <Skeleton className="h-3 w-16 rounded-lg" />
            </div>
          </div>
        ) : (
          <div>
            <h1 className="flex justify-center mt-7 font-bold text-3xl dark:text-white">
              {/* {data?.data?.firstname + " " + data?.data?.lastname} */}
              {firstname + " " + lastname}
            </h1>
            <h2 className="flex justify-center mt-1 text-[#65676b] text-base dark:text-gray-600">
              @{username}
            </h2>
            {/* <div className="flex justify-center mt-2 gap-4 pb-2"> */}
            <h2 className="flex justify-center mt-1 text-[#65676b] text-base dark:text-white">
              {friends.length} bạn bè • {friends.length} theo dõi
            </h2>
          </div>
        )}
        <div className="mt-2 pb-5">
          <AvatarGroup isBordered max={5} total={friends.length - 5}>
            {friends.map((friend: ListFriendType, index: number) => (
              <Avatar key={index} src={friend.avatar_url} />
            ))}
          </AvatarGroup>
          {/* </div> */}
        </div>
        <div className="flex justify-center">
          <div className="h-px w-8/12 dark:bg-[#3d3f41] bg-[#ccced2] mx-15" />
        </div>
        <div className="hidden lg:flex justify-center gap-x-96 shrink mt-2 sticky top-0">
          <div className="flex gap-4 mb-2">
            <div className="flex shrink ">
              <ul className="flex gap-4 ">
                <li
                  className="rounded-lg p-3 font-medium dark:text-[#b0b3b8] text-[#606266] hover:bg-gray-50 cursor-pointer dark:hover:bg-slate-700 dark:hover:text-white dark:hover:rounded-lg"
                  onClick={() => {
                    const currentUrl = `/profile/timeline?id_user=${
                      params.get("id_user") as string
                    }`;
                    // console.log(url);
                    if (url !== currentUrl) {
                      router.push(currentUrl);
                    }
                  }}
                >
                  <h3>Timeline</h3>
                </li>
                <li
                  className="rounded-lg p-3 font-medium dark:text-[#b0b3b8] text-[#606266] hover:bg-gray-50 cursor-pointer dark:hover:bg-slate-700 dark:hover:text-white dark:hover:rounded-lg"
                  onClick={() => {
                    const currentUrl = `/profile/about?id_user=${
                      params.get("id_user") as string
                    }`;
                    // console.log(url);
                    if (url !== currentUrl) {
                      router.push(currentUrl);
                    }
                  }}
                >
                  <h3>About</h3>
                </li>
                <li
                  className="rounded-lg p-3 font-medium dark:text-[#b0b3b8] text-[#606266] hover:bg-gray-50 cursor-pointer dark:hover:bg-slate-700 dark:hover:text-white dark:hover:rounded-lg"
                  onClick={() => {
                    const currentUrl = `/profile/friend?id_user=${
                      params.get("id_user") as string
                    }`;
                    // console.log(url);
                    if (url !== currentUrl) {
                      router.push(currentUrl);
                    }
                  }}
                >
                  <h3>Friend</h3>
                </li>
                <li
                  className="rounded-lg p-3 font-medium dark:text-[#b0b3b8] text-[#606266] hover:bg-gray-50 cursor-pointer dark:hover:bg-slate-700 dark:hover:text-white dark:hover:rounded-lg"
                  onClick={() => {
                    const currentUrl = `/profile/photo?id_user=${
                      params.get("id_user") as string
                    }`;
                    // console.log(url);
                    if (url !== currentUrl) {
                      router.push(currentUrl);
                    }
                  }}
                >
                  <h3>Photo</h3>
                </li>
                {/* <li className="rounded-lg p-3 font-medium dark:text-[#b0b3b8] text-[#606266] hover:bg-gray-50 cursor-pointer dark:hover:bg-slate-700 dark:hover:text-white dark:hover:rounded-lg">
                  <Link
                    href={`/profile?id_user=${
                      params.get("id_user") as string
                    }/archive`}
                  >
                    Archive
                  </Link>
                </li>
                <li className="rounded-lg p-3 font-medium dark:text-[#b0b3b8] text-[#606266] hover:bg-gray-50 cursor-pointer dark:hover:bg-slate-700 dark:hover:text-white dark:hover:rounded-lg">
                  <h3
                    onClick={() => {
                      const currentUrl = `/profile/more?id_user=${
                        params.get("id_user") as string
                      }`;
                      // console.log(url);
                      if (url !== currentUrl) {
                        router.push(currentUrl);
                      }
                    }}
                  >
                    More
                  </h3>
                </li>
                <li className="rounded-lg p-3 font-medium dark:text-[#b0b3b8] text-[#606266] hover:bg-gray-50 cursor-pointer dark:hover:bg-slate-700 dark:hover:text-white dark:hover:rounded-lg">
                  <h3
                    onClick={() => {
                      const currentUrl = `/profile/edit?id_user=${
                        params.get("id_user") as string
                      }`;
                      // console.log(url);
                      if (url !== currentUrl) {
                        router.push(currentUrl);
                      }
                    }}
                  >
                    Edit
                  </h3>
                </li> */}
                {/* <h3 onClick={() => {router.replace("/profile/timeline")}}>{link.name}</h3> */}
              </ul>
            </div>
          </div>
          <div>
            <ul className="gap-4">
              <li className="p-1 cursor-pointer">
                <AddFriendButton />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
