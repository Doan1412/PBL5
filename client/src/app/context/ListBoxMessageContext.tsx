import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
} from "react";
import { useAppDispatch } from "../hooks/store";
import useHttp from "../hooks/customs/useAxiosPrivate";
import { useRouter } from "next/navigation";
import { failPopUp } from "../hooks/features/popup.slice";
import { MessageBoxType } from "../types";

interface ChatContextType {
  listBoxMessage: MessageBoxType[];
  setListBoxMessage: Dispatch<React.SetStateAction<any[]>>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [listBoxMessage, setListBoxMessage] = useState<MessageBoxType[]>([]);
  const dispatch = useAppDispatch();
  const httpPrivate = useHttp();
  const router = useRouter();

  useEffect(() => {
    const controller = new AbortController();
    async function getListBoxChat() {
      try {
        const response = await httpPrivate.get(`/room`, {
          signal: controller.signal,
        });
        if (response.data.status === 200) {
          setListBoxMessage(response.data.data);
        } else {
          dispatch(failPopUp(response.data.message));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    getListBoxChat();

    return () => {
      controller.abort();
    };
  }, [dispatch, httpPrivate, router]);

  return (
    <ChatContext.Provider value={{ listBoxMessage, setListBoxMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
