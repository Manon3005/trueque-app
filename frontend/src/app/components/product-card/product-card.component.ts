import { Component, inject, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false
})
export class ProductCardComponent  implements OnInit {
  @Input() redirectionURL: string = ".";
  @Input() title: string = "Title";
  @Input() imageURL: string = "";
  @Input() id: number = 0;
  private navCtrl = inject(NavController);

  constructor() { }

  ngOnInit() {}

  navigateToProductPage() {
    this.navCtrl.navigateRoot(`/product/${this.id.toString()}`)
  }

}
