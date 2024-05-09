import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import AddFriendButton from "./AddFriendButton";
import { Button, Image } from "@nextui-org/react";
import { IoMdPersonAdd } from "react-icons/io";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { useAppDispatch } from "@/app/hooks/store";
import { failPopUp } from "@/app/hooks/features/popup.slice";
import { FaRegUser } from "react-icons/fa";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { useSearchParams } from "next/navigation";
import { BsPersonDash } from "react-icons/bs";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import avatarDefault from "@/static/images/avatarDefault.jpg";

interface FriendCardProps {
  id: string;
  avatar: string;
  fullname: string;
  username: string;
}

export default function FriendCard({
  id,
  avatar,
  fullname,
  username,
}: FriendCardProps) {
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useAppDispatch();
  const [responed, setResponed] = useState(false);
  const [isWaitingConfirmation, setIsWaitingConfirmation] = useState(false);
  const params = useSearchParams();
  const [userId, setUserId] = useState<string>("");

  const { data, isFetching } = useGetUserInfoQuery(
    params.get("id_user") as string
  );

  useEffect(() => {
    setUserId(getLocalStorage()?.user_id || "");
  }, []);

  function handleDelete() {
    setResponed(true);
  }

  const handleFriendButtonClick = async () => {
    try {
      const response = await httpPrivate.post(
        `/friend/send_friend_request/${id}`,
        {
          signal: controller.signal,
        }
      );
      controller.abort();
      if (response.data.status === 200) {
        setIsWaitingConfirmation(true);
        // Xử lý logic khi thêm bạn thành công
      } else {
        dispatch(failPopUp(response.data.message));
      }
    } catch (error) {
      console.error("Error:", error);
      // Xử lý logic khi gặp lỗi
    }
  };
  if (responed) {
    return null;
  }
  return (
    <div className="flex flex-col justify-center border outline-none shadow-xl rounded-xl w-72 h-fit overflow-hidden hover:opacity-80">
      <div className="flex flex-col justify-center">
        <Link
          href={{
            pathname: "profile/timeline",
            query: { id_user: id },
          }}
          title={username}
        >
          <div className="flex items-center justify-center overflow-hidden w-75 h-50">
            <Image
              src={avatar ? avatar : avatarDefault.src}
             
              alt={username}
              title={username}
              className="object-cover h-[250px] w-full"
            />
            {/* <img
              src={avatar}
              alt={username}
              title={username}
              className="object-cover h-[250px] w-full"
            /> */}
          </div>
        </Link>
        <div className="flex flex-col p-2">
          <span className="font-bold uppercase truncate">{fullname}</span>
          <span className="italic truncate">{username}</span>
        </div>
        <div className="flex justify-around p-2 gap-2">
          {id !== userId && (
            <div className="p-1 cursor-pointer">
              {isWaitingConfirmation ? (
                <div>
                  <Button size="sm" className="bg-blue-600 text-white">
                    <div className="flex justify-between gap-2">
                      <div className="flex items-center">
                        <BsPersonDash />
                      </div>
                      <p>Pending</p>
                    </div>
                  </Button>
                </div>
              ) : (
                <div>
                  {/* <AddFriendButton handleFriendButtonClick = {}/> */}
                  <Button
                    className="bg-blue-600 text-white"
                    onClick={() => handleFriendButtonClick()}
                    size="sm"
                  >
                    <div className="flex justify-between gap-2">
                      <div className="flex items-center">
                        <IoMdPersonAdd />
                      </div>
                      <p>Add Friend</p>
                    </div>
                  </Button>
                </div>
              )}
            </div>
          )}
          {/* <Button
                        size="sm"
                        className="bg-blue-600 text-white w-1/2" // Thiết lập kích thước cho button
                        onClick={
                            handleFriendButtonClick
                        }
                    >
                        <div className="flex items-center">
                            <IoMdPersonAdd />
                            <p className="ml-1">Add Friend</p>
                        </div>
                    </Button> */}
          <Button
            color="danger"
            size="sm"
            className="bg-gray-200 text-red-600 w-1/2" // Thiết lập kích thước cho button
            startContent={<FaRegUser />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
