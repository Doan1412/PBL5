import React from "react";
import { GoCheckCircle } from "react-icons/go";
import { LuAlertCircle } from "react-icons/lu";

interface PopupProps {
  type?: "success" | "fail";
  text: string;
  close: () => void;
}

export default function Popup({ type, text, close }: PopupProps) {
  if (!type) return null;

  return (
    <>
      <div className="w-dvw h-dvh bg-gray-500 opacity-80 fixed top-0 left-0 z-50"></div>
      <div className="absolute w-dvw h-dvh flex items-center justify-center z-50">
        <div className="w-80 h-auto text-sm leading-tight flex flex-col gap-4">
          <div className="p-4 rounded-lg bg-green-100">
            <div className="flex">
              <div className="flex-shrink-0">
                {type === "fail" ? (
                  <div className="rounded-full bg-red-500 z-50">
                    <LuAlertCircle color={"white"} size={30} />
                  </div>
                ) : null}

                {type === "success" ? (
                  <div className="rounded-full bg-green-500 z-50">
                    <GoCheckCircle color={"white"} size={30} />
                  </div>
                ) : null}
              </div>
              <div className="ml-3">
                <div className="flex flex-col">
                  {type === "fail" ? (
                    <p className="text-base text-red-500 font-semibold">
                      Thất bại
                    </p>
                  ) : null}
                  {type === "success" ? (
                    <p className="text-base text-green-500 font-semibold">
                      Thành công
                    </p>
                  ) : null}
                </div>
                <div className="mt-2 text-green-600">
                  <div className="flex flex-col">
                    {type === "fail" ? (
                      <p className="text-base text-red-500">
                        Error: <span className="font-semibold">{text}</span>.
                        Xin vui lòng thử lại sau giây lát ...
                      </p>
                    ) : null}
                    {type === "success" ? (
                      <p className="text-base text-green-500">{text ? text : "Thao tác thành công!"}</p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-3 -mx-1">
                  {type === "fail" ? (
                    <button className="success-button-main px-2 py-1 text-green-700 font-bold rounded hover:bg-green-300">
                      Try hard
                    </button>
                  ) : null}
                  {type === "success" ? (
                    <button
                      className="success-button-main px-2 py-1 text-green-700 font-bold rounded hover:bg-green-300"
                      onClick={close}
                    >
                      Continue
                    </button>
                  ) : null}
                  <button
                    className="ml-3 px-2 py-1 bg-green-200 text-green-700 font-bold rounded border border-green-400 hover:bg-green-300 cursor-pointer"
                    onClick={close}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
