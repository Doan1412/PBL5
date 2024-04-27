"use client";
import {
  Image,
  Checkbox,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Skeleton,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";
import SearchIcon from "@/components/SearchIcon";
import logoImage from "@/static/images/logoImage.png";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUserGroup } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import { useAppDispatch } from "@/app/hooks/store";
import avatarDefault from "@/static/images/avatarDefault.jpg";
import { successPopUp } from "@/app/hooks/features/popup.slice";
import { Report } from "@/app/types";
import useHttp from "../hooks/customs/useAxiosPrivate";
import { failPopUp } from "../hooks/features/popup.slice";

export default function Admin() {
  const [selected, setSelected] = useState(0);
  const router = useRouter();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const [loading, setLoading] = useState(true);
  // const dispatch = useAppDispatch();
  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );
  const dispatch = useAppDispatch();
  const [reports, setReports] = useState<Report[] | null>(null);
  useEffect(() => {
    async function fetchReports() {
      const token = getLocalStorage()?.token;
      if (!token) return;
      try {
        const response = await httpPrivate.get(
          `/report`,
          {
            signal: controller.signal,
          }
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        controller.abort();
        if (response.data.status === 200) {
          const reportsData = response.data.data;
          // console.log(reportsData);
          setReports(reportsData);
          setLoading(false);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        // console.error("Error:", error);
        setLoading(false);
      }
    }
    fetchReports();
  }, [dispatch, controller, httpPrivate]);
  function getBackgroundColor(index: number) {
    const colors = ["bg-blue-50", "bg-indigo-50", "bg-violet-50"]; // Màu nền cho các lý do khác nhau
    return colors[index % colors.length];
  }

  function getTextColor(index: number) {
    const colors = ["text-blue-600", "text-indigo-600", "text-violet-600"]; // Màu chữ cho các lý do khác nhau
    return colors[index % colors.length];
  }
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return (
    <div className="pr-10 bg-stone-50 max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow pt-10 pb-20 mx-auto w-full text-base tracking-wide whitespace-nowrap bg-white max-md:mt-6">
            <div className="flex justify-center max-h-52">
              <Image
                loading="lazy"
                // width={240}
                height={200}
                src={logoImage.src}
                className="shrink-0 self-end w-20 aspect-[0.95]"
                alt="Logo"
              />
            </div>
            <div className="flex gap-5 items-start mt-6 max-md:pr-5">
              <div className="shrink-0 bg-blue-600 h-[39px] w-[3px]" />
              <div className="flex flex-col mt-2">
                <div className="flex gap-4 text-neutral-900 hover:cursor-pointer">
                  <Image
                    alt="avatar"
                    loading="lazy"
                    width={170}
                    height={124}
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c5b697cff3442e0b525c0ff20165bdca0ff172b0ac2c76b77898c746df34b6e?"
                    className="shrink-0 w-6 aspect-square"
                  />
                  <div>Manager</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col mt-14 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 justify-between pr-4 w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex items-center">
                <Input
                  classNames={{
                    base: "max-w-full sm:max-w-[18rem] h-10 ml-4",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper:
                      "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                  }}
                  placeholder="Type to search..."
                  size="sm"
                  startContent={<SearchIcon size={18} />}
                  type="search"
                />
              </div>
              <div className="flex items-center">
                <ul className="flex">
                  <li>
                    <button className="w-12 h-12 flex justify-center items-center rounded-full bg-gray-300 hover:bg-gray-200 dark:bg-medium">
                      <FaBell size={23} className="dark:text-white" />
                    </button>
                  </li>
                  <li className="mt-1">
                    <Dropdown placement="bottom-end" className="">
                      <DropdownTrigger>
                        <div className="flex items-center relative">
                          <Avatar
                            isBordered
                            as="button"
                            className="transition-transform w-10 h-10 flex justify-center items-center rounded-full mx-2"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src={
                              data?.data.profile.avatar_url != ""
                                ? `${data?.data.profile.avatar_url}`
                                : avatarDefault.src
                            }
                          />
                          <span className=" absolute flex h-3 w-3 top-0 right-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                          </span>
                        </div>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                          {isFetching ? (
                            <div className="w-full flex flex-col gap-2">
                              <Skeleton className="h-3 w-3/5 rounded-lg" />
                              <Skeleton className="h-3 w-4/5 rounded-lg" />
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                const currentUrl = `/profile/photo?id_user=${
                                  data?.data.id as string
                                }`;
                                router.push(currentUrl);
                              }}
                            >
                              <p className="font-semibold">Signed in as</p>
                              <p className="font-semibold">
                                {data?.data.firstname} {data?.data.lastname}
                              </p>
                            </div>
                          )}
                        </DropdownItem>
                        <DropdownItem
                          key="help_and_feedback"
                          onClick={() => {
                            dispatch(
                              successPopUp("Tính năng đang phát triển!")
                            );
                          }}
                        >
                          Help & Feedback
                        </DropdownItem>
                        <DropdownItem
                          key="logout"
                          color="danger"
                          onClick={() => {
                            localStorage.clear();
                            router.push("/");
                          }}
                        >
                          Log Out
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </li>
                </ul>
              </div>
            </div>
            <div className="self-start mt-12 ml-4 text-2xl font-medium text-black max-md:mt-10 max-md:ml-2.5">
              Manager Information Report
            </div>
            <div className="flex flex-col pb-20 mt-16 bg-white rounded max-md:mt-10 max-md:max-w-full">
              <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Post ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Reporter
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Remove Post
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    >
                      Resovlve
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-medium text-gray-900"
                    ></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                  {reports &&
                    reports.map((report: Report, index: number) => {
                      const reasons = report.reason.split(", ");
                      return (
                        <>
                          <tr className="hover:bg-gray-50">
                            <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                              <div className="text-sm">
                                <div className="font-medium text-blue-600">
                                  {report.id}
                                </div>
                                <div className="text-gray-400">
                                  {report.post.username}
                                </div>
                              </div>
                            </th>
                            <td className="px-6 py-4">
                              {formatDate(report.createdAt)}
                            </td>
                            <td className="px-6 py-4">
                              {report.user.username}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex gap-2">
                                {reasons.map((reason, index) => (
                                  <span
                                    key={index}
                                    className={`inline-flex items-center gap-1 rounded-full ${getBackgroundColor(
                                      index
                                    )} px-2 py-1 text-xs font-semibold ${getTextColor(
                                      index
                                    )}`}
                                  >
                                    {reason}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex justify-center gap-4">
                                <a x-data="{ tooltip: 'Delete' }" href="#">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                    x-tooltip="tooltip"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                  </svg>
                                </a>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex justify-center">
                                <Checkbox
                                  defaultSelected={report.status === "RESOLVED"} // Nếu status là RESOLVED thì checkbox được chọn, ngược lại không chọn
                                  color="success"
                                  disabled={report.status === "RESOLVED"} // Nếu status là RESOLVED thì checkbox bị vô hiệu hóa
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex justify-center"></div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
