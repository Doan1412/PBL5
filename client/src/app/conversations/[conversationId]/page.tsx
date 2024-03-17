"use client";
import EmptyState from "@/components/EmptyState";
import { useParams, useSearchParams } from "next/navigation";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams {
  conversationId: String;
}

//eslint-disable-next-line
const ConversationId = async ({ params }: { params: IParams }) => {
  const param = useParams();

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
    <div className="lg:pl-unit-80 h-full">
      <div className="h-full flex flex-col">
        <Header />
        <Body />
        <Form />
      </div>
    </div>
  );
};

export default ConversationId;
