"use client";
import EmptyState from "@/components/EmptyState";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { useEffect, useMemo, useState } from "react";
import { getLocalStorage } from "@/app/actions/localStorage_State";
import useHttp from "@/app/hooks/customs/useAxiosPrivate";
import { useAppDispatch } from "@/app/hooks/store";
import { MessageBoxType, UserMessageType } from "@/app/types";
import { useGetUserInfoQuery } from "@/app/hooks/services/user_info.service";
import { failPopUp } from "@/app/hooks/features/popup.slice";

interface IParams {
  conversationId: String;
}
var stompClient: any = null;
export default function ConversationId({ params }: { params: IParams }) {
  const param = useParams();
  const [privateChats, setPrivateChats] = useState(new Map());
  const [userData, setUserData] = useState({
    username: "",
    connected: false,
    message: "",
  });

  const httpPrivate = useHttp();
  const controller = useMemo(() => new AbortController(), []);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [boxMessage, setBoxMessage] = useState<MessageBoxType>();
  const [uniqueLastNames, setUniqueLastNames] = useState<string[]>([]);
  const [uniqueMembers, setUniqueMembers] = useState<UserMessageType[]>([]);

  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );

  useEffect(() => {
    setUserData({
      username: data?.data?.username as string,
      connected: false,
      message: "",
    });
  }, [data?.data?.username]);

  useEffect(() => {
    async function getListBoxChat() {
      try {
        const response = await httpPrivate.get(
          `room/${params.conversationId}`,
          {
            signal: controller.signal,
          }
        );
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
  }, [controller, dispatch, httpPrivate, params.conversationId]);

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  useEffect(() => {
    connect();
  }, []);

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      "/user/" + userData.username + "/private",
      onPrivateMessage
    );
  };

  const onPrivateMessage = (payload: any) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName).push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const hand = () => {
    console.log("send");
    console.log(stompClient);
    if (stompClient) {
      var chatMessage = {
        senderId: getLocalStorage()?.user_id,
        roomId: boxMessage?.id,
        content: "test",
        // date: Math.round(new Date().getTime() / 1000),
      };
      console.log("chatMessage chatroom", chatMessage);
      stompClient.send("/app/chatroom", {}, JSON.stringify(chatMessage));
    }
  };

  const onError = (err) => {
    console.log(err);
  };

  if (!param.conversationId) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversationId={params.conversationId} />
        <Body />
        <Form handleSend={hand} />
      </div>
    </div>
  );
}
