import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials) {
    console.log({ credentials });
    // TODO: enviar dados para o nosso backend
    return this.http.post('/api/auth/login', credentials);
  }
}
