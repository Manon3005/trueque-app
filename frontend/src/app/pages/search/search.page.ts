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
    this.productService.getAll().subscribe((products: any) => {
      console.log(products);
      this.productList = products.data.items.map((product: any) => { return {
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
  
  filtrarLista(event: any) {
    const research = event.target.value.toLocaleLowerCase();
    this.visibleProductList = this.productList.filter((product) => product.title.toLocaleLowerCase().includes(research));
  }

}
