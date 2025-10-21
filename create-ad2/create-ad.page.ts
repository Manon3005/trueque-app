import { Component } from '@angular/core';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.page.html',
  styleUrls: ['./create-ad.page.scss'],
})
export class CreateAdPage {
  ad = {
    title: '',
    location: '',
    state: '',
    description: ''
  };

  imagenes: string[] = [null, null, null, null];

  constructor() {}

  publicar() {
    console.log('Publicando anuncio:', this.ad);
  }
}
