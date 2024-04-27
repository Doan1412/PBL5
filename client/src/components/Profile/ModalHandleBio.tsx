import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import {
  Avatar,
  Button,
  Image,
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
  setImageAvatar: React.Dispatch<React.SetStateAction<string>>;
  setImageCover: React.Dispatch<React.SetStateAction<string>>;
  setBio: React.Dispatch<React.SetStateAction<string>>;
}

export default function ModalHandleBio({
  isOpen,
  onClose,
  setImageAvatar,
  setImageCover,
  setBio,
  linkImageAvatar,
  linkImageCover,
  bio,
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    return value;
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
                Chỉnh sửa thông tin
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg">Avatar</h1>
                    <div className="flex justify-center mt-3 mb-3 relative">
                      <Avatar
                        isBordered
                        src={linkImageAvatar}
                        className="w-40 h-40 text-large"
                      />
                      <div className="absolute bottom-2 right-2 z-10">
                        <CldUploadButton
                          options={{ maxFiles: 1 }}
                          onSuccess={(result: any) => {
                            setImageAvatar(result?.info?.secure_url);
                          }}
                          uploadPreset="s2lo0hgq"
                        >
                          <UploadButton />
                        </CldUploadButton>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg">Cover Image</h1>
                    <div className="flex justify-center mt-3 mb-3 relative shrink">
                      <Image
                        isBlurred
                        width={300}
                        height={100}
                        alt="NextUI hero Image with delay"
                        src={linkImageCover}
                        // src={Poster.src}
                        className="z-0"
                      />
                      <div className="absolute -bottom-4 right-1 z-10">
                        <CldUploadButton
                          options={{ maxFiles: 1 }}
                          onSuccess={(result: any) => {
                            setImageCover(result?.info?.secure_url);
                          }}
                          uploadPreset="s2lo0hgq"
                        >
                          <UploadAvatar />
                        </CldUploadButton>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <h1 className="font-bold text-lg">Bio</h1>
                    <div className="flex justify-center mt-3">
                      <Textarea
                        defaultValue={data?.data?.profile?.bio as string}
                        value={bio}
                        onChange={(e) => {
                          setBio(handleInputChange(e));
                        }}
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
