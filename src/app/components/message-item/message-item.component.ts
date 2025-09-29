// src/app/components/message-item/message-item.component.ts
import { Component, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Thread } from 'src/app/models/message';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageItemComponent {
  @Input() thread!: Thread;
  @Output() select = new EventEmitter<Thread>();

  onClick() {
    this.select.emit(this.thread);
  }
}