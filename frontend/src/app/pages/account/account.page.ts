import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false,
})
export class AccountPage implements OnInit {
  @ViewChild('filePicker') filePicker!: ElementRef<HTMLInputElement>;
  avatarUrl: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  userProduct: Product[] = [];

  constructor() { }
  ngOnInit() {
  }

  chooseImage() {
    this.filePicker.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.avatarUrl = reader.result as string; // Mise à jour de l’avatar
    };
    reader.readAsDataURL(file);
  }

}
