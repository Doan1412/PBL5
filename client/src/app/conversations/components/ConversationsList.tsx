"use client";
import useConversation from "@/app/hooks/customs/useConversation";
import { FullMessageType, ListFriendType, MessageBoxType } from "@/app/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { useAppDispatch } from "@/app/hooks/store";
import { failPopUp } from "@/app/hooks/features/popup.slice";
import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  SelectedItems,
  useDisclosure,
} from "@nextui-org/react";
import { IoCreateOutline } from "react-icons/io5";
import { useListFriend } from "@/app/actions/custom/useListFriend";
import { getLocalStorage } from "@/app/actions/localStorage_State";

export default function ConversationsList() {
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isOpen: isOpenCreateGroup, onOpen, onOpenChange } = useDisclosure();

  const { conversationId, isOpen } = useConversation();
  const [listBoxMessage, setListBoxMessage] = useState<MessageBoxType[]>([]);
  const [friends, setFiends] = useState<ListFriendType[]>([]);
  const [loading, setLoading] = useState(true);
  const params = useSearchParams();

  useListFriend(setFiends, setLoading, getLocalStorage()?.user_id as string);

  useEffect(() => {
    async function getListBoxChat() {
      try {
        const response = await httpPrivate.get(`/room`, {
          signal: controller.signal,
        });
        controller.abort();
        if (response.data.status === 200) {
          setListBoxMessage(response.data.data);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getListBoxChat();
  }, [controller, dispatch, httpPrivate]);

  return (
    <div>
      <aside
        className={clsx(
          `fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200`,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messenger</div>
            <div>
              <button
                className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
                onClick={onOpen}
              >
                <MdOutlineGroupAdd size={20} />
              </button>
              <Modal
                isOpen={isOpenCreateGroup}
                onOpenChange={onOpenChange}
                placement="top-center"
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex justify-center gap-1">
                        <div className="flex items-center">
                          <IoCreateOutline />
                        </div>
                        Tạo cuộc trò chuyện mới
                      </ModalHeader>
                      <ModalBody>
                        <Select
                         items={friends}
                          label="Assigned to"
                          placeholder="Select a user"
                          labelPlacement="outside"
                          classNames={{
                            base: "max-w-xs",
                            trigger: "h-12",
                          }}
                          renderValue={(items: SelectedItems<ListFriendType>) => {
                            return items.map((item) => (
                              <div
                                key={item.key}
                                className="flex items-center gap-2"
                              >
                                <Avatar
                                  alt= "avatar"
                                  className="flex-shrink-0"
                                  size="sm"
                                  src={item.data?.avatar_url}
                                />
                                <div className="flex flex-col">
                                  <span>{item.data?.fullname}</span>
                                  <span className="text-default-500 text-tiny">
                                    ({item.data?.username})
                                  </span>
                                </div>
                              </div>
                            ));
                          }}
                        >
                          {(user) => (
                            <SelectItem key={user.id} textValue={user.fullname}>
                              <div className="flex gap-2 items-center">
                                <Avatar
                                  alt= "avatar"
                                  className="flex-shrink-0"
                                  size="sm"
                                  src={user.avatar_url}
                                />
                                <div className="flex flex-col">
                                  <span className="text-small">
                                    {user.fullname}
                                  </span>
                                  <span className="text-tiny text-default-400">
                                    {user.username}
                                  </span>
                                </div>
                              </div>
                            </SelectItem>
                          )}
                        </Select>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                          Cancel
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Bắt đầu
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
          {Array.isArray(listBoxMessage) &&
            listBoxMessage?.map((item, index) => (
              <ConversationBox key={index} dataBox={item} />
            ))}
        </div>
      </aside>
    </div>
  );
}
