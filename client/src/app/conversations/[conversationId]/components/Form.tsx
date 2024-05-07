"use client";
import useConversation from "@/app/hooks/customs/useConversation";
import React, { useEffect, useMemo, useState } from "react";
import { Field, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import http from "@/app/utils/http";
import { CldUploadButton, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { useStompClient } from "../../useContextStorm";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import { MessageBoxType } from "@/app/types";
import { useAppDispatch } from "@/app/hooks/store";
import { useSearchParams } from "next/navigation";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { failPopUp } from "@/app/hooks/features/popup.slice";
import { useMessenger } from "../useContextlistMess";

interface FormProps {
  conversationId: String;
}

interface ImageProps {
  url: string;
  type: string;
}

export default function Form({ conversationId }: FormProps) {
  const { stompClient } = useStompClient();
  const [message, setMessage] = useState<string>("");
  const [boxMessage, setBoxMessage] = useState<MessageBoxType>();
  const dispatch = useAppDispatch();
  const params = useSearchParams();
  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const [imagePost, setImagePost] = useState<ImageProps>();
  const { listMessenger, setListMessenger } = useMessenger();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { message: "" },
  });

  useEffect(() => {
    async function getListBoxChat() {
      try {
        const response = await httpPrivate.get(`room/${conversationId}`, {
          signal: controller.signal,
        });
        controller.abort();
        if (response.data.status === 200) {
          setBoxMessage(response.data.data);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getListBoxChat();
  }, [controller, dispatch, httpPrivate, conversationId]);

  const hand = (content: string) => {
    console.log("send");
    console.log(content);
    console.log(stompClient);
    if (stompClient) {
      var chatMessage = {
        id: "" as string,
        senderId: getLocalStorage()?.user_id as string,
        roomId: boxMessage?.id as string,
        content: content,
        timestamp: new Date().toISOString(),
      };
      console.log("chatMessage chatroom", chatMessage);
      // setListMessenger([...listMessenger, chatMessage]);
      stompClient.send("/app/chatroom", {}, JSON.stringify(chatMessage));
    }
  };
  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   setValue("message", "", { shouldValidate: true });
  //   http.post("/api/messages", {
  //     ...data,
  //     conversationId: conversationId,
  //   });
  // };

  const handleUpload = (result: any) => {
    http.post("/api/messages", {
      image: result.info.secure_url,
      conversationId: conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onSuccess={(result) => {
          // console.log("res", result);
          const secureUrl: CloudinaryUploadWidgetInfo =
            result?.info as CloudinaryUploadWidgetInfo;
          if (secureUrl) {
            setMessage(secureUrl.secure_url);
            // console.log("secureUrl", secureUrl.secure_url);
            // setImagePost({ url: secureUrl.secure_url, type: "image" });
            // hand(secureUrl.secure_url);
            // setMessage("");
          }
        }}
        uploadPreset="s2lo0hgq"
      >
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Ngăn chặn việc submit form mặc định
          hand(message); // Gọi hàm handleSend với nội dung của message
          setMessage(""); // Xóa nội dung của message sau khi gửi
        }}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          onChange={(value) => setMessage(value)}
          value={message}
        />
        <button
          type="submit"
          className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          "
        >
          <HiPaperAirplane size={18} className="text-white" />
        </button>
      </form>
    </div>
  );
}
