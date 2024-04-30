import { Avatar, Card, CardBody, Image } from "@nextui-org/react";
import React from "react";
import { PiDotsThreeOutlineBold } from "react-icons/pi";

interface PropsPhotoForm {
  linkImage: string;
}

export default function PhotoForm({ linkImage }: PropsPhotoForm) {
  return (
    <div>
      <Image
        shadow="sm"
        isBlurred
        width={170}
        src={linkImage}
        alt="NextUI Album Cover"
        className="m-1 mt-3"
      />
    </div>
  );
}
