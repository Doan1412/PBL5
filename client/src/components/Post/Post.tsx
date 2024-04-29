"use client";
import React, { useEffect, useMemo, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import {
    HiOutlineHeart,
    HiOutlineChatBubbleOvalLeftEllipsis,
    HiOutlineBookmark,
} from "react-icons/hi2";
import { HiOutlineShare } from "react-icons/hi";
import { motion } from "framer-motion";
import {
    Avatar,
    Card,
    CardBody,
    CardHeader,
    Image,
    Input,
} from "@nextui-org/react";
import Widget from "@/app/widget";
import { PiHeartDuotone } from "react-icons/pi";
import "./style.css";
import { TbMessageCircle } from "react-icons/tb";
import { Attachment, PostType } from "@/app/types";
import CommentForm from "../CommentForm";
import { useRouter } from "next/navigation";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { useAppDispatch } from "@/app/hooks/store";
import { failPopUp } from "@/app/hooks/features/popup.slice";

interface UserData {
    profilePic: string;
    name: string;
    postImg: string;
}

interface PostProps {
    postData: PostType;
}

const Post: React.FC<PostProps> = ({ postData }: PostProps) => {
    const [open, setOpen] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const router = useRouter();
    const httpPrivate = useHttp();
    const controller = useMemo(() => new AbortController(), []);
    const [loading, setLoading] = useState(true);
    // const dispatch = useAppDispatch();
    const dispatch = useAppDispatch();
    const toggleComment = () => {
        if (!isClicked) {
            setShowComment(!showComment);
            setIsClicked(true);

            setTimeout(() => {
                setIsClicked(false);
            }, 500);
        }
    };

    const [liked, setLiked] = useState<boolean>(postData?.like as boolean);
    const [likesAmount, setLikesAmount] = useState<number>(
        postData?.like_count as number
    );

    const handleLikeClick = async () => {
        liked ? unlike() : like();
        setLiked((prevLiked) => !prevLiked);
        setLikesAmount((prevLikesAmount) =>
            liked ? prevLikesAmount - 1 : prevLikesAmount + 1
        );
    };
    const unlike = async () => {
        // unlike post
        try {
            const response = await httpPrivate.post(
                `/post/${postData?.id}/unlike`,
                {
                    signal: controller.signal,
                }
                // {
                //   headers: {
                //     Authorization: `Bearer ${token}`,
                //   },
                // }
            );
            controller.abort();
            if (response.data.status === 200) {
                setLoading(false);
            } else {
                dispatch(failPopUp(response.data.message));
            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };
    const like = async () => {
        // like post
        try {
            const response = await httpPrivate.post(
                `/post/${postData?.id}/like`,
                {
                    signal: controller.signal,
                }
                // {
                //   headers: {
                //     Authorization: `Bearer ${token}`,
                //   },
                // }
            );
            controller.abort();
            if (response.data.status === 200) {
                setLoading(false);
            } else {
                dispatch(failPopUp(response.data.message));
            }
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

    

    return (
        <Widget>
            <div className="postWrapper dark:bg-[#242526]">
                <div className="header">
                    <div className="left">
                        <Image
                            src={
                                postData?.avatarUrl != ""
                                    ? postData.avatarUrl
                                    : avatarDefault.src
                            }
                            alt=""
                            className="profileImg"
                            onClick={() =>
                                router.push(
                                    `/profile?id_user=${postData?.userId}`
                                )
                            }
                        />
                        <div className="userDetails">
                            <div
                                className="name"
                                onClick={() =>
                                    router.push(
                                        `/profile?id_user=${postData?.userId}`
                                    )
                                }
                            >
                                {postData?.fullName}
                            </div>
                            <div className="feeling">@{postData?.username}</div>
                            <div className="feeling">
                                {postData?.created_at?.slice(0, 10)}{" "}
                                {postData?.created_at?.slice(11, 19)}
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="option ">
                            <FaEllipsisH />
                        </div>
                    </div>
                </div>
                <div className="feeling">
                    <p className="dark:text-white">{postData?.content}</p>
                </div>
                <div className="mainPostContent cursor-zoom-in hover:skew-y-1">
                    <motion.img
                        src={postData?.attachments?.[0]?.url}
                        alt=""
                        className="postImage"
                        onClick={() => setOpen(!open)}
                        animate={{ scale: open ? 2 : 1 }}
                    />
                </div>
                <div className="postFooter flex flex-col">
                    <div className="postActions">
                        <div className="left gap-3">
                            <div
                                className="heart-container"
                                onClick={handleLikeClick}
                            >
                                <svg
                                    className={`heart ${liked ? "liked" : ""}`}
                                    width="800px"
                                    height="800px"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div>
                                <p className="dark:text-white">{likesAmount}</p>
                            </div>
                            <div className="" onClick={toggleComment}>
                                <TbMessageCircle />
                            </div>
                            <div className="" >
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
                            <CommentForm />
                            <CommentForm />
                            <div className="flex gap-3">
                                <div className="flex items-center">
                                    <Avatar
                                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                        size="sm"
                                    />
                                </div>
                                <div className="basis-full">
                                    <Input
                                        key="full"
                                        radius="full"
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
