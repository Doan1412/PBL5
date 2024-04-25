import { Card, CardBody, Image, Link } from "@nextui-org/react";
import React from "react";
import Avatar1 from "@/static/images/avatar.jpg";
import { ImageType } from "@/app/types";

interface PropsSidebarImage {
  data?: string[];
}

export default function SidebarImage({ data }: PropsSidebarImage) {
  console.log(data);
  return (
    <>
      <div className="bg-[#ffffff] dark:bg-[#242526] rounded-lg shrink flex flex-col drop-shadow-2xl">
        <div className="flex justify-between mr-5">
          <h1 className="ml-5 mt-5 font-bold text-xl dark:text-white">Image</h1>
          <Link href="#" className="text-sky-500 ml-5 mt-5 ">
            Xem tất cả ảnh
          </Link>
        </div>
        <div>
          <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 m-5">
            {data?.map((item, index) => (
              <Card
                shadow="sm"
                key={index}
                isPressable={true}
                onPress={() => console.log("item pressed")}
              >
                <CardBody className="overflow-visible p-0">
                  <Image
                    shadow="sm"
                    radius="lg"
                    width={120}
                    alt=""
                    className="w-full object-cover h-[140px]"
                    src={item}
                  />
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
