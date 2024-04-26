import React from "react";
import "./index.scss";
import { Image } from "@nextui-org/react";
import { BiX } from "react-icons/bi";
import Bot from "@/static/images/bot.jpg";

interface PopupProps {
  type?: "success" | "fail";
  text: string;
  close: () => void;
}

export default function Popup({ type, text, close }: PopupProps) {
  if (!type) return null;

  return (
    <>
      {type === "success" ? (
        <div className="notification dark:bg-[#242526] dark:text-white z-50">
          <div className="notification-header">
            <h3 className="notification-title">New notification</h3>
            <BiX className="cursor-pointer" onClick={close} />
          </div>
          <div className="notification-container">
            <div className="notification-media">
              <Image
                src={Bot.src}
                alt=""
                className="notification-user-avatar"
              />
              {/* <i className="fa fa-thumbs-up notification-reaction"></i> */}
            </div>
            <div className="notification-content">
              <p className="notification-text">
                {/* <strong>evondev</strong>, <strong>Trần Anh Tuấn</strong> and 154
                others react to your post in{" "} */}
                <strong>{text}</strong>
              </p>
              <span className="notification-timer">a few seconds ago</span>
            </div>
            <span className="notification-status"></span>
          </div>
        </div>
      ) : (
        <div className="notification dark:bg-[#242526] dark:text-white z-50">
          <div className="notification-header">
            <h3 className="notification-title">New notification</h3>
            <BiX className="cursor-pointer" onClick={close} />
          </div>
          <div className="notification-container">
            <div className="notification-media">
              <Image
                src={Bot.src}
                alt=""
                className="notification-user-avatar"
              />
              {/* <i className="fa fa-thumbs-up notification-reaction"></i> */}
            </div>
            <div className="notification-content">
              <p className="notification-text">
                {/* <strong>evondev</strong>, <strong>Trần Anh Tuấn</strong> and 154
            others react to your post in{" "} */}
                <strong>Erorr: {text}</strong>
              </p>
              <span className="notification-timer">a few seconds ago</span>
            </div>
            <span className="notification-status"></span>
          </div>
        </div>
      )}
    </>
  );
}
