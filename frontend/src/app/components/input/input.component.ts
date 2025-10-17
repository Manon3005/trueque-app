import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: false
})
export class InputComponent  implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() hasButtonEdit: boolean = false;
  @Input() type: string = "text";
  @Output() validate = new EventEmitter<string>();
  isDisabled: boolean = false;
  icon: string = '';
    
  constructor() { }

  ngOnInit() {
    if (this.hasButtonEdit) {
      this.isDisabled = true;
      this.icon = "color-wand";
    }
  }

  changeStatus () {
    if (this.isDisabled) {
      this.icon = "checkmark"
    } else {
      this.icon = "color-wand";
      this.validate.emit("Modification validated");
    }
    this.isDisabled = !this.isDisabled;
    console.log("test");
  }

}
