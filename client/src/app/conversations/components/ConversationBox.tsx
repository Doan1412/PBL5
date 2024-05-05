import {
  Avatar,
  AvatarGroup,
  Badge,
  Card,
  CardHeader,
} from "@nextui-org/react";
import useConversation from "@/app/hooks/customs/useConversation";
import { FullMessageType, MessageBoxType, UserMessageType } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { format } from "date-fns";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { getLocalStorage } from "@/app/actions/localStorage_State";

interface PropsConversationBox {
  dataBox: MessageBoxType;
}

export default function ConversationBox({ dataBox }: PropsConversationBox) {
  const router = useRouter();
  const [uniqueLastNames, setUniqueLastNames] = useState<string[]>([]);
  const [uniqueMembers, setUniqueMembers] = useState<UserMessageType[]>([]);

  const hasSeen = useMemo(() => {
    return false;
  }, []);

  const handleClick = useCallback(() => {
    router.push(`/conversations/${dataBox.id}`);
  }, [router, dataBox]);

  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );

  useEffect(() => {
    if (dataBox?.name) {
      const parts = dataBox.name.split(", ");
      const lastName = parts.filter(
        (part) => !part.includes(data?.data?.lastname!)
      );
      setUniqueLastNames((prevLastNames) => [...lastName]);
    }
  }, [data?.data?.lastname, dataBox.name]);

  useEffect(() => {
    const idToRemove = data?.data?.id;
    const members = dataBox?.members;
    setUniqueMembers(members.filter((member) => member.id !== idToRemove));
  }, [data?.data?.id, dataBox?.members]);
  return (
    <Card className="max-w-[340px] hover:bg-neutral-100 cursor-pointer transition rounded-lg mb-4">
      <CardHeader className="justify-between" onClick={handleClick}>
        <div className="flex gap-3">
          <div className="flex items-center relative">
            <Badge content="" color="success" shape="circle">
              {dataBox?.members?.length == 2 ? (
                <Avatar
                  src={uniqueMembers
                    .map((item) => item.profile.avatar_url)
                    .join(",")}
                />
              ) : (
                <AvatarGroup
                  isBordered
                  max={1}
                  total={dataBox?.members?.length - 1}
                >
                  {uniqueMembers.map((item, index) => (
                    <Avatar key={index} src={item.profile.avatar_url} />
                  ))}
                </AvatarGroup>
              )}
            </Badge>
          </div>
          <div className="flex flex-col gap-1 items-start justify-center">
            <div className="flex gap-4">
              <h4 className="text-sm font-semibold leading-none text-default-600 mr-0.5">
                {uniqueLastNames.join(", ")}
              </h4>
              {/* <h5 className="text-sm tracking-tight text-default-400 leading-none mr-2">
                @zoeylang
              </h5> */}
              {/* <h5 className=" text-xs text-gray-400 font-light leading-none">
                {format(new Date(), "p")}
              </h5> */}
            </div>
            <h5
              className={clsx(
                `
              truncate 
              text-sm
              `,
                hasSeen ? "text-gray-500" : "text-black font-medium"
              )}
            >
              Started a conversation
            </h5>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
