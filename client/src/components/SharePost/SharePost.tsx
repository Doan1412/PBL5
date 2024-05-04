"use client";
import React, { useState, useRef, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import Post from "@/components/Post/Post";
import Navigation from "@/components/Navigation";
import SkeletonPost from "@/components/SkeletonPost/SkeletonPost";
import { FaCheck, FaEllipsisH, FaRegPaperPlane } from "react-icons/fa";
import { HiOutlineBookmark } from "react-icons/hi2";
import { HiOutlineShare } from "react-icons/hi";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
  user,
} from "@nextui-org/react";
import Widget from "@/app/widget";
import "./style.css";
import { TbMessageCircle } from "react-icons/tb";
import {
  CommentAttachment,
  CommentType,
  FriendRequest,
  PostType,
  SharePostType,
} from "@/app/types";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CldUploadButton } from "next-cloudinary";
import { IoMdImages } from "react-icons/io";
import { useRouter } from "next/navigation";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { useAppDispatch } from "@/app/hooks/store";
import { failPopUp, successPopUp } from "@/app/hooks/features/popup.slice";
import "./style.css";
import CommentForm from "../CommentForm";
import ReactComment from "../ReactComment/ReactComment";
import { getLocalStorage } from "@/app/actions/localStorage_State";

interface PropsSharePost {
  dataSharePost: SharePostType;
  dataPostOrigin: PostType[];
}

