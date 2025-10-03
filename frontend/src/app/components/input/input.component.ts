import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false
})
export class InputComponent  implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  constructor() { }

  ngOnInit() {}

}
