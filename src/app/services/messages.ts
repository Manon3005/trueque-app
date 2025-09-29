// src/app/services/messages.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Thread, Message } from 'src/app/models/message';
import { map } from 'rxjs/operators';

const NOW = () => new Date().toISOString();

const MOCK_THREADS: Thread[] = [
  { id: 't1', title: 'María', avatar: 'assets/avatars/avatar1.png', lastMessage: 'Hola, estoy interesado...', lastTimestamp: NOW(), unread: 0 },
  { id: 't2', title: 'Carlos', avatar: 'assets/avatars/avatar2.png', lastMessage: '¿Todavía disponible?', lastTimestamp: NOW(), unread: 1 },
  { id: 't3', title: 'Lucía', avatar: 'assets/avatars/avatar3.png', lastMessage: 'Perfecto, gracias', lastTimestamp: NOW(), unread: 0 },
  { id: 't4', title: 'Andrés', avatar: 'assets/avatars/avatar4.png', lastMessage: '¿Puedes enviar más fotos?', lastTimestamp: NOW(), unread: 0 }
];

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', threadId: 't1', fromUserId: 'u1', fromName: 'María', body: 'Hola! Estoy interesado en tu mueble.', timestamp: NOW() },
  { id: 'm2', threadId: 't1', fromUserId: 'me', fromName: 'Tú', body: 'Hola María, claro, ¿qué quieres saber?', timestamp: NOW() },
  { id: 'm3', threadId: 't2', fromUserId: 'u2', fromName: 'Carlos', body: '¿Todavía disponible?', timestamp: NOW() },
  { id: 'm4', threadId: 't3', fromUserId: 'u3', fromName: 'Lucía', body: 'Perfecto, gracias', timestamp: NOW() },
  { id: 'm5', threadId: 't4', fromUserId: 'u4', fromName: 'Andrés', body: '¿Puedes enviar más fotos?', timestamp: NOW() }
];

@Injectable({
  providedIn: 'root'
})
export class Messages {
  private threads$ = new BehaviorSubject<Thread[]>(MOCK_THREADS);
  private messagesMap = new Map<string, BehaviorSubject<Message[]>>();

  constructor() {
    // seed messages map
    for (const m of MOCK_MESSAGES) {
      if (!this.messagesMap.has(m.threadId)) {
        this.messagesMap.set(m.threadId, new BehaviorSubject<Message[]>([m]));
      } else {
        this.messagesMap.get(m.threadId)!.next([...this.messagesMap.get(m.threadId)!.value, m]);
      }
    }
  }

  getThreads(): Observable<Thread[]> {
    return this.threads$.asObservable();
  }

  getThreadById(id: string): Observable<Thread | undefined> {
    return this.threads$.asObservable().pipe(
      map(list => list.find(t => t.id === id))
    );
  }

  getMessagesForThread(threadId: string): Observable<Message[]> {
    if (!this.messagesMap.has(threadId)) {
      this.messagesMap.set(threadId, new BehaviorSubject<Message[]>([]));
    }
    return this.messagesMap.get(threadId)!.asObservable();
  }

  sendMessage(threadId: string, fromUserId: string, fromName: string, messageBody: string) {
    const m: Message = {
      id: 'm' + Math.random().toString(36).slice(2,9),
      threadId,
      fromUserId,
      fromName,
      body: messageBody,
      timestamp: NOW()
    };

    if (!this.messagesMap.has(threadId)) {
      this.messagesMap.set(threadId, new BehaviorSubject<Message[]>([m]));
    } else {
      const sb = this.messagesMap.get(threadId)!;
      sb.next([...sb.value, m]);
    }

    // update thread preview
    this.threads$.next(
      this.threads$.value.map(t =>
        t.id === threadId ? { ...t, lastMessage: messageBody, lastTimestamp: m.timestamp, unread: 0 } : t
      )
    );
  }
}
