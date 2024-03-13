"use client";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import React, { useCallback, useMemo } from "react";
import clsx from "clsx";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function UserBox() {
  const hasSeen = useMemo(() => {
    return false;
  }, []);

  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/1`);
    console.log("1");
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
            <div className="flex">
              <h4 className="text-small font-semibold leading-none text-default-600 mr-0.5">
                Zoey Lang
              </h4>
              <h5 className="text-small tracking-tight text-default-400 leading-none mr-2">
                @zoeylang
              </h5>
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
