import { Component, inject, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { State } from 'src/app/models/state';
import { ProductService } from 'src/app/services/product.service';

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
    this.productService.getProductos().subscribe((products) => {
      this.productList = products.slice(1,11).map((product) => { return {
        id: product.id,
        title: product.title,
        images: product.images,
        descripcion: product.description,
        state: State.NUEVO,
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
