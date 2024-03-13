"use client";
import Navigation from "@/components/Navigation";
import SidebarMess from "@/components/SidebarMess/SidebarMess";
import UserList from "@/components/UserList";

//eslint-disable-next-line
export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col">
      <SidebarMess>
        <div className="h-full">
          <UserList />
          {children}
        </div>
      </SidebarMess>
    </div>
  );
}
