import { FriendRequest } from "@/app/types";
import { Button, Image } from "@nextui-org/react";
import React from "react";
import { FaRegUser } from "react-icons/fa";

interface RequestProps {
  request: FriendRequest;
}
export default function SendedRequestWidget({ request }: RequestProps) {
  return (
    <>
      <div className="flex my-3 scale-95 bg-white shadow-md p-1 rounded-xl pt-5 dark:bg-[#242526] w-60">
        <div className="flex ml-2">
          <div className="rounded-full w-10">
            <Image src={request.receiverAvatar} alt="" />
          </div>
          <div className="text-gray-600 !font-semibold dark:text-[#b0b3b8]">
            <div className="text-gray-600 !font-semibold dark:text-[#b0b3b8]">
              {request.receiverName}
            </div>
            <div className="text-xs text-gray-600 dark:text-white">
              @{request.receiverUsername}
            </div>
          </div>
        </div>
        <div className="flex justify-center flex-1 my-3">
          {/* <button className="actionBtn" onClick={handleAccept}>
            Accept
          </button> */}
          <Button
            color="danger"
            size="sm"
            className="bg-gray-200 text-red-600 w-1/2" // Thiết lập kích thước cho button
            startContent={<FaRegUser />}
          >
            Delete
          </Button>
        </div>
      </div>
      {/* <div className="userDetails">
        <div className="name">{request.senderName}</div>
        <div className="username">@{request.senderUsername}</div>
      </div> */}
    </>
  );
}
