import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {}

}
