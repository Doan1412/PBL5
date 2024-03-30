"use client";
import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import React, { useRef, useState } from "react";
import MessageBox from "./MessageBox";

interface BodyProps {
  initialMessage: FullMessageType[];
}

export default function Body() {
  // const [messages, setMessages] = useState(initialMessage);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  return (
    <div className="flex-1 overflow-y-auto">
      <MessageBox isOwn={true} />
      <div ref={bottomRef} className="pt-24"></div>
    </div>
  );
}
