import React from "react";
import clsx from "clsx";
import { Avatar, Image } from "@nextui-org/react";
import { format } from "date-fns";
import avatarr from "@/static/images/avatar.jpg";

export default function MessageBox() {
  const isOwn = false;
  const image = false;

  const container = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = clsx(isOwn && "order-2");

  const body = clsx("flex flex-col gap-2", isOwn && "items-end");

  const message = clsx(
    "text-sm w-fit overflow-hidden rounded-2xl",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">Bạn</div>
          <div className="text-xs text-gray-500">{format(new Date(), "p")}</div>
        </div>
        <div className={message}>
          {image ? (
            <Image
              alt="Image"
              height="288"
              width="288"
              src={avatarr.src}
              className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
            />
          ) : (
            <div className="p-3">Hello Word</div>
          )}
        </div>
      </div>
    </div>
  );
}
