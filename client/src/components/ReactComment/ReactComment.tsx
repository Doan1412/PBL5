import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { failPopUp, successPopUp } from "@/app/hooks/features/popup.slice";
import { useAppDispatch } from "@/app/hooks/store";
import { CommentAttachment, CommentType, PostType } from "@/app/types";
import React, { useMemo, useState } from "react";
import { TbMessageCircle } from "react-icons/tb";
import "./style.css";
import CommentForm from "../CommentForm";
import { Avatar, Button, Image, Input } from "@nextui-org/react";
import { CldUploadButton } from "next-cloudinary";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import { IoMdCheckmark, IoMdImages } from "react-icons/io";
import { FaCheck, FaRegPaperPlane } from "react-icons/fa";
import { CiPaperplane } from "react-icons/ci";

interface PropsReactComment {
  dataComment: CommentType;
  dataPost: PostType;
}

export default function ReactComment({
  dataComment,
  dataPost,
}: PropsReactComment) {
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useAppDispatch();
  const [showComment, setShowComment] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [listCmt, setListCmt] = useState<CommentType[]>([]);
  const [likedReply, setLikedReply] = useState<boolean>(
    dataComment?.like as boolean
  );
  const [likesAmountReply, setLikesAmountReply] = useState<number>(
    dataComment?.like_count as number
  );
  const [currentCmt, setCurrentCmt] = useState<CommentType | null>(null);
  const [comment, setComment] = useState<string>("");
  const [imageCmt, setImageCmt] = useState<CommentAttachment[]>([]);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
  };

  const handleRemoveImage = (index: number) => {
    const updatedImagePost = [...imageCmt];
    updatedImagePost.splice(index, 1);
    setImageCmt(updatedImagePost);
  };

  const handleLikeClick = async () => {
    likedReply ? unlike() : like();
    setLikedReply((prevLiked) => !prevLiked);
    setLikesAmountReply((prevLikesAmount) =>
      likedReply ? prevLikesAmount - 1 : prevLikesAmount + 1
    );
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

  const toggleComment = () => {
    if (!isClicked) {
      setShowComment(!showComment);
      setIsClicked(true);

      setTimeout(() => {
        setIsClicked(false);
      }, 500);
    }
  };

  const unlike = async () => {
    // unlike post
    try {
      const response = await httpPrivate.post(
        `/post/${dataComment?.id}/unlike`,
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
      } else {
        dispatch(failPopUp(response.data.message));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const like = async () => {
    // like post
    try {
      const response = await httpPrivate.post(`/post/${dataComment?.id}/like`, {
        signal: controller.signal,
      });
      controller.abort();
      if (response.data.status === 200) {
      } else {
        dispatch(failPopUp(response.data.message));
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getComment = async () => {
    // getComment reply
    if (!localStorage.getItem("access_token")) return;
    const token = localStorage.getItem("access_token")?.toString();
    try {
      const response = await httpPrivate.get(
        `/comment/post/${dataComment?.id}`,
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

  const Comment = async () => {
    // comment post
    try {
      const response = await httpPrivate.post(
        `/post/comment`,
        {
          content: comment,
          attachments: imageCmt,
          postId: dataComment?.id,
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
    <div className="flex flex-col postFooter">
      <div className="left gap-3">
        <div className="heart-container" onClick={handleLikeClick}>
          <svg
            className={`heart ${likedReply ? "liked" : ""}`}
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
          <p className="dark:text-white">{likesAmountReply}</p>
        </div>
        <div
          className=""
          onClick={() => {
            toggleComment();
            getComment();
          }}
        >
          <TbMessageCircle />
        </div>
        <div className="">
          <span className="text-sm text-gray-500">
            {" "}
            {dataComment?.created_at?.slice(0, 10)}{" "}
            {dataComment?.created_at?.slice(11, 19)}
          </span>
        </div>
      </div>
      {showComment && (
        <div className="flex flex-col gap-4">
          {listCmt?.map((item, index) => (
            <div key={index} className="mt-2">
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
                id_userPost={dataComment?.userId}
                setListCmt={setListCmt}
                id_Cmt={item?.id}
                startEditCmt={startEditCmt}
                currentCmt={currentCmt}
                setCurrentCmt={setCurrentCmt}
              />

              <div className="ml-10 mt-1">
                <span className="text-sm text-gray-500">
                  {" "}
                  {item?.created_at?.slice(0, 10)}{" "}
                  {item?.created_at?.slice(11, 19)}
                </span>
              </div>
              {/* <div className="postActions ml-7 mt-1">
                    <ReactComment dataComment = {item}/>
                  </div> */}
            </div>
          ))}

          <div className="flex gap-3 mt-2">
            <div className="flex items-center">
              <Avatar
                src={
                  dataPost?.avatarUrl != ""
                    ? dataPost.avatarUrl
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
                  {currentCmt ? <IoMdCheckmark className="text-white" /> : <CiPaperplane className="text-white"/>}
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
  );
}
