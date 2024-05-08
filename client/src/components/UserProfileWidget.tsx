import React from "react";
import { User } from "@/app/types";
import Image from "next/image";
import Link from "next/link";
import avatarDefault from "@/static/images/avatarDefault.jpg";


interface UserProfileWidgetProps {
  avatar_url: string;
  firstname: string;
  lastname: string;
  username: string;
  id: string;  
}

const UserProfileWidget: React.FC<UserProfileWidgetProps> = ({
  avatar_url, firstname, lastname, username, id
}) => {
  return (
    <div className="mt-5 flex items-center bg-white w-full py-3 px-3 rounded-xl shadow-md dark:text-white">
      <div className="userProfileWidget dark:bg-[#242526] dark:text-white dark:shadow-lg">
          <div className="flex">
            <div className="profileImage">
              <Image src={avatar_url != ""
                    ? `${avatar_url}`
                    : avatarDefault.src} alt="" width={50} height={50}/>
            </div>
            <div className="userDetails dark:text-white flex items-center">
              <div className="flex flex-col">
                <Link
                  href={`/profile?id_user=${id}`}
                  className="ml-2 text-base text-gray-700 font-bold hover:text-[#377375] hover:cursor-pointer dark:text-white dark:text-white"
                >
                  {firstname} {lastname}
                </Link>
                <div className="ml-2 text-xs text-gray-600 dark:text-white dark:text-white">
                  @{username}
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default UserProfileWidget;
