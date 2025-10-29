import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { Role } from '../models/role.enum';
import { User } from '../models/user.interface';

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
  updateUser(id: number, userData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, userData);
  }
  //suspend user
  updateIsSuspended(id: number, is_suspended: boolean): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/${id}/suspended`, { is_suspended });
  }
  //get Alluser
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/`);
  }
}
