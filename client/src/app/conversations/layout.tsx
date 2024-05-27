"use client";
import SidebarMess from "@/components/SidebarMess/SidebarMess";
import ConversationsList from "./components/ConversationsList";
import { useEffect, useState } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { failPopUp } from "../hooks/features/popup.slice";
import { useGetUserInfoQuery } from "../hooks/services/user_info.service";
import { getLocalStorage } from "../actions/localStorage_State";
import { StompClientProvider } from "./useContextStorm";
import { ChatProvider } from "../context/ListBoxMessageContext";

var stompClient: any = null;
export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [privateChats, setPrivateChats] = useState(new Map());
  // const [userData, setUserData] = useState({
  //   id: "",
  //   connected: false,
  //   message: "",
  // });

  // const { data, isFetching } = useGetUserInfoQuery(
  //   getLocalStorage()?.user_id as string
  // );

  // const connect = () => {
  //   let Sock = new SockJS("http://localhost:8080/ws");
  //   stompClient = over(Sock);
  //   stompClient.connect({}, onConnected, onError);
  // };

  // useEffect(() => {
  //   setUserData({
  //     id: data?.data?.id as string,
  //     connected: false,
  //     message: "",
  //   });
  // }, [data?.data?.id]);

  // useEffect(() => {
  //   if (userData.id) {
  //     // Kiểm tra nếu userData.id không phải null
  //     connect();
  //   }
  // }, [userData.id]);

  // const onConnected = () => {
  //   setUserData({ ...userData, connected: true });
  //   stompClient.subscribe(
  //     "/user/" + userData.id + "/private",
  //     onPrivateMessage
  //   );
  // };

  // const onPrivateMessage = (payload: any) => {
  //   console.log(payload);
  //   var payloadData = JSON.parse(payload.body);
  //   if (privateChats.get(payloadData.senderName)) {
  //     privateChats.get(payloadData.senderName).push(payloadData);
  //     setPrivateChats(new Map(privateChats));
  //   } else {
  //     let list = [];
  //     list.push(payloadData);
  //     privateChats.set(payloadData.senderName, list);
  //     setPrivateChats(new Map(privateChats));
  //   }
  // };

  // const onError = (err) => {
  //   console.log(err);
  // };

  return (
    <StompClientProvider>
      <ChatProvider>
        <SidebarMess>
          <div className="h-full bg-white">
            <ConversationsList />
            {children}
          </div>
        </SidebarMess>
      </ChatProvider>
    </StompClientProvider>
  );
}
