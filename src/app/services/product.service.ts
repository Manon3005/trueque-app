import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductAPI } from '../models/product-api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private API: string = "https://fakestoreapi.com/products";

  getProductos() : Observable<ProductAPI[]> {
    return this.http.get<ProductAPI[]>(this.API);
  }
}