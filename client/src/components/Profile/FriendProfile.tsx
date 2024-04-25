import Link from "next/link";
import React, { useState } from "react";
import FriendForm from "../FriendForm";
import { ListFriendType } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useListFriend } from "@/app/actions/custom/useListFriend";

export default function FriendProfile() {
  const [friends, setFiends] = useState<ListFriendType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useSearchParams();

  useListFriend(setFiends, setLoading, params.get("id_user") as string);

  return (
    <>
      <div className="bg-[#ffffff] dark:bg-[#242526] rounded-lg mb-4 shrink drop-shadow-2xl dark:text-white w-full ml-48 mr-48 mt-4">
        <div className="flex justify-between">
          <h1 className="ml-5 mt-5 font-bold text-xl dark:text-white">
            Bạn bè
          </h1>
          <Link
            href="/friend"
            className="ml-5 mr-5 mt-5 text-sm dark:text-blue-500 text-blue-500 "
          >
            Lời mời kết bạn
          </Link>
        </div>
        <div className="grid grid-cols-2 justify-items-center shrink mt-5">
          {friends.map((friend: ListFriendType, index: number) => (
            <FriendForm key = {index} data = {friend}/>
          ))}
        </div>
      </div>
    </>
  );
}
