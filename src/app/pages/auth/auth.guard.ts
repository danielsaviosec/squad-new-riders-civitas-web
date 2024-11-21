import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../service/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isAuthenticated = this.authService.isAuthenticated();
    const userRole = this.authService.getRole();

    // Verifica se o usuário está tentando acessar as rotas de autenticação
    if (route.routeConfig?.path?.startsWith('auth')) {
      if (isAuthenticated) {
        if (this.router.url !== '/main') {
          this.router.navigate(['/main']);
        }
        return false;
      }
      return true; // Permite acesso às rotas públicas
    }

    // Verifica se o usuário está tentando acessar as rotas principais
    if (!isAuthenticated) {
      if (this.router.url !== '/auth') {
        this.router.navigate(['/auth']);
      }
      return false;
    }

    // Verifica se o papel do usuário é permitido na rota
    const allowedRoles: string[] = route.data['allowedRoles'] || [];
    if (allowedRoles.length && (!userRole || !allowedRoles.includes(userRole))) {
      console.log(userRole);
      if (this.router.url !== '/main') {
        this.router.navigate(['/main']);
      }
      return false;
    }

    // Permite o acesso caso as condições acima não sejam atendidas
    return true;
  }

}
