import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { Thread } from '../../models/message';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
  standalone: false,
})
export class MessagesPage implements OnInit, OnDestroy {
  threads: Thread[] = [];
  visibleThreads: Thread[] = [];
  private sub = new Subscription();

  private messageService = inject(MessageService);
  private router = inject(Router);

  constructor() {}

  ngOnInit() {
      const s = this.messageService.getConversationList().subscribe({
      next: (response: any) => {
        
        this.threads = response.data.map((convo: any) => {
          return {
            id: convo.id,
            title: `Usuario ${convo.userId}`, 
            avatar: 'assets/icon/user-avatar.png',
            lastMessage: convo.lastMessage,
            lastTimestamp: convo.updatedAt
          } as Thread;
        
    });
    this.visibleThreads = this.threads;
  },
  error: (err: any) => {
    console.error('Error al cargar las conversaciones!', err);
    this.threads = [];
    this.visibleThreads = [];
  }
});
  this.sub.add(s);
}

ngOnDestroy() {
    this.sub.unsubscribe();
}


openThread(thread: Thread) {
    this.router.navigate(['/messages', thread.id], {
      state: { threadTitle: thread.title }
    });
}


  trackById(i:number, t:Thread) { return t.id; }
}


