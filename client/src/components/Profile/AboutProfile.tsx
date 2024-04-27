import { UserType } from "@/app/types";
import { BsCake } from "react-icons/bs";
import { IoMaleFemaleSharp } from "react-icons/io5";
import { PiPhoneDuotone } from "react-icons/pi";
import { TbMailFast, TbPencilMinus } from "react-icons/tb";
import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { useAppDispatch } from "@/app/hooks/store";
import { useRouter } from "next/navigation";
import ModalHandleInfo from "./ModalHandleInfo";
import { MdOutlinePassword } from "react-icons/md";

interface PropsAboutProfile {
  data: UserType;
  id_user?: string;
}

export default function AboutProfile({ data, id_user }: PropsAboutProfile) {
  const [userId, setUserId] = useState<string>("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useAppDispatch();

  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [birth, setBirth] = useState<string>("");


  const {
    isOpen: isInfoModalOpen,
    onOpen: onOpenInfoModal,
    onClose: onCloseInfoModal,
  } = useDisclosure();

  const handleDelete = async (id: string) => {
    const token = getLocalStorage()?.token;
    if (!token) return;
    try {
      const response = await httpPrivate.delete(`/user/${id}`, {
        signal: controller.signal,
      });
      controller.abort();
      if (response.data.status === 200) {
        localStorage.clear();
        router.push("/login");
        // dispatch(successPopUp("Hủy kết bạn thành công! 😒"));
      } else {
        // dispatch(failPopUp(response.data.message));
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  useEffect(() => {
    setPhone(data?.data.phone || "");
    setSex(data?.data.gender || "");
    setBirth(data?.data.birth || "");
    setEmail(data?.data.username || "");
    // setFirstname(data?.data.firstname || "");
    // setLastname(data?.data.lastname || "");
    // setUsername(data?.data.username || "");

  }, [
    data?.data.phone,
    data?.data.gender,
    data?.data.birth,
    data?.data.username,
    // data?.data.firstname,
    // data?.data.lastname,
  ]);

  useEffect(() => {
    setUserId(getLocalStorage()?.user_id || "");
  }, []);

  const handleOpenInfoModal = () => {
    onOpenInfoModal();
  };

  return (
    <>
      <div className=" bg-[#ffffff] dark:bg-[#242526] rounded-lg mb-4 shrink drop-shadow-2xl dark:text-white w-full ml-48 mr-48 mt-4">
        <div className="flex justify-between">
          <h1 className="ml-5 mt-5 font-bold text-xl dark:text-white">
            Thông tin liên hệ
          </h1>
          {/* <Link
            href="/friend"
            className="ml-5 mr-5 mt-5 text-sm dark:text-blue-500 text-blue-500 "
          >
            Lời mời kết bạn
          </Link> */}
          {id_user === userId && (
            <div className="ml-5 mr-5 mt-5">
              <Button
                onPress={onOpen}
                className="bg-[#377375] text-white dark:bg-[#444546]"
              >
                Xóa tài khoản
              </Button>
              <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                radius="lg"
                classNames={{
                  body: "py-6",
                  backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                  base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                  header: "border-b-[1px] border-[#292f46]",
                  footer: "border-t-[1px] border-[#292f46]",
                  closeButton: "hover:bg-white/5 active:bg-white/10",
                }}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        😢 Bạn chắc chắn muốn xóa tài khoản?{" "}
                      </ModalHeader>
                      <ModalBody>
                        <p>
                          Bạn sắp xóa vĩnh viễn tài khoản của mình. Nếu bạn đã
                          sẵn sàng xóa, hãy nhấp vào Xóa tài khoản. Sau khi xóa,
                          bạn có thể quay trở lại bất cứ lúc nào. Sau khi xác
                          nhận, quá trình xóa sẽ bắt đầu và bạn không thể truy
                          xuất bất kỳ nội dung hay thông tin nào mình đã thêm.
                          Bạn có chắc chắn muốn xóa tài khoản? Lúc nào đó hãy
                          quay lại thăm chúng tôi nhé! 🤡
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="primary"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button
                          className="bg-[#6f4ef2] shadow-lg shadow-indigo-500/20"
                          onClick={() => {
                            handleDelete(getLocalStorage()?.user_id as string);
                          }}
                        >
                          Xác nhận
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          )}
        </div>
        <div className="flex mt-2 ml-5 justify-between mr-10">
          <div className="flex gap-2">
            <div className="flex items-center">
              <PiPhoneDuotone />
            </div>
            <div>
              <h1 className=" dark:text-white">{phone}</h1>
              <h1 className="text-xs text-gray-600 dark:text-white">Phone</h1>
            </div>
          </div>
          {id_user === userId && (
            <div className="flex items-center">
              <Button
                className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-200 dark:bg-medium"
                onPress={handleOpenInfoModal}
              >
                <TbPencilMinus />
              </Button>
              <ModalHandleInfo
                isOpen={isInfoModalOpen}
                onClose={onCloseInfoModal}
                phone={phone}
                sex={sex}
                birth={birth}
                email={email}
                setPhone={setPhone}
                setEmail={setEmail}
                setBirth={setBirth}
                setSex={setSex}
                id_user = {id_user}
              />
            </div>
          )}
        </div>
        <div className="flex mt-2 ml-5 justify-between mr-10">
          <div className="flex gap-2">
            <div className="flex items-center">
              <TbMailFast size={20} />
            </div>
            <div>
              <h1 className=" dark:text-white">{email}</h1>
              <h1 className="text-xs text-gray-600 dark:text-white">Email</h1>
            </div>
          </div>
        </div>
        <h1 className="ml-5 mt-5 font-bold text-xl dark:text-white">
          Thông tin cơ bản
        </h1>
        <div className="flex mt-2 ml-5 justify-between mr-10">
          <div className="flex gap-2">
            <div className="flex items-center">
              <IoMaleFemaleSharp />
            </div>
            <div>
              <h1 className=" dark:text-white">{sex}</h1>
              <h1 className="text-xs text-gray-600 dark:text-white">
                Giới tính
              </h1>
            </div>
          </div>
        </div>
        <div className="flex mt-2 ml-5 mb-7 justify-between mr-10">
          <div className="flex gap-2">
            <div className="flex items-center">
              <BsCake />
            </div>
            <div>
              <h1 className=" dark:text-white">{birth}</h1>
              <h1 className="text-xs text-gray-600 dark:text-white">
                Sinh nhật
              </h1>
            </div>
          </div>
        </div>
        {id_user === userId && (
          <div className="flex mt-2 ml-5 mb-7 justify-between mr-10">
            <div className="flex gap-2">
              <div className="flex items-center">
                <MdOutlinePassword />
              </div>
              <div>
                <h1 className=" dark:text-white">{birth}</h1>
                <h1 className="text-xs text-gray-600 dark:text-white">
                  Mật khẩu
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
