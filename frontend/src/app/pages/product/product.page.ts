import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { State } from 'src/app/models/state';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';

register();

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
  standalone: false
})
export class ProductPage implements OnInit {
  icon: string = "heart-outline"
  product: Partial<Product> = {
    id: 1,
    title: "Título",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque est non viverra. Aliquam suscipit bibendum dui. Pellentesque id sodales arcu. Praesent quis volutpat arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque est non viverra. Aliquam suscipit bibendum dui. Pellentesque id sodales arcu. Praesent quis volutpat arcu.",
    state: "Como nuevo",
    location: "Dirección del producto",
    images: [
     "https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Photo-Image-Icon-Graphics-10388619-1-580x386.jpg",
     "https://www.creativefabrica.com/wp-content/uploads/2021/04/05/Photo-Image-Icon-Graphics-10388619-1-580x386.jpg"
    ],
    username: "Usuario"
  }
  constructor() { }

  ngOnInit() {
  }

  onProgress(event: CustomEvent<[Swiper, number]>) {
    const [swiper, progress] = event.detail;
    console.log(progress);
  }

  onSlideChange() {
    console.log('slide changed');
  }

  setFavorite() {
    if (this.icon == "heart-outline") {
      this.icon = "heart"
    } else {
      this.icon = "heart-outline";
    }
  }

}
