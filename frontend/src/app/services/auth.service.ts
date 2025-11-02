import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserCreationData, UserService } from './user.service';

interface LoginResponse {
  code: number;
  message: string;
  data: {
    token: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private baseUrl = `${environment.apiUrl}/users`;

  private _isLoggedIn$ = new BehaviorSubject<boolean>(!!this.getToken());
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor() { }

  //login
  login(email: string, password: string): Observable<string> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        map(res => res.data.token),
        tap(token => {
          this.storeToken(token);
          this._isLoggedIn$.next(true); 
        })
      );
  }
  //register
  register(payload: UserCreationData): Observable<any> {
    return this.userService.createUser(payload);
  }
  //logout
  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn$.next(false);
  }

  //Helpers
  private storeToken(token: string) {
    localStorage.setItem('token', token);
  }
  public getToken(): string | null {
    return localStorage.getItem('token');
  } 

  // Obtener el ID del usuario actual desde el token almacenado
  getCurrentUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(',')[1]));
      return payload.userId ?? null;
    } catch (e) {
      console.error('Error decodificando token:', e);
      return null;
    }
  }
}