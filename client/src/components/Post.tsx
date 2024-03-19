"use client";
import React, { useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import {
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineBookmark,
} from "react-icons/hi2";
import { HiOutlineShare } from "react-icons/hi";
import { motion } from "framer-motion";
import { Image } from "@nextui-org/react";

interface UserData {
  profilePic: string;
  name: string;
  postImg: string;
}

interface PostProps {
  userData: UserData;
}

const Post: React.FC<PostProps> = ({ userData }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="postWrapper">
        <div className="header">
          <div className="left">
            <Image
              src={`${userData.profilePic}`}
              alt=""
              className="profileImg"
            />
            <div className="userDetails">
              <div className="name">{userData.name}</div>
              <div className="feeling">Hello Word</div>
            </div>
          </div>
          <div className="right">
            <div className="option">
              <FaEllipsisH />
            </div>
          </div>
        </div>
        <div className="mainPostContent cursor-zoom-in hover:skew-y-1">
          <motion.img
            src={userData.postImg}
            alt=""
            className="postImage"
            onClick={() => setOpen(!open)}
            animate={{ scale: open ? 2 : 1 }}
          />
        </div>
        <div className="postFooter">
          <div className="postActions">
            <div className="left">
              <div className="likeBtn">
                <HiOutlineHeart />
              </div>
              <div className="commentBtn">
                <HiOutlineChatBubbleOvalLeftEllipsis />
              </div>
              <div className="shareBtn">
                <HiOutlineShare />
              </div>
            </div>
            <div className="right">
              <div className="saveBtn">
                <HiOutlineBookmark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
