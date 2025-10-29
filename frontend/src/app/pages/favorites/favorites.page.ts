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
    //TO DO: get user favorites products
  }

}
