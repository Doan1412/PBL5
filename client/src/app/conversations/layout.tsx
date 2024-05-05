"use client";
import SidebarMess from "@/components/SidebarMess/SidebarMess";
import ConversationsList from "./components/ConversationsList";
// import { useEffect, useState } from "react";
// import { over } from "stompjs";
// import SockJS from "sockjs-client";


// var stompClient: any = null;
export default function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [privateChats, setPrivateChats] = useState(new Map());

  // const [userData, setUserData] = useState({
  //   username: "",
  //   receivername: "",
  //   connected: false,
  //   message: "",
  // });

  
  // const connect = () => {
  //   let Sock = new SockJS("http://localhost:8080/ws");
  //   stompClient = over(Sock);
  //   stompClient.connect({}, onConnected, onError);
  // };


  // useEffect(() => {
  //   connect();
  // }, []);

  // const onConnected = () => {
  //   setUserData({ ...userData, connected: true });
  //   stompClient.subscribe(
  //     "/user/" + userData.username + "/private",
  //     onPrivateMessage
  //   );
  // };

  // const onError = (err) => {
  //   console.log(err);
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


  return (
    <SidebarMess>
      <div className="h-full">
        <ConversationsList initialItems={[]} />
        {children}
      </div>
    </SidebarMess>
  );
}
