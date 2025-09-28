import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-message-buble',
  templateUrl: './message-buble.component.html',
  styleUrls: ['./message-buble.component.scss'],
  standalone: false
})
export class MessageBubleComponent  implements OnInit {
  @Input() message!: Message;
  @Input() currentUserId: string = 'me';

  constructor() { }

  ngOnInit() {}

  isMine() {
    return this.message && this.message.fromUserId === this.currentUserId;
  }
}
