"use client";
import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Avatar, Image } from "@nextui-org/react";
import { format } from "date-fns";
import avatarr from "@/static/images/avatar.jpg";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hooks/store";
import { MessageBoxType, MessengerType, UserMessageType } from "@/app/types";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import { failPopUp } from "@/app/hooks/features/popup.slice";
import { useMessenger } from "../useContextlistMess";

interface MessageBoxProps {
  isOwn: boolean;
  conversationId: String;
  setIsOwn: React.Dispatch<React.SetStateAction<boolean>>;
  messenger: MessengerType;
  boxMessage: MessageBoxType;
}

export default function MessageBox({
  isOwn,
  messenger,
  boxMessage,
  setIsOwn,
}: MessageBoxProps) {
  // const isOwn = false;
  const image = false;

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden rounded-2xl",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100"
  );
  // const { listMessenger, setListMessenger } = useMessenger();
  // const httpPrivate = useHttp();
  // const controller = useMemo(() => new AbortController(), []);
  // const router = useRouter();
  // const dispatch = useAppDispatch();

  // const [boxMessage, setBoxMessage] = useState<MessageBoxType>();
  // const [uniqueLastNames, setUniqueLastNames] = useState<string[]>([]);
  // const [uniqueMembers, setUniqueMembers] = useState<UserMessageType[]>([]);
  // const [offset, setOffset] = useState<number>(0);
  // // const [listMessenger, setListMessenger] = useState<MessengerType[]>([]);

  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );

  useEffect(() => {
    setIsOwn(data?.data.id == messenger?.senderId);
  }, [data?.data.id, messenger?.senderId, setIsOwn]);
  // useEffect(() => {
  //   const getUserInfo = async () => {
  //     const token = getLocalStorage()?.token;
  //     if (!token) return;
  //     try {
  //       const response = await httpPrivate.get(
  //         `/room/${conversationId}/messages?page=${offset + 1}&size=10`,
  //         {
  //           signal: controller.signal,
  //         }
  //         // {
  //         //   headers: {
  //         //     Authorization: `Bearer ${token}`,
  //         //   },
  //         // }
  //       );
  //       controller.abort();
  //       if (response.data.status === 200) {
  //         const listMessenger = response.data.data;
  //         // console.log(friendsData);
  //         setListMessenger(listMessenger);
  //       } else {
  //         dispatch(failPopUp(response.data.message));
  //       }
  //     } catch (error) {
  //       // console.error("Error:", error);
  //     }
  //   };
  //   getUserInfo();
  // }, [
  //   controller,
  //   conversationId,
  //   dispatch,
  //   httpPrivate,
  //   offset,
  //   setListMessenger,
  // ]);

  // useEffect(() => {
  //   async function getListBoxChat() {
  //     try {
  //       const response = await httpPrivate.get(`room/${conversationId}`, {
  //         signal: controller.signal,
  //       });
  //       controller.abort();
  //       if (response.data.status === 200) {
  //         setBoxMessage(response.data.data);
  //       } else {
  //         dispatch(failPopUp(response.data.message));
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   }
  //   getListBoxChat();
  // }, [controller, dispatch, httpPrivate, conversationId]);

  // // useEffect(() => {
  // //   if (boxMessage?.name) {
  // //     const parts = boxMessage.name.split(", ");
  // //     const lastName = parts.filter(
  // //       (part) => !part.includes(data?.data?.lastname!)
  // //     );
  // //     setUniqueLastNames((prevLastNames) => [...lastName]);
  // //   }
  // // }, [data?.data?.lastname, boxMessage?.name]);

  // useEffect(() => {
  //   const idToRemove = data?.data?.id;
  //   const members = boxMessage?.members as UserMessageType[];
  //   setUniqueMembers(members?.filter((member) => member.id !== idToRemove));
  // }, [data?.data?.id, boxMessage?.members]);

  const statusText = useMemo(() => {
    if (0) {
      return `10 member`;
    }
    return `Active`;
  }, []);

  return (
    <>
      <div className={container}>
        <div className={avatar}>
          {isOwn ? (
            <Avatar
              // src={uniqueMembers
              //   ?.map((item) => item.profile.avatar_url)
              //   .join(",")}
              src={data?.data?.profile?.avatar_url}
            />
          ) : (
            <Avatar
              src={
                boxMessage?.members?.find(
                  (member) => member.id === messenger.senderId
                )?.profile?.avatar_url as string
              }
            />
          )}
        </div>
        <div className={body}>
          <div className="flex items-center gap-1">
            <div className="text-sm text-gray-500">Bạn</div>
          </div>
          <div className={message}>
            <div className={message}>
              {messenger.content &&
              (messenger.content.endsWith(".jpg") ||
                messenger.content.endsWith(".mp4")) ? (
                messenger.content.endsWith(".mp4") ? (
                  <video
                    src={ messenger.content}
                    width="200"
                    height="50"
                    controls
                  ></video>
                ) : (
                  <Image
                    isBlurred
                    width={100}
                    src={ messenger.content}
                    alt= ""
                    className="m-3 hover:bg-opacity-50 transition duration-300"
                  />
                )
              ) : (
                <div className="p-3">{messenger.content}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
