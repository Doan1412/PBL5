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
import { Image } from "@nextui-org/react";
import avatar from "@/static/images/avatar.jpg";

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
  return (
    <div className="leftSection dark:text-white">
      <div className="userProfileWidget dark:bg-[#242526] dark:text-white dark:shadow-lg">
        <div className="profileImage">
          <Image src={avatar.src} alt="" />
        </div>
        <div className="userDetails dark:text-white">
          <Link href={"/profile"} className="name dark:text-white">
            John Doe
          </Link>
          <div className="username dark:text-white">@johndoe</div>
        </div>
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
