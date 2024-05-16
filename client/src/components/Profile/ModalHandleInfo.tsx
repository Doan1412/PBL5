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
import { PiPhoneDuotone } from "react-icons/pi";
import { TbMailFast } from "react-icons/tb";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { BsCake } from "react-icons/bs";
import { useUserProfile } from "@/app/profile/about/page";
import { BiRename } from "react-icons/bi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone?: string;
  email?: string;
  sex?: string;
  birth?: string;
  password?: string;
  id_user?: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setSex: React.Dispatch<React.SetStateAction<string>>;
  setBirth: React.Dispatch<React.SetStateAction<string>>;
}

export default function ModalHandleInfo({
  isOpen,
  onClose,
  setBirth,
  setEmail,
  setPhone,
  setSex,
  birth,
  email,
  phone,
  sex,
  id_user,
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

  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    username,
    setUsername,
  } = useUserProfile();

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
        `/user/update`,
        {
          id: id_user,
          firstname,
          lastname,
          phone,
          username,
          gender: sex,
          birth,
        },
        // {
        //   signal: controller.signal,
        // }
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );
      // controller.abort();
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
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <BiRename />
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-lg text-gray-600 dark:text-white">
                          Firstname
                        </h1>
                      </div>
                    </div>
                    <div className="flex justify-center mt-3 flex-1">
                      <Input
                        isRequired
                        type="text"
                        value={firstname}
                        onChange={(e) => {
                          setFirstname(handleInputChange(e));
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <BiRename />
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-lg text-gray-600 dark:text-white">
                          Lastname
                        </h1>
                      </div>
                    </div>
                    <div className="flex justify-center mt-3 flex-1">
                      <Input
                        isRequired
                        type="text"
                        value={lastname}
                        onChange={(e) => {
                          setLastname(handleInputChange(e));
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <PiPhoneDuotone />
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-lg text-gray-600 dark:text-white">
                          Phone
                        </h1>
                      </div>
                    </div>
                    <div className="flex justify-center mt-3 flex-1">
                      <Input
                        isRequired
                        type="text"
                        value={phone}
                        onChange={(e) => {
                          setPhone(handleInputChange(e));
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <TbMailFast size={20} />
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-lg text-gray-600 dark:text-white">
                          Email
                        </h1>
                      </div>
                    </div>
                    <div className="flex justify-center mt-3 flex-1">
                      <Input
                        isRequired
                        type="text"
                        defaultValue={username}
                        value={email}
                        onChange={(e) => {
                          setUsername(handleInputChange(e));
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <IoMaleFemaleSharp />
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-lg text-gray-600 dark:text-white">
                          Giới tính
                        </h1>
                      </div>
                    </div>
                    <div className="flex justify-center mt-3 flex-1">
                      <Input
                        isRequired
                        type="text"
                        defaultValue={data?.data.birth}
                        value={sex}
                        onChange={(e) => {
                          setSex(handleInputChange(e));
                        }}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <BsCake />
                      </div>
                      <div className="flex items-center">
                        <h1 className="text-lg text-gray-600 dark:text-white">
                          Birth
                        </h1>
                      </div>
                    </div>
                    <div className="flex justify-center mt-3 flex-1">
                      <Input
                        isRequired
                        type="text"
                        defaultValue={data?.data.birth}
                        value={birth}
                        onChange={(e) => {
                          setBirth(handleInputChange(e));
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
