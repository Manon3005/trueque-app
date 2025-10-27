import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { State } from '../../models/state';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage implements OnInit {
  productList: Product[] = [];
  visibleProductList: Product[] = [];
  private productService = inject(ProductService);
  constructor() { }

  ngOnInit() {
    /*this.productService.getProductos().subscribe((products) => {
      //TO DO: map results
    })*/
  }
  
  filtrarLista(event: any) {
    const research = event.target.value.toLocaleLowerCase();
    this.visibleProductList = this.productList.filter((product) => product.title.toLocaleLowerCase().includes(research));
  }

}
