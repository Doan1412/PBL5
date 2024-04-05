import { Avatar, Badge, Card, CardHeader } from "@nextui-org/react";
import useConversation from "@/app/hooks/customs/useConversation";
import { FullMessageType } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import { format } from "date-fns";

export default function ConversationBox() {
  const router = useRouter();

  const hasSeen = useMemo(() => {
    return false;
  }, []);

  const handleClick = useCallback(() => {
    router.push(`/conversations/1`);
  }, [router]);

  return (
    <Card className="max-w-[340px] hover:bg-neutral-100 cursor-pointer transition rounded-lg mb-4">
      <CardHeader className="justify-between" onClick={handleClick}>
        <div className="flex gap-3">
          <div className="flex items-center relative">
            <Badge content="" color="success" shape="circle">
              <Avatar
                isBordered
                radius="full"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
              />
            </Badge>
          </div>

          <div className="flex flex-col gap-1 items-start justify-center">
            <div className="flex gap-4">
              <h4 className="text-sm font-semibold leading-none text-default-600 mr-0.5">
                Zone Lag
              </h4>
              {/* <h5 className="text-sm tracking-tight text-default-400 leading-none mr-2">
                @zoeylang
              </h5> */}
              <h5 className=" text-xs text-gray-400 font-light leading-none">
                {format(new Date(), "p")}
              </h5>
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
