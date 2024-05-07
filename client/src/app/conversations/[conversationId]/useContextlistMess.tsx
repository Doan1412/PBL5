import { MessengerType } from "@/app/types";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Định nghĩa kiểu của context
interface MessengerContextType {
  listMessenger: MessengerType[];
  setListMessenger: React.Dispatch<React.SetStateAction<MessengerType[]>>;
}

// Tạo context
const MessengerContext = createContext<MessengerContextType | undefined>(
  undefined
);

// Tạo provider component
export const MessengerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listMessenger, setListMessenger] = useState<MessengerType[]>([]);

  return (
    <MessengerContext.Provider value={{ listMessenger, setListMessenger }}>
      {children}
    </MessengerContext.Provider>
  );
};

export const useMessenger = () => {
    
    const context = useContext(MessengerContext);
    if (!context) {
      throw new Error("useMessenger must be used within a MessengerProvider");
    }
    return context;
  };

