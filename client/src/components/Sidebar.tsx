import React from "react";
import { MdSettings } from "react-icons/md";
import {
  FaBell,
  FaBookmark,
  FaBrush,
  FaCompass,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";
import Link from "next/link";
import { Image, Skeleton } from "@nextui-org/react";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import SkeletonUser from "@/app/actions/getSkeleton";

interface LinkItem {
  name: string;
  icon: JSX.Element;
}

const links: LinkItem[] = [
  {
    name: "Home",
    icon: <FaHome />,
  },
  {
    name: "Explore",
    icon: <FaCompass />,
  },
  {
    name: "Notifications",
    icon: <FaBell />,
  },
  {
    name: "Messages",
    icon: <FaEnvelope />,
  },
  {
    name: "Bookmarks",
    icon: <FaBookmark />,
  },
  {
    name: "Theme",
    icon: <FaBrush />,
  },
  {
    name: "Settings",
    icon: <MdSettings />,
  },
];

const Sidebar: React.FC = () => {
  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );
  return (
    <div className="leftSection dark:text-white">
      <div className="userProfileWidget dark:bg-[#242526] dark:text-white dark:shadow-lg">
        {isFetching ? (
          <SkeletonUser />
        ) : (
          <div className="flex">
            <div className="profileImage">
              <Image
                src={
                  data?.data.profile.avatar_url != ""
                    ? `${data?.data.profile.avatar_url}`
                    : avatarDefault.src
                }
                alt=""
              />
            </div>
            <div className="userDetails dark:text-white flex items-center">
              <div className="flex flex-col">
                <Link href={`/profile?id_user=${getLocalStorage()?.user_id}`} className="name dark:text-white">
                  {data?.data.firstname} {data?.data.lastname}
                </Link>
                <div className="username dark:text-white">
                  @{data?.data.username}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="inSidebar dark:bg-[#242526] dark:text-white">
        {links.map((link, index) => (
          <div className="link" key={index}>
            <div className="icon">{link.icon}</div>
            <h3>{link.name}</h3>
          </div>
        ))}
      </div>

      <label htmlFor="createNewPost" className="inBtn sidebarCreateBtn">
        Create Post
      </label>
    </div>
  );
};

export default Sidebar;
