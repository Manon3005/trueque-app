import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.page.html',
  styleUrls: ['./edit-ad.page.scss'],
  standalone: false
})
export class EditAdPage {
  ad = {
    title: '',
    description: '',
    price: null
  };

  constructor() {}

  saveAd() {
    console.log('Guardando anuncio modificado:', this.ad);
  }
}
