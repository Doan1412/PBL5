import {
  Avatar,
  Card,
  CardHeader,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import { Attachment } from "@/app/types";
import Slider from "react-slick";

interface PropsCommentForm {
  fullName?: string;
  userName?: string;
  avatar?: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
  urlImage?: Attachment[];
}

export default function CommentForm({
  fullName,
  userName,
  avatar,
  content,
  created_at,
  updated_at,
  urlImage,
}: PropsCommentForm) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <div className="flex gap-2">
        <div>
          <Avatar src={avatar != "" ? avatar : avatarDefault.src} size="sm" />
        </div>
        <div>
          <Card className="dark:bg-[#3a3b3c] bg-[#f0f2f5]">
            <CardHeader className="justify-between">
              <div className="flex">
                <div className="flex flex-col items-start justify-center">
                  <h4 className="text-sm font-semibold leading-none text-default-600">
                    {fullName}{" "}
                    <span className="ml-2 text-sm text-gray-500">
                      @{userName}
                    </span>
                  </h4>
                  <p className="text-base">{content}</p>
                  <div>
                    {/* {urlImage?.length! > 1 ? (
                      <Slider {...settings}>
                        {urlImage?.map((items, index) => (
                          <div key={index}>
                            <Image
                              key={index}
                              src={items.url}
                              alt=""
                              className="postImage"
                            />
                          </div>
                        ))}
                      </Slider>
                    ) : ( */}
                    {urlImage?.map((items, index) => (
                      <div key={index}>
                        <Image
                          key={index}
                          src={items.url}
                          alt=""
                          className="postImage"
                          width={100}
                          onClick={onOpen}
                        />
                        <Modal
                          isOpen={isOpen}
                          onOpenChange={onOpenChange}
                          size="2xl"
                        >
                          <ModalContent>
                            {(onClose) => (
                              <>
                                <ModalBody>
                                  <Image
                                    isZoomed
                                    key={index}
                                    src={items.url}
                                    alt=""
                                    className="postImage"
                                    width={900}
                                    onClick={onOpen}
                                  />
                                </ModalBody>
                              </>
                            )}
                          </ModalContent>
                        </Modal>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
          <span className="ml-2 text-sm text-gray-500">
            {" "}
            {created_at?.slice(0, 10)} {created_at?.slice(11, 19)}
          </span>
        </div>
      </div>
    </div>
  );
}
