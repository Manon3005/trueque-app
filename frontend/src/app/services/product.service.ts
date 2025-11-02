import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { State } from '../models/state';
import { environment } from '../../environments/environment';
import { Response } from '../models/response';



// Envio de paquetes al backend
export interface ProductCreationPayload {
  title: string;
  description: string;
  state: State;
  location: string;
  images: string[];
}
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/products`;

  constructor() { }

  //obtener todos los productos
  getAll(page = 1, pageSize = 20): Observable<any> {
    const params = new HttpParams()
      .set('page', String(page))
      .set('pageSize', String(pageSize));
    return this.http.get(`${this.baseUrl}/`, { params });
  }

  //obtener producto por usuario actual
  getFromUser(): Observable<Product[]> {
    return this.http.get<Response>(`${this.baseUrl}/user`)
    .pipe(
      map(response => response.data)
    );
  }

  //obtener producto favorito por usuario actual
  getUserFavorite(): Observable<Product[]> {
    return this.http.get<Response>(`${this.baseUrl}/favorite`)
    .pipe(
      map(response => response.data)
    );
  }

  //obtener por id
  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  //crear producto nuevo JSON con Base64
  createProduct(payload: ProductCreationPayload): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/new`, payload);
  }

  //actualizar producto
  update(id: number, payload: Partial<ProductCreationPayload>): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, payload);
  }
  //eliminar producto
  delete(id: number): Observable<any> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  //marcar/des producto como favorito
  toggleFavorite(id: number, is_favorite: boolean): Observable<any> {
    return this.http.post<void>(`${this.baseUrl}/${id}/favorite`, { is_favorite });
  }

  //Denunciar producto
  toggleDenounce(id: number, is_denounced: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}/denounced`, { is_denounced });
  }

}