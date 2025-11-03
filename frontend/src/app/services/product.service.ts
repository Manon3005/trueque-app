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
    return this.http.get<Response>(`${this.baseUrl}/${id}`)
    .pipe(
      map(response => response.data)
    );
  }

  //crear producto nuevo JSON con Base64
  createProduct(payload: ProductCreationPayload, files: File[]): Observable<Product> {
    const formData = new FormData();
    files.forEach(file => formData.append('images', file));

    Object.keys(payload).forEach(key => {
      const value = (payload as any)[key];
      formData.append(key, value?.toString() ?? '');
    });

    return this.http.post<Response>(`${this.baseUrl}/new`, formData, {})
    .pipe(
      map(response => response.data)
    );
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
    return this.http.patch<void>(`${this.baseUrl}/favorite/${id}`, { is_favorite });
  }

  //Denunciar producto
  toggleDenounce(id: number, is_denounced: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/denounced/${id}`, { is_denounced });
  }

}