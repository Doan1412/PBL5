
export type MessageType = {
  id: string;
  body?: string;
  image?: Date;
  createdAt: Date;
  seenIds: string;
  seen: UserType[];
  conversationId: string;
  conversation: ConversationType;
  senderId: string;
  sender: UserType;
};

export type ConversationType = {
  id: string;
  createdAt: Date;
  lastMessageAt: Date;
  name?: string;
  isGroup?: boolean;
  messagesIds: string;
  messages: MessageType[];
  userIds: string;
  users: UserType[];
};

export type Profile = {
  id?: string;
  avatar_url?: string;
  bio?: string;
  cover_url?: string;
  study_at?: string;
  work_at?: string;
  from?: string;
  relationship?: string;
};

export type UserType = {
  data: {
    id: string;
    name?: string;
    email: string;
    firstname?: string;
    lastname?: string;
    username: string;
    birth?: string;
    gender?: string;
    phone?: string;
    profile: Profile;
    emailVerified: Date;
    image?: string;
    hashedPassword: string;
    createdAt: Date;
    updatedAt: Date;
    conversationIds: string;
    conversations: ConversationType[];
    seenMessageIds: string;
    seenMessages: MessageType[];
    messages: MessageType[];
  };
};

export type FullMessageType = MessageType & {
  sender: UserType;
  seen: UserType[];
};

export type FullConversationType = ConversationType & {
  users: UserType[];
  messages: FullMessageType[];
};

export interface User {
  name: string;
  username: string;
  profilePic: string;
  storyImage: string;
  postImg: string;
}

export interface PostType {
  id?: string;
  content?: string;
  created_at?: string;
  updated_at?: string | null;
  userId?: string;
  fullName?: string;
  avatarUrl?: string;
  like_count?: number;
  share_count?: number;
  attachments?: Attachment[];
  like?: boolean;
  username?: string;
}

export interface Attachment {
  id?: string;
  url?: string;
  type?: string;
  created_at?: string;
}

export interface ImageType {
  image: string[];
}

export interface ListFriendType {
  id: string;
  fullname: string;
  avatar_url: string;
  username: string;
}

export interface Report {
  id: string;
  reason: string;
  createdAt: string;
  status: string;
  user : User;
  post : PostType
}