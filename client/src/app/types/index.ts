import { PostType } from '@/app/types';
import { Post } from '@/components/Post/Post';
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

export type Profile = {
  id?: String;
  avatar_url?: String;
  bio?: String;
  cover_url?: String;
  study_at?: String;
  work_at?: String;
  from?: String;
  relationship?: String;
};

export type UserType = {
  data: {
    id: String;
    name?: String;
    email: String;
    firstname?: String;
    lastname?: String;
    username: String;
    birth?: Date;
    gender?: String;
    phone?: String;
    profile: Profile;
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