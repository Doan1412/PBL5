import React from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import "./style.css";
import { Image } from "@nextui-org/react";
import RImage from "@/static/images/RImage.png";

interface LoadingProps {
  onLoading?: boolean;
}

export default function Loading({ onLoading }: LoadingProps) {
  if (!onLoading) return null;
  return (
    <div className="w-screen h-screen bg-gray-500 opacity-80 fixed top-0 left-0 z-30">
      <div className="absolute w-screen h-screen flex items-center justify-center z-40 flex-col">
        <div
          aria-label="Orange and tan hamster running in a metal wheel"
          role="img"
          className="wheel-and-hamster"
        >
          <div className="wheel"></div>
          <div className="hamster">
            <div className="hamster__body">
              <div className="hamster__head">
                <div className="hamster__ear"></div>
                <div className="hamster__eye"></div>
                <div className="hamster__nose"></div>
              </div>
              <div className="hamster__limb hamster__limb--fr"></div>
              <div className="hamster__limb hamster__limb--fl"></div>
              <div className="hamster__limb hamster__limb--br"></div>
              <div className="hamster__limb hamster__limb--bl"></div>
              <div className="hamster__tail"></div>
            </div>
          </div>
          <div className="spoke"></div>
        </div>
        <div>
          <Image
            className="flex mx-auto m-3 rounded-2xl"
            src={RImage.src}
            alt="Login"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
