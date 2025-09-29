import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { State } from 'src/app/models/state';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false,
})
export class FavoritesPage implements OnInit {
  productList: Product[] = [];
  visibleProductList: Product[] = [];
  private productService = inject(ProductService);
  constructor() { }

  ngOnInit() {
    this.productService.getProductos().subscribe((products) => {
      console.log(products);
      this.productList = products.slice(10,13).map((product) => { return {
        id: product.id,
        title: (product.title.length > 25 ? product.title.slice(0,25) : product.title),
        images: [product.image],
        descripcion: product.description,
        state: State.NUEVO,
        location: "Unkown"
      }})
      this.visibleProductList = this.productList;
    })
  }

}
