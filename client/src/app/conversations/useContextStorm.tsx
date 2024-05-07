import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import SidebarMess from "@/components/SidebarMess/SidebarMess";
import ConversationsList from "./components/ConversationsList";
import { failPopUp } from "../hooks/features/popup.slice";
import { useGetUserInfoQuery } from "../hooks/services/user_info.service";
import { getLocalStorage } from "../actions/localStorage_State";

var stompClient: any = null;

type StompClientContextType = {
  stompClient: any;
  payloadData: any; 
};

// Tạo một Context mới để lưu trữ stompClient
const StompClientContext = createContext<StompClientContextType | undefined>(
  undefined
);

// Hook để sử dụng stompClient từ Context
export const useStompClient = () => {
  const context = useContext(StompClientContext);
  if (!context) {
    throw new Error("useStompClient must be used within a StompClientProvider");
  }
  return context;
};

// Provider cho Context
export const StompClientProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [payloadData, setPayloadData] = useState<any>(null);
  // const [privateChats, setPrivateChats] = useState(new Map());
  const [userData, setUserData] = useState({
    id: "",
    connected: false,
    message: "",
  });

  const { data, isFetching } = useGetUserInfoQuery(
    getLocalStorage()?.user_id as string
  );
 

  const connect = () => {
    let Sock = new SockJS("http://localhost:8080/ws");
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
    console.log(stompClient);
  };

  useEffect(() => {
    setUserData({
      id: data?.data?.id as string,
      connected: false,
      message: "",
    });
  }, [data?.data?.id]);

  useEffect(() => {
    if (userData.id) {
      connect();
    }
  }, [userData.id]);

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    stompClient.subscribe(
      "/user/" + userData.id + "/private",
      onPrivateMessage
    );
  };

  const onPrivateMessage = (payload: any) => {
    console.log(payload);
    var payloadData = JSON.parse(payload.body);
    // if (privateChats.get(payloadData.senderName)) {
    //   privateChats.get(payloadData.senderName).push(payloadData);
      // setPrivateChats(new Map(privateChats));
      // setPayloadData(payloadData);
    // } else {
      let list = [];
      list.push(payloadData);
      // privateChats.set(payloadData.senderName, list);
      // setPrivateChats(new Map(privateChats));
      setPayloadData(payloadData);
    // }
  };

  // console.log(payloadData)

  const onError = (err: any) => {
    console.log(err);
  };

  return (
    <StompClientContext.Provider value={{ stompClient, payloadData }}>
      {children}
    </StompClientContext.Provider>
  );
};
