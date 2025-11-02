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

// src/app/pages/search/search.page.ts

  ngOnInit() {
    this.productService.getAll().subscribe({
      
      next: (response: any) => {
        console.log('Productos recibidos!', response);
        // Verificamos que la respuesta sea la esperada
        if (response && response.data && Array.isArray(response.data.products)) {
          
          this.productList = response.data.products.map((product: any) => { 
            return {
              id: product.id,
              title: product.title,
              images: product.images,
              description: product.description,
              state: product.state,
              location: product.location
            }
          });
          
          this.visibleProductList = this.productList;

        } else {
          console.error('La respuesta del backend no tiene el formato esperado.', response);
          this.productList = [];
          this.visibleProductList = [];
        }
      },
      error: (err: any) => {
        console.error('Error al cargar los productos!', err);
        this.productList = [];
        this.visibleProductList = [];
      }
    });
  }
  
  filtrarLista(event: any) {
    const research = event.target.value.toLocaleLowerCase();
    this.visibleProductList = this.productList.filter((product) => product.title.toLocaleLowerCase().includes(research));
  }

}
