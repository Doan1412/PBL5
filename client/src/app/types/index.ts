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
    password?: string;
    friend?: boolean;
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
export interface FriendRequest {
  id?: string;
  senderId?: string;
  senderName?: string;
  senderAvatar?: string;
  status?: string;
  createdAt?: string;
  senderUsername?: string;
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
  user: User;
  post: PostType;
}

export interface CommentAttachment {
  url: string;
  type: string;
}

export interface CommentType {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
  userId: string;
  username: string;
  fullName: string;
  avatarUrl: string;
  like_count: number;
  share_count: number;
  attachments: Attachment[];
  like: false;
}

export interface ShareByType {
  id: string;
  fullname: string;
  avatar_url: string;
  username: string;
}

export interface SharePostType {
  id: string;
  caption: string;
  created_at: string;
  originalPost: PostType;
  sharedBy: ShareByType;
  like_count: number;
  like: boolean;
}

export type UserMessageType = {
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
  password?: string;
  friend?: boolean;
};

export interface MessageBoxType {
  id: string;
  name: string;
  members: UserMessageType[];
}
