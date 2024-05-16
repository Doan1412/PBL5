import {
  Button,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  User,
  useDisclosure,
} from "@nextui-org/react";
import React, { useMemo, useRef, useState } from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FaUserTag, FaVideo } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import {
  MdEmojiEmotions,
  MdInsertPhoto,
  MdOutlineEmojiEmotions,
} from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { CldUploadButton } from "next-cloudinary";
import { PostType } from "@/app/types";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { failPopUp, successPopUp } from "@/app/hooks/features/popup.slice";
import { useAppDispatch } from "@/app/hooks/store";
import Widget from "@/app/widget";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";

interface ListPost {
  reff: React.RefObject<HTMLDivElement>;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
}

interface PostAttachment {
  url: string;
  type: string;
}

export default function SatatusPost({
  reff,
  isFocused,
  setIsFocused,
  setPosts,
}: ListPost) {
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [text, setText] = useState("");
  const [imagePost, setImagePost] = useState<PostAttachment[]>([]);

  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );

  const handleRemoveImage = (index: number) => {
    const updatedImagePost = [...imagePost];
    updatedImagePost.splice(index, 1);
    setImagePost(updatedImagePost);
  };

  const handleCreatePost = async () => {
    const token = getLocalStorage()?.token;
    if (!token) return;
    try {
      const response = await httpPrivate.post(
        "/post/create",
        {
          content: text,
          attachments: imagePost,
        },
        // {
        //   signal: controller.signal,
        // }
      );
      // controller.abort();
      if (response.data.status === 200) {
        setPosts((prevPosts) => [...prevPosts, response.data.data]);
        dispatch(successPopUp("Đăng bài thành công! 😘"));
      } else {
        dispatch(
          failPopUp("Error:" + response.data.message + "Đăng bài thất bại! 😢")
        );
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  console.log(data);

  return (
    <div
      ref={reff}
      className={`createPostWidget w-full dark:bg-[#242526] shadow-xl dark:text-white ${
        isFocused ? "active" : ""
      }`}
    >
      <div className="createInput dark:bg-[#242526] rounded-lg">
        {/* <img src="/assets/image/avatar_default.jpg" alt="" /> */}
        <input
          type="text"
          placeholder="What's on your mind, Jhon Doe?"
          id="createNewPost"
          onFocus={() => setIsFocused(true)}
          onClick={onOpen}
        />
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              },
              exit: {
                y: -20,
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeIn",
                },
              },
            },
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <div className="flex justify-center">
                  <ModalHeader className="flex gap-1">Tạo bài đăng</ModalHeader>
                </div>
                <div className="ml-3">
                  <User
                    name={data?.data.firstname + " " + data?.data.lastname}
                    description={"@" + data?.data.username}
                    avatarProps={{
                      src: `${data?.data.profile.avatar_url}`,
                    }}
                  />
                </div>
                <ModalBody className="flex justify-start">
                  {/* <img src="/assets/image/avatar_default.jpg" alt="" /> */}

                  <Textarea
                    labelPlacement="outside"
                    placeholder={
                      "What's on your mind, " +
                      data?.data.firstname +
                      " " +
                      data?.data.lastname
                    }
                    className=""
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  <div className="flex">
                    {Array.isArray(imagePost) && imagePost.length > 0 ? (
                      imagePost.map((imageUrl, index) => (
                        <div
                          key={index}
                          className="flex items-center mr-3 relative"
                        >
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
                  <div className="otherOptions border border-slate-500 dark:bg-[#242526] rounded-lg flex justify-between">
                    <div className="m-3">
                      <p className="text-sm">Thêm vào bài đăng của bạn</p>
                    </div>
                    <div className="flex justify-center items-center gap-3 mr-3 relative">
                      <div className="option">
                        <CldUploadButton
                          options={{ maxFiles: 5 }}
                          onSuccess={(result: any) => {
                            const secureUrl = result?.info?.secure_url;
                            if (secureUrl) {
                              setImagePost((prevImagePost) => [
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
                      <div className="option">
                        <FaVideo size={25} className="text-red-700" />
                      </div>
                      <div className="option">
                        <FaUserTag size={25} className="text-blue-600" />
                      </div>
                      {/* <div className="option">
                          <MdOutlineEmojiEmotions
                            onClick={handleEmoji}
                            className="text-blue-600"
                            size={25}
                          />
                        </div> */}
                    </div>
                  </div>
                  <Button
                    className="bg-[#377375] px-6 py-2 cursor-pointer rounded-full text-white hover:opacity-100 opacity-95 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#377375] focus-within:ring-offset-2 mb-3"
                    onClick={() => {
                      handleCreatePost();
                      onClose();
                      setText("");
                    }}
                  >
                    Post
                  </Button>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>

        <button className="inBtn">Post</button>
      </div>
      <div className="otherOptions dark:bg-[#242526] rounded-lg">
        <div className="option">
          <BsFillCameraVideoFill />
          <span>Go Live</span>
        </div>
        <div className="option">
          <MdInsertPhoto />
          <span>Photo/Video</span>
        </div>
        <div className="option">
          <MdEmojiEmotions />
          <span>Feeling/Activity</span>
        </div>
      </div>
    </div>
  );
}
