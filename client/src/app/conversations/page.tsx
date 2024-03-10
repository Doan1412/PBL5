"use client";
import useConversation from "@/app/hooks/useConversation";
import EmptyState from "@/components/EmptyState";
import React from "react";
import clsx from "clsx";

export default function PageMessenger() {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
}
