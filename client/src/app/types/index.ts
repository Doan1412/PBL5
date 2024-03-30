export type MessageType = {
  id: String;
  body?: String;
  image?: Date;
  createdAt: Date;
  seenIds: String;
  seen: UserType[];
  conversationId: String;
  conversation: ConversationType;
  senderId: String;
  sender: UserType;
};

export type ConversationType = {
  id: String;
  createdAt: Date;
  lastMessageAt: Date;
  name?: String;
  isGroup?: boolean;
  messagesIds: String;
  messages: MessageType[];
  userIds: String;
  users: UserType[];
};

export type UserType = {
  id: String;
  name?: String;
  email: String;
  emailVerified: Date;
  image?: String;
  hashedPassword: String;
  createdAt: Date;
  updatedAt: Date;
  conversationIds: String;
  conversations: ConversationType[];
  seenMessageIds: String;
  seenMessages: MessageType[];
  messages: MessageType[];
};

export type FullMessageType = MessageType & {
  sender: UserType;
  seen: UserType[];
};

export type FullConversationType = ConversationType & {
  users: UserType[];
  messages: FullMessageType[];
};
