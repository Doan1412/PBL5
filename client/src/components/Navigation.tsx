import React from "react";
import {
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
  Badge,
} from "@nextui-org/react";
import logoImage from "@/static/images/logoImage.png";
import SearchIcon from "./SearchIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";

export default function Navigation() {
  return (
    <div>
      <nav className="bg-white p-0">
        <ul className="hidden lg:flex items-center justify-between px-2 shadow-md">
          <li>
            <Image
              className="mx-auto mr-3 ml-3"
              src={logoImage.src}
              alt="Login"
              width={50}
              height={50}
            />
          </li>
          <li>
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[18rem] h-10 ml-4",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
            />
          </li>
          <li>
            <div
              id="home"
              className="tooltip active w-24 h-12 flex justify-center items-center ml-72 hover:bg-gray-300 hover:border rounded-lg "
              data-tooltip="Home"
            >
              <button className="button hover:translate-y-[-3px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6em"
                  height="1.6em"
                  viewBox="0 0 1024 1024"
                  strokeWidth="0"
                  fill="currentColor"
                  stroke="currentColor"
                  className="icon"
                >
                  <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
                </svg>
              </button>
            </div>
          </li>
          <li>
            <div className="w-24 h-12 flex justify-center items-center hover:bg-gray-300 hover:border rounded-lg shrink">
              <button className="button hover:translate-y-[-3px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6em"
                  height="1.6em"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="icon"
                >
                  <path
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </button>
            </div>
          </li>
          <li>
            <div className="w-24 h-12 flex justify-center items-center hover:bg-gray-300 hover:border rounded-lg">
              <button className="hover:translate-y-[-3px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.6em"
                  height="1.6em"
                  viewBox="0 0 24 24"
                  strokeWidth="0"
                  fill="currentColor"
                  stroke="currentColor"
                  className="icon"
                >
                  <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
                </svg>
              </button>
            </div>
          </li>
          {/* <li>
            <a
              href="#"
              id="friend"
              className="tooltip w-24 h-12 flex justify-center items-center"
              data-tooltip="Friend"
            >
              <i className="fas fa-user-alt"></i>
            </a>
          </li> */}
          <li id="space1" className="flex-1"></li>
          <li>
            <button className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-200 mr-1">
              <FaUserGroup size={23} />
            </button>
          </li>
          <li>
            <button className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-200 mr-1">
              <FaFacebookMessenger size={23} />
            </button>
          </li>
          <li>
            <button className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-200">
              <FaBell size={23} />
            </button>
          </li>
          <li>
            <Dropdown placement="bottom-end" className="">
              <DropdownTrigger>
                <div className="flex items-center relative">
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform w-10 h-10 flex justify-center items-center rounded-full mx-2"
                    color="secondary"
                    name="Jason Hughes"
                    size="sm"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                  <span className=" absolute flex h-3 w-3 top-0 right-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                  </span>
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </nav>
    </div>
  );
}
