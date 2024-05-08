import React from "react";
import Link from "next/link";
import { Image, Skeleton } from "@nextui-org/react";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import SkeletonUser from "@/app/actions/getSkeleton";
import { useRouter } from "next/navigation";


const SidebarSearch: React.FC = () => {
  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );

  const router = useRouter();
  return (
      <div className="userProfileWidget dark:bg-[#242526] dark:text-white dark:shadow-lg">
        {isFetching ? (
          <SkeletonUser />
        ) : (
          <div className="flex">
            <div className="profileImage">
              <Image
                src={
                  data?.data.profile.avatar_url != ""
                    ? `${data?.data.profile.avatar_url}`
                    : avatarDefault.src
                }
                alt=""
              />
            </div>
            <div className="userDetails dark:text-white flex items-center">
              <div className="flex flex-col">
                <Link
                  href={`/profile?id_user=${getLocalStorage()?.user_id}`}
                  className="name dark:text-white"
                >
                  {data?.data.firstname} {data?.data.lastname}
                </Link>
                <div className="username dark:text-white">
                  @{data?.data.username}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  );
};

export default SidebarSearch;