export default function SharePost(props: PropsSharePost) {
  const { dataSharePost, dataPostOrigin } = props;

  const ref = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [originalPosts, setOriginalPosts] = useState<PostType[]>([]);
  const router = useRouter();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useAppDispatch();
  const [liked, setLiked] = useState<boolean>(dataSharePost?.like as boolean);
  const [likesAmount, setLikesAmount] = useState<number>(
    dataSharePost?.like_count as number
  );
  const [showComment, setShowComment] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [listCmt, setListCmt] = useState<CommentType[]>([]);
  const [currentCmt, setCurrentCmt] = useState<CommentType | null>(null);
  const [comment, setComment] = useState<string>("");
  const [imageCmt, setImageCmt] = useState<CommentAttachment[]>([]);

  const handleRemoveImage = (index: number) => {
    const updatedImagePost = [...imageCmt];
    updatedImagePost.splice(index, 1);
    setImageCmt(updatedImagePost);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

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
        `/post/share/${dataSharePost?.id}/unlike`,
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
        `/post/share/${dataSharePost?.id}/like`,
        {
          signal: controller.signal,
        }
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

  const toggleComment = () => {
    if (!isClicked) {
      setShowComment(!showComment);
      setIsClicked(true);

      setTimeout(() => {
        setIsClicked(false);
      }, 500);
    }
  };

  const getComment = async () => {
    // getComment post
    if (!localStorage.getItem("access_token")) return;
    const token = localStorage.getItem("access_token")?.toString();
    try {
      const response = await httpPrivate.get(
        `/comment/share/${dataSharePost?.id}`,
        {
          signal: controller.signal,
        }
      );
      if (response.data.status === 200) {
        const listCmt = response.data.data;
        setListCmt(listCmt);
        // setLoading(false);
      } else {
        dispatch(failPopUp(response.data.message));
      }
    } catch (error) {
      // console.error("Error:", error);
      // setLoading(false);
    }
  };

  const startEditCmt = (id: string) => {
    const findedCmt = listCmt.find((cmt) => cmt.id === id);
    if (findedCmt) {
      setCurrentCmt(findedCmt);
    }
  };

  const editCmt = (content: string) => {
    setCurrentCmt((prev) => {
      if (prev) return { ...prev, content };
      return null;
    });
  };

  const findIdComment = (cmtObj: CommentType[]): string | undefined => {
    const foundCmt = cmtObj.find(
      (cmt) => cmt.id === (currentCmt as CommentType).id
    );
    if (foundCmt) {
      return currentCmt?.id as string;
    }
    return undefined;
  };

  const finishEditCmt = async () => {
    const token = getLocalStorage()?.token;
    if (!token) return;
    try {
      console.log(findIdComment(listCmt));
      const response = await httpPrivate.put(
        `/post/${findIdComment(listCmt)}`,
        {
          content: currentCmt?.content,
        },
        {
          signal: controller.signal,
        }
      );
      controller.abort();
      if (response.data.status == 200) {
        const handler = (cmtObj: CommentType[]) => {
          return cmtObj.map((cmt) => {
            if (cmt.id === (currentCmt as CommentType).id) {
              return currentCmt as CommentType;
            }
            return cmt;
          });
        };
        setListCmt(handler);
        setCurrentCmt(null);
        dispatch(successPopUp("Chỉnh sửa comment thành công! 😘"));
      } else {
        dispatch(
          failPopUp(
            "Error:" + response.data.message + "Chỉnh sửa comment thất bại! 😢"
          )
        );
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  const Comment = async () => {
    // comment post
    try {
      const response = await httpPrivate.post(
        `/post/share/comment`,
        {
          content: comment,
          attachments: imageCmt,
          postId: dataSharePost?.id,
        },
        {
          signal: controller.signal,
        }
      );
      controller.abort();
      if (response.data.status === 200) {
        setListCmt((prev) => [response.data.data, ...prev]);
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
    <>
      <div className="postWrapper dark:bg-[#242526]">
        <div className="header">
          <div className="left">
            <Image
              src={
                dataSharePost?.sharedBy?.avatar_url != ""
                  ? dataSharePost?.sharedBy?.avatar_url
                  : avatarDefault.src
              }
              alt=""
              className="profileImg"
              onClick={() =>
                router.push(`/profile?id_user=${dataSharePost?.sharedBy?.id}`)
              }
            />
            <div className="userDetails">
              <div
                className="name"
                onClick={() =>
                  router.push(`/profile?id_user=${dataSharePost?.sharedBy?.id}`)
                }
              >
                {dataSharePost?.sharedBy?.fullname}
              </div>
              <div className="feeling">
                @{dataSharePost?.sharedBy?.username}
              </div>
              <div className="feeling">
                {dataSharePost?.created_at?.slice(0, 10)}{" "}
                {dataSharePost?.created_at?.slice(11, 19)}
              </div>
            </div>
          </div>
          {/* <div className="right">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light">
              <FaEllipsisH />
            </Button>
          </DropdownTrigger>
          {user_id == postData.userId ? (
            <DropdownMenu aria-label="Example with disabled actions">
              <DropdownItem key="edit">
                Chỉnh sửa bài viết
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onClick={() => {
                  handleDeletePost();
                }}
              >
                Xóa bài viết
              </DropdownItem>
            </DropdownMenu>
          ) : (
            <DropdownMenu aria-label="Example with disabled actions">
              <DropdownItem key="report">
                Báo cáo
              </DropdownItem>
            </DropdownMenu>
          )}
        </Dropdown>
      </div> */}
        </div>
        <div className="feeling">
          <p className="dark:text-white">{dataSharePost?.caption}</p>
        </div>
        <div>
          <Post
            postData={dataSharePost?.originalPost}
            setPosts={setOriginalPosts}
            hiddenComment = {true}
          />
        </div>
        <div className="postFooter flex flex-col">
          <div className="postActions">
            <div className="left gap-3">
              <div className="heart-container" onClick={handleLikeClick}>
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
              <div
                onClick={() => {
                  toggleComment();
                  getComment();
                }}
              >
                <TbMessageCircle />
              </div>
              <div className="">
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
              {listCmt?.map((item, index) => (
                <div key={index}>
                  <CommentForm
                    key={index}
                    fullName={item?.fullName}
                    userName={item?.username}
                    avatar={item?.avatarUrl}
                    content={item?.content}
                    created_at={item?.created_at}
                    updated_at={item?.updated_at}
                    urlImage={item?.attachments}
                    id_userCmt={item?.userId}
                    id_userPost={dataSharePost?.sharedBy?.id}
                    setListCmt={setListCmt}
                    id_Cmt={item?.id}
                    startEditCmt={startEditCmt}
                    currentCmt={currentCmt}
                    setCurrentCmt={setCurrentCmt}
                  />
                  <div className="postActions ml-7">
                    <ReactComment
                      dataComment={item}
                      avatarPost={dataSharePost?.sharedBy?.avatar_url}
                    />
                  </div>
                </div>
              ))}

              <div className="flex gap-3">
                <div className="flex items-center">
                  <Avatar
                    src={
                      dataSharePost?.sharedBy?.avatar_url != ""
                        ? dataSharePost?.sharedBy?.avatar_url
                        : avatarDefault.src
                    }
                    size="sm"
                  />
                </div>
                <div className="basis-full flex gap-1">
                  <Input
                    key="full"
                    radius="full"
                    type="text"
                    placeholder="Viết bình luận..."
                    size="sm"
                    value={currentCmt ? currentCmt.content : comment}
                    onChange={(e) => {
                      if (currentCmt) {
                        editCmt(handleInputChange(e));
                      } else {
                        setComment(handleInputChange(e));
                      }
                    }}
                  />
                  <div>
                    <CldUploadButton
                      options={{ maxFiles: 5 }}
                      onSuccess={(result: any) => {
                        const secureUrl = result?.info?.secure_url;
                        if (secureUrl) {
                          setImageCmt((prevImagePost) => [
                            ...prevImagePost,
                            { url: secureUrl, type: "image" },
                          ]);
                        }
                      }}
                      uploadPreset="s2lo0hgq"
                    >
                      <IoMdImages
                        size={25}
                        className="text-green-700 cursor-pointer"
                      />
                    </CldUploadButton>
                  </div>
                  <div className="flex items-center">
                    <Button
                      radius="full"
                      className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentCmt) {
                          finishEditCmt();
                          if (comment) setComment("");
                        } else {
                          Comment();
                          setComment("");
                          setImageCmt([]);
                        }
                      }}
                    >
                      {currentCmt ? <FaCheck /> : <FaRegPaperPlane />}
                    </Button>
                  </div>
                </div>
              </div>
              {Array.isArray(imageCmt) && imageCmt.length > 0 ? (
                imageCmt.map((imageUrl, index) => (
                  <div key={index} className="flex items-center mr-3 relative">
                    {imageUrl.url.endsWith(".mp4") ? (
                      <video
                        src={imageUrl.url}
                        width="200"
                        height="50"
                        controls
                      ></video>
                    ) : (
                      <Image
                        isBlurred
                        width={100}
                        src={imageUrl.url}
                        alt={`Image ${index}`}
                        className="m-3 hover:bg-opacity-50 transition duration-300"
                      />
                    )}
                    <button
                      className="absolute top-4 right-0 rounded-full hover:bg-[#377375] text-white text-xs z-10"
                      onClick={() => handleRemoveImage(index)}
                    >
                      x
                    </button>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
