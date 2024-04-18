"use client";
import SidebarMess from "@/components/SidebarMess/SidebarMess";
import ConversationsList from "./components/ConversationsList";
import { useEffect } from "react";

//eslint-disable-next-line
export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    const start = async () => {

    }
  }, []);
  return (
    <SidebarMess>
      <div className="h-full">
        <ConversationsList initialItems={[]} />
        {children}
      </div>
    </SidebarMess>
  );
}
