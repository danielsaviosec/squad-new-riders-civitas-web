import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { environment } from 'src/environments/environment.development';

import { LoginAdminCredentials } from 'src/app/interface/auth/LoginAdminCredentials.interface';
import { LoginResponse } from 'src/app/interface/response/LoginResponse.interface';
import { LoginTeacherCredentials } from 'src/app/interface/auth/LoginTeacherCredentials.interface';
import { DecodedToken } from 'src/app/interface/auth/DecodedToken.interface';

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
  loginAdmin(credentials: LoginAdminCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiUrl+'admin/login', credentials).pipe(
      tap((response) => {
        if(response.token) {
          this.saveUserToStorage(response.token);
        }
      })
    );
  }

  // Novo método de login para o professor
  loginTeacher(credentials: LoginTeacherCredentials): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}teachers/login`, credentials).pipe(
      tap((response) => {
        if (response.token) {
          this.saveUserToStorage(response.token);
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
    const token = this.getToken();

    if(!token) {
      return false;
    }

    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const currentTime: number = Math.floor(Date.now() / 1000);

      if(decodedToken.exp < currentTime) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  /**
   * Retorna o papel do usuário autenticado.
   *
   * @returns O papel do usuário (e.g., 'admin', 'teacher', 'guardian') ou null.
   */
  getRole(): string | null {
    const userJson = this.getUser(); // Retorna o valor armazenado.

    if (!userJson) return null;

    try {
      // Verifica se o valor já é um objeto
      const user = typeof userJson === 'string' ? JSON.parse(userJson) : userJson;
      return user.role || null; // Retorna o papel, se existir.
    } catch (error) {
      console.error('Erro ao decodificar os dados do usuário:', error);
      return null;
    }
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
  getUser(): object | null {
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

  private saveUserToStorage(token: string): void {
    // Decodifica o token para obter informações do usuário
    const decodedToken = jwtDecode<DecodedToken>(token);

    // Adiciona manualmente o parâmetro 'role' para fins de teste
    decodedToken.role = 'admin'; // Ou qualquer outro valor que você desejar
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(decodedToken));
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
