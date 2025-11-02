// src/app/services/messages.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/messages`;

  constructor() {}

  getConversationList(): Observable<any>{
    return this.http.get(`${this.baseUrl}/`);
  }

  getConversationWithUser(userId: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  sendMessage(receiverId: number, content: string): Observable<any>{
    const payload = { 
      receiver_id: receiverId, 
      content: content
      
    };
    return this.http.post(`${this.baseUrl}/new`, payload);
  }
}
