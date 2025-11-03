import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Role } from '../models/role.enum';
import { User } from '../models/user.interface';
import { Response } from '../models/response';

export interface UserCreationData {
  rut: string;
  email: string;
  username: string;
  password: string;
  region: string;
  city: string;
  role: Role;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  private baseUrl = `${environment.apiUrl}/users`;
  constructor() { }

  //create user
  createUser(userData: UserCreationData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/new`, userData);
  }

  //update user
  updateUser(userData: Partial<User>): Observable<Response> {
    return this.http.put<Response>(`${this.baseUrl}/`, userData);
  }

  //update user picture
  updatePicture(file: File): Observable<Response> {
    const formData = new FormData();
    formData.append('picture', file);

    return this.http.patch<Response>(`${this.baseUrl}/picture`, formData, {});
  }

  //suspend user
  updateIsSuspended(id: number, is_suspended: boolean): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${id}/suspended`, { is_suspended });
  }

  //get All user
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/`);
  }

  //get All user
  get(): Observable<Partial<User>> {
    return this.http.get<Response>(`${this.baseUrl}/me`)
    .pipe(
      map(response => response.data)
    );
  }

  //delete user
  delete(): Observable<Response> {
    return this.http.delete<Response>(`${this.baseUrl}/`);
  }
}
