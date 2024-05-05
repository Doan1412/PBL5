"use client";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { failPopUp } from "@/app/hooks/features/popup.slice";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { useAppDispatch } from "@/app/hooks/store";
import {
  ConversationType,
  MessageBoxType,
  UserMessageType,
  UserType,
} from "@/app/types";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
  conversationId: String;
}

export default function Header({ conversationId }: HeaderProps) {
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [boxMessage, setBoxMessage] = useState<MessageBoxType>();
  const [uniqueLastNames, setUniqueLastNames] = useState<string[]>([]);
  const [uniqueMembers, setUniqueMembers] = useState<UserMessageType[]>([]);

  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );

  useEffect(() => {
    async function getListBoxChat() {
      try {
        const response = await httpPrivate.get(`room/${conversationId}`, {
          signal: controller.signal,
        });
        controller.abort();
        if (response.data.status === 200) {
          setBoxMessage(response.data.data);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getListBoxChat();
  }, [controller, dispatch, httpPrivate, conversationId]);

  useEffect(() => {
    if (boxMessage?.name) {
      const parts = boxMessage.name.split(", ");
      const lastName = parts.filter(
        (part) => !part.includes(data?.data?.lastname!)
      );
      setUniqueLastNames((prevLastNames) => [...lastName]);
    }
  }, [data?.data?.lastname, boxMessage?.name]);

  useEffect(() => {
    const idToRemove = data?.data?.id;
    const members = boxMessage?.members as UserMessageType[];
    setUniqueMembers(members?.filter((member) => member.id !== idToRemove));
  }, [data?.data?.id, boxMessage?.members]);

  const statusText = useMemo(() => {
    if (0) {
      return `10 member`;
    }
    return `Active`;
  }, []);
  return (
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          href="/conversations"
        >
          <HiChevronLeft size={32} />
        </Link>
        {boxMessage?.members?.length == 2 ? (
          <Avatar
            src={uniqueMembers?.map((item) => item.profile.avatar_url).join(",")}
          />
        ) : (
          <AvatarGroup
            isBordered
            max={1}
            total={boxMessage?.members?.length! - 1}
          >
            {uniqueMembers?.map((item, index) => (
              <Avatar key={index} src={item.profile.avatar_url} />
            ))}
          </AvatarGroup>
        )}
        <div className="flex flex-col">
          <div className="font-semibold"> {uniqueLastNames.join(", ")}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
      />
    </div>
  );
}
