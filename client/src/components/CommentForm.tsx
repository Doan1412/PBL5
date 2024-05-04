import {
  Avatar,
  Card,
  CardHeader,
  Image,
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import { Attachment, CommentType } from "@/app/types";
import { FaEllipsisH } from "react-icons/fa";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import { failPopUp, successPopUp } from "@/app/hooks/features/popup.slice";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { useAppDispatch } from "@/app/hooks/store";

interface PropsCommentForm {
  fullName?: string;
  userName?: string;
  avatar?: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
  urlImage?: Attachment[];
  id_userCmt?: string;
  id_userPost?: string;
  setListCmt: React.Dispatch<React.SetStateAction<CommentType[]>>;
  id_Cmt?: string;
  startEditCmt: (id: string) => void;
  currentCmt: CommentType | null;
  setCurrentCmt: React.Dispatch<React.SetStateAction<CommentType | null>>;
}

export default function CommentForm({
  fullName,
  userName,
  avatar,
  content,
  created_at,
  updated_at,
  urlImage,
  id_userCmt,
  id_userPost,
  setListCmt,
  startEditCmt,
  id_Cmt,
  currentCmt,
  setCurrentCmt,
}: PropsCommentForm) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [id_userAuth, setId_UserAuth] = useState<string>();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setId_UserAuth(getLocalStorage()?.user_id as string);
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleDeleteCmt = async () => {
    const token = getLocalStorage()?.token;
    if (!token) return;
    try {
      const response = await httpPrivate.delete(`/post/${id_Cmt}`, {
        signal: controller.signal,
      });
      controller.abort();
      if (response.data.status == 200) {
        setListCmt((prevCmt) => {
          return prevCmt.filter((cmt) => cmt.id != id_Cmt);
        });
        dispatch(successPopUp("Xóa comment thành công! 😘"));
      } else {
        dispatch(
          failPopUp(
            "Error:" + response.data.message + "Xóa comment thất bại! 😢"
          )
        );
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  // const finishEditCmt = async () => {
  //   const token = getLocalStorage()?.token;
  //   if (!token) return;
  //   try {
  //     const response = await httpPrivate.put(
  //       `/post/${id_Cmt}`,
  //       {
  //         content: currentCmt?.content,
  //       },
  //       {
  //         signal: controller.signal,
  //       }
  //     );
  //     controller.abort();
  //     if (response.data.status == 200) {
  //       const handler = (cmtObj: CommentType[]) => {
  //         return cmtObj.map((cmt) => {
  //           if (cmt.id === (currentCmt as CommentType).id) {
  //             return currentCmt as CommentType;
  //           }
  //           return cmt;
  //         });
  //       };
  //       setListCmt(handler);
  //       setCurrentCmt(null);
  //       dispatch(successPopUp("Chỉnh sửa comment thành công! 😘"));
  //     } else {
  //       dispatch(
  //         failPopUp(
  //           "Error:" + response.data.message + "Chỉnh sửa comment thất bại! 😢"
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     // console.error("Error:", error);
  //   }
  // };

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
                  <div className="flex justify-between">
                    <h4 className="text-sm font-semibold leading-none text-default-600">
                      {fullName}{" "}
                      <span className="ml-2 text-sm text-gray-500">
                        @{userName}
                      </span>
                    </h4>
                    <div>
                      <Dropdown>
                        <DropdownTrigger>
                          <Button variant="light" size="sm">
                            <FaEllipsisH />
                          </Button>
                        </DropdownTrigger>
                        {id_userAuth == id_userPost ||
                        id_userAuth == id_userCmt ? (
                          <DropdownMenu
                            aria-label="Example with disabled actions"
                            disabledKeys={["no_edit"]}
                          >
                            {id_userAuth == id_userCmt ? (
                              <DropdownItem
                                key="edit"
                                onClick={() => startEditCmt(id_Cmt!)}
                              >
                                Chỉnh sửa bình luận
                              </DropdownItem>
                            ) : (
                              <DropdownItem isReadOnly key="no_edit">
                                Chỉnh sửa bình luận
                              </DropdownItem>
                            )}

                            <DropdownItem
                              key="delete"
                              className="text-danger"
                              color="danger"
                              onClick={() => {
                                handleDeleteCmt();
                              }}
                            >
                              Xóa bình luận
                            </DropdownItem>
                          </DropdownMenu>
                        ) : (
                          <DropdownMenu aria-label="Example with disabled actions">
                            <DropdownItem key="report">Báo cáo</DropdownItem>
                          </DropdownMenu>
                        )}
                      </Dropdown>
                    </div>
                  </div>
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
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
          {urlImage?.map((items, index) => (
            <div key={index} className="mt-3">
              <Image
                key={index}
                src={items.url}
                alt=""
                className="postImage"
                width={100}
                onClick={onOpen}
              />
              <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
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
  );
}
