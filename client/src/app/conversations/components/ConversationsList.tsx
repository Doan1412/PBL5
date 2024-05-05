"use client"
import useConversation from "@/app/hooks/customs/useConversation";
import { FullMessageType, MessageBoxType } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { useAppDispatch } from "@/app/hooks/store";
import { failPopUp } from "@/app/hooks/features/popup.slice";

interface ConversationsProps {
  initialItems: FullMessageType;
}

export default function ConversationsList(initialItems: ConversationsProps) {
  const [items, setItems] = useState(initialItems);
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { conversationId, isOpen } = useConversation();
  const [listBoxMessage, setListBoxMessage] = useState<MessageBoxType[]>([]);

  useEffect(() => {
    async function getListBoxChat() {
      try {
        const response = await httpPrivate.get(`/room`, {
          signal: controller.signal,
        });
        controller.abort();
        if (response.data.status === 200) {
          setListBoxMessage(response.data.data);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getListBoxChat();
  }, [controller, dispatch, httpPrivate]);

  return (
    <div>
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messenger</div>
            <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {Array.isArray(listBoxMessage) && listBoxMessage?.map((item, index) => (
            <ConversationBox key={index} dataBox = {item}/>
          ))}
        </div>
      </aside>
    </div>
  );
}
