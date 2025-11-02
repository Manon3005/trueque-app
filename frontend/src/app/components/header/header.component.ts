import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent  implements OnInit {
  @Input() title: string = 'Trueque';
  @Input() buttonIcon?: string;
  @Output() click = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {}

  onClick() {
    this.click.emit();
  }

}
