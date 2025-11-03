// src/app/models/message.ts
export interface Thread {
  id: string;
  title: string;
  avatar?: string;
  lastMessage?: string;
  lastTimestamp?: string; // ISO string
  unread?: number;
}

export interface Message {
  id: string;
  threadId: string;
  fromUserId: number;
  fromName?: string;
  body: string;
  timestamp: string; // ISO string
}

export interface MessageAPI {
  id: number;
  content: string;
  sender_user_id: number;
  receiver_user_id: number;
  sent_at: Date;
  was_seen: boolean;
  sender?: {
    id: number;
    username: string;
    is_suspended: boolean;
  };
  receiver?: {
    id: number;
    username: string;
    is_suspended: boolean;
  };
}
