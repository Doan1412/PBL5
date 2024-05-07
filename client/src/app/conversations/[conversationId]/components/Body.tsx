"use client";
import useConversation from "@/app/hooks/customs/useConversation";
import {
  FullMessageType,
  MessageBoxType,
  MessengerType,
  UserMessageType,
} from "@/app/types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import { useMessenger } from "../useContextlistMess";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hooks/store";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import { failPopUp } from "@/app/hooks/features/popup.slice";
import { useStompClient } from "../../useContextStorm";

interface BodyProps {
  conversationId: String;
}

export default function Body({ conversationId }: BodyProps) {
  // const [messages, setMessages] = useState(initialMessage);

  // const { conversationId } = useConversation();
  const [isOwn, setOwn] = useState<boolean>(false);
  const { listMessenger, setListMessenger } = useMessenger();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [boxMessage, setBoxMessage] = useState<MessageBoxType>();
  const [uniqueLastNames, setUniqueLastNames] = useState<string[]>([]);
  const [uniqueMembers, setUniqueMembers] = useState<UserMessageType[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const { payloadData } = useStompClient();
  const [isOwnList, setIsOwnList] = useState<boolean[]>([]);

  console.log(payloadData)

  useEffect(() => {
    console.log("test1");
    if (payloadData) {
      console.log("test2");
      setListMessenger((prev) => [...prev, payloadData]);
    }
  }, [payloadData, setListMessenger]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  // const [listMessenger, setListMessenger] = useState<MessengerType[]>([]);

  useEffect(() => {
    scrollToBottom();
  }, [listMessenger]);

  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );

  useEffect(() => {
    const getUserInfo = async () => {
      const token = getLocalStorage()?.token;
      if (!token) return;
      try {
        const response = await httpPrivate.get(
          `/room/${conversationId}/messages?page=${offset + 1}&size=10`,
          {
            signal: controller.signal,
          }
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        controller.abort();
        if (response.data.status === 200) {
          const listMessenger = response.data.data;
          // console.log(friendsData);
          setListMessenger(listMessenger);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        // console.error("Error:", error);
      }
    };
    getUserInfo();
  }, [
    controller,
    conversationId,
    dispatch,
    httpPrivate,
    offset,
    setListMessenger,
  ]);

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

  // useEffect(() => {
  //   if (boxMessage?.name) {
  //     const parts = boxMessage.name.split(", ");
  //     const lastName = parts.filter(
  //       (part) => !part.includes(data?.data?.lastname!)
  //     );
  //     setUniqueLastNames((prevLastNames) => [...lastName]);
  //   }
  // }, [data?.data?.lastname, boxMessage?.name]);

  useEffect(() => {
    const idToRemove = data?.data?.id;
    const members = boxMessage?.members as UserMessageType[];
    setUniqueMembers(members?.filter((member) => member.id !== idToRemove));
  }, [data?.data?.id, boxMessage?.members]);

  return (
    <div className="flex-1 overflow-y-auto">
      {listMessenger?.map((item, index) => (
        <MessageBox
          key={index}
          isOwn={data?.data?.id == item.senderId ? true : false}
          setIsOwn={setOwn}
          conversationId={conversationId}
          messenger={item as MessengerType}
          boxMessage={boxMessage as MessageBoxType}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
