"use client";
import React, { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import {
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineBookmark,
} from "react-icons/hi2";
import { HiOutlineShare } from "react-icons/hi";
import { motion } from "framer-motion";
import { Avatar, Card, CardBody, CardHeader, Image, Input } from "@nextui-org/react";
import Widget from "@/app/widget";

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
  const [showComment, setShowComment] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const toggleComment = () => {
    if (!isClicked) {
      setShowComment(!showComment);
      setIsClicked(true);

      setTimeout(() => {
        setIsClicked(false);
      }, 500);
    }
  };

  return (
    <Widget>
      <div className="postWrapper dark:bg-[#242526]">
        <div className="header">
          <div className="left">
            <Image
              src={`${userData.profilePic}`}
              alt=""
              className="profileImg"
            />
            <div className="userDetails">
              <div className="name">{userData.name}</div>
              <div className="feeling">@johndoe</div>
            </div>
          </div>
          <div className="right">
            <div className="option ">
              <FaEllipsisH />
            </div>
          </div>
        </div>
        <div className="feeling"><p className="dark:text-white">Hello Word</p></div>
        <div className="mainPostContent cursor-zoom-in hover:skew-y-1">
          <motion.img
            src={userData.postImg}
            alt=""
            className="postImage"
            onClick={() => setOpen(!open)}
            animate={{ scale: open ? 2 : 1 }}
          />
        </div>
        <div className="postFooter flex flex-col">
          <div className="postActions">
            <div className="left">
              <div className="text-white">
                <HiOutlineHeart />
              </div>
              <div className="commentBtn" onClick={toggleComment}>
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
          {showComment && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <div>
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" />
                </div>
                <div>
                  <Card className="dark:bg-[#3a3b3c] bg-[#f0f2f5]">
                    <CardHeader className="justify-between">
                      <div className="flex">
                        <div className="flex flex-col items-start justify-center">
                          <h4 className="text-sm font-semibold leading-none text-default-600">
                            Zoey Lang{" "}
                            <span className="ml-2 text-sm text-gray-500">
                              @zoeylang
                            </span>
                          </h4>
                          <p className="text-base">Make beautiful</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center">
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" size="sm" />
                </div>
                <div className="basis-full">
                  <Input
                    key= "full"
                    radius= "full"
                    type="text"
                    placeholder="Viết bình luận..."
                    size="sm"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Widget>
  );
};

export default Post;
