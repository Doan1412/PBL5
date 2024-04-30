import { Card, CardBody, Image, Link } from "@nextui-org/react";
import React from "react";
import Avatar1 from "@/static/images/avatar.jpg";
import { ImageType } from "@/app/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PropsSidebarImage {
  data?: string[];
}

export default function SidebarImage({ data }: PropsSidebarImage) {
  const params = useSearchParams();
  const url = usePathname();
  const router = useRouter();

  // console.log(data);
  return (
    <>
      <div className="bg-[#ffffff] dark:bg-[#242526] rounded-lg shrink flex flex-col drop-shadow-2xl">
        <div className="flex justify-between mr-5">
          <h1 className="ml-5 mt-5 font-bold text-xl dark:text-white">Image</h1>
          <Link
            onClick={() => {
              const currentUrl = `/profile/photo?id_user=${
                params.get("id_user") as string
              }`;
              // console.log(url);
              if (url !== currentUrl) {
                router.push(currentUrl);
              }
            }}
            className="text-sky-500 ml-5 mt-5 "
          >
            Xem tất cả ảnh
          </Link>
        </div>
        <div>
          <div className="gap-1 grid grid-cols-2 sm:grid-cols-3 m-5">
            {data?.map((item, index) => (
              <div key={index}>
                {item.endsWith(".mp4") ? null : (
                  <Card
                    shadow="sm"
                    key={index}
                    isPressable={true}
                    onPress={() => {}}
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
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
