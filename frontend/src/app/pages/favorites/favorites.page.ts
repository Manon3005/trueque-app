import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { State } from '../../models/state';
import { ProductService } from '../../services/product.service';

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
    this.productService.getAll().subscribe((products: any) => {
      console.log(products);
      this.productList = products.slice(10,13).map((product: any) => { return {
        id: product.id,
        title: (product.title.length > 25 ? product.title.slice(0,25) : product.title),
        images: [product.image],
        descripcion: product.description,
        state: State.NEW,
        location: "Unkown"
      }})
      this.visibleProductList = this.productList;
    })
  }

}
