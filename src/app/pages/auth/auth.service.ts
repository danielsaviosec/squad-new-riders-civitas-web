import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials) {
    // TODO: falta conectar com a URL do backend
    return this.http.post<LoginResponse>('/admin/login', credentials);
  }
}
