import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { Message } from '../../../models/message';
import { Observable, Subscription, map } from 'rxjs';
import { IonContent } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-message-thread',
  templateUrl: './message-thread.page.html',
  styleUrls: ['./message-thread.page.scss'],
  standalone: false
})
export class MessageThreadPage implements OnInit, OnDestroy {
  threadId!: number;
  threadTitle: string = 'Chat';
  messages$!: Observable<Message[]>;
  currentUserId!: number;
  private sub = new Subscription();

  @ViewChild(IonContent) content!: IonContent;

  private route  = inject(ActivatedRoute);
  private router = inject(Router);
  private messagesService = inject(MessageService);
  private authService = inject(AuthService);

  constructor() { 
    if (history.state && history.state['threadTitle']) {
      this.threadTitle = history.state['threadTitle'];
    } else{
      this.threadTitle = 'Chat';
    }
    this.currentUserId = this.authService.getCurrentUserId()!;
  }

  ngOnInit() {
    this.sub.add(
      this.route.paramMap.subscribe(p => {
        const id = p.get('id');
        if (id) {
          this.threadId = +id;

          this.messages$ = this.messagesService.getConversationWithUser(this.threadId).pipe(
            map((res: any) => res.data)
          );

          this.sub.add(
            this.messages$.subscribe(() => {
              setTimeout(() => this.content?.scrollToBottom(200), 250);
            })
          );
        }
      })
    );
  }

  onSend(text: string) {
    if (!this.threadId) return;
    this.messagesService.sendMessage(this.threadId, text).subscribe({
      next: () => {
        this.messages$ = this.messagesService.getConversationWithUser(this.threadId).pipe(
          map((res: any) => res.data)
        );
      },
        error: (err) => console.error('Error al enviar el mensaje!', err)
      });
  }

  trackById(i:number, m:Message){ return m.id; }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
