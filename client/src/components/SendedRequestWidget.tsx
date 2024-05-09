import { FriendRequest } from '@/app/types';
import { Image } from "@nextui-org/react";
import React from 'react'
interface RequestProps {
    request: FriendRequest;
  }
export default function SendedRequestWidget({ request }: RequestProps) {
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
          <button className="actionBtn">
            Delete
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
