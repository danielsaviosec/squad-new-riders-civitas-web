import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface LoginCredentials {
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

    throw new Error('Erro de exemploo...');

    // this.http.post('/api/auth/login', credentials)...
  }
}
