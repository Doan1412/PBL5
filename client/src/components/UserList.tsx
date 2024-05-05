"use client";
import React, { useEffect, useMemo, useState } from "react";
import UserBox from "./UserBox";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hooks/store";
import { MessageBoxType } from "@/app/types";
import { failPopUp } from "@/app/hooks/features/popup.slice";

export default function UserList() {
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const dispatch = useAppDispatch();

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
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">People</div>
          <div className="">
            {Array.isArray(listBoxMessage) &&
              listBoxMessage?.map((item, index) => (
                <UserBox key={index} dataBox={item} />
              ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
