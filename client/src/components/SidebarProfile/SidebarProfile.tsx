import { Button, Card, CardBody, Image, Link } from "@nextui-org/react";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import { IoHeart } from "react-icons/io5";
import Avatar1 from "@/static/images/avatar.jpg";

export default function SidebarProfile() {
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
      <div className="bg-[#f0f2f5] dark:bg-gray-800 rounded-lg mb-4 shrink">
        <h1 className="ml-5 mt-5 font-bold text-xl">Intro</h1>
        <h1 className="flex justify-center mt-2">Code toàn bug 🤡</h1>
        <div className="mt-2 flex justify-center w-full">
          <Button color="default" className="w-5/6">
            Chỉnh sửa tiểu sử
          </Button>
        </div>
        <div className="mt-5 ml-5 flex">
          <MdBusinessCenter size={25} />
          <h1 className="ml-1">
            Từng học tại <span className="font-medium">THPT Khâm Đức</span>
          </h1>
        </div>
        <div className="mt-3 ml-5 flex">
          <FaGraduationCap size={25} />
          <h1 className="ml-1">
            Học IT tại <span className="font-medium">Đại học Bách Khoa</span>
          </h1>
        </div>
        <div className="mt-3 ml-5 flex">
          <FaLocationDot size={25} />
          <h1 className="ml-1">
            Đến từ{" "}
            <span className="font-medium">Phuoc Son, Quang Nam, Viet Nam</span>
          </h1>
        </div>
        <div className="mt-3 ml-5 mr-2 flex">
          <IoHeart size={25} />
          <h1 className="ml-1">
            <span className="ml-1 font-medium">Độc thân</span>
          </h1>
        </div>
        <div className="mt-5 mb-5 flex justify-center w-full">
          <Button color="default" className="w-5/6">
            Chỉnh sửa chi tiết
          </Button>
        </div>
      </div>
      <div className="bg-[#f0f2f5] dark:bg-gray-800 rounded-lg shrink">
        <div className="flex justify-between mr-5">
          <h1 className="ml-5 mt-5 font-bold text-xl">Image</h1>
          <Link href="#" className="text-sky-500 ml-5 mt-5">
            Xem tất cả ảnh
          </Link>
        </div>
        <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 m-5">
          {list.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
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
    </>
  );
}
