import { Avatar, Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import { PiDotsThreeOutlineBold } from "react-icons/pi";

export default function PhotoForm() {
  return (
    <div>
      <Image
      isBlurred
      width={170}
      src="https://nextui-docs-v2.vercel.app/images/album-cover.png"
      alt="NextUI Album Cover"
      className="m-1 mt-3"
    />
    </div>
  );
}
