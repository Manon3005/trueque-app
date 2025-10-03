import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Messages } from '../../../services/messages';
import { Thread, Message } from '../../../models/message';
import { Observable, Subscription } from 'rxjs';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-message-thread',
  templateUrl: './message-thread.page.html',
  styleUrls: ['./message-thread.page.scss'],
  standalone: false
})
export class MessageThreadPage implements OnInit, OnDestroy {
  threadId!: string;
  thread?: Thread | undefined;
  messages$!: Observable<Message[]>;
  currentUserId: string = 'me';
  private sub = new Subscription();

  @ViewChild(IonContent) content!: IonContent;

  constructor(private route: ActivatedRoute, private messagesService: Messages) { }

  ngOnInit() {
    this.sub.add(
      this.route.paramMap.subscribe(p => {
        const id = p.get('id');
        if (id) {
          this.threadId = id;
          this.messages$ = this.messagesService.getMessagesForThread(id);
          // subscribe once to get thread meta
          this.messagesService.getThreadById(id).subscribe(t => this.thread = t);
          // scroll when messages change
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
    this.messagesService.sendMessage(this.threadId, this.currentUserId, 'Tú', text);
  }

  trackById(i:number, m:Message){ return m.id; }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
