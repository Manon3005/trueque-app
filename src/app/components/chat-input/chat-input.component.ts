import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  standalone: false
})
export class ChatInputComponent implements OnInit {
  @Input() placeholder: string = 'Escribe un mensaje...';
  @Input() disabled: boolean = false;
  @Output() send = new EventEmitter<string>();

  text: string = '';

  constructor() { }

  ngOnInit() {}

  onSend() {
    const val = this.text && this.text.trim();
    if (!val) return;
    this.send.emit(val);
    this.text = '';
  }
}
