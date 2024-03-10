"use client";
import SidebarMess from "@/components/SidebarMess/SidebarMess";

//eslint-disable-next-line
export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarMess>
        <div className="h-full">{children}</div>
      </SidebarMess>
  );
}
