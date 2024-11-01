import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = '@civitas:token';
  private userKey = '@civitas:user';

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  /**
   * Realiza a requisição de login para o back-end.
   * Se bem-sucedido, armazena o token e o usuário no `localStorage`.
   *
   * @param credentials - Credenciais do usuário.
   * @returns Observable com a resposta de login.
   */
  login(credentials: LoginCredentials): Observable<LoginResponse> {
    // TODO: falta conectar com a URL do backend
    return this.http.post<LoginResponse>('/admin/login', credentials).pipe(
      tap((response) => {
        if(response.token && response.user) {
          this.saveUserToStorage(response.token, response.user);
        }
      })
    );
  }

  /**
   * Verifica se o usuário está autenticado com base no `localStorage`.
   *
   * @returns `true` se o usuário está autenticado, caso contrário, `false`.
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey) && !!localStorage.getItem(this.userKey);
  }

  /**
   * Retorna o token do `localStorage`, se disponível.
   *
   * @returns O token do usuário ou `null`.
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Retorna o objeto do usuário armazenado no `localStorage`, se disponível.
   *
   * @returns O objeto `user` ou `null`.
   */
  getUser(): string | null {
    return JSON.parse(localStorage.getItem(this.userKey) || 'null');
  }

  /**
   * Remove o token e o usuário do `localStorage` e redireciona para a página de autenticação.
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/auth']);
  }

  /**
   * Salva o token e o usuário no `localStorage`.
   *
   * @param token - Token de autenticação.
   * @param user - Dados do usuário autenticado.
   */

  private saveUserToStorage(token: string, user: string): void {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  /**
   * Carrega o usuário do `localStorage` no momento da inicialização.
   * Este método verifica se as informações do usuário já estão disponíveis no armazenamento.
   */
  private loadUserFromStorage(): void {
    if(this.isAuthenticated()) {
      // Aqui podemos realizar qualquer lógica de inicialização adicional, se necessário.
    }
  }
}
