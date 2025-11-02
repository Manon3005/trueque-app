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
