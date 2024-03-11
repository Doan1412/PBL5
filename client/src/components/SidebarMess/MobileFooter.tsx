import useConversation from "@/app/hooks/useConversation";
import useRoutes from "@/app/hooks/useRoutes";
import React from "react";
import MobileItem from "./MobileItem";

export default function MobileFooter() {
  const routers = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }
  return (
    <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routers.map((router) => (
        <MobileItem
          key={router.href}
          href={router.href}
          active={router.active}
          icon={router.icon}
          onClick={router.onClick}
        />
      ))}
    </div>
  );
}
