import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.page.html',
  styleUrls: ['./create-ad.page.scss'],
  standalone: false
})
export class CreateAdPage implements OnInit {
  ad = {
    title: '',
    description: '',
    price: null
  };

  constructor() { }

  ngOnInit() {
  }

  cancelAd() {

  }

  createAd() {

  }

}
