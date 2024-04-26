import { getLocalStorage } from "@/app/actions/localStorage_State";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { failPopUp, successPopUp } from "@/app/hooks/features/popup.slice";
import { useAppDispatch } from "@/app/hooks/store";
import { ListFriendType } from "@/app/types";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useMemo } from "react";
import { PiDotsThreeOutlineBold } from "react-icons/pi";

interface PropFriendForm {
  data: ListFriendType;
  setFiends: React.Dispatch<React.SetStateAction<ListFriendType[]>>;
}

const items = [
  {
    key: "messenger",
    label: "Messenger",
  },
  {
    key: "profile",
    label: "Profile",
  },
  {
    key: "Delete",
    label: "Huỷ kết bạn",
  },
];

export default function FriendForm({ data, setFiends }: PropFriendForm) {
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const dispatch = useAppDispatch();

  // const removeFriend = useRemoveFriend(data.id);
  const handleItemClick = (key: any) => {
    // Xử lý sự kiện khi người dùng click vào DropdownItem
    switch (key) {
      case "messenger":
        // Xử lý khi click vào Messenger
        console.log("Clicked Messenger");
        break;
      case "profile":
        // Xử lý khi click vào Profile
        console.log("Clicked Profile");
        break;
      case "Delete":
        const handleDelete = async (id: string) => {
          const token = getLocalStorage()?.token;
          if (!token) return;
          try {
            const response = await httpPrivate.post(
              `/friend/unfriend/${id}`,
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
              setFiends([...response.data.data]);
              dispatch(successPopUp("Hủy kết bạn thành công! 😒"));
            } else {
              dispatch(failPopUp(response.data.message));
            }
          } catch (error) {
            console.error("Error:", error);
          }
        };
        handleDelete(data.id);
        break;
    }
  };

  return (
    <div className="m-3">
      <Card className="lg:w-96 w-auto hover:cursor-pointer dark:bg-[#242526]">
        <CardBody>
          <div className="flex justify-between">
            <div className="flex gap-3">
              <Avatar
                isBordered
                radius="sm"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                size="lg"
              />
              <div className="flex items-center">
                <div className="flex flex-col">
                  <p className="hover:text-[#377375]">{data?.fullname}</p>
                  <p className="text-xs text-gray-600 dark:text-white">
                    @{data?.username}
                  </p>
                </div>
              </div>
            </div>
            <div className="mr-3">
              <Dropdown className="dark:bg-[#242526]">
                <DropdownTrigger>
                  <button>
                    {" "}
                    <PiDotsThreeOutlineBold />
                  </button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={items}>
                  {(item) => (
                    <DropdownItem
                      key={item.key}
                      color={item.key === "Delete" ? "danger" : "default"}
                      className={item.key === "Delete" ? "text-danger" : ""}
                      onClick={() => handleItemClick(item.key)}
                    >
                      {item.label}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
