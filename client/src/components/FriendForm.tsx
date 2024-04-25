import { ListFriendType } from "@/app/types";
import { Avatar, Card, CardBody } from "@nextui-org/react";
import React from "react";
import { PiDotsThreeOutlineBold } from "react-icons/pi";

interface PropFriendForm {
  data: ListFriendType;
}

export default function FriendForm({ data }: PropFriendForm) {
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
              <PiDotsThreeOutlineBold />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
