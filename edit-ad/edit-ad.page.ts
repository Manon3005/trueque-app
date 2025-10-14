import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-ad',
  templateUrl: './edit-ad.page.html',
  styleUrls: ['./edit-ad.page.scss'],
})
export class EditAdPage {
  ad = {
    title: '',
    location: '',
    state: '',
    description: ''
  };

  imagenes: string[] = [null, null, null, null];

  constructor() {}

  guardar() {
    console.log('Guardando anuncio modificado:', this.ad);
  }
}
