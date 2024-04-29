import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import {
  Avatar,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import Poster from "@/static/images/Poster.jpg";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import { CldUploadButton } from "next-cloudinary";
import UploadButton from "../UploadButton";
import UploadAvatar from "../UploadAvatar";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import { useAppDispatch } from "@/app/hooks/store";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { failPopUp, successPopUp } from "@/app/hooks/features/popup.slice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  linkImageCover?: string;
  linkImageAvatar?: string;
  bio?: string;
  love?: string;
  study?: string;
  work?: string;
  from?: string;
  setLove: React.Dispatch<React.SetStateAction<string>>;
  setStudy: React.Dispatch<React.SetStateAction<string>>;
  setWork: React.Dispatch<React.SetStateAction<string>>;
  setFrom: React.Dispatch<React.SetStateAction<string>>;
}

export default function ModalHandleDetail({
  isOpen,
  onClose,
  linkImageAvatar,
  linkImageCover,
  bio,
  love,
  study,
  work,
  from,
  setLove,
  setStudy,
  setWork,
  setFrom,
}: ModalProps) {
  const params = useSearchParams();
  const { data, isFetching } = useGetUserInfoQuery(
    params.get("id_user") as string
  );

  // const [linkImageAvatar, setImageAvatar] = useState<string>(
  //   data?.data?.profile?.avatar_url != ""
  //     ? `${data?.data?.profile?.avatar_url}`
  //     : avatarDefault.src
  // );
  // const [linkImageCover, setImageCover] = useState<string>(
  //   data?.data?.profile?.avatar_url != ""
  //     ? `${data?.data?.profile?.cover_url}`
  //     : Poster.src
  // );
  // const [bio, setBio] = useState<string>(data?.data?.profile?.bio as string);
  const dispatch = useAppDispatch();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): string => {
    return e.target.value;
  };

  const handleUpdate = async () => {
    const token = getLocalStorage()?.token;
    if (!token) return;
    try {
      const response = await httpPrivate.put(
        `/profile/update`,
        {
          avatar_url: linkImageAvatar,
          cover_url: linkImageCover,
          bio,
          study_at: study,
          work_at: work,
          from: from,
          relationship: love,
        },
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
        dispatch(successPopUp("Cập nhật thông tin thành công!"));
      } else {
        dispatch(failPopUp("Error: " + response.data.message));
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center gap-1">
                Chỉnh sửa chi tiết
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col">
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <h1 className="font-bold text-lg">Từng học tại</h1>
                    </div>
                    <div className="flex justify-center mt-3 flex-1">
                      <Input
                        type="text"
                        value={study}
                        onChange={(e) => {
                          setStudy(handleInputChange(e));
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <h1 className="font-bold text-lg">Từng làm việc tại</h1>
                    </div>
                    <div className="flex justify-center mt-3 flex-1">
                      <Input
                        type="text"
                        value={work}
                        onChange={(e) => {
                          setWork(handleInputChange(e));
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <h1 className="font-bold text-lg">Đến từ</h1>
                    </div>
                    <div className="flex justify-center mt-3 flex-1">
                      <Input
                        type="text"
                        value={from}
                        onChange={(e) => {
                          setFrom(handleInputChange(e));
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <h1 className="font-bold text-lg">Tình trạng hôn nhân</h1>
                    </div>
                    <div className="flex justify-center mt-3 flex-1">
                      <Input
                        type="text"
                        value={love}
                        onChange={(e) => {
                          setLove(handleInputChange(e));
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onClick={() => {
                    handleUpdate();
                    onClose();
                  }}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
