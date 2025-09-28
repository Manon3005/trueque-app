// src/app/services/messages.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Thread, Message } from 'src/app/models/message';

const NOW = () => new Date().toISOString();

const MOCK_THREADS: Thread[] = [
  { id: 't1', title: 'Usuario 1', avatar: 'assets/icon/favicon.png', lastMessage: 'Hola, estoy interesado...', lastTimestamp: NOW(), unread: 0 },
  { id: 't2', title: 'Usuario 2', avatar: 'assets/icon/favicon.png', lastMessage: '¿Todavía disponible?', lastTimestamp: NOW(), unread: 1 },
  { id: 't3', title: 'Usuario 3', avatar: 'assets/icon/favicon.png', lastMessage: 'Perfecto, gracias', lastTimestamp: NOW(), unread: 0 },
  { id: 't4', title: 'Usuario 4', avatar: 'assets/icon/favicon.png', lastMessage: '¿Puedes enviar más fotos?', lastTimestamp: NOW(), unread: 0 }
];

const MOCK_MESSAGES: Message[] = [
  { id: 'm1', threadId: 't1', fromUserId: 'u1', fromName: 'Usuario 1', body: 'Hola! Estoy interesado en tu mueble.', timestamp: NOW() },
  { id: 'm2', threadId: 't1', fromUserId: 'me', fromName: 'Tú', body: 'Gracias! ¿Puedes enviar fotos?', timestamp: NOW() }
];

@Injectable({
  providedIn: 'root'
})
export class Messages {
  // BehaviorSubject permite emitir el estado inicial y posteriores cambios
  private threads$ = new BehaviorSubject<Thread[]>(MOCK_THREADS);

  // si más tarde necesitas mensajes por hilo puedes usar messagesMap (opcional)
  private messagesMap = new Map<string, BehaviorSubject<Message[]>>();

  constructor() {
    // Inicializamos BehaviorSubjects para hilos con mensajes mock
    MOCK_THREADS.forEach(t => {
      const msgs = MOCK_MESSAGES.filter(m => m.threadId === t.id);
      this.messagesMap.set(t.id, new BehaviorSubject<Message[]>(msgs));
    });
  }

  // Devuelve un observable con la lista de threads
  getThreads(): Observable<Thread[]> {
    return this.threads$.asObservable();
  }

  // Devuelve observable de los mensajes de un thread
  getMessages(threadId: string): Observable<Message[]> {
    if (!this.messagesMap.has(threadId)) {
      this.messagesMap.set(threadId, new BehaviorSubject<Message[]>([]));
    }
    return this.messagesMap.get(threadId)!.asObservable();
  }

  // Añade un mensaje al thread (ejemplo de escritura local)
  sendMessage(threadId: string, messageBody: string, fromUserId = 'me', fromName = 'Tú') {
    const id = 'm' + Date.now();
    const m: Message = { id, threadId, fromUserId, fromName, body: messageBody, timestamp: new Date().toISOString() };

    const sb = this.messagesMap.get(threadId);
    if (!sb) {
      this.messagesMap.set(threadId, new BehaviorSubject<Message[]>([m]));
    } else {
      // importante: crear nuevo array para que OnPush detecte cambios
      sb.next([...sb.value, m]);
    }

    // Actualizar thread (lastMessage, lastTimestamp)
    this.threads$.next(
      this.threads$.value.map(t =>
        t.id === threadId ? { ...t, lastMessage: messageBody, lastTimestamp: m.timestamp, unread: 0 } : t
      )
    );
  }
}
