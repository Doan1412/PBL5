"use client";
import { ConversationType, UserType } from "@/app/types";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import React, { useMemo } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";

interface HeaderProps {
  conversation: ConversationType & {
    users: UserType[];
  };
}

export default function Header() {
  const statusText = useMemo(() => {
    if (0) {
      return `10 member`;
    }
    return `Active`;
  }, []);
  return (
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          href="/conversations"
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar src="https://scontent.fdad1-1.fna.fbcdn.net/v/t39.30808-6/422893890_416818450687332_2295614885100060112_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeH2tadtw99Ri27_UQqXhmYWXv94TwYypQxe_3hPBjKlDNFufAKKOamh_gdc3ZA5kSnTrE8SbV-vj07G36zVCaLN&_nc_ohc=ICdmGBgOc4UAX_Qld2Z&_nc_ht=scontent.fdad1-1.fna&cb_e2o_trans=t&oh=00_AfB4e-nO5gPT1dbXhiPqV5vWs11eaOnPo9LFO_08cLxt5A&oe=65F8D890" />
        <div className="flex flex-col">
          <div className="font-semibold">Thái Khắc Dược</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
      />
    </div>
  );
}
