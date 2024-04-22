import { Button, Card, CardBody, Image, Link } from "@nextui-org/react";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdBusinessCenter } from "react-icons/md";
import { IoHeart } from "react-icons/io5";

export default function SidebarProfile() {
 
  return (
    <>
      <div className="bg-[#ffffff] dark:bg-[#242526] rounded-lg mb-4 shrink drop-shadow-2xl dark:text-white">
        <h1 className="ml-5 mt-5 font-bold text-xl dark:text-white">Intro</h1>
        <h1 className="flex justify-center mt-2 dark:text-white">Code toàn bug 🤡</h1>
        <div className="mt-2 flex justify-center w-full">
          <Button color="default" className="w-5/6">
            Chỉnh sửa tiểu sử
          </Button>
        </div>
        <div className="mt-5 ml-5 flex">
          <MdBusinessCenter size={25} />
          <h1 className="ml-1">
            Từng học tại <span className="font-medium dark:text-white">THPT Khâm Đức</span>
          </h1>
        </div>
        <div className="mt-3 ml-5 flex">
          <FaGraduationCap size={25} />
          <h1 className="ml-1">
            Học IT tại <span className="font-medium dark:text-white">Đại học Bách Khoa</span>
          </h1>
        </div>
        <div className="mt-3 ml-5 flex">
          <FaLocationDot size={25} />
          <h1 className="ml-1 dark:text-white">
            Đến từ{" "}
            <span className="font-medium dark:text-white">Phuoc Son, Quang Nam, Viet Nam</span>
          </h1>
        </div>
        <div className="mt-3 ml-5 mr-2 flex">
          <IoHeart size={25} />
          <h1 className="ml-1">
            <span className="ml-1 font-medium dark:text-white">Độc thân</span>
          </h1>
        </div>
        <div className="mt-5 mb-5 flex justify-center w-full">
          <Button color="default" className="w-5/6">
            Chỉnh sửa chi tiết
          </Button>
        </div>
      </div>
      {/* <div className="bg-[#f0f2f5] dark:bg-gray-800 rounded-lg shrink">
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
      </div> */}
    </>
  );
}
