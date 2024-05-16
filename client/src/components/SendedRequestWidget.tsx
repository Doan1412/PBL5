import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { failPopUp, successPopUp } from "@/app/hooks/features/popup.slice";
import { useAppDispatch } from "@/app/hooks/store";
import { FriendRequest } from "@/app/types";
import { Button, Image } from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import { FaRegUser } from "react-icons/fa";
interface RequestProps {
  request: FriendRequest;
}
export default function SendedRequestWidget({ request }: RequestProps) {
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [responed, setResponed] = useState(false);
  const handleDelete = async () => {
    try {
      const response = await httpPrivate.delete(
        `/friend/cancel/${request?.id}`
        // {
        //   signal: controller.signal,
        // }
      );
      // controller.abort();
      if (response.data.status === 200) {
        setResponed(true);
        dispatch(successPopUp("Friend request cancel successfully!!!"));
      } else {
        dispatch(failPopUp(response.data.message));
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };
  if (responed) {
    return null;
  }
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
            onClick={handleDelete}
          >
            Cancel
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
