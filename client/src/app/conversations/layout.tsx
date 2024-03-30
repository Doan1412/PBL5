"use client";
import SidebarMess from "@/components/SidebarMess/SidebarMess";
import ConversationsList from "./components/ConversationsList";

//eslint-disable-next-line
export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarMess>
      <div className="h-full">
        <ConversationsList initialItems={[]} />
        {children}
      </div>
    </SidebarMess>
  );
}
