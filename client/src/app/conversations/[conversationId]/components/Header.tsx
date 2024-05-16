"use client";
import { useListFriend } from "@/app/actions/custom/useListFriend";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { failPopUp, successPopUp } from "@/app/hooks/features/popup.slice";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { useAppDispatch } from "@/app/hooks/store";
import {
  ConversationType,
  ListFriendType,
  MessageBoxType,
  UserMessageType,
  UserType,
} from "@/app/types";
import {
  Avatar,
  AvatarGroup,
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import { IoCreateOutline, IoPersonAddSharp } from "react-icons/io5";

interface HeaderProps {
  conversationId: String;
}

export default function Header({ conversationId }: HeaderProps) {
  const { isOpen: isOpenCreateGroup, onOpen, onOpenChange } = useDisclosure();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [boxMessage, setBoxMessage] = useState<MessageBoxType>();
  const [uniqueLastNames, setUniqueLastNames] = useState<string[]>([]);
  const [uniqueMembers, setUniqueMembers] = useState<UserMessageType[]>([]);
  const [nameGroup, setNameGroup] = useState<string>("");
  const [friends, setFiends] = useState<ListFriendType[]>([]);
  const [selectedFriends, setSelectedFriends] = useState<string>();
  const [loading, setLoading] = useState(true);

  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );

  useListFriend(setFiends, setLoading, getLocalStorage()?.user_id as string);

  useEffect(() => {
    async function getListBoxChat() {
      try {
        const response = await httpPrivate.get(`room/${conversationId}`);
        // controller.abort();
        if (response.data.status === 200) {
          setBoxMessage(response.data.data);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getListBoxChat();
  }, [controller, dispatch, httpPrivate, conversationId]);

  useEffect(() => {
    if (boxMessage?.name) {
      const parts = boxMessage.name.split(", ");
      const lastName = parts.filter(
        (part) => !part.includes(data?.data?.lastname!)
      );
      setUniqueLastNames((prevLastNames) => [...lastName]);
    }
  }, [data?.data?.lastname, boxMessage?.name]);

  useEffect(() => {
    const idToRemove = data?.data?.id;
    const members = boxMessage?.members as UserMessageType[];
    setUniqueMembers(members?.filter((member) => member.id !== idToRemove));
  }, [data?.data?.id, boxMessage?.members]);

  const statusText = useMemo(() => {
    if (0) {
      return `${boxMessage?.members?.length} member`;
    }
    return `Active`;
  }, []);

  const HandleAddMember = async () => {
    const token = getLocalStorage()?.token;

    if (!token) return;
    try {
      const userId = getLocalStorage()?.user_id;
      if (!userId) return;

      const membersIds: string[] = selectedFriends
        ? selectedFriends.split(",")
        : [];
      membersIds.push(userId);

      const response = await httpPrivate.post(
        `/room/addmember?room_id=${conversationId}&user_id=${membersIds[0]}`
      );

      if (response.data.status === 200) {
        console.log(response.data.data);
        setBoxMessage(response.data);
        dispatch(successPopUp("Thêm thành viên thành công! 😘"));
      } else {
        dispatch(
          failPopUp(
            `Error: ${response.data.message} Thêm thành viên thất bại! 😢`
          )
        );
      }
    } catch (error) {
      // console.error("Error:", error);
    }
  };

  return (
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          href="/conversations"
        >
          <HiChevronLeft size={32} />
        </Link>
        {boxMessage?.members?.length == 2 ? (
          <Avatar
            src={uniqueMembers
              ?.map((item) => item.profile.avatar_url)
              .join(",")}
          />
        ) : (
          <AvatarGroup
            isBordered
            max={1}
            total={boxMessage?.members?.length! - 1}
          >
            {uniqueMembers?.map((item, index) => (
              <Avatar key={index} src={item.profile.avatar_url} />
            ))}
          </AvatarGroup>
        )}
        <div className="flex flex-col">
          <div className="font-semibold"> {uniqueLastNames.join(", ")}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <button onClick={onOpen}>
        <IoPersonAddSharp
          size={20}
          className="cursor-pointer hover:text-sky-600 transition"
        />
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
                Thêm thành viên
              </ModalHeader>
              <ModalBody>
                <Select
                  items={friends}
                  label="Assigned to"
                  placeholder="Select a user"
                  labelPlacement="outside"
                  // value={selectedFriends.map((friend) => friend.id)}
                  onChange={(event) => {
                    setSelectedFriends(event.target.value);
                  }}
                  classNames={{
                    base: "w-full",
                    trigger: "h-12",
                  }}
                  renderValue={(items: SelectedItems<ListFriendType>) => {
                    return items.map((item) => (
                      <div key={item.key} className="flex items-center gap-2">
                        <Avatar
                          alt="avatar"
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
                          alt="avatar"
                          className="flex-shrink-0"
                          size="sm"
                          src={user.avatar_url}
                        />
                        <div className="flex flex-col">
                          <span className="text-small">{user.fullname}</span>
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
                <Button
                  color="primary"
                  onClick={() => {
                    HandleAddMember();
                    onClose();
                  }}
                >
                  Thêm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
