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
  ModalHeader,
  RadioGroup,
  ModalFooter,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import { Attachment, CommentType } from "@/app/types";
import { FaEllipsisH } from "react-icons/fa";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import { failPopUp, successPopUp } from "@/app/hooks/features/popup.slice";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { useAppDispatch } from "@/app/hooks/store";
import { CustomRadio } from "./CustomRadio";

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
  const {
    isOpen: isReportPost,
    onOpen: onOpenReport,
    onOpenChange: onOpenChangeReport,
  } = useDisclosure();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [id_userAuth, setId_UserAuth] = useState<string>();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useAppDispatch();
  const [selectedRadio, setSelectedRadio] = useState<string>("");

  const handleRadioChange = (value: string) => {
    setSelectedRadio(value);
  };

  const listReport = [
    {
      title: "Bạo lực",
      color: "success",
    },
    {
      title: "Ảnh khỏa thân",
      color: "danger",
    },

    {
      title: "Spam",
      color: "default",
    },

    {
      title: "Ngôn từ gây thù ghét",
      color: "primary",
    },

    {
      title: "Chất cấm, chất gây nghiện",
      color: "secondary",
    },
    {
      title: "Khủng bố",
      color: "warning",
    },
    {
      title: "Thông tin sai sự thật",
      color: "danger",
    },
    {
      title: "Tự tử hoặc gây thương tích",
      color: "secondary",
    },
    {
      title: "Quấy rối",
      color: "warning",
    },
  ];

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
      // controller.abort();
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

  const handleReportPost = async () => {
    const token = getLocalStorage()?.token;
    if (!token) return;
    try {
      const response = await httpPrivate.post(
        `/report/reportPost`,
        {
          postId: id_Cmt,
          reason: selectedRadio,
        }

        // {
        //   signal: controller.signal,
        // }
      );
      // controller.abort();
      if (response.data.status === 200) {
        // setPosts((prevPosts) => [...prevPosts, response.data.data]);
        dispatch(
          successPopUp(
            "Báo cáo bài thành công! Cảm ơn bạn đã chung tay vì một cộng đồng lành mạnh 😘"
          )
        );
      } else {
        dispatch(
          failPopUp(
            "Error:" +
              response.data.message +
              "Báo cáo bài viết không thành công! Xin vui lòng thử lại 😢"
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
  //     // controller.abort();
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
                            <DropdownItem key="report" onClick={onOpenReport}>
                              Báo cáo
                            </DropdownItem>
                          </DropdownMenu>
                        )}
                      </Dropdown>
                      <Modal
                        size="4xl"
                        isOpen={isReportPost}
                        onOpenChange={onOpenChangeReport}
                        isDismissable={false}
                        isKeyboardDismissDisabled={true}
                      >
                        <ModalContent>
                          {(onClose) => (
                            <>
                              <ModalHeader className="flex flex-col gap-1 mt-3">
                                Báo cáo
                              </ModalHeader>
                              <ModalBody>
                                <p className="text-gray-600">
                                  Nếu bạn nhận thấy ai đó đang gặp nguy hiểm,
                                  đừng chần chừ mà hãy tìm ngay sự giúp đỡ trước
                                  khi báo cáo với Return
                                </p>
                                <div className="w-full">
                                  <div className="flex flex-col gap-1 w-full">
                                    <RadioGroup
                                      classNames={{
                                        base: "w-full",
                                      }}
                                    >
                                      {listReport.map((item, index) => (
                                        <CustomRadio
                                          key={index}
                                          title={item.title}
                                          onChange={() =>
                                            handleRadioChange(item.title)
                                          }
                                          statusColor={
                                            item.color as
                                              | "success"
                                              | "danger"
                                              | "default"
                                              | "primary"
                                              | "secondary"
                                              | "warning"
                                              | undefined
                                          }
                                          // checked={selectedRadio === item.title} // Đánh dấu radio nếu nó được chọn
                                        />
                                      ))}
                                    </RadioGroup>
                                  </div>
                                </div>
                              </ModalBody>
                              <ModalFooter>
                                <Button
                                  color="danger"
                                  variant="light"
                                  onPress={onClose}
                                >
                                  Close
                                </Button>
                                <Button
                                  color="primary"
                                  onClick={() => {
                                    handleReportPost();
                                    onClose();
                                  }}
                                >
                                  Report
                                </Button>
                              </ModalFooter>
                            </>
                          )}
                        </ModalContent>
                      </Modal>
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
