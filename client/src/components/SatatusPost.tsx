import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  User,
  useDisclosure,
} from "@nextui-org/react";
import React, { useRef, useState } from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { FaUserTag, FaVideo } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import {
  MdEmojiEmotions,
  MdInsertPhoto,
  MdOutlineEmojiEmotions,
} from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

interface ListPost {
  reff: React.RefObject<HTMLDivElement>;
  isFocused: boolean;
  setIsFocused: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ListPost({ reff, isFocused, setIsFocused }: ListPost) {
  //   const [isFocused, setIsFocused] = useState<boolean>(false);
  //   const ref = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [text, setText] = useState("");

  return (
    <>
      <div
        ref={reff}
        className={`createPostWidget dark:bg-[#242526] shadow-xl ${
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
              {() => (
                <>
                  <div className="flex justify-center">
                    <ModalHeader className="flex gap-1">
                      Tạo bài đăng
                    </ModalHeader>
                  </div>
                  <div className="ml-3">
                    <User
                      name="Junior Garcia"
                      description="@jrgarciadev"
                      avatarProps={{
                        src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                      }}
                    />
                  </div>
                  <ModalBody className="flex justify-start">
                    {/* <img src="/assets/image/avatar_default.jpg" alt="" /> */}

                    <Textarea
                      labelPlacement="outside"
                      placeholder="What's on your mind, Jhon Doe?"
                      className=""
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                    />
                    <div className="otherOptions border border-slate-500 dark:bg-[#242526] rounded-lg flex justify-between">
                      <div className="m-3">
                        <p className="text-sm">Thêm vào bài đăng của bạn</p>
                      </div>
                      <div className="flex justify-center items-center gap-3 mr-3 relative">
                        <div className="option">
                          <IoMdImages size={25} className="text-green-700" />
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
                    <button className="inBtn mb-3">Post</button>
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
    </>
  );
}
