import { Card, CardBody, Image, Link } from "@nextui-org/react";
import React from "react";
import Avatar1 from "@/static/images/avatar.jpg";

export default function SidebarImage() {
  const list = [
    {
      title: "Orange",
      img: Avatar1.src,
    },
    {
      title: "Tangerine",
      img: Avatar1.src,
    },
    {
      title: "Raspberry",
      img: Avatar1.src,
    },
    {
      title: "Lemon",
      img: Avatar1.src,
    },
    {
      title: "Avocado",
      img: Avatar1.src,
    },
    {
      title: "Lemon 2",
      img: Avatar1.src,
    },
    {
      title: "Banana",
      img: Avatar1.src,
    },
    {
      title: "Watermelon",
      img: Avatar1.src,
    },
    {
      title: "Watermelon",
      img: Avatar1.src,
    },
  ];

  return (
    <>
      <div className="bg-[#f0f2f5] dark:bg-gray-800 rounded-lg shrink flex flex-col">
        <div className="flex justify-between mr-5">
          <h1 className="ml-5 mt-5 font-bold text-xl">Image</h1>
          <Link href="#" className="text-sky-500 ml-5 mt-5">
            Xem tất cả ảnh
          </Link>
        </div>
        <div>
          <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 m-5">
            {list.map((item, index) => (
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
                    alt={item.title}
                    className="w-full object-cover h-[140px]"
                    src={item.img}
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
