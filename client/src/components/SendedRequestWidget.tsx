import useHttp from '@/app/hooks/customs/useAxiosPrivate';
import { failPopUp, successPopUp } from '@/app/hooks/features/popup.slice';
import { useAppDispatch } from '@/app/hooks/store';
import { FriendRequest } from '@/app/types';
import { Image } from "@nextui-org/react";
import React, { useMemo, useState } from 'react'
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
      const response = await httpPrivate.post(`/friend/cancel/${request?.id}`, {
        signal: controller.signal,
      });
      controller.abort();
      if (response.data.status === 200) {
        setResponed(true);
        dispatch(successPopUp("Friend request rejected"));
      } else {
        dispatch(failPopUp(response.data.message));
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  }
  if (responed) {
    return null;
  }
  return (
    <>
      <div className="requestProfile">
        <div className="details">
          <div className="profileImage">
            <Image src={request.receiverAvatar} alt="" />
          </div>
          <div className="userDetails">
            <div className="name">{request.receiverName}</div>
            <div className="username">@{request.receiverUsername}</div>
          </div>
        </div>
        <div className="actions">
          {/* <button className="actionBtn" onClick={handleAccept}>
            Accept
          </button> */}
          <button className="actionBtn" onClick={handleDelete}>
            Cancel
          </button>
        </div>
      </div>
      {/* <div className="userDetails">
        <div className="name">{request.senderName}</div>
        <div className="username">@{request.senderUsername}</div>
      </div> */}
    </>
  )
}
